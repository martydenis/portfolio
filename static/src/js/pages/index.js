import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { initSmoothScroll } from "../lenis.js";
import { initTextAnimations } from "../animate.js";
import { throttle, dpi, randomIntFromRange, randomValueFromArray } from '../tools.js'
import "@scss/pages/index.scss";

initSmoothScroll();

/**
 * Initialize ScrollTrigger with gsap
 */
gsap.registerPlugin(ScrollTrigger);

/**
 * Initialize text appear animations
 */
window.addEventListener("load", function () {
    initTextAnimations();
});

class Project {
    constructor() {
        this.canvasId = '';
        this.progress = 0;
        this.canvasWidth = 0;
        this.canvasHeight = 0;
    }

    init() {
        if (!this.canvasId)
            return false;

        this.canvas = document.getElementById(this.canvasId);
        this.ctx = this.canvas.getContext('2d');

        this.bindEvents();
        this.refresh();

        return this;
    }

    bindEvents() {
        const self = this;
        window.addEventListener('resize', throttle(() => self.refresh(self), 200));
    }

    refresh() {
        this.canvasWidth = dpi(this.canvas.offsetWidth);
        this.canvasHeight = dpi(this.canvas.offsetHeight);

        this.canvas.setAttribute('width', this.canvasWidth);
        this.canvas.setAttribute('height', this.canvasHeight);
    }
}

class Sandbox extends Project {
    constructor() {
        super();

        this.canvasId = 'project__sandbox__canvas';
        this.gravity = 0.982 / 6;
        this.balls = [];

        this.direction = -1;
        this.colors = [
            '#2a9d8f',
            '#f3d795',
            '#f4a261',
            '#264653',
            '#e76f51',
        ]
    }

    refresh() {
        super.refresh();

        this.populate();
        this.drawCanvas();
    }

    populate() {
        const ballAmount = Math.min(Math.round(outerWidth / 60), 25);
        // const ballAmount = 1;
        this.balls = [];

        for (let i = 0; i < ballAmount; i++) {
            let radius = Math.floor(randomIntFromRange(15, Math.min(75, outerWidth / 8), false));
            const mass = Math.round(20 + radius / 3);
            const x = randomIntFromRange(radius, outerWidth - radius);
            const y = randomIntFromRange(radius, outerHeight - radius);
            const color = randomValueFromArray(this.colors);
            const force = 3;
            const hForce = randomIntFromRange(-force, force) * 50;
            const vForce = randomIntFromRange(-force * 20, force * 10);
            const dx = hForce / mass;
            const dy = vForce / mass;

            this.balls.push(new Ball(x, y, radius, mass, color, dx, dy, this.ctx));
        }
    }

    drawCanvas(progress) {
        progress ??= 0;
        const deltaProgress = this.progress - progress;
        const direction = deltaProgress >= 0 ? -1 : 1;

        this.progress = progress;
        this.deltaProgress = Math.abs(deltaProgress * 100);
        if (direction != this.direction) {
            this.direction = direction;

            for (let i = 0; i < this.balls.length; i++) {
                const ball = this.balls[i];
                ball.invertTime();
            }
        }

        this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        for (let i = 0; i < this.balls.length; i++) {
            const ball = this.balls[i];
            ball.update(this.gravity, this.deltaProgress);
        }
    }
}

class Ball {
    constructor(x, y, radius, mass, color, dx, dy, ctx) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.mass = mass;
        this.color = color;
        this.dx = dx;
        this.dy = dy;
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.arc(dpi(this.x), dpi(this.y), dpi(this.radius), 0, 2 * Math.PI);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
        this.ctx.closePath();
    }

    invertTime() {
        this.dx = -this.dx;
        this.dy = -this.dy;
    }

    update(gravity, deltaProgress) {
        if (this.y + this.radius + deltaProgress * this.dy > outerHeight) {
            this.dy = -this.dy;
        } else {
            this.dy += gravity;
        }

        if (this.x + this.radius + deltaProgress * this.dx >= outerWidth ||
            this.x - this.radius + deltaProgress * this.dx <= 0) {
            this.dx = -this.dx;
        } else {
            this.dx = this.dx;
        }

        this.x += deltaProgress * this.dx;
        this.y += deltaProgress * this.dy;

        this.draw();
    }
}

class Artinmov extends Project {
    constructor() {
        super();

        this.canvasId = 'project__artinmov__canvas';
        this.angle = 10 * Math.PI / 180;
        this.frameWidth = 180;
        this.frameMinHeight = 100;
        this.frameMaxHeight = 300;
        this.frameMargin = 15;
        this.frameStrokeWidth = 6;
    }

    refresh() {
        super.refresh();

        this.generateColumns();
        this.drawCanvas();
    }

    generateColumns() {
        // +1 to compensate for the angle tilt
        const columnsCount = 1 + Math.round(innerWidth / this.frameWidth);
        const rowsCount = 2 * Math.round(innerWidth / this.frameMinHeight);

        this.columns = [];
        for (let c = 0; c < columnsCount; c++) {
            const column = {};
            column.speed = -Math.round(100 + (Math.random() * 400));
            column.frames = [];

            for (let r = 0; r < rowsCount; r++) {
                const frameHeight = Math.round(this.frameMinHeight + Math.random() * (this.frameMaxHeight - this.frameMinHeight));
                column.frames.push(frameHeight);
            }

            this.columns.push(column);
        }
    }

    drawCanvas(progress) {
        this.ctx.globalCompositeOperation = 'source-over';
        this.ctx.lineWidth = dpi(this.frameStrokeWidth);
        this.ctx.strokeStyle = '#E51E35';
        this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

        for (let c = 0; c < this.columns.length; c++) {
            const column = this.columns[c];
            const x = c * this.frameWidth * Math.sin(this.angle);
            let y = - Math.round(this.frameWidth * Math.sin(this.angle));

            this.ctx.rotate(this.angle);
            this.ctx.translate(0, -x);

            for (let r = 0; r < column.frames.length; r++) {
                const frameHeight = column.frames[r];

                this.ctx.beginPath();
                this.ctx.strokeRect(dpi(c * this.frameWidth + this.frameMargin), dpi(y + this.frameMargin + progress * column.speed), dpi(this.frameWidth - this.frameMargin * 2), dpi(frameHeight - this.frameMargin * 2));
                this.ctx.closePath();

                y += frameHeight;
            }

            this.ctx.translate(0, x);
            this.ctx.rotate(-this.angle);
        }
    }
}

class EasyAlarm extends Project {
    constructor() {
        super();

        this.canvasId = 'project__easy-alarm__canvas';
        this.spotlights = [];
    }

    init() {
        if (!super.init()) {
            return false;
        }

        this.spotlights = [];
        this.spotlights.push(new Spotlight(0.7, 0.4, 0.2, 1.2, this.ctx));
        this.spotlights.push(new Spotlight(0.15, 0.15, .8, 0.7, this.ctx));

        return this;
    }

    drawCanvas(progress) {
        progress ??= 0;
        this.progress = progress;

        this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        for (let s = 0; s < this.spotlights.length; s++) {
            const spotlight = this.spotlights[s];
            spotlight.update(this.progress);
            spotlight.draw();
        }
    }
}

class Spotlight {
    constructor(x, y, fx, fy, ctx) {
        const minDimension = Math.min(innerWidth, innerHeight)

        this.ctx = ctx;
        this.radius = randomIntFromRange(minDimension * 0.2, minDimension * 0.35);
        this.x = x * innerWidth;
        this.y = y * innerHeight;
        this.initialX = x * innerWidth;
        this.initialY = y * innerHeight;
        this.finalX = fx * innerWidth;
        this.finalY = fy * innerHeight;
    }

    update(progress) {
        this.x = this.initialX - (this.initialX - this.finalX) * progress;
        this.y = this.initialY - (this.initialY - this.finalY) * progress;
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.arc(dpi(this.x), dpi(this.y), dpi(this.radius), 0, 2 * Math.PI);
        this.ctx.fillStyle = '#ffffff';
        this.ctx.fill();
        this.ctx.closePath();
    }
}

/**
 * PROJECTS
 */
gsap.to("#projects__intro", {
    scrollTrigger: {
        trigger: "#projects__intro",
        pin: true,
        start: "top top",
        end: "bottom top",
    },
});

gsap.to("#projects__intro__title", {
    textIndent: "-1em",
    ease: "none",
    scrollTrigger: {
        trigger: "#projects__intro__wrapper",
        scrub: true,
    },
});


/**
 * Fade in project content and image with scroll
 */
const projects = document.getElementsByClassName("project");
for (let i = 0; i < projects.length; i++) {
    const project = projects[i];
    const contentToAnimate = project.querySelectorAll("#projects .section__image, #projects .section__content");
    const pin = project.querySelectorAll('.pin-wrapper');

    gsap.fromTo(
        contentToAnimate,
        {
            yPercent: 30,
            opacity: 0,
        },
        {
            yPercent: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.3,
            scrollTrigger: {
                trigger: contentToAnimate,
                once: true,
                start: "top 80%",
            },
        }
    );

    gsap.to(pin, {
        scrollTrigger: {
            trigger: pin,
            pin: true,
            scrub: true,
        }
    })

    gsap.fromTo(project, {
        clipPath: "inset(80px)",
    }, {
        clipPath: "inset(0px)",
        duration: 1,
        scrollTrigger: {
            trigger: project,
            scrub: true,
            start: "80px bottom",
            end: "+=40%"
        }
    });
}

/**
 * Complex animations with scroll
 */

// Bouncing balls with scroll
const sandbox = new Sandbox();
sandbox.init().gsap = gsap.to("#project__sandbox", {
    scrollTrigger: {
        trigger: "#project__sandbox",
        scrub: true,
        onUpdate: (self) => sandbox.drawCanvas(self.progress),
    }
});

// Animate background gradient position + the two spotlights
const easyalarm = new EasyAlarm();
easyalarm.init().gsap = gsap.to("#project__easy-alarm", {
    backgroundPosition: "66% 60%",
    scrollTrigger: {
        trigger: "#project__easy-alarm",
        scrub: true,
        onUpdate: (self) => easyalarm.drawCanvas(self.progress),
    },
});

// Animate the frames in the background
const artinmov = new Artinmov();
artinmov.init().gsap = gsap.to("#project__artinmov", {
    scrollTrigger: {
        trigger: "#project__artinmov",
        scrub: true,
        onUpdate: (self) => artinmov.drawCanvas(self.progress),
    },
});

/**
 * Animate title cursive words with scroll
 */
const cursiveElements = document.querySelectorAll("h2 .cursive");
for (let i = 0; i < cursiveElements.length; i++) {
    const element = cursiveElements[i];
    gsap.to(element, {
        xPercent: 10,
        scrollTrigger: {
            trigger: element,
            scrub: true,
        },
    });
}

