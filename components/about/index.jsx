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
  expanderContainer,
  expanderContent,
  content,
  bg,
  btnCollapse,
  list as listStyle,
  endList as endListStyle,
  closing as closingStyle,
} from './about.module.scss'

const SECTION_LEFT = 5011
const ANIMATE_IDS = '#ab-par-block, #list, #end-list, #close, #expander-content'
// const ANIMATE_IDS = '#ab-par-block, #3, #list, #end-list, #close, #expander-content'

const ExpanderContent = ({ closeModal, expanded, slideFn }) => {
  const { main, secondary, list, endList, closing } = ABOUT_CONTENT

  useEffect(() => {
    const openTL = gsap.timeline()
    openTL
      .fromTo(
        `.${bg}`,
        {
          opacity: 0
        },
        {
          opacity: 1
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

  const handleCloseModal = (e) => {
    slideFn.current(e)
    setTimeout(() => {
      closeModal()
    }, 500);
  }

  return (
    <section className={expanderContainer}>
      <div className={expanderContent} id='expander-content'>
        {[main, secondary].map((blc, idx) => {
          return (
            <ParagraphBlock
              key={`abt-${idx + 1}`}
              header={blc.header}
              text={blc.text}
              btn={idx === 0 ? blc.btnText : null}
              fadeBtn={idx === 0 ? expanded : null}
              gsapId={idx !== 0 ? 'ab-par-block' : null}
            />
          )
        })}
        <ul className={listStyle} id='list'>
          {list.map((itm, idx) => {
            return <li key={idx}>{itm}</li>
          })}
        </ul>
        <ul className={endListStyle} id='end-list'>
          {endList.map((itm, idx) => {
            return <li key={idx}>{itm}</li>
          })}
        </ul>
        <div className={closingStyle} id='close'>
          {closing}
        </div>
      </div>
      <div className={bg} />
      <button className={btnCollapse} onClick={handleCloseModal} data-action={'slide-link'} id='3'>
        <span>Collapse</span>
        <ArrowIcon />
      </button>
    </section>
  )
}

export const About = ({ toggleProgressVis, slideFn }) => {
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
          // scaleX: 0,
          opacity: 0
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
            slideFn={slideFn}
          />,
          portal
        )
      ) : (
        <ParagraphBlock
          text={main.text}
          header={main.header}
          btn={main.btnText}
          btnAction={animateToggleExpand}
          btnVis={expanded}
        />
      )}
    </div>
  )
}
