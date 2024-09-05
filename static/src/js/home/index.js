import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { initSmoothScroll } from "./lenis.js";
import { initTextAnimations } from "../animate.js";
import { Artinmov, EasyAlarm, Sandbox } from "./projects.js";
import validateContactForm from "./form.js";
import "@scss/index.scss";

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

/**
 *
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

/**
 * Validate the data before sending the form
 */
validateContactForm();
