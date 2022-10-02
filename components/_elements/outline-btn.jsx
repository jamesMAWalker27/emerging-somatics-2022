import React, { useEffect } from 'react'
import gsap from 'gsap'

import { btn as btnStyle, textOnly } from './outline-btn.module.scss'

export const OutlineBtn = ({
  text,
  action,
  fadeBtn = false,
  noOutline = false,
}) => {
  useEffect(() => {
    if (fadeBtn) {
      gsap.to(`.${btnStyle}`, {
        opacity: 0,
        delay: 0.25,
        duration: 1,
      })
    }
  }, [])

  return (
    <button className={`${btnStyle} ${noOutline && textOnly}`} onClick={action}>
      {text}
    </button>
  )
}
