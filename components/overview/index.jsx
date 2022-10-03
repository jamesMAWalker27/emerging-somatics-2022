import React, { Fragment, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { useRouter } from 'next/router'
import { gsap } from 'gsap'
import { useInView } from 'react-intersection-observer'

import { OVERVIEW_CONTENT } from './overview.text'

import { ParagraphBlock } from '../_elements/paragraph-block'
import { ArrowIcon } from '../_svg/collapse'

import {
  overview,
  content,
  blocks,
  btnCollapse,
  bg,
} from './overview.module.scss'

const ExpanderContent = ({ closeModal, slideFn }) => {
  const { push } = useRouter()

  useEffect(() => {
    // TODO: Use slideFn to scroll to self before closing.

    const openTL = gsap.timeline()

    openTL
      .fromTo(
        `.${bg}`,
        {
          scaleX: 0,
        },
        {
          scaleX: 1,
        }
      )
      .fromTo(
        '#ov-par-block, #ov-btn-col',
        {
          opacity: 0,
        },
        {
          opacity: 1,
        }
      )
  }, [])

  const closeToAppointments = () => {
    // animate closed & use slideFn.current to scroll to calendar
  }

  /* 
    TODO: Add a span containing "___.01/2/3" to each block on hover as per figma design.
  */

  return (
    <section className={content}>
      <div className={blocks} id='text-blocks'>
        {OVERVIEW_CONTENT.map((oc, idx) => {
          return (
            <ParagraphBlock
              key={idx}
              header={oc.header}
              text={oc.text}
              gsapId={idx !== 0 && 'ov-par-block'}
              btn={idx === 3 && 'Make an Appointment →'}
              btnAction={idx === 3 && (() => push('/#calendar'))}
            />
          )
        })}
      </div>
      <div className={bg} />
      <button className={btnCollapse} onClick={closeModal} id='ov-btn-col'>
        <span>Collapse</span>
        <ArrowIcon />
      </button>
    </section>
  )
}

export const Overview = ({ toggleProgressVis, slideAnim }) => {
  const [ovRef, ovInView] = useInView({ threshold: 0.2 })
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
      closeTL
        .to('#ov-par-block, #ov-btn-col ', {
          opacity: 0,
        })
        .to(`.${bg}`, {
          scaleX: 0,
        })
    } else {
      toggleExpand()
    }
  }

  return (
    <section className={`${overview}`} ref={ovRef}>
      {expanded ? (
        createPortal(
          <ExpanderContent
            closeModal={animateToggleExpand}
            slideAnim={slideAnim}
          />,
          portal
        )
      ) : (
        <ParagraphBlock
          text={OC[0].text}
          header={OC[0].header}
          btn={OC[0].btnText}
          btnAction={animateToggleExpand}
        />
      )}
    </section>
  )
}
