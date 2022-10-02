import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

import { OutlineBtn } from './outline-btn'
import { SectionLabel } from './section-label'

import {
  container,
  innerWrap,
  header as headerStyle,
  paragraph,
} from './paragraph-block.module.scss'

export const ParagraphBlock = ({
  header,
  text,
  btn = null,
  btnAction,
  fadeBtn = false,
  gsapId,
  labelText = null,
  labelId = null,
}) => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 1024)
  }, [])

  return (
    <div className={container}>
      <div className={innerWrap} id={gsapId}>
        {header && <h4 className={headerStyle}>{header}</h4>}
        {/* {labelText && (
            <SectionLabel
              content={labelText}
              gsapId={labelId}
            />
          )} */}
        <p className={paragraph}>{text}</p>
        {btn && !isMobile && (
          <OutlineBtn text={btn} action={btnAction} fadeBtn={fadeBtn} />
        )}
      </div>
      {btn && isMobile && (
        <OutlineBtn text={btn} action={btnAction} fadeBtn={fadeBtn} />
      )}
    </div>
  )
}
