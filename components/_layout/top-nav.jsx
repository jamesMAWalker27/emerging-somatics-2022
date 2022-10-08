import React, { useState } from 'react'
import { gsap } from 'gsap';
import Link from 'next/link'
import { Logo } from '../_svg/Logo'

import { navContainer, logoWrap, btnMenu } from './top-nav.module.scss'

export const TopNav = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  const handleToggleMenu = () => {
    // TODO: Animate bg shade separately so that it doesn't slide.
    // TODO: Mobile version of this animation.

    const menuTL = gsap.timeline()


    if (menuOpen) {
      menuTL.to('#menu-modal', {
        x: "-15vh",
        // y: window.innerWidth < 1024 ? '25vh' : '-5vh',
      })
      .to('#menu-modal', {
        opacity: 0,
      }, "-=.4")
      .to('#menu-shade', {
        opacity: 0,
      }, "-=.4")
      .to('#menu-modal', {
        visibility: 'hidden',
        onComplete: setMenuOpen(false),
      }, "-=.1")
    } else {
      gsap.to('#menu-shade', {
        opacity: 1,
        visibility: 'visible',
      })
      gsap.to('#menu-modal', {
        opacity: 1,
        visibility: 'visible',
        // y: window.innerWidth < 1024 ? '25vh' : '-5vh',
        x: 0,
        onComplete: setMenuOpen(true),
      })
    }
  }

  return (
    <nav className={navContainer}>
      <Link href='#hero'>
        <a className={logoWrap}>
          <Logo />
        </a>
      </Link>
      <button className={btnMenu} onClick={handleToggleMenu}>
        <span />
        <span />
        <span />
      </button>
    </nav>
  )
}
