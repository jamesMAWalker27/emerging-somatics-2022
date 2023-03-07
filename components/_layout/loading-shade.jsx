import React from 'react'
import { Logo } from '../_svg/Logo'
import { Wordmark } from '../_svg/wordmark'

import { container, pulse } from './loading-shade.module.scss'

export const LoadingShade = () => {
  return (
    <div className={container} id='loading-shade'>
      <div className={pulse}>
        {/* <Logo color={'var(--green-light)'} /> */}
        <Logo />
        <Wordmark />
      </div>
    </div>
  )
}
