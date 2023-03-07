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
  const [isMobile, setIsMobile] = useState()

  const handleScrollNextSection = (e) => {
    slideFn.current(e)
  }

  return (
    <div className={`${content} hero-content`}>
      <h1 className={companyTitle}>
        <Wordmark />
      </h1>
      <div className={centerContent} id='hero-text'>
        <h2 className={header}>Discover Somatic Coaching & Bodywork.</h2>
        <p className={subheader}>
          What do you care about? Who do you want to become? <br /> What change
          do you want to affect? For yourself, and others?
        </p>
        <button
          className={btnScroll}
          data-action={'slide-link'}
          id='1'
          onClick={handleScrollNextSection}
        >
          {isMobile ? 'swipe' : 'scroll'} to proceed →
        </button>
      </div>
    </div>
  )
}
