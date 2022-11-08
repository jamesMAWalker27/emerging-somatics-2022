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
  children,
  header,
  text,
  btn = null,
  btnAction,
  btnVis,
  slideFnData,
  gsapId,
  btnClass,
}) => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 1024)
  }, [])

  const btnProps = {
    text: btn,
    action: btnAction,
    slideFnData,
    fadeBtn: btnVis,
    gsapClass: btnClass,
  }

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
        { children }
        {btn && !isMobile && <OutlineBtn {...btnProps} />}
      </div>
      {btn && isMobile && <OutlineBtn {...btnProps} />}
    </div>
  )
}
