import lenis from "./lenis.js";
import { initTextAnimations } from "./animate.js";
import "@scss/global.scss";


/**
 * Initialize text appear animations
 */
window.addEventListener("load", function () {
    initTextAnimations();
});

const $anchorLinks = document.getElementsByClassName("js-sroll-to");

for (const link of $anchorLinks) {
    link.addEventListener("click", function(evt) {
        evt.preventDefault();

        lenis.scrollTo("#top");
    })
}
