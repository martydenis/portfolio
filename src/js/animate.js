import { gsap } from 'gsap'
// import { ScrollTrigger  } from 'gsap/ScrollTrigger'

const fadeIn = (line, delay) => {
  gsap.fromTo(line, {
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
      start: 'top 80%',
    }
  })
}

const animateLettersIn = (line, delay) => {
  line.innerHTML = line.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
  line.style.opacity = 1

  gsap.fromTo(line.querySelectorAll('.letter'), {
    rotateZ: 5,
    xPercent: 12,
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
      trigger: line,
      once: true,
      start: 'top 80%',
    }
  })
}

export const initAppearances = (elements) => {
  for (let i = 0; i < elements.length; i++) {
    const line = elements[i];
    const delay = parseFloat(line.dataset.delay) || 0;
    const animationType = line.dataset.animType || 'fade';
  
    switch (animationType) {
      case 'letter':
        animateLettersIn(line, delay)
        break;
      default: fadeIn(line, delay);
        break;
    }
  }
}