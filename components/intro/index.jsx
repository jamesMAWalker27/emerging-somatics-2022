import React, { useEffect } from 'react'
import gsap from 'gsap'
import { useInView } from 'react-intersection-observer'

import { text } from './introduction.text'

import { ParagraphBlock } from '../_elements/paragraph-block'

import { container } from './intro.module.scss'
import { fadeIntoView } from '../../animation/section-animations'

export const Introduction = ({
  slideFn,
  heading,
  paragraph_1,
  paragraph_2,
  buttonText
}) => {
  const handleBtnClick = (e) => {
    slideFn.current(e)
  }

  const { ref, inView } = useInView({ threshold: 0.8 })
  useEffect(() => {
    fadeIntoView(inView, '#intro-container')
  }, [inView])

  return (
    <div className={container} ref={ref} id='intro-container'>
      <ParagraphBlock
        header={heading}
        text={
          <>
            <span>
              {paragraph_1}
              <br />
              <br />
              <em style={{ color: 'var(--color-accent-dark)' }}>
                {paragraph_2}
              </em>
            </span>
          </>
        }
        btn={buttonText}
        btnAction={handleBtnClick}
        gsapId='intro-par'
        btnClass='intro-btn'
        slideFnData={{ attr: 'slide-link', id: 5 }}
        labelText={'Welcome'}
        labelId={'intro-label'}
        fadeBtn={false}
      />
    </div>
  )
}
