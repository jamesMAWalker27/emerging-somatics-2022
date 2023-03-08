import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { gsap } from 'gsap'
import { useInView } from 'react-intersection-observer'

import { OVERVIEW_CONTENT } from './overview.text'

import { ParagraphBlock } from '../_elements/paragraph-block'
import { OutlineBtn } from '../_elements/outline-btn'
import { ArrowIcon } from '../_svg/collapse'

import { fadeIntoView } from '../../animation/section-animations'

import {
  overview,
  expanderContent,
  blocks,
  block,
  btnCollapse,
  bg,
} from './overview.module.scss'


export const Overview = ({
  toggleProgressVis,
  slideFn,
  heading,
  paragraph_1,
  buttonText,
}) => {
  const [ovRef, ovInView] = useInView({ threshold: 0.8 })
  const [expanded, setExpanded] = useState(false)
  const [portal, setPortal] = useState(null)

  const OC = OVERVIEW_CONTENT

  // set up portal for expander
  useEffect(() => {
    const portalLocation = document.querySelector('#portal')
    setPortal(portalLocation)
  }, [])

  // set BG video
  useEffect(() => {
    if (ovInView) {
      gsap.to('#video-about, #video-end', {
        opacity: 0,
      })
      gsap.to('#video-main', {
        opacity: 1,
      })
    }
    fadeIntoView(ovInView, '#ov-container')
  }, [ovInView])

  const toggleExpand = () => {
    setExpanded(!expanded)
  }

  const animateToggleExpand = () => {
    /* 
    TODO: If "make appointments" triggers close, scroll to calendar section using slideAnim.
    */
    const isClosing = expanded
    const closeTL = gsap.timeline({ onComplete: toggleExpand })

    toggleProgressVis()

    if (isClosing) {
      closeTL.to('#expander', {
        opacity: 0,
      })
    } else {
      toggleExpand()
    }
  }

  return (
    <section className={`${overview}`} ref={ovRef} id='ov-container'>
      {expanded ? (
        createPortal(
          <ExpanderContent
            closeModal={animateToggleExpand}
            slideFn={slideFn}
          />,
          portal
        )
      ) : (
        <ParagraphBlock
          header={heading}
          text={<span>{paragraph_1}</span>}
          btn={buttonText}
          btnAction={animateToggleExpand}
          btnVis={expanded}
          btnClass={'ov-btn'}
        />
      )}
    </section>
  )
}


function ExpanderContent({ closeModal, slideFn }) {
  useEffect(() => {
    const openTL = gsap.timeline()

    openTL
      .fromTo(
        `.${bg}`,
        {
          opacity: 0,
        },
        {
          opacity: 1,
        }
      )
      .fromTo(
        '#ov-par-block, #ov-btn-col, #indicator',
        {
          opacity: 0,
        },
        {
          opacity: 1,
        }
      )
  }, [])

  const closeToAppointments = (e) => {
    closeModal()
    setTimeout(() => {
      slideFn.current(e)
    }, 500)
    // animate closed & use slideFn.current to scroll to calendar
  }

  return (
    <section className={expanderContent} id='expander'>
      <div className={blocks} id='text-blocks'>
        {OVERVIEW_CONTENT.map((oc, idx) => {
          return (
            <div className={block}>
              <h2>{oc.header}</h2>
              <p>{oc.text}</p>
            </div>
          )
        })}
        <OutlineBtn
          text='Make an Appointment →'
          action={(e) => closeToAppointments(e)}
          slideFnData={{ attr: 'slide-link', id: 5 }}
        />
      </div>
      <button className={btnCollapse} onClick={closeModal} id='ov-btn-col'>
        <span>Collapse</span>
        <ArrowIcon />
      </button>
      <div className={bg} />
    </section>
  )
}