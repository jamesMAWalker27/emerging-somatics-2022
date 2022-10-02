import React from 'react'
import Link from 'next/link'

import { CONTACT_CONTENT } from './contact-data'

import { ParagraphBlock } from '../_elements/paragraph-block'
import { OutlineBtn } from '../_elements/outline-btn'

import {
  contactContainer,
  textContent,
  contacts as contactsStyle,
  socials as socialsStyle,
  flexWrap,
  contactForm,
} from './contact.module.scss'

export const Contact = () => {
  const { blurbContent, contacts, socials } = CONTACT_CONTENT

  return (
    <div className={contactContainer} id='contact-container'>
      <div className={textContent}>
        <ParagraphBlock {...blurbContent} />
        <div className={flexWrap}>
          <ul className={contactsStyle}>
            {contacts.map((ct, idx) => {
              const href = idx === 0 ? `mailto:${ct}` : `tel:${ct}`
              return (
                <li key={idx}>
                  <a href={href}>{ct}</a>
                </li>
              )
            })}
          </ul>
          <ul className={socialsStyle}>
            {socials.map(({ url, icon }, idx) => {
              return (
                <li key={idx}>
                  <a href={url}>{icon}</a>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
      <div className={flexWrap}>
        <form className={contactForm}>
          <input placeholder='Full Name' />
          <input placeholder='Email Address' />
          <textarea placeholder='Say hello!' />
          <OutlineBtn text='Submit →' action={() => alert('submitted!')}/>
        </form>
      </div>
    </div>
  )
}
