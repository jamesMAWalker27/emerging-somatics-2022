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

export const Hero = ({ slideFn, heading, paragraph_1, paragraph_2 }) => {
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
        <h2 className={header}>{heading}</h2>
        <p className={subheader}>
          {paragraph_1}
          <br />
          {paragraph_2}
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
