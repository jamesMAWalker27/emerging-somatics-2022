import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { gsap } from 'gsap'
import { useInView } from 'react-intersection-observer'

import { ABOUT_CONTENT } from './about.text'
// import { AnimationContext } from 'context/animation.context'

import { ParagraphBlock } from '../_elements/paragraph-block'
import { ArrowIcon } from '../_svg/collapse'

import {
  aboutContainer,
  content,
  bg,
  btnCollapse,
  expContent,
  list as listStyle,
  endList as endListStyle,
  closing as closingStyle,
} from './about.module.scss'

const SECTION_LEFT = 5011
const ANIMATE_IDS = '#ab-par-block, #ab-btn-col, #list, #end-list, #close'

const ExpanderContent = ({ closeModal, expanded }) => {
  const { main, secondary, list, endList, closing } = ABOUT_CONTENT

  useEffect(() => {
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
        ANIMATE_IDS,
        {
          opacity: 0,
        },
        {
          opacity: 1,
          delay: 0.5,
        }
      )
  }, [])

  return (
    <section className={content}>
      <div className={expContent}>
        {[main, secondary].map((blc, idx) => {
          return (
            <ParagraphBlock
              key={`abt-${idx + 1}`}
              header={blc.header}
              text={blc.text}
              btn={idx === 0 && blc.btnText}
              fadeBtn={idx === 0 && expanded}
              gsapId={idx !== 0 && 'ab-par-block'}
            />
          )
        })}
        <ul className={listStyle} id='list'>
          {list.map((itm) => {
            return <li key={itm}>{itm}</li>
          })}
        </ul>
        <ul className={endListStyle} id='end-list'>
          {endList.map((itm) => {
            return <li key={itm}>{itm}</li>
          })}
        </ul>
        <div className={closingStyle} id='close'>
          {closing}
        </div>
      </div>
      <div className={bg} />
      <button className={btnCollapse} onClick={closeModal} id='ab-btn-col'>
        <span>Collapse</span>
        <ArrowIcon />
      </button>
    </section>
  )
}

export const About = ({ toggleProgressVis }) => {
  const [aboutRef, aboutInView] = useInView({ threshold: 0.2 })
  const [expanded, setExpanded] = useState(false)

  const [portal, setPortal] = useState(null)

  const { main } = ABOUT_CONTENT

  // set portal location
  useEffect(() => {
    const portalLocation = document.querySelector('#portal')
    setPortal(portalLocation)
  }, [])

  // set BG video
  useEffect(() => {
    if (aboutInView) {
      gsap.to('#video-main, #video-end', {
        opacity: 0,
      })
      gsap.to('#video-about', {
        opacity: 1,
      })
    }
  }, [aboutInView])

  const toggleExpand = () => {
    setExpanded(!expanded)
    setTimeout(() => {
      // window.scrollTo(0, SECTION_LEFT - 1260)
      window.scrollTo(0, SECTION_LEFT)
    }, 1200)
  }

  const animateToggleExpand = () => {
    const isClosing = expanded
    const closeTL = gsap.timeline({ onComplete: toggleExpand })

    toggleProgressVis()

    if (isClosing) {
      closeTL
        .to(ANIMATE_IDS, {
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
    <div className={aboutContainer} id='about-container' ref={aboutRef}>
      {expanded ? (
        createPortal(
          <ExpanderContent
            closeModal={animateToggleExpand}
            expanded={expanded}
          />,
          portal
        )
      ) : (
        <ParagraphBlock
          text={main.text}
          header={main.header}
          btn={main.btnText}
          btnAction={animateToggleExpand}
        />
      )}
    </div>
  )
}
