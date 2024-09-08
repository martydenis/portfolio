import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const fadeIn = (line, delay) => {
    gsap.fromTo(
        line,
        {
            yPercent: 10,
            opacity: 0,
        },
        {
            yPercent: 0,
            opacity: 1,
            delay: delay,
            duration: 1.5,
            scrollTrigger: {
                trigger: line,
                once: true,
                start: "top 80%",
            },
        }
    );
};

const wrapLetters = (string) => {
    return string.replace(/\S/g, "<span class='fx-letter'>$&</span>");
};

const wrapWords = (words) => {
    return "<span class='fx-word'>" + words.join("</span> <span class='fx-word'>") + "</span>"
}

const wrapLines = (el) => {
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
}

const animateLines = (el, delay) => {
    const lines = wrapLines(el);

    el.innerHTML = lines;

    gsap.fromTo(
        el.querySelectorAll('.fx-line-inner'),
        {
            yPercent: 100,
            opacity: 0
        },
        {
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
            },
        },
    );
};

const animateLetters = (el, delay) => {
    const wordsList = el.textContent.split(/[ ]+/i);
    const wordsWithLettersHTML = wordsList.map((word) => wrapLetters(word));

    el.innerHTML = wrapWords(wordsWithLettersHTML);
    el.style.opacity = 1;

    gsap.fromTo(
        el.querySelectorAll(".fx-letter"),
        {
            rotateZ: 4,
            xPercent: 2,
            yPercent: 15,
            opacity: 0,
        },
        {
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
                start: "top 85%",
            },
        }
    );
};

export const initTextAnimations = () => {
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
