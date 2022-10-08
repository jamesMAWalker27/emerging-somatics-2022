import React, { useState } from 'react'
import { gsap } from 'gsap'

import { MenuThumb } from '/components/_svg/menu-thumb'

import { navContainer } from './mobile-nav.module.scss'

export const MobileNav = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  const handleToggleMenu = () => {

    const closeTL = gsap.timeline()

    if (menuOpen) {
      closeTL
        .to('#menu-modal', {
          x: '-15vh',
        })
        .to(
          '#menu-modal',
          {
            opacity: 0,
          },
          '-=.4'
        )
        .to(
          '#menu-modal',
          {
            visibility: 'hidden',
            onComplete: setMenuOpen(false),
          },
          '-=.1'
        )
        .to('#menu-thumb', {
          fill: 'var(--color-med)',
          duration: 1,
        }, '-=1')
    } else {
      const openTL = gsap.timeline()

      openTL
        .to('#menu-modal', {
          opacity: 1,
          visibility: 'visible',
          // y: window.innerWidth < 1024 ? '25vh' : '-5vh',
          x: 0,
          onComplete: setMenuOpen(true),
        })
        .to('#menu-thumb', {
          fill: 'var(--color-calendar-primary-lt)',
        }, '-=1')
    }
  }

  return (
    <nav className={navContainer}>
      <span
        onClick={() => {
          console.log('menu opening...')
          handleToggleMenu()
        }}
      >
        <MenuThumb color={'var(--color-med)'} />
      </span>
    </nav>
  )
}
