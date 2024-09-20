"use strict";
(self["webpackChunkmartindenis_v3"] = self["webpackChunkmartindenis_v3"] || []).push([["global"],{

/***/ "./static/src/js/animate.js":
/*!**********************************!*\
  !*** ./static/src/js/animate.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   initTextAnimations: () => (/* binding */ initTextAnimations)
/* harmony export */ });
/* harmony import */ var gsap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! gsap */ "./node_modules/gsap/index.js");
/* harmony import */ var gsap_ScrollTrigger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! gsap/ScrollTrigger */ "./node_modules/gsap/ScrollTrigger.js");


gsap__WEBPACK_IMPORTED_MODULE_0__.gsap.registerPlugin(gsap_ScrollTrigger__WEBPACK_IMPORTED_MODULE_1__.ScrollTrigger);
const fadeIn = (line, delay) => {
  gsap__WEBPACK_IMPORTED_MODULE_0__.gsap.fromTo(line, {
    yPercent: 10,
    opacity: 0
  }, {
    yPercent: 0,
    opacity: 1,
    delay: delay,
    duration: 1.5,
    scrollTrigger: {
      trigger: line,
      once: true,
      start: "top 80%"
    }
  });
};
const wrapLetters = string => {
  return string.replace(/\S/g, "<span class='fx-letter'>$&</span>");
};
const wrapWords = words => {
  return "<span class='fx-word'>" + words.join("</span> <span class='fx-word'>") + "</span>";
};
const wrapLines = el => {
  const wordsList = el.innerText.split(/[ ]+/i);
  const wrappedWords = wrapWords(wordsList);
  el.innerHTML = wrappedWords;
  const words = el.querySelectorAll(".fx-word");
  let lastOffsetTop = null;
  let html = "<span class='fx-line'><span class='fx-line-inner'>";
  for (const word of words) {
    const currentWordOffsetTop = word.getBoundingClientRect().top;
    if (lastOffsetTop != null && lastOffsetTop < currentWordOffsetTop) {
      html += "</span></span><span class='fx-line'><span class='fx-line-inner'>";
    }
    html += " " + word.innerText;
    lastOffsetTop = currentWordOffsetTop;
  }
  html += "</span></span>";
  return html;
};
const animateLines = (el, delay) => {
  const lines = wrapLines(el);
  el.innerHTML = lines;
  gsap__WEBPACK_IMPORTED_MODULE_0__.gsap.fromTo(el.querySelectorAll('.fx-line-inner'), {
    yPercent: 100,
    opacity: 0
  }, {
    yPercent: 0,
    opacity: 1,
    delay: delay,
    duration: 1,
    stagger: 0.1,
    scrollTrigger: {
      trigger: el,
      scrub: true,
      start: "top 65%",
      end: "+=30%"
    }
  });
};
const animateLetters = (el, delay) => {
  const wordsList = el.textContent.split(/[ ]+/i);
  const wordsWithLettersHTML = wordsList.map(word => wrapLetters(word));
  el.innerHTML = wrapWords(wordsWithLettersHTML);
  el.style.opacity = 1;
  gsap__WEBPACK_IMPORTED_MODULE_0__.gsap.fromTo(el.querySelectorAll(".fx-letter"), {
    rotateZ: 4,
    xPercent: 2,
    yPercent: 15,
    opacity: 0
  }, {
    rotateZ: 0,
    xPercent: 0,
    yPercent: 0,
    opacity: 1,
    delay: delay,
    duration: 1.4,
    stagger: 0.05,
    scrollTrigger: {
      trigger: el,
      once: true,
      start: "top 85%"
    }
  });
};
const initTextAnimations = () => {
  const elements = document.querySelectorAll(".animate");
  for (let i = 0; i < elements.length; i++) {
    const el = elements[i];
    const delay = parseFloat(el.dataset.delay) || 0;
    const animationType = el.dataset.animType || "fade";
    switch (animationType) {
      case "letters":
        animateLetters(el, delay);
        break;
      case "lines":
        animateLines(el, delay);
        break;
      default:
        fadeIn(el, delay);
        break;
    }
  }
};

/***/ }),

/***/ "./static/src/js/pages/contact.js":
/*!****************************************!*\
  !*** ./static/src/js/pages/contact.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _tools_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../tools.js */ "./static/src/js/tools.js");
/* harmony import */ var _scss_pages_contact_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @scss/pages/contact.scss */ "./static/src/scss/pages/contact.scss");


const validateContactForm = () => {
  const formElement = document.getElementById('contact__form');
  formElement.addEventListener("submit", function (e) {
    var field,
      value = null;
    var valid = true;

    // Test name.
    field = document.getElementById('name');
    value = field.value;
    if (value) {
      field.parentNode.classList.remove("error");
    } else {
      field.parentNode.classList.add("error");
      valid = false;
    }

    // Test email.
    field = document.getElementById('email');
    value = field.value;
    if ((0,_tools_js__WEBPACK_IMPORTED_MODULE_0__.validateEmailAddress)(value)) {
      field.parentNode.classList.remove("error");
    } else {
      field.parentNode.classList.add("error");
      valid = false;
    }

    // Test message.
    field = document.getElementById('message');
    value = field.value;
    if (value) {
      field.parentNode.classList.remove("error");
    } else {
      field.parentNode.classList.add("error");
      valid = false;
    }

    // Submit form if valid.
    if (!valid) {
      e.preventDefault();
    }
  });
};
window.on('load', function () {
  validateContactForm();
});

/***/ }),

/***/ "./static/src/js/pages/index.js":
/*!**************************************!*\
  !*** ./static/src/js/pages/index.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var gsap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! gsap */ "./node_modules/gsap/index.js");
/* harmony import */ var gsap_ScrollTrigger__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! gsap/ScrollTrigger */ "./node_modules/gsap/ScrollTrigger.js");
/* harmony import */ var _animate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../animate.js */ "./static/src/js/animate.js");
/* harmony import */ var _tools_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../tools.js */ "./static/src/js/tools.js");
/* harmony import */ var _scss_pages_index_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @scss/pages/index.scss */ "./static/src/scss/pages/index.scss");






/**
 * Initialize ScrollTrigger with gsap
 */
gsap__WEBPACK_IMPORTED_MODULE_3__.gsap.registerPlugin(gsap_ScrollTrigger__WEBPACK_IMPORTED_MODULE_4__.ScrollTrigger);

/**
 * Initialize text appear animations
 */
window.addEventListener("load", function () {
  (0,_animate_js__WEBPACK_IMPORTED_MODULE_0__.initTextAnimations)();
});
class Project {
  constructor() {
    this.canvasId = '';
    this.progress = 0;
    this.canvasWidth = 0;
    this.canvasHeight = 0;
  }
  init() {
    if (!this.canvasId) return false;
    this.canvas = document.getElementById(this.canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.bindEvents();
    this.refresh();
    return this;
  }
  bindEvents() {
    const self = this;
    window.addEventListener('resize', (0,_tools_js__WEBPACK_IMPORTED_MODULE_1__.throttle)(() => self.refresh(self), 200));
  }
  refresh() {
    this.canvasWidth = (0,_tools_js__WEBPACK_IMPORTED_MODULE_1__.dpi)(this.canvas.offsetWidth);
    this.canvasHeight = (0,_tools_js__WEBPACK_IMPORTED_MODULE_1__.dpi)(this.canvas.offsetHeight);
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
    this.colors = ['#2a9d8f', '#f3d795', '#f4a261', '#264653', '#e76f51'];
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
      let radius = Math.floor((0,_tools_js__WEBPACK_IMPORTED_MODULE_1__.randomIntFromRange)(15, Math.min(75, outerWidth / 8), false));
      const mass = Math.round(20 + radius / 3);
      const x = (0,_tools_js__WEBPACK_IMPORTED_MODULE_1__.randomIntFromRange)(radius, outerWidth - radius);
      const y = (0,_tools_js__WEBPACK_IMPORTED_MODULE_1__.randomIntFromRange)(radius, outerHeight - radius);
      const color = (0,_tools_js__WEBPACK_IMPORTED_MODULE_1__.randomValueFromArray)(this.colors);
      const force = 3;
      const hForce = (0,_tools_js__WEBPACK_IMPORTED_MODULE_1__.randomIntFromRange)(-force, force) * 50;
      const vForce = (0,_tools_js__WEBPACK_IMPORTED_MODULE_1__.randomIntFromRange)(-force * 20, force * 10);
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
    this.ctx.arc((0,_tools_js__WEBPACK_IMPORTED_MODULE_1__.dpi)(this.x), (0,_tools_js__WEBPACK_IMPORTED_MODULE_1__.dpi)(this.y), (0,_tools_js__WEBPACK_IMPORTED_MODULE_1__.dpi)(this.radius), 0, 2 * Math.PI);
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
    if (this.x + this.radius + deltaProgress * this.dx >= outerWidth || this.x - this.radius + deltaProgress * this.dx <= 0) {
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
      column.speed = -Math.round(100 + Math.random() * 400);
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
    this.ctx.lineWidth = (0,_tools_js__WEBPACK_IMPORTED_MODULE_1__.dpi)(this.frameStrokeWidth);
    this.ctx.strokeStyle = '#E51E35';
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    for (let c = 0; c < this.columns.length; c++) {
      const column = this.columns[c];
      const x = c * this.frameWidth * Math.sin(this.angle);
      let y = -Math.round(this.frameWidth * Math.sin(this.angle));
      this.ctx.rotate(this.angle);
      this.ctx.translate(0, -x);
      for (let r = 0; r < column.frames.length; r++) {
        const frameHeight = column.frames[r];
        this.ctx.beginPath();
        this.ctx.strokeRect((0,_tools_js__WEBPACK_IMPORTED_MODULE_1__.dpi)(c * this.frameWidth + this.frameMargin), (0,_tools_js__WEBPACK_IMPORTED_MODULE_1__.dpi)(y + this.frameMargin + progress * column.speed), (0,_tools_js__WEBPACK_IMPORTED_MODULE_1__.dpi)(this.frameWidth - this.frameMargin * 2), (0,_tools_js__WEBPACK_IMPORTED_MODULE_1__.dpi)(frameHeight - this.frameMargin * 2));
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
    const minDimension = Math.min(innerWidth, innerHeight);
    this.ctx = ctx;
    this.radius = (0,_tools_js__WEBPACK_IMPORTED_MODULE_1__.randomIntFromRange)(minDimension * 0.2, minDimension * 0.35);
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
    this.ctx.arc((0,_tools_js__WEBPACK_IMPORTED_MODULE_1__.dpi)(this.x), (0,_tools_js__WEBPACK_IMPORTED_MODULE_1__.dpi)(this.y), (0,_tools_js__WEBPACK_IMPORTED_MODULE_1__.dpi)(this.radius), 0, 2 * Math.PI);
    this.ctx.fillStyle = '#ffffff';
    this.ctx.fill();
    this.ctx.closePath();
  }
}

/**
 * PROJECTS
 */
gsap__WEBPACK_IMPORTED_MODULE_3__.gsap.to("#projects__intro", {
  scrollTrigger: {
    trigger: "#projects__intro",
    pin: true,
    start: "top top",
    end: "bottom top"
  }
});
gsap__WEBPACK_IMPORTED_MODULE_3__.gsap.to("#projects__intro__title", {
  textIndent: "-1em",
  ease: "none",
  scrollTrigger: {
    trigger: "#projects__intro__wrapper",
    scrub: true
  }
});

/**
 * Fade in project content and image with scroll
 */
const projects = document.getElementsByClassName("project");
for (let i = 0; i < projects.length; i++) {
  const project = projects[i];
  const contentToAnimate = project.querySelectorAll("#projects .section__image, #projects .section__content");
  const pin = project.querySelectorAll('.pin-wrapper');
  gsap__WEBPACK_IMPORTED_MODULE_3__.gsap.fromTo(contentToAnimate, {
    yPercent: 30,
    opacity: 0
  }, {
    yPercent: 0,
    opacity: 1,
    duration: 1,
    stagger: 0.3,
    scrollTrigger: {
      trigger: contentToAnimate,
      once: true,
      start: "top 80%"
    }
  });
  gsap__WEBPACK_IMPORTED_MODULE_3__.gsap.to(pin, {
    scrollTrigger: {
      trigger: pin,
      pin: true,
      scrub: true
    }
  });
  gsap__WEBPACK_IMPORTED_MODULE_3__.gsap.fromTo(project, {
    clipPath: "inset(80px)"
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
sandbox.init().gsap = gsap__WEBPACK_IMPORTED_MODULE_3__.gsap.to("#project__sandbox", {
  scrollTrigger: {
    trigger: "#project__sandbox",
    scrub: true,
    onUpdate: self => sandbox.drawCanvas(self.progress)
  }
});

// Animate background gradient position + the two spotlights
const easyalarm = new EasyAlarm();
easyalarm.init().gsap = gsap__WEBPACK_IMPORTED_MODULE_3__.gsap.to("#project__easy-alarm", {
  backgroundPosition: "66% 60%",
  scrollTrigger: {
    trigger: "#project__easy-alarm",
    scrub: true,
    onUpdate: self => easyalarm.drawCanvas(self.progress)
  }
});

// Animate the frames in the background
const artinmov = new Artinmov();
artinmov.init().gsap = gsap__WEBPACK_IMPORTED_MODULE_3__.gsap.to("#project__artinmov", {
  scrollTrigger: {
    trigger: "#project__artinmov",
    scrub: true,
    onUpdate: self => artinmov.drawCanvas(self.progress)
  }
});

/**
 * Animate title cursive words with scroll
 */
const cursiveElements = document.querySelectorAll("h2 .cursive");
for (let i = 0; i < cursiveElements.length; i++) {
  const element = cursiveElements[i];
  gsap__WEBPACK_IMPORTED_MODULE_3__.gsap.to(element, {
    xPercent: 10,
    scrollTrigger: {
      trigger: element,
      scrub: true
    }
  });
}

/***/ }),

/***/ "./static/src/js/pages/projects.js":
/*!*****************************************!*\
  !*** ./static/src/js/pages/projects.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _animate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../animate.js */ "./static/src/js/animate.js");
/* harmony import */ var _scss_pages_projects_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @scss/pages/projects.scss */ "./static/src/scss/pages/projects.scss");
// import Lenis from '@studio-freight/lenis'



/**
 * Initialize smooth scroll behaviour with Lenis.
 */
// const lenis = new Lenis({
//   lerp: 0.05,
//   duration: 1.5,
//   smoothTouch: true,
// })

// function raf(time) {
//   lenis.raf(time)
//   requestAnimationFrame(raf)
// }

// requestAnimationFrame(raf)

window.addEventListener('load', function () {
  (0,_animate_js__WEBPACK_IMPORTED_MODULE_0__.initTextAnimations)();
});

/***/ }),

/***/ "./static/src/js/tools.js":
/*!********************************!*\
  !*** ./static/src/js/tools.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   dpi: () => (/* binding */ dpi),
/* harmony export */   randomIntFromRange: () => (/* binding */ randomIntFromRange),
/* harmony export */   randomValueFromArray: () => (/* binding */ randomValueFromArray),
/* harmony export */   throttle: () => (/* binding */ throttle),
/* harmony export */   validateEmailAddress: () => (/* binding */ validateEmailAddress)
/* harmony export */ });
function dpi(value) {
  return value * window.devicePixelRatio;
}
function randomIntFromRange(min, max) {
  let round = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  if (round) {
    return Math.floor(min + Math.random() * (max - min + 1));
  } else {
    return min + Math.random() * (max - min + 1);
  }
}
function randomValueFromArray(array) {
  return array[Math.floor(Math.random() * array.length)];
}

// Throttle function from Lodash
function throttle(func, wait, options) {
  var context, args, result;
  var timeout = null;
  var previous = 0;
  if (!options) options = {};
  var later = function () {
    previous = options.leading === false ? 0 : Date.now();
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) context = args = null;
  };
  return function () {
    var now = Date.now();
    if (!previous && options.leading === false) previous = now;
    var remaining = wait - (now - previous);
    context = this;
    args = arguments;
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };
}
function validateEmailAddress(email) {
  //compare l'email entré à l'expression régulière.
  var regExpPattern = /^[0-9a-zA-Z][-._a-zA-Z0-9]*@([0-9a-zA-Z][-._0-9a-zA-Z]*\.)+[a-zA-Z]{2,4}$/;
  return email.match(regExpPattern) != null;
}

/***/ }),

/***/ "./static/src/scss/pages/404.scss":
/*!****************************************!*\
  !*** ./static/src/scss/pages/404.scss ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./static/src/scss/pages/contact.scss":
/*!********************************************!*\
  !*** ./static/src/scss/pages/contact.scss ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./static/src/scss/pages/index.scss":
/*!******************************************!*\
  !*** ./static/src/scss/pages/index.scss ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./static/src/scss/pages/projects.scss":
/*!*********************************************!*\
  !*** ./static/src/scss/pages/projects.scss ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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VSxVQUFVLENBQUNSLEtBQUssRUFBRUssU0FBUyxDQUFDO0lBQzFDO0lBQ0EsT0FBT1IsTUFBTTtFQUNqQixDQUFDO0FBQ0w7QUFFTyxTQUFTNUksb0JBQW9CQSxDQUFDd0osS0FBSyxFQUFFO0VBQ3hDO0VBQ0EsSUFBSUMsYUFBYSxHQUFHLDJFQUEyRTtFQUMvRixPQUFPRCxLQUFLLENBQUNFLEtBQUssQ0FBQ0QsYUFBYSxDQUFDLElBQUksSUFBSTtBQUM3Qzs7Ozs7Ozs7Ozs7QUNyREE7Ozs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7O0FDQUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9tYXJ0aW5kZW5pc192My8uL3N0YXRpYy9zcmMvanMvYW5pbWF0ZS5qcyIsIndlYnBhY2s6Ly9tYXJ0aW5kZW5pc192My8uL3N0YXRpYy9zcmMvanMvcGFnZXMvY29udGFjdC5qcyIsIndlYnBhY2s6Ly9tYXJ0aW5kZW5pc192My8uL3N0YXRpYy9zcmMvanMvcGFnZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vbWFydGluZGVuaXNfdjMvLi9zdGF0aWMvc3JjL2pzL3BhZ2VzL3Byb2plY3RzLmpzIiwid2VicGFjazovL21hcnRpbmRlbmlzX3YzLy4vc3RhdGljL3NyYy9qcy90b29scy5qcyIsIndlYnBhY2s6Ly9tYXJ0aW5kZW5pc192My8uL3N0YXRpYy9zcmMvc2Nzcy9wYWdlcy80MDQuc2Nzcz8wYzE0Iiwid2VicGFjazovL21hcnRpbmRlbmlzX3YzLy4vc3RhdGljL3NyYy9zY3NzL3BhZ2VzL2NvbnRhY3Quc2Nzcz80OTlmIiwid2VicGFjazovL21hcnRpbmRlbmlzX3YzLy4vc3RhdGljL3NyYy9zY3NzL3BhZ2VzL2luZGV4LnNjc3M/YmY1NCIsIndlYnBhY2s6Ly9tYXJ0aW5kZW5pc192My8uL3N0YXRpYy9zcmMvc2Nzcy9wYWdlcy9wcm9qZWN0cy5zY3NzPzUwMmIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ3NhcCB9IGZyb20gXCJnc2FwXCI7XG5pbXBvcnQgeyBTY3JvbGxUcmlnZ2VyIH0gZnJvbSBcImdzYXAvU2Nyb2xsVHJpZ2dlclwiO1xuXG5nc2FwLnJlZ2lzdGVyUGx1Z2luKFNjcm9sbFRyaWdnZXIpO1xuXG5jb25zdCBmYWRlSW4gPSAobGluZSwgZGVsYXkpID0+IHtcbiAgICBnc2FwLmZyb21UbyhcbiAgICAgICAgbGluZSxcbiAgICAgICAge1xuICAgICAgICAgICAgeVBlcmNlbnQ6IDEwLFxuICAgICAgICAgICAgb3BhY2l0eTogMCxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgeVBlcmNlbnQ6IDAsXG4gICAgICAgICAgICBvcGFjaXR5OiAxLFxuICAgICAgICAgICAgZGVsYXk6IGRlbGF5LFxuICAgICAgICAgICAgZHVyYXRpb246IDEuNSxcbiAgICAgICAgICAgIHNjcm9sbFRyaWdnZXI6IHtcbiAgICAgICAgICAgICAgICB0cmlnZ2VyOiBsaW5lLFxuICAgICAgICAgICAgICAgIG9uY2U6IHRydWUsXG4gICAgICAgICAgICAgICAgc3RhcnQ6IFwidG9wIDgwJVwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfVxuICAgICk7XG59O1xuXG5jb25zdCB3cmFwTGV0dGVycyA9IChzdHJpbmcpID0+IHtcbiAgICByZXR1cm4gc3RyaW5nLnJlcGxhY2UoL1xcUy9nLCBcIjxzcGFuIGNsYXNzPSdmeC1sZXR0ZXInPiQmPC9zcGFuPlwiKTtcbn07XG5cbmNvbnN0IHdyYXBXb3JkcyA9ICh3b3JkcykgPT4ge1xuICAgIHJldHVybiBcIjxzcGFuIGNsYXNzPSdmeC13b3JkJz5cIiArIHdvcmRzLmpvaW4oXCI8L3NwYW4+IDxzcGFuIGNsYXNzPSdmeC13b3JkJz5cIikgKyBcIjwvc3Bhbj5cIlxufVxuXG5jb25zdCB3cmFwTGluZXMgPSAoZWwpID0+IHtcbiAgICBjb25zdCB3b3Jkc0xpc3QgPSBlbC5pbm5lclRleHQuc3BsaXQoL1sgXSsvaSk7XG4gICAgY29uc3Qgd3JhcHBlZFdvcmRzID0gd3JhcFdvcmRzKHdvcmRzTGlzdCk7XG5cbiAgICBlbC5pbm5lckhUTUwgPSB3cmFwcGVkV29yZHM7XG5cbiAgICBjb25zdCB3b3JkcyA9IGVsLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZngtd29yZFwiKTtcbiAgICBsZXQgbGFzdE9mZnNldFRvcCA9IG51bGw7XG4gICAgbGV0IGh0bWwgPSBcIjxzcGFuIGNsYXNzPSdmeC1saW5lJz48c3BhbiBjbGFzcz0nZngtbGluZS1pbm5lcic+XCI7XG5cbiAgICBmb3IgKGNvbnN0IHdvcmQgb2Ygd29yZHMpIHtcbiAgICAgICAgY29uc3QgY3VycmVudFdvcmRPZmZzZXRUb3AgPSB3b3JkLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcDtcblxuICAgICAgICBpZiAobGFzdE9mZnNldFRvcCAhPSBudWxsICYmIGxhc3RPZmZzZXRUb3AgPCBjdXJyZW50V29yZE9mZnNldFRvcCkge1xuICAgICAgICAgICAgaHRtbCArPSBcIjwvc3Bhbj48L3NwYW4+PHNwYW4gY2xhc3M9J2Z4LWxpbmUnPjxzcGFuIGNsYXNzPSdmeC1saW5lLWlubmVyJz5cIjtcbiAgICAgICAgfVxuXG4gICAgICAgIGh0bWwgKz0gXCIgXCIgKyB3b3JkLmlubmVyVGV4dDtcblxuICAgICAgICBsYXN0T2Zmc2V0VG9wID0gY3VycmVudFdvcmRPZmZzZXRUb3A7XG4gICAgfVxuXG4gICAgaHRtbCArPSBcIjwvc3Bhbj48L3NwYW4+XCI7XG4gICAgcmV0dXJuIGh0bWw7XG59XG5cbmNvbnN0IGFuaW1hdGVMaW5lcyA9IChlbCwgZGVsYXkpID0+IHtcbiAgICBjb25zdCBsaW5lcyA9IHdyYXBMaW5lcyhlbCk7XG5cbiAgICBlbC5pbm5lckhUTUwgPSBsaW5lcztcblxuICAgIGdzYXAuZnJvbVRvKFxuICAgICAgICBlbC5xdWVyeVNlbGVjdG9yQWxsKCcuZngtbGluZS1pbm5lcicpLFxuICAgICAgICB7XG4gICAgICAgICAgICB5UGVyY2VudDogMTAwLFxuICAgICAgICAgICAgb3BhY2l0eTogMFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICB5UGVyY2VudDogMCxcbiAgICAgICAgICAgIG9wYWNpdHk6IDEsXG4gICAgICAgICAgICBkZWxheTogZGVsYXksXG4gICAgICAgICAgICBkdXJhdGlvbjogMSxcbiAgICAgICAgICAgIHN0YWdnZXI6IDAuMSxcbiAgICAgICAgICAgIHNjcm9sbFRyaWdnZXI6IHtcbiAgICAgICAgICAgICAgICB0cmlnZ2VyOiBlbCxcbiAgICAgICAgICAgICAgICBzY3J1YjogdHJ1ZSxcbiAgICAgICAgICAgICAgICBzdGFydDogXCJ0b3AgNjUlXCIsXG4gICAgICAgICAgICAgICAgZW5kOiBcIis9MzAlXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgKTtcbn07XG5cbmNvbnN0IGFuaW1hdGVMZXR0ZXJzID0gKGVsLCBkZWxheSkgPT4ge1xuICAgIGNvbnN0IHdvcmRzTGlzdCA9IGVsLnRleHRDb250ZW50LnNwbGl0KC9bIF0rL2kpO1xuICAgIGNvbnN0IHdvcmRzV2l0aExldHRlcnNIVE1MID0gd29yZHNMaXN0Lm1hcCgod29yZCkgPT4gd3JhcExldHRlcnMod29yZCkpO1xuXG4gICAgZWwuaW5uZXJIVE1MID0gd3JhcFdvcmRzKHdvcmRzV2l0aExldHRlcnNIVE1MKTtcbiAgICBlbC5zdHlsZS5vcGFjaXR5ID0gMTtcblxuICAgIGdzYXAuZnJvbVRvKFxuICAgICAgICBlbC5xdWVyeVNlbGVjdG9yQWxsKFwiLmZ4LWxldHRlclwiKSxcbiAgICAgICAge1xuICAgICAgICAgICAgcm90YXRlWjogNCxcbiAgICAgICAgICAgIHhQZXJjZW50OiAyLFxuICAgICAgICAgICAgeVBlcmNlbnQ6IDE1LFxuICAgICAgICAgICAgb3BhY2l0eTogMCxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgcm90YXRlWjogMCxcbiAgICAgICAgICAgIHhQZXJjZW50OiAwLFxuICAgICAgICAgICAgeVBlcmNlbnQ6IDAsXG4gICAgICAgICAgICBvcGFjaXR5OiAxLFxuICAgICAgICAgICAgZGVsYXk6IGRlbGF5LFxuICAgICAgICAgICAgZHVyYXRpb246IDEuNCxcbiAgICAgICAgICAgIHN0YWdnZXI6IDAuMDUsXG4gICAgICAgICAgICBzY3JvbGxUcmlnZ2VyOiB7XG4gICAgICAgICAgICAgICAgdHJpZ2dlcjogZWwsXG4gICAgICAgICAgICAgICAgb25jZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBzdGFydDogXCJ0b3AgODUlXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9XG4gICAgKTtcbn07XG5cbmV4cG9ydCBjb25zdCBpbml0VGV4dEFuaW1hdGlvbnMgPSAoKSA9PiB7XG4gICAgY29uc3QgZWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmFuaW1hdGVcIik7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGVsID0gZWxlbWVudHNbaV07XG4gICAgICAgIGNvbnN0IGRlbGF5ID0gcGFyc2VGbG9hdChlbC5kYXRhc2V0LmRlbGF5KSB8fCAwO1xuICAgICAgICBjb25zdCBhbmltYXRpb25UeXBlID0gZWwuZGF0YXNldC5hbmltVHlwZSB8fCBcImZhZGVcIjtcblxuICAgICAgICBzd2l0Y2ggKGFuaW1hdGlvblR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgXCJsZXR0ZXJzXCI6XG4gICAgICAgICAgICAgICAgYW5pbWF0ZUxldHRlcnMoZWwsIGRlbGF5KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJsaW5lc1wiOlxuICAgICAgICAgICAgICAgIGFuaW1hdGVMaW5lcyhlbCwgZGVsYXkpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBmYWRlSW4oZWwsIGRlbGF5KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbn07XG4iLCJpbXBvcnQgeyB2YWxpZGF0ZUVtYWlsQWRkcmVzcyB9IGZyb20gJy4uL3Rvb2xzLmpzJ1xuaW1wb3J0IFwiQHNjc3MvcGFnZXMvY29udGFjdC5zY3NzXCI7XG5cblxuY29uc3QgdmFsaWRhdGVDb250YWN0Rm9ybSA9ICgpID0+IHtcbiAgICBjb25zdCBmb3JtRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250YWN0X19mb3JtJyk7XG4gICAgZm9ybUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICB2YXIgZmllbGQsIHZhbHVlID0gbnVsbDtcbiAgICAgICAgdmFyIHZhbGlkID0gdHJ1ZTtcblxuICAgICAgICAvLyBUZXN0IG5hbWUuXG4gICAgICAgIGZpZWxkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25hbWUnKTtcbiAgICAgICAgdmFsdWUgPSBmaWVsZC52YWx1ZTtcbiAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICBmaWVsZC5wYXJlbnROb2RlLmNsYXNzTGlzdC5yZW1vdmUoXCJlcnJvclwiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZpZWxkLnBhcmVudE5vZGUuY2xhc3NMaXN0LmFkZChcImVycm9yXCIpO1xuICAgICAgICAgICAgdmFsaWQgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFRlc3QgZW1haWwuXG4gICAgICAgIGZpZWxkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2VtYWlsJyk7XG4gICAgICAgIHZhbHVlID0gZmllbGQudmFsdWU7XG4gICAgICAgIGlmICh2YWxpZGF0ZUVtYWlsQWRkcmVzcyh2YWx1ZSkpIHtcbiAgICAgICAgICAgIGZpZWxkLnBhcmVudE5vZGUuY2xhc3NMaXN0LnJlbW92ZShcImVycm9yXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZmllbGQucGFyZW50Tm9kZS5jbGFzc0xpc3QuYWRkKFwiZXJyb3JcIik7XG4gICAgICAgICAgICB2YWxpZCA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gVGVzdCBtZXNzYWdlLlxuICAgICAgICBmaWVsZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtZXNzYWdlJyk7XG4gICAgICAgIHZhbHVlID0gZmllbGQudmFsdWU7XG4gICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgZmllbGQucGFyZW50Tm9kZS5jbGFzc0xpc3QucmVtb3ZlKFwiZXJyb3JcIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmaWVsZC5wYXJlbnROb2RlLmNsYXNzTGlzdC5hZGQoXCJlcnJvclwiKTtcbiAgICAgICAgICAgIHZhbGlkID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBTdWJtaXQgZm9ybSBpZiB2YWxpZC5cbiAgICAgICAgaWYgKCF2YWxpZCkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5cbndpbmRvdy5vbignbG9hZCcsIGZ1bmN0aW9uKCkge1xuICAgIHZhbGlkYXRlQ29udGFjdEZvcm0oKTtcbn0pXG4iLCJpbXBvcnQgeyBnc2FwIH0gZnJvbSBcImdzYXBcIjtcbmltcG9ydCB7IFNjcm9sbFRyaWdnZXIgfSBmcm9tIFwiZ3NhcC9TY3JvbGxUcmlnZ2VyXCI7XG5pbXBvcnQgeyBpbml0VGV4dEFuaW1hdGlvbnMgfSBmcm9tIFwiLi4vYW5pbWF0ZS5qc1wiO1xuaW1wb3J0IHsgdGhyb3R0bGUsIGRwaSwgcmFuZG9tSW50RnJvbVJhbmdlLCByYW5kb21WYWx1ZUZyb21BcnJheSB9IGZyb20gJy4uL3Rvb2xzLmpzJ1xuaW1wb3J0IFwiQHNjc3MvcGFnZXMvaW5kZXguc2Nzc1wiO1xuXG4vKipcbiAqIEluaXRpYWxpemUgU2Nyb2xsVHJpZ2dlciB3aXRoIGdzYXBcbiAqL1xuZ3NhcC5yZWdpc3RlclBsdWdpbihTY3JvbGxUcmlnZ2VyKTtcblxuLyoqXG4gKiBJbml0aWFsaXplIHRleHQgYXBwZWFyIGFuaW1hdGlvbnNcbiAqL1xud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIGZ1bmN0aW9uICgpIHtcbiAgICBpbml0VGV4dEFuaW1hdGlvbnMoKTtcbn0pO1xuXG5jbGFzcyBQcm9qZWN0IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5jYW52YXNJZCA9ICcnO1xuICAgICAgICB0aGlzLnByb2dyZXNzID0gMDtcbiAgICAgICAgdGhpcy5jYW52YXNXaWR0aCA9IDA7XG4gICAgICAgIHRoaXMuY2FudmFzSGVpZ2h0ID0gMDtcbiAgICB9XG5cbiAgICBpbml0KCkge1xuICAgICAgICBpZiAoIXRoaXMuY2FudmFzSWQpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgdGhpcy5jYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLmNhbnZhc0lkKTtcbiAgICAgICAgdGhpcy5jdHggPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuXG4gICAgICAgIHRoaXMuYmluZEV2ZW50cygpO1xuICAgICAgICB0aGlzLnJlZnJlc2goKTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBiaW5kRXZlbnRzKCkge1xuICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRocm90dGxlKCgpID0+IHNlbGYucmVmcmVzaChzZWxmKSwgMjAwKSk7XG4gICAgfVxuXG4gICAgcmVmcmVzaCgpIHtcbiAgICAgICAgdGhpcy5jYW52YXNXaWR0aCA9IGRwaSh0aGlzLmNhbnZhcy5vZmZzZXRXaWR0aCk7XG4gICAgICAgIHRoaXMuY2FudmFzSGVpZ2h0ID0gZHBpKHRoaXMuY2FudmFzLm9mZnNldEhlaWdodCk7XG5cbiAgICAgICAgdGhpcy5jYW52YXMuc2V0QXR0cmlidXRlKCd3aWR0aCcsIHRoaXMuY2FudmFzV2lkdGgpO1xuICAgICAgICB0aGlzLmNhbnZhcy5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsIHRoaXMuY2FudmFzSGVpZ2h0KTtcbiAgICB9XG59XG5cbmNsYXNzIFNhbmRib3ggZXh0ZW5kcyBQcm9qZWN0IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICB0aGlzLmNhbnZhc0lkID0gJ3Byb2plY3RfX3NhbmRib3hfX2NhbnZhcyc7XG4gICAgICAgIHRoaXMuZ3Jhdml0eSA9IDAuOTgyIC8gNjtcbiAgICAgICAgdGhpcy5iYWxscyA9IFtdO1xuXG4gICAgICAgIHRoaXMuZGlyZWN0aW9uID0gLTE7XG4gICAgICAgIHRoaXMuY29sb3JzID0gW1xuICAgICAgICAgICAgJyMyYTlkOGYnLFxuICAgICAgICAgICAgJyNmM2Q3OTUnLFxuICAgICAgICAgICAgJyNmNGEyNjEnLFxuICAgICAgICAgICAgJyMyNjQ2NTMnLFxuICAgICAgICAgICAgJyNlNzZmNTEnLFxuICAgICAgICBdXG4gICAgfVxuXG4gICAgcmVmcmVzaCgpIHtcbiAgICAgICAgc3VwZXIucmVmcmVzaCgpO1xuXG4gICAgICAgIHRoaXMucG9wdWxhdGUoKTtcbiAgICAgICAgdGhpcy5kcmF3Q2FudmFzKCk7XG4gICAgfVxuXG4gICAgcG9wdWxhdGUoKSB7XG4gICAgICAgIGNvbnN0IGJhbGxBbW91bnQgPSBNYXRoLm1pbihNYXRoLnJvdW5kKG91dGVyV2lkdGggLyA2MCksIDI1KTtcbiAgICAgICAgLy8gY29uc3QgYmFsbEFtb3VudCA9IDE7XG4gICAgICAgIHRoaXMuYmFsbHMgPSBbXTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJhbGxBbW91bnQ7IGkrKykge1xuICAgICAgICAgICAgbGV0IHJhZGl1cyA9IE1hdGguZmxvb3IocmFuZG9tSW50RnJvbVJhbmdlKDE1LCBNYXRoLm1pbig3NSwgb3V0ZXJXaWR0aCAvIDgpLCBmYWxzZSkpO1xuICAgICAgICAgICAgY29uc3QgbWFzcyA9IE1hdGgucm91bmQoMjAgKyByYWRpdXMgLyAzKTtcbiAgICAgICAgICAgIGNvbnN0IHggPSByYW5kb21JbnRGcm9tUmFuZ2UocmFkaXVzLCBvdXRlcldpZHRoIC0gcmFkaXVzKTtcbiAgICAgICAgICAgIGNvbnN0IHkgPSByYW5kb21JbnRGcm9tUmFuZ2UocmFkaXVzLCBvdXRlckhlaWdodCAtIHJhZGl1cyk7XG4gICAgICAgICAgICBjb25zdCBjb2xvciA9IHJhbmRvbVZhbHVlRnJvbUFycmF5KHRoaXMuY29sb3JzKTtcbiAgICAgICAgICAgIGNvbnN0IGZvcmNlID0gMztcbiAgICAgICAgICAgIGNvbnN0IGhGb3JjZSA9IHJhbmRvbUludEZyb21SYW5nZSgtZm9yY2UsIGZvcmNlKSAqIDUwO1xuICAgICAgICAgICAgY29uc3QgdkZvcmNlID0gcmFuZG9tSW50RnJvbVJhbmdlKC1mb3JjZSAqIDIwLCBmb3JjZSAqIDEwKTtcbiAgICAgICAgICAgIGNvbnN0IGR4ID0gaEZvcmNlIC8gbWFzcztcbiAgICAgICAgICAgIGNvbnN0IGR5ID0gdkZvcmNlIC8gbWFzcztcblxuICAgICAgICAgICAgdGhpcy5iYWxscy5wdXNoKG5ldyBCYWxsKHgsIHksIHJhZGl1cywgbWFzcywgY29sb3IsIGR4LCBkeSwgdGhpcy5jdHgpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRyYXdDYW52YXMocHJvZ3Jlc3MpIHtcbiAgICAgICAgcHJvZ3Jlc3MgPz89IDA7XG4gICAgICAgIGNvbnN0IGRlbHRhUHJvZ3Jlc3MgPSB0aGlzLnByb2dyZXNzIC0gcHJvZ3Jlc3M7XG4gICAgICAgIGNvbnN0IGRpcmVjdGlvbiA9IGRlbHRhUHJvZ3Jlc3MgPj0gMCA/IC0xIDogMTtcblxuICAgICAgICB0aGlzLnByb2dyZXNzID0gcHJvZ3Jlc3M7XG4gICAgICAgIHRoaXMuZGVsdGFQcm9ncmVzcyA9IE1hdGguYWJzKGRlbHRhUHJvZ3Jlc3MgKiAxMDApO1xuICAgICAgICBpZiAoZGlyZWN0aW9uICE9IHRoaXMuZGlyZWN0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLmRpcmVjdGlvbiA9IGRpcmVjdGlvbjtcblxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmJhbGxzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgYmFsbCA9IHRoaXMuYmFsbHNbaV07XG4gICAgICAgICAgICAgICAgYmFsbC5pbnZlcnRUaW1lKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmN0eC5jbGVhclJlY3QoMCwgMCwgdGhpcy5jYW52YXNXaWR0aCwgdGhpcy5jYW52YXNIZWlnaHQpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuYmFsbHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGJhbGwgPSB0aGlzLmJhbGxzW2ldO1xuICAgICAgICAgICAgYmFsbC51cGRhdGUodGhpcy5ncmF2aXR5LCB0aGlzLmRlbHRhUHJvZ3Jlc3MpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5jbGFzcyBCYWxsIHtcbiAgICBjb25zdHJ1Y3Rvcih4LCB5LCByYWRpdXMsIG1hc3MsIGNvbG9yLCBkeCwgZHksIGN0eCkge1xuICAgICAgICB0aGlzLmN0eCA9IGN0eDtcbiAgICAgICAgdGhpcy54ID0geDtcbiAgICAgICAgdGhpcy55ID0geTtcbiAgICAgICAgdGhpcy5yYWRpdXMgPSByYWRpdXM7XG4gICAgICAgIHRoaXMubWFzcyA9IG1hc3M7XG4gICAgICAgIHRoaXMuY29sb3IgPSBjb2xvcjtcbiAgICAgICAgdGhpcy5keCA9IGR4O1xuICAgICAgICB0aGlzLmR5ID0gZHk7XG4gICAgfVxuXG4gICAgZHJhdygpIHtcbiAgICAgICAgdGhpcy5jdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIHRoaXMuY3R4LmFyYyhkcGkodGhpcy54KSwgZHBpKHRoaXMueSksIGRwaSh0aGlzLnJhZGl1cyksIDAsIDIgKiBNYXRoLlBJKTtcbiAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gdGhpcy5jb2xvcjtcbiAgICAgICAgdGhpcy5jdHguZmlsbCgpO1xuICAgICAgICB0aGlzLmN0eC5jbG9zZVBhdGgoKTtcbiAgICB9XG5cbiAgICBpbnZlcnRUaW1lKCkge1xuICAgICAgICB0aGlzLmR4ID0gLXRoaXMuZHg7XG4gICAgICAgIHRoaXMuZHkgPSAtdGhpcy5keTtcbiAgICB9XG5cbiAgICB1cGRhdGUoZ3Jhdml0eSwgZGVsdGFQcm9ncmVzcykge1xuICAgICAgICBpZiAodGhpcy55ICsgdGhpcy5yYWRpdXMgKyBkZWx0YVByb2dyZXNzICogdGhpcy5keSA+IG91dGVySGVpZ2h0KSB7XG4gICAgICAgICAgICB0aGlzLmR5ID0gLXRoaXMuZHk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmR5ICs9IGdyYXZpdHk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy54ICsgdGhpcy5yYWRpdXMgKyBkZWx0YVByb2dyZXNzICogdGhpcy5keCA+PSBvdXRlcldpZHRoIHx8XG4gICAgICAgICAgICB0aGlzLnggLSB0aGlzLnJhZGl1cyArIGRlbHRhUHJvZ3Jlc3MgKiB0aGlzLmR4IDw9IDApIHtcbiAgICAgICAgICAgIHRoaXMuZHggPSAtdGhpcy5keDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZHggPSB0aGlzLmR4O1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy54ICs9IGRlbHRhUHJvZ3Jlc3MgKiB0aGlzLmR4O1xuICAgICAgICB0aGlzLnkgKz0gZGVsdGFQcm9ncmVzcyAqIHRoaXMuZHk7XG5cbiAgICAgICAgdGhpcy5kcmF3KCk7XG4gICAgfVxufVxuXG5jbGFzcyBBcnRpbm1vdiBleHRlbmRzIFByb2plY3Qge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMuY2FudmFzSWQgPSAncHJvamVjdF9fYXJ0aW5tb3ZfX2NhbnZhcyc7XG4gICAgICAgIHRoaXMuYW5nbGUgPSAxMCAqIE1hdGguUEkgLyAxODA7XG4gICAgICAgIHRoaXMuZnJhbWVXaWR0aCA9IDE4MDtcbiAgICAgICAgdGhpcy5mcmFtZU1pbkhlaWdodCA9IDEwMDtcbiAgICAgICAgdGhpcy5mcmFtZU1heEhlaWdodCA9IDMwMDtcbiAgICAgICAgdGhpcy5mcmFtZU1hcmdpbiA9IDE1O1xuICAgICAgICB0aGlzLmZyYW1lU3Ryb2tlV2lkdGggPSA2O1xuICAgIH1cblxuICAgIHJlZnJlc2goKSB7XG4gICAgICAgIHN1cGVyLnJlZnJlc2goKTtcblxuICAgICAgICB0aGlzLmdlbmVyYXRlQ29sdW1ucygpO1xuICAgICAgICB0aGlzLmRyYXdDYW52YXMoKTtcbiAgICB9XG5cbiAgICBnZW5lcmF0ZUNvbHVtbnMoKSB7XG4gICAgICAgIC8vICsxIHRvIGNvbXBlbnNhdGUgZm9yIHRoZSBhbmdsZSB0aWx0XG4gICAgICAgIGNvbnN0IGNvbHVtbnNDb3VudCA9IDEgKyBNYXRoLnJvdW5kKGlubmVyV2lkdGggLyB0aGlzLmZyYW1lV2lkdGgpO1xuICAgICAgICBjb25zdCByb3dzQ291bnQgPSAyICogTWF0aC5yb3VuZChpbm5lcldpZHRoIC8gdGhpcy5mcmFtZU1pbkhlaWdodCk7XG5cbiAgICAgICAgdGhpcy5jb2x1bW5zID0gW107XG4gICAgICAgIGZvciAobGV0IGMgPSAwOyBjIDwgY29sdW1uc0NvdW50OyBjKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGNvbHVtbiA9IHt9O1xuICAgICAgICAgICAgY29sdW1uLnNwZWVkID0gLU1hdGgucm91bmQoMTAwICsgKE1hdGgucmFuZG9tKCkgKiA0MDApKTtcbiAgICAgICAgICAgIGNvbHVtbi5mcmFtZXMgPSBbXTtcblxuICAgICAgICAgICAgZm9yIChsZXQgciA9IDA7IHIgPCByb3dzQ291bnQ7IHIrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGZyYW1lSGVpZ2h0ID0gTWF0aC5yb3VuZCh0aGlzLmZyYW1lTWluSGVpZ2h0ICsgTWF0aC5yYW5kb20oKSAqICh0aGlzLmZyYW1lTWF4SGVpZ2h0IC0gdGhpcy5mcmFtZU1pbkhlaWdodCkpO1xuICAgICAgICAgICAgICAgIGNvbHVtbi5mcmFtZXMucHVzaChmcmFtZUhlaWdodCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuY29sdW1ucy5wdXNoKGNvbHVtbik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkcmF3Q2FudmFzKHByb2dyZXNzKSB7XG4gICAgICAgIHRoaXMuY3R4Lmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9ICdzb3VyY2Utb3Zlcic7XG4gICAgICAgIHRoaXMuY3R4LmxpbmVXaWR0aCA9IGRwaSh0aGlzLmZyYW1lU3Ryb2tlV2lkdGgpO1xuICAgICAgICB0aGlzLmN0eC5zdHJva2VTdHlsZSA9ICcjRTUxRTM1JztcbiAgICAgICAgdGhpcy5jdHguY2xlYXJSZWN0KDAsIDAsIHRoaXMuY2FudmFzV2lkdGgsIHRoaXMuY2FudmFzSGVpZ2h0KTtcblxuICAgICAgICBmb3IgKGxldCBjID0gMDsgYyA8IHRoaXMuY29sdW1ucy5sZW5ndGg7IGMrKykge1xuICAgICAgICAgICAgY29uc3QgY29sdW1uID0gdGhpcy5jb2x1bW5zW2NdO1xuICAgICAgICAgICAgY29uc3QgeCA9IGMgKiB0aGlzLmZyYW1lV2lkdGggKiBNYXRoLnNpbih0aGlzLmFuZ2xlKTtcbiAgICAgICAgICAgIGxldCB5ID0gLSBNYXRoLnJvdW5kKHRoaXMuZnJhbWVXaWR0aCAqIE1hdGguc2luKHRoaXMuYW5nbGUpKTtcblxuICAgICAgICAgICAgdGhpcy5jdHgucm90YXRlKHRoaXMuYW5nbGUpO1xuICAgICAgICAgICAgdGhpcy5jdHgudHJhbnNsYXRlKDAsIC14KTtcblxuICAgICAgICAgICAgZm9yIChsZXQgciA9IDA7IHIgPCBjb2x1bW4uZnJhbWVzLmxlbmd0aDsgcisrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZnJhbWVIZWlnaHQgPSBjb2x1bW4uZnJhbWVzW3JdO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5jdHguYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5jdHguc3Ryb2tlUmVjdChkcGkoYyAqIHRoaXMuZnJhbWVXaWR0aCArIHRoaXMuZnJhbWVNYXJnaW4pLCBkcGkoeSArIHRoaXMuZnJhbWVNYXJnaW4gKyBwcm9ncmVzcyAqIGNvbHVtbi5zcGVlZCksIGRwaSh0aGlzLmZyYW1lV2lkdGggLSB0aGlzLmZyYW1lTWFyZ2luICogMiksIGRwaShmcmFtZUhlaWdodCAtIHRoaXMuZnJhbWVNYXJnaW4gKiAyKSk7XG4gICAgICAgICAgICAgICAgdGhpcy5jdHguY2xvc2VQYXRoKCk7XG5cbiAgICAgICAgICAgICAgICB5ICs9IGZyYW1lSGVpZ2h0O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmN0eC50cmFuc2xhdGUoMCwgeCk7XG4gICAgICAgICAgICB0aGlzLmN0eC5yb3RhdGUoLXRoaXMuYW5nbGUpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5jbGFzcyBFYXN5QWxhcm0gZXh0ZW5kcyBQcm9qZWN0IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICB0aGlzLmNhbnZhc0lkID0gJ3Byb2plY3RfX2Vhc3ktYWxhcm1fX2NhbnZhcyc7XG4gICAgICAgIHRoaXMuc3BvdGxpZ2h0cyA9IFtdO1xuICAgIH1cblxuICAgIGluaXQoKSB7XG4gICAgICAgIGlmICghc3VwZXIuaW5pdCgpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNwb3RsaWdodHMgPSBbXTtcbiAgICAgICAgdGhpcy5zcG90bGlnaHRzLnB1c2gobmV3IFNwb3RsaWdodCgwLjcsIDAuNCwgMC4yLCAxLjIsIHRoaXMuY3R4KSk7XG4gICAgICAgIHRoaXMuc3BvdGxpZ2h0cy5wdXNoKG5ldyBTcG90bGlnaHQoMC4xNSwgMC4xNSwgLjgsIDAuNywgdGhpcy5jdHgpKTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBkcmF3Q2FudmFzKHByb2dyZXNzKSB7XG4gICAgICAgIHByb2dyZXNzID8/PSAwO1xuICAgICAgICB0aGlzLnByb2dyZXNzID0gcHJvZ3Jlc3M7XG5cbiAgICAgICAgdGhpcy5jdHguY2xlYXJSZWN0KDAsIDAsIHRoaXMuY2FudmFzV2lkdGgsIHRoaXMuY2FudmFzSGVpZ2h0KTtcbiAgICAgICAgZm9yIChsZXQgcyA9IDA7IHMgPCB0aGlzLnNwb3RsaWdodHMubGVuZ3RoOyBzKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHNwb3RsaWdodCA9IHRoaXMuc3BvdGxpZ2h0c1tzXTtcbiAgICAgICAgICAgIHNwb3RsaWdodC51cGRhdGUodGhpcy5wcm9ncmVzcyk7XG4gICAgICAgICAgICBzcG90bGlnaHQuZHJhdygpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5jbGFzcyBTcG90bGlnaHQge1xuICAgIGNvbnN0cnVjdG9yKHgsIHksIGZ4LCBmeSwgY3R4KSB7XG4gICAgICAgIGNvbnN0IG1pbkRpbWVuc2lvbiA9IE1hdGgubWluKGlubmVyV2lkdGgsIGlubmVySGVpZ2h0KVxuXG4gICAgICAgIHRoaXMuY3R4ID0gY3R4O1xuICAgICAgICB0aGlzLnJhZGl1cyA9IHJhbmRvbUludEZyb21SYW5nZShtaW5EaW1lbnNpb24gKiAwLjIsIG1pbkRpbWVuc2lvbiAqIDAuMzUpO1xuICAgICAgICB0aGlzLnggPSB4ICogaW5uZXJXaWR0aDtcbiAgICAgICAgdGhpcy55ID0geSAqIGlubmVySGVpZ2h0O1xuICAgICAgICB0aGlzLmluaXRpYWxYID0geCAqIGlubmVyV2lkdGg7XG4gICAgICAgIHRoaXMuaW5pdGlhbFkgPSB5ICogaW5uZXJIZWlnaHQ7XG4gICAgICAgIHRoaXMuZmluYWxYID0gZnggKiBpbm5lcldpZHRoO1xuICAgICAgICB0aGlzLmZpbmFsWSA9IGZ5ICogaW5uZXJIZWlnaHQ7XG4gICAgfVxuXG4gICAgdXBkYXRlKHByb2dyZXNzKSB7XG4gICAgICAgIHRoaXMueCA9IHRoaXMuaW5pdGlhbFggLSAodGhpcy5pbml0aWFsWCAtIHRoaXMuZmluYWxYKSAqIHByb2dyZXNzO1xuICAgICAgICB0aGlzLnkgPSB0aGlzLmluaXRpYWxZIC0gKHRoaXMuaW5pdGlhbFkgLSB0aGlzLmZpbmFsWSkgKiBwcm9ncmVzcztcbiAgICB9XG5cbiAgICBkcmF3KCkge1xuICAgICAgICB0aGlzLmN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgdGhpcy5jdHguYXJjKGRwaSh0aGlzLngpLCBkcGkodGhpcy55KSwgZHBpKHRoaXMucmFkaXVzKSwgMCwgMiAqIE1hdGguUEkpO1xuICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSAnI2ZmZmZmZic7XG4gICAgICAgIHRoaXMuY3R4LmZpbGwoKTtcbiAgICAgICAgdGhpcy5jdHguY2xvc2VQYXRoKCk7XG4gICAgfVxufVxuXG4vKipcbiAqIFBST0pFQ1RTXG4gKi9cbmdzYXAudG8oXCIjcHJvamVjdHNfX2ludHJvXCIsIHtcbiAgICBzY3JvbGxUcmlnZ2VyOiB7XG4gICAgICAgIHRyaWdnZXI6IFwiI3Byb2plY3RzX19pbnRyb1wiLFxuICAgICAgICBwaW46IHRydWUsXG4gICAgICAgIHN0YXJ0OiBcInRvcCB0b3BcIixcbiAgICAgICAgZW5kOiBcImJvdHRvbSB0b3BcIixcbiAgICB9LFxufSk7XG5cbmdzYXAudG8oXCIjcHJvamVjdHNfX2ludHJvX190aXRsZVwiLCB7XG4gICAgdGV4dEluZGVudDogXCItMWVtXCIsXG4gICAgZWFzZTogXCJub25lXCIsXG4gICAgc2Nyb2xsVHJpZ2dlcjoge1xuICAgICAgICB0cmlnZ2VyOiBcIiNwcm9qZWN0c19faW50cm9fX3dyYXBwZXJcIixcbiAgICAgICAgc2NydWI6IHRydWUsXG4gICAgfSxcbn0pO1xuXG5cbi8qKlxuICogRmFkZSBpbiBwcm9qZWN0IGNvbnRlbnQgYW5kIGltYWdlIHdpdGggc2Nyb2xsXG4gKi9cbmNvbnN0IHByb2plY3RzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInByb2plY3RcIik7XG5mb3IgKGxldCBpID0gMDsgaSA8IHByb2plY3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgcHJvamVjdCA9IHByb2plY3RzW2ldO1xuICAgIGNvbnN0IGNvbnRlbnRUb0FuaW1hdGUgPSBwcm9qZWN0LnF1ZXJ5U2VsZWN0b3JBbGwoXCIjcHJvamVjdHMgLnNlY3Rpb25fX2ltYWdlLCAjcHJvamVjdHMgLnNlY3Rpb25fX2NvbnRlbnRcIik7XG4gICAgY29uc3QgcGluID0gcHJvamVjdC5xdWVyeVNlbGVjdG9yQWxsKCcucGluLXdyYXBwZXInKTtcblxuICAgIGdzYXAuZnJvbVRvKFxuICAgICAgICBjb250ZW50VG9BbmltYXRlLFxuICAgICAgICB7XG4gICAgICAgICAgICB5UGVyY2VudDogMzAsXG4gICAgICAgICAgICBvcGFjaXR5OiAwLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICB5UGVyY2VudDogMCxcbiAgICAgICAgICAgIG9wYWNpdHk6IDEsXG4gICAgICAgICAgICBkdXJhdGlvbjogMSxcbiAgICAgICAgICAgIHN0YWdnZXI6IDAuMyxcbiAgICAgICAgICAgIHNjcm9sbFRyaWdnZXI6IHtcbiAgICAgICAgICAgICAgICB0cmlnZ2VyOiBjb250ZW50VG9BbmltYXRlLFxuICAgICAgICAgICAgICAgIG9uY2U6IHRydWUsXG4gICAgICAgICAgICAgICAgc3RhcnQ6IFwidG9wIDgwJVwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfVxuICAgICk7XG5cbiAgICBnc2FwLnRvKHBpbiwge1xuICAgICAgICBzY3JvbGxUcmlnZ2VyOiB7XG4gICAgICAgICAgICB0cmlnZ2VyOiBwaW4sXG4gICAgICAgICAgICBwaW46IHRydWUsXG4gICAgICAgICAgICBzY3J1YjogdHJ1ZSxcbiAgICAgICAgfVxuICAgIH0pXG5cbiAgICBnc2FwLmZyb21Ubyhwcm9qZWN0LCB7XG4gICAgICAgIGNsaXBQYXRoOiBcImluc2V0KDgwcHgpXCIsXG4gICAgfSwge1xuICAgICAgICBjbGlwUGF0aDogXCJpbnNldCgwcHgpXCIsXG4gICAgICAgIGR1cmF0aW9uOiAxLFxuICAgICAgICBzY3JvbGxUcmlnZ2VyOiB7XG4gICAgICAgICAgICB0cmlnZ2VyOiBwcm9qZWN0LFxuICAgICAgICAgICAgc2NydWI6IHRydWUsXG4gICAgICAgICAgICBzdGFydDogXCI4MHB4IGJvdHRvbVwiLFxuICAgICAgICAgICAgZW5kOiBcIis9NDAlXCJcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG4vKipcbiAqIENvbXBsZXggYW5pbWF0aW9ucyB3aXRoIHNjcm9sbFxuICovXG5cbi8vIEJvdW5jaW5nIGJhbGxzIHdpdGggc2Nyb2xsXG5jb25zdCBzYW5kYm94ID0gbmV3IFNhbmRib3goKTtcbnNhbmRib3guaW5pdCgpLmdzYXAgPSBnc2FwLnRvKFwiI3Byb2plY3RfX3NhbmRib3hcIiwge1xuICAgIHNjcm9sbFRyaWdnZXI6IHtcbiAgICAgICAgdHJpZ2dlcjogXCIjcHJvamVjdF9fc2FuZGJveFwiLFxuICAgICAgICBzY3J1YjogdHJ1ZSxcbiAgICAgICAgb25VcGRhdGU6IChzZWxmKSA9PiBzYW5kYm94LmRyYXdDYW52YXMoc2VsZi5wcm9ncmVzcyksXG4gICAgfVxufSk7XG5cbi8vIEFuaW1hdGUgYmFja2dyb3VuZCBncmFkaWVudCBwb3NpdGlvbiArIHRoZSB0d28gc3BvdGxpZ2h0c1xuY29uc3QgZWFzeWFsYXJtID0gbmV3IEVhc3lBbGFybSgpO1xuZWFzeWFsYXJtLmluaXQoKS5nc2FwID0gZ3NhcC50byhcIiNwcm9qZWN0X19lYXN5LWFsYXJtXCIsIHtcbiAgICBiYWNrZ3JvdW5kUG9zaXRpb246IFwiNjYlIDYwJVwiLFxuICAgIHNjcm9sbFRyaWdnZXI6IHtcbiAgICAgICAgdHJpZ2dlcjogXCIjcHJvamVjdF9fZWFzeS1hbGFybVwiLFxuICAgICAgICBzY3J1YjogdHJ1ZSxcbiAgICAgICAgb25VcGRhdGU6IChzZWxmKSA9PiBlYXN5YWxhcm0uZHJhd0NhbnZhcyhzZWxmLnByb2dyZXNzKSxcbiAgICB9LFxufSk7XG5cbi8vIEFuaW1hdGUgdGhlIGZyYW1lcyBpbiB0aGUgYmFja2dyb3VuZFxuY29uc3QgYXJ0aW5tb3YgPSBuZXcgQXJ0aW5tb3YoKTtcbmFydGlubW92LmluaXQoKS5nc2FwID0gZ3NhcC50byhcIiNwcm9qZWN0X19hcnRpbm1vdlwiLCB7XG4gICAgc2Nyb2xsVHJpZ2dlcjoge1xuICAgICAgICB0cmlnZ2VyOiBcIiNwcm9qZWN0X19hcnRpbm1vdlwiLFxuICAgICAgICBzY3J1YjogdHJ1ZSxcbiAgICAgICAgb25VcGRhdGU6IChzZWxmKSA9PiBhcnRpbm1vdi5kcmF3Q2FudmFzKHNlbGYucHJvZ3Jlc3MpLFxuICAgIH0sXG59KTtcblxuLyoqXG4gKiBBbmltYXRlIHRpdGxlIGN1cnNpdmUgd29yZHMgd2l0aCBzY3JvbGxcbiAqL1xuY29uc3QgY3Vyc2l2ZUVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcImgyIC5jdXJzaXZlXCIpO1xuZm9yIChsZXQgaSA9IDA7IGkgPCBjdXJzaXZlRWxlbWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBlbGVtZW50ID0gY3Vyc2l2ZUVsZW1lbnRzW2ldO1xuICAgIGdzYXAudG8oZWxlbWVudCwge1xuICAgICAgICB4UGVyY2VudDogMTAsXG4gICAgICAgIHNjcm9sbFRyaWdnZXI6IHtcbiAgICAgICAgICAgIHRyaWdnZXI6IGVsZW1lbnQsXG4gICAgICAgICAgICBzY3J1YjogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICB9KTtcbn1cblxuIiwiLy8gaW1wb3J0IExlbmlzIGZyb20gJ0BzdHVkaW8tZnJlaWdodC9sZW5pcydcbmltcG9ydCB7IGluaXRUZXh0QW5pbWF0aW9ucyB9IGZyb20gJy4uL2FuaW1hdGUuanMnXG5pbXBvcnQgXCJAc2Nzcy9wYWdlcy9wcm9qZWN0cy5zY3NzXCJcblxuLyoqXG4gKiBJbml0aWFsaXplIHNtb290aCBzY3JvbGwgYmVoYXZpb3VyIHdpdGggTGVuaXMuXG4gKi9cbi8vIGNvbnN0IGxlbmlzID0gbmV3IExlbmlzKHtcbi8vICAgbGVycDogMC4wNSxcbi8vICAgZHVyYXRpb246IDEuNSxcbi8vICAgc21vb3RoVG91Y2g6IHRydWUsXG4vLyB9KVxuXG4vLyBmdW5jdGlvbiByYWYodGltZSkge1xuLy8gICBsZW5pcy5yYWYodGltZSlcbi8vICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHJhZilcbi8vIH1cblxuLy8gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHJhZilcblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBmdW5jdGlvbigpIHtcbiAgaW5pdFRleHRBbmltYXRpb25zKCk7XG59KTtcbiIsImV4cG9ydCBmdW5jdGlvbiBkcGkodmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUgKiB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJhbmRvbUludEZyb21SYW5nZShtaW4sIG1heCwgcm91bmQgPSB0cnVlKSB7XG4gICAgaWYgKHJvdW5kKSB7XG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKG1pbiArIE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluICsgMSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBtaW4gKyBNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbiArIDEpO1xuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJhbmRvbVZhbHVlRnJvbUFycmF5KGFycmF5KSB7XG4gICAgcmV0dXJuIGFycmF5W01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGFycmF5Lmxlbmd0aCldO1xufVxuXG4vLyBUaHJvdHRsZSBmdW5jdGlvbiBmcm9tIExvZGFzaFxuZXhwb3J0IGZ1bmN0aW9uIHRocm90dGxlKGZ1bmMsIHdhaXQsIG9wdGlvbnMpIHtcbiAgICB2YXIgY29udGV4dCwgYXJncywgcmVzdWx0O1xuICAgIHZhciB0aW1lb3V0ID0gbnVsbDtcbiAgICB2YXIgcHJldmlvdXMgPSAwO1xuICAgIGlmICghb3B0aW9ucykgb3B0aW9ucyA9IHt9O1xuICAgIHZhciBsYXRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcHJldmlvdXMgPSBvcHRpb25zLmxlYWRpbmcgPT09IGZhbHNlID8gMCA6IERhdGUubm93KCk7XG4gICAgICAgIHRpbWVvdXQgPSBudWxsO1xuICAgICAgICByZXN1bHQgPSBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuICAgICAgICBpZiAoIXRpbWVvdXQpIGNvbnRleHQgPSBhcmdzID0gbnVsbDtcbiAgICB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBub3cgPSBEYXRlLm5vdygpO1xuICAgICAgICBpZiAoIXByZXZpb3VzICYmIG9wdGlvbnMubGVhZGluZyA9PT0gZmFsc2UpIHByZXZpb3VzID0gbm93O1xuICAgICAgICB2YXIgcmVtYWluaW5nID0gd2FpdCAtIChub3cgLSBwcmV2aW91cyk7XG4gICAgICAgIGNvbnRleHQgPSB0aGlzO1xuICAgICAgICBhcmdzID0gYXJndW1lbnRzO1xuICAgICAgICBpZiAocmVtYWluaW5nIDw9IDAgfHwgcmVtYWluaW5nID4gd2FpdCkge1xuICAgICAgICAgICAgaWYgKHRpbWVvdXQpIHtcbiAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gICAgICAgICAgICAgICAgdGltZW91dCA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwcmV2aW91cyA9IG5vdztcbiAgICAgICAgICAgIHJlc3VsdCA9IGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XG4gICAgICAgICAgICBpZiAoIXRpbWVvdXQpIGNvbnRleHQgPSBhcmdzID0gbnVsbDtcbiAgICAgICAgfSBlbHNlIGlmICghdGltZW91dCAmJiBvcHRpb25zLnRyYWlsaW5nICE9PSBmYWxzZSkge1xuICAgICAgICAgICAgdGltZW91dCA9IHNldFRpbWVvdXQobGF0ZXIsIHJlbWFpbmluZyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdmFsaWRhdGVFbWFpbEFkZHJlc3MoZW1haWwpIHtcbiAgICAvL2NvbXBhcmUgbCdlbWFpbCBlbnRyw6kgw6AgbCdleHByZXNzaW9uIHLDqWd1bGnDqHJlLlxuICAgIHZhciByZWdFeHBQYXR0ZXJuID0gL15bMC05YS16QS1aXVstLl9hLXpBLVowLTldKkAoWzAtOWEtekEtWl1bLS5fMC05YS16QS1aXSpcXC4pK1thLXpBLVpdezIsNH0kLztcbiAgICByZXR1cm4gZW1haWwubWF0Y2gocmVnRXhwUGF0dGVybikgIT0gbnVsbDtcbn1cbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyJdLCJuYW1lcyI6WyJnc2FwIiwiU2Nyb2xsVHJpZ2dlciIsInJlZ2lzdGVyUGx1Z2luIiwiZmFkZUluIiwibGluZSIsImRlbGF5IiwiZnJvbVRvIiwieVBlcmNlbnQiLCJvcGFjaXR5IiwiZHVyYXRpb24iLCJzY3JvbGxUcmlnZ2VyIiwidHJpZ2dlciIsIm9uY2UiLCJzdGFydCIsIndyYXBMZXR0ZXJzIiwic3RyaW5nIiwicmVwbGFjZSIsIndyYXBXb3JkcyIsIndvcmRzIiwiam9pbiIsIndyYXBMaW5lcyIsImVsIiwid29yZHNMaXN0IiwiaW5uZXJUZXh0Iiwic3BsaXQiLCJ3cmFwcGVkV29yZHMiLCJpbm5lckhUTUwiLCJxdWVyeVNlbGVjdG9yQWxsIiwibGFzdE9mZnNldFRvcCIsImh0bWwiLCJ3b3JkIiwiY3VycmVudFdvcmRPZmZzZXRUb3AiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJ0b3AiLCJhbmltYXRlTGluZXMiLCJsaW5lcyIsInN0YWdnZXIiLCJzY3J1YiIsImVuZCIsImFuaW1hdGVMZXR0ZXJzIiwidGV4dENvbnRlbnQiLCJ3b3Jkc1dpdGhMZXR0ZXJzSFRNTCIsIm1hcCIsInN0eWxlIiwicm90YXRlWiIsInhQZXJjZW50IiwiaW5pdFRleHRBbmltYXRpb25zIiwiZWxlbWVudHMiLCJkb2N1bWVudCIsImkiLCJsZW5ndGgiLCJwYXJzZUZsb2F0IiwiZGF0YXNldCIsImFuaW1hdGlvblR5cGUiLCJhbmltVHlwZSIsInZhbGlkYXRlRW1haWxBZGRyZXNzIiwidmFsaWRhdGVDb250YWN0Rm9ybSIsImZvcm1FbGVtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsImZpZWxkIiwidmFsdWUiLCJ2YWxpZCIsInBhcmVudE5vZGUiLCJjbGFzc0xpc3QiLCJyZW1vdmUiLCJhZGQiLCJwcmV2ZW50RGVmYXVsdCIsIndpbmRvdyIsIm9uIiwidGhyb3R0bGUiLCJkcGkiLCJyYW5kb21JbnRGcm9tUmFuZ2UiLCJyYW5kb21WYWx1ZUZyb21BcnJheSIsIlByb2plY3QiLCJjb25zdHJ1Y3RvciIsImNhbnZhc0lkIiwicHJvZ3Jlc3MiLCJjYW52YXNXaWR0aCIsImNhbnZhc0hlaWdodCIsImluaXQiLCJjYW52YXMiLCJjdHgiLCJnZXRDb250ZXh0IiwiYmluZEV2ZW50cyIsInJlZnJlc2giLCJzZWxmIiwib2Zmc2V0V2lkdGgiLCJvZmZzZXRIZWlnaHQiLCJzZXRBdHRyaWJ1dGUiLCJTYW5kYm94IiwiZ3Jhdml0eSIsImJhbGxzIiwiZGlyZWN0aW9uIiwiY29sb3JzIiwicG9wdWxhdGUiLCJkcmF3Q2FudmFzIiwiYmFsbEFtb3VudCIsIk1hdGgiLCJtaW4iLCJyb3VuZCIsIm91dGVyV2lkdGgiLCJyYWRpdXMiLCJmbG9vciIsIm1hc3MiLCJ4IiwieSIsIm91dGVySGVpZ2h0IiwiY29sb3IiLCJmb3JjZSIsImhGb3JjZSIsInZGb3JjZSIsImR4IiwiZHkiLCJwdXNoIiwiQmFsbCIsImRlbHRhUHJvZ3Jlc3MiLCJhYnMiLCJiYWxsIiwiaW52ZXJ0VGltZSIsImNsZWFyUmVjdCIsInVwZGF0ZSIsImRyYXciLCJiZWdpblBhdGgiLCJhcmMiLCJQSSIsImZpbGxTdHlsZSIsImZpbGwiLCJjbG9zZVBhdGgiLCJBcnRpbm1vdiIsImFuZ2xlIiwiZnJhbWVXaWR0aCIsImZyYW1lTWluSGVpZ2h0IiwiZnJhbWVNYXhIZWlnaHQiLCJmcmFtZU1hcmdpbiIsImZyYW1lU3Ryb2tlV2lkdGgiLCJnZW5lcmF0ZUNvbHVtbnMiLCJjb2x1bW5zQ291bnQiLCJpbm5lcldpZHRoIiwicm93c0NvdW50IiwiY29sdW1ucyIsImMiLCJjb2x1bW4iLCJzcGVlZCIsInJhbmRvbSIsImZyYW1lcyIsInIiLCJmcmFtZUhlaWdodCIsImdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiIsImxpbmVXaWR0aCIsInN0cm9rZVN0eWxlIiwic2luIiwicm90YXRlIiwidHJhbnNsYXRlIiwic3Ryb2tlUmVjdCIsIkVhc3lBbGFybSIsInNwb3RsaWdodHMiLCJTcG90bGlnaHQiLCJzIiwic3BvdGxpZ2h0IiwiZngiLCJmeSIsIm1pbkRpbWVuc2lvbiIsImlubmVySGVpZ2h0IiwiaW5pdGlhbFgiLCJpbml0aWFsWSIsImZpbmFsWCIsImZpbmFsWSIsInRvIiwicGluIiwidGV4dEluZGVudCIsImVhc2UiLCJwcm9qZWN0cyIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJwcm9qZWN0IiwiY29udGVudFRvQW5pbWF0ZSIsImNsaXBQYXRoIiwic2FuZGJveCIsIm9uVXBkYXRlIiwiZWFzeWFsYXJtIiwiYmFja2dyb3VuZFBvc2l0aW9uIiwiYXJ0aW5tb3YiLCJjdXJzaXZlRWxlbWVudHMiLCJlbGVtZW50IiwiZGV2aWNlUGl4ZWxSYXRpbyIsIm1heCIsImFyZ3VtZW50cyIsInVuZGVmaW5lZCIsImFycmF5IiwiZnVuYyIsIndhaXQiLCJvcHRpb25zIiwiY29udGV4dCIsImFyZ3MiLCJyZXN1bHQiLCJ0aW1lb3V0IiwicHJldmlvdXMiLCJsYXRlciIsImxlYWRpbmciLCJEYXRlIiwibm93IiwiYXBwbHkiLCJyZW1haW5pbmciLCJjbGVhclRpbWVvdXQiLCJ0cmFpbGluZyIsInNldFRpbWVvdXQiLCJlbWFpbCIsInJlZ0V4cFBhdHRlcm4iLCJtYXRjaCJdLCJzb3VyY2VSb290IjoiIn0=