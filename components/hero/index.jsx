import gsap from 'gsap'
import React, { useEffect, useState } from 'react'

import { Wordmark } from '../_svg/wordmark'

import {
  content,
  companyTitle,
  centerContent,
  header,
  subheader,
  label,
  btnScroll,
} from './hero.module.scss'

export const Hero = ({ slideFn }) => {
  const [fontsLoaded, setFontsLoaded] = useState(false)

  const handleScrollNextSection = (e) => {
    slideFn.current(e)
  }

  const fadeInFonts = () => {
    gsap.fromTo(
      '#hero-text',
      { opacity: 0 },
      { opacity: 1, delay: 0.25, duration: 1 }
    )
  }

  // fade content after fonts loaded
  useEffect(() => {
    document.fonts.ready.then(() => {
      // setFontsLoaded(true)
      fadeInFonts()
    })
  })

  return (
    <div className={`${content} hero-content`}>
      <h1 className={companyTitle}>
        <Wordmark />
      </h1>
        <div className={centerContent} id='hero-text'>
          <h2 className={header}>Discover Embodied Leadership.</h2>
          <p className={subheader}>
            Skillful action, pragmatic wisdom, and grounded compassion.
          </p>
          <button
            className={btnScroll}
            data-action={'slide-link'}
            id='1'
            onClick={handleScrollNextSection}
          >
            scroll to proceed →
          </button>
        </div>
    </div>
  )
}
