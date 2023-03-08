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
  messageWrapper,
} from './contact.module.scss'

export const Contact = ({ heading, paragraph_1, paragraph_2 }) => {
  /*
    TODO: Mobile version.
  */

  const { contacts, socials } = CONTACT_CONTENT

  const blurbContent = {
    header: heading,
    text: (
      <>
        <span>{paragraph_1}</span>
        <span>{paragraph_2}</span>
      </>
    ),
  }

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
          <div className={messageWrapper}>
            <textarea placeholder='Say hello!' data-action={'no-scroll'} />
            <OutlineBtn text='Submit →' action={() => alert('submitted!')} />
          </div>
        </form>
      </div>
    </div>
  )
}
