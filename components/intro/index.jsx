import React from 'react'

import { text } from './introduction.text'

import { ParagraphBlock } from '../_elements/paragraph-block'

import { container } from './intro.module.scss'

export const Introduction = ({ slideFn }) => {
  const handleBtnClick = (e) => {
    slideFn.current(e)
  }

  return (
    <div className={container}>
      <ParagraphBlock
        header={<>Transform the self.</>}
        text={text}
        btn={`Make an Appointment →`}
        btnAction={handleBtnClick}
        gsapId='intro-par'
        slideFnData={{ attr: 'slide-link', id: 5 }}
        labelText={'Welcome'}
        labelId={'intro-label'}
      />
    </div>
  )
}
