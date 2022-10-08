import React, { useEffect } from 'react'
import gsap from 'gsap'

import { btn as btnStyle, textOnly } from './outline-btn.module.scss'

export const OutlineBtn = ({
  text,
  action,
  fadeBtn = false,
  noOutline = false,
  slideFnData={ attr: null, id:null },
  gsapClass
}) => {
  useEffect(() => {
    if (fadeBtn) {
      gsap.to(`.${gsapClass}`, {
        opacity: 0,
        delay: 0.25,
        duration: 1,
      })
    }
  }, [fadeBtn, gsapClass])

  const { attr, id } = slideFnData

  return (
    <button
      className={`${btnStyle} ${noOutline ? textOnly : ''} ${gsapClass}`}
      onClick={action}
      data-action={attr}
      id={id}
    >
      {text}
    </button>
  )
}
