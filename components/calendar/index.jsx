import React, { useEffect, useState } from 'react'
import ReactCalendar from 'react-calendar'
import { gsap } from 'gsap'
import { Draggable } from 'gsap/dist/Draggable'
import { useInView } from 'react-intersection-observer';

import { SESSION_TYPES } from './calendar-data'

import { OutlineBtn } from '../_elements/outline-btn'
import { CloseBtn } from '../_svg/close'

import {
  calendarContainer,
  header,
  calendar,
  modal,
  times,
  btnClose,
  scrollWrap,
  timesList,
  active as activeStyle,
  details,
  inputs,
  appt,
  apptDetail,
  sessionSelect,
  pseudoSelect,
  btnSubmit,
} from './calendar.module.scss'

const CalendarModal = ({ position: [x, y], close, date }) => {
  const [isMobile, setIsMobile] = useState(false)
  const [selectedTime, setSelectedTime] = useState(0)
  const [sessionType, setSessionType] = useState(SESSION_TYPES[0])
  const [optionsVisible, setOptionsVisible] = useState(false)

  // make modal draggable
  useEffect(() => {
    gsap.registerPlugin(Draggable)

    gsap.set('#modal', { x, y })

    Draggable.create('#modal', {
      type: 'x,y',
      inertia: true,
      bounds: document.querySelector('#calendar'),
      dragClickables: true,
      allowEventDefault: true,
    })
  }, [])

  // mobile breakpoint
  useEffect(() => {
    setIsMobile(window.innerWidth < 1024)
  }, [])

  const handleSetTime = (idx) => {
    setSelectedTime(idx)
  }

  const handleSelectSession = ({ target: { id } }) => {
    console.log('id: ', id)
    setSessionType(SESSION_TYPES[id])
  }

  const handleToggleSelect = () => {
    if (!optionsVisible) {
      setOptionsVisible(true)
      gsap.fromTo(
        '#pseudo-select',
        {
          opacity: 0,
        },
        {
          opacity: 1,
        }
      )
    } else {
      gsap.fromTo(
        '#pseudo-select',
        {
          opacity: 1,
        },
        {
          opacity: 0,
          onComplete: () => setOptionsVisible(false),
        }
      )
    }
  }

  return (
    <div className={modal} id='modal'>
      <span className={btnClose} onClick={close}>
        <CloseBtn />
      </span>
      <div className={times}>
        {/* <h6>Choose a Time</h6> */}
        <div className={scrollWrap}>
          <ul className={timesList}>
            <span>{isMobile ? '▸' : '▾'}</span>
            {Array.from({ length: 9 }).map((_, time) => {
              const isPM = time > 3
              const hour = isPM ? time - 3 : time + 9

              const selected = time === selectedTime
              return (
                <button
                  key={time}
                  onClick={() => handleSetTime(time)}
                  className={selected && activeStyle}
                  data-mer={isPM ? 'pm' : 'am'}
                >
                  {hour}:00
                </button>
              )
            })}
            <span>{isMobile ? '◂' : '▴'}</span>
          </ul>
        </div>
      </div>
      <div className={details}>
        <div className={inputs} data-clickable={true}>
          <input placeholder='Full Name' type='text' />
          <input placeholder='Email' type='email' />
          <input placeholder='Phone' type='text' />
        </div>
        <div className={appt}>
          {[
            { id: 'time', l: 'Time', c: selectedTime },
            { id: 'date', l: 'Date', c: date },
          ].map(({ l, c }) => {
            return (
              <div className={`${apptDetail}`}>
                <label>{l}</label>
                <div>{c}</div>
              </div>
            )
          })}
          <div className={sessionSelect} onClick={handleToggleSelect}>
            <label htmlFor='sess'>Session</label>
            <select id='sess' onMouseDown={(e) => e.preventDefault()}>
              <option>
                {sessionType?.type} &nbsp; &nbsp; | &nbsp; &nbsp;{' '}
                {sessionType?.dur}MIN
              </option>
            </select>
            {optionsVisible && (
              <ul className={pseudoSelect} id='pseudo-select'>
                {SESSION_TYPES.map(({ type, dur }, idx) => {
                  return (
                    <li key={type} id={idx} onClick={handleSelectSession}>
                      <span>{type}</span>
                      <span>&nbsp;</span>
                      <span>{dur}MIN</span>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
        </div>
        <div className={btnSubmit}>
          <OutlineBtn text='Request Appointment →' noOutline={true} />
        </div>
      </div>
    </div>
  )
}

export const Calendar = ({ setBgVideo }) => {
  const [modalOpen, setModalOpen] = useState(false)
  const [modalPosition, setModalPosition] = useState([0, 0])
  const [calendarRef, calendarInView] = useInView({ threshold: 0.2 })

  // set BG video
  useEffect(() => {
    if (calendarInView) {
      gsap.to('#video-about, #video-main', {
        opacity: 0,
      })
      gsap.to('#video-end', {
        opacity: 1,
      })
    }
  }, [calendarInView])

  const toggleModal = () => {
    setModalOpen(!modalOpen)
  }

  const handleSetMonthYear = ({ activeStartDate }) => {
    // only run on month/year change
    if (!activeStartDate) return

    const [, month, , year] = activeStartDate.toString().split(' ')
    console.log('month: ', month)
    console.log('year: ', year)
    // setAptDetail((prv) => ({
    //   ...prv,
    //   date: {
    //     ...prv.date,
    //     val: {
    //       ...prv.date.val,
    //       m: month,
    //       y: year,
    //     },
    //   },
    // }))
  }

  const handleModalOpen = () => {
    // TODO: Animate modal in/out
    setModalOpen(true)
  }

  const handleModalPosition = ({ pageX, target }) => {
    setModalPosition([pageX, 0])
  }

  return (
    <div className={calendarContainer} ref={calendarRef}>
      <h2 className={header}>Browse Availability.</h2>
      <div className={calendar} onClick={handleModalPosition}>
        <ReactCalendar
          nextLabel={'→'}
          next2Label={null}
          prevLabel={'←'}
          prev2Label={null}
          maxDetail='month'
          onClickDay={handleModalOpen}
          onActiveStartDateChange={handleSetMonthYear}
        />
        {modalOpen && (
          <CalendarModal
            position={modalPosition}
            date={'Sept. 12, 2022'}
            close={() => setModalOpen(false)}
          />
        )}
      </div>
    </div>
  )
}
