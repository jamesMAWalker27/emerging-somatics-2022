import { gsap } from 'gsap';

export const fadeIntoView = (inView, id) => {

  if (inView) {
    gsap.fromTo(
      id,
      { opacity: 0,},
      { opacity: 1, duration: .8 }
    )
  } else {
    gsap.fromTo(
      id,
      { opacity: 1 },
      { opacity: 0, duration: .3 }
    )
  }
}