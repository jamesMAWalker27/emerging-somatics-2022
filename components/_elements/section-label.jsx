import React, { Fragment } from 'react'

import { label as labelStyle } from './section-label.module.scss';

export const SectionLabel = ({ content, length = 5, gsapId='' }) => {
  return (
    <span className={labelStyle} id={gsapId} >
      {Array.from({ length }).map((_, idx) => (
        <Fragment key={idx}>{content}</Fragment>
      ))}
    </span>
  )
}
