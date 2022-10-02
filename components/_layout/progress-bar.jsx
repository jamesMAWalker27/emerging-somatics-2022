import React from 'react'

import { SECTION_DATA } from '../_shared-data/section-data'

import {
  container,
  bullet,
  bulletLabel,
  markerCircle,
  line,
  label,
} from './progress-bar.module.scss'


export const ProgressBar = ({ slideFn }) => {

  const handleScrollTo = (e) => {
    // console.log('e: ', e);
    slideFn.current(e)
    // setCurrentView(idx)
    // testScrolling(idx)
  }

  return (
    <div className={container} id='progress-bar'>
      {SECTION_DATA.map(({ title }, idx) => {
        return (
          <span
            key={idx}
            className={`${bullet} bullet`}
            onClick={handleScrollTo}
            data-action={'slide-link'}
            id={idx}
          >
            <label
              className={`${bulletLabel} progress-label`}
            >
              {title}
            </label>
          </span>
        )
      })}
      <div
        className={markerCircle}
        id='progress-marker'
      />
      <div
        className={line}
        id='progress-line'
      />
      <span className={label}></span>
    </div>
  )
}
