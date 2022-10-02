import React from 'react'
import Link from 'next/link'

import { contactInfo, pageLinks, socialIcons } from '../_shared-data/menu-data'

import { SectionLabel } from '../_elements/section-label'

import {
  modal,
  bg,
  menu,
  options,
  option,
  contact,
  email as emailStyle,
  phone as phoneStyle,
  socials,
} from './menu.module.scss'
import gsap from 'gsap'

export const MenuModal = ({ slideFn }) => {
  const [email, phone] = contactInfo

  const handleLink = (e) => {
    gsap.to('#menu-modal', {
      opacity: 0,
      x: '-15vh',
      visibility: 'hidden',
      onComplete: () => slideFn.current(e),
    })
  }

  return (
    <div className={modal} id='menu-modal'>
      <nav className={menu}>
        <ul className={options} id='menu-content'>
          {pageLinks.map(({ id, title, link }) => {
            return (
              <li key={id} className={option}>
                <Link href={link}>
                  <>
                    <a
                      id={id}
                      className={`menu-link`}
                      data-action={'slide-link'}
                      onClick={handleLink}
                    >
                      {title}
                    </a>
                    <SectionLabel content={title} />
                  </>
                </Link>
              </li>
            )
          })}
        </ul>
        <div className={contact}>
          <ul className={socials}>
            {socialIcons.map(({ id, icon, url }) => {
              return (
                <a key={id} href={url}>
                  {icon}
                </a>
              )
            })}
          </ul>
        </div>
        <a className={emailStyle} href={`mailto:${email.info}`}>
          {email.info}
        </a>
        <a className={phoneStyle} href={`mailto:${phone.info}`}>
          {phone.info}
        </a>
      </nav>
      <div className={bg} />
    </div>
  )
}
