import React from 'react'

import { text } from './introduction.text';

import { ParagraphBlock } from '../_elements/paragraph-block'

import { container } from './intro.module.scss';

export const Introduction = () => {
  return (
    <div className={container}>
      <ParagraphBlock
        header={
          <>
            {/* About */}
            <br />
            Emerging Somatics.
          </>
        }
        text={text}
        btn={`Make an Appointment →`}
        gsapId='intro-par'
        labelText={'Welcome'}
        labelId={'intro-label'}
      />
    </div>
  )
}
