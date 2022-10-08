import React, { useEffect } from 'react'
import { useInView } from 'react-intersection-observer';
import { fadeIntoView } from '../../animation/section-animations';

import { contactInfo, pageLinks } from '../_shared-data/menu-data'

import {
  endContainer,
  card,
  linkList,
  contact,
  contactLink,
} from './end-card.module.scss'

export const EndCard = ({ slideFn }) => {
  const [ref, inView] = useInView({ threshold: .8 })

  const handleLink = (e) => {
    slideFn.current(e)
  }

  useEffect(() => {
    fadeIntoView(inView, )
  }, [inView])
  

  return (
    <div className={endContainer} id='end-container'>
      <footer className={card}>
        <ul className={linkList}>
          {pageLinks.map(({ id, title, link }) => {
            return (
              <li key={id}>
                <a
                  id={id}
                  className={`end-link`}
                  data-action={'slide-link'}
                  onClick={handleLink}
                >
                  {title}
                </a>
              </li>
            )
          })}
          {contactInfo.map(({ id, info }) => {
            const hrefType = id === 'email' ? `mailto:${info}` : `tel:${info}`
            return (
              <a key={id} className={contactLink} href={hrefType}>
                {info}
              </a>
            )
          })}
        </ul>
      </footer>
    </div>
  )
}
