import React, { useEffect, useState } from 'react'
import ReactCalendar from 'react-calendar'
import { gsap } from 'gsap'
import { useInView } from 'react-intersection-observer'
import { PopupModal } from 'react-calendly'
import Script from 'next/script'

import { SESSION_TYPES, pageSettings } from './calendar-data'

import {
  calendarContainer,
  header,
  calendar,
  sessSelect,
  sessSelectClose,
  sessLinks,
  sessHeader,
  sessDetails,
  sessBtn,
  shade,
} from './calendar.module.scss'

const CalendarModal = ({ close, date, sessionUrl }) => {
  // animate modal in/out
  useEffect(() => {
    gsap.fromTo(
      '#modal, #modal-shade',
      {
        opacity: 0,
      },
      {
        opacity: 1,
      }
    )
  }, [])

  // close modal with esc key
  useEffect(() => {
    const close = (e) => {
      if (e.keyCode === 27) {
        handleCloseModal()
      }
    }
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  })

  function handleCloseModal() {
    gsap.to('#modal, #modal-shade, #portal', {
      opacity: 0,
      onComplete: close,
    })
  }

  function getUrlDate(base, date) {
    let [year, month, day] = [
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
    ]
    return `${base}?month=${year}-${month}&date=${year}-${month}-${day}`
  }

  const urlWithDateParams = getUrlDate(sessionUrl, date)
  console.log('urlWithDateParams: ', urlWithDateParams)
  return (
    <>
      <PopupModal
        // url={sessionUrl}
        url={urlWithDateParams}
        rootElement={document.getElementById('portal')}
        pageSettings={pageSettings}
        open={true}
        // prefill={{ date }}
        onModalClose={handleCloseModal}
      />
      <div className={shade} id='modal-shade' />
    </>
  )
}

export const Calendar = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [sessSelectOpen, setSessSelectOpen] = useState(false)
  const [modalPosition, setModalPosition] = useState([0, 0])
  const [calendarRef, calendarInView] = useInView({ threshold: 0.2 })
  const [currentDate, setCurrentDate] = useState(new Date())
  const [apptType, setApptType] = useState()

  // give calendar no scroll attrs
  useEffect(() => {
    const daysAbbr = document.querySelectorAll('.react-calendar abbr')
    const daysBtn = document.querySelectorAll('.react-calendar button')
    const daysDiv = document.querySelectorAll('.react-calendar div')
    const noScrolls = [...daysAbbr, ...daysBtn, ...daysDiv]

    noScrolls.forEach((el) => el.setAttribute('data-action', 'no-scroll'))
  }, [])

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

  // animate tooltip entry
  useEffect(() => {
    gsap.fromTo(
      '#tool-tip',
      {
        opacity: 0,
      },
      {
        opacity: 1,
      }
    )
  }, [sessSelectOpen])

  function handleCloseSessSelect() {
    gsap.to('#tool-tip', {
      opacity: 0,
      onComplete: () => setSessSelectOpen(false),
    })
  }

  function handleSetMonthYear({ activeStartDate }) {
    // only run on month/year change
    if (!activeStartDate) return

    const [, month, , year] = activeStartDate.toString().split(' ')
  }

  function handleStartScheduleProcess(value) {
    setSessSelectOpen(true)
    setCurrentDate(value)
  }

  function handleModalOpen(sessionUrl) {
    setApptType(sessionUrl)
    setModalOpen(true)
    gsap.fromTo(
      '#portal',
      {
        opacity: 0,
      },
      {
        opacity: 1,
        onComplete: () => setSessSelectOpen(false),
      }
    )
  }

  function handleModalPosition({ pageX, target }) {
    setModalPosition([pageX, 0])
  }

  return (
    <div className={calendarContainer} ref={calendarRef}>
      <h2 className={header}>Browse Availability.</h2>
      <div
        className={calendar}
        onClick={handleModalPosition}
        data-action={'no-scroll'}
      >
        <ReactCalendar
          nextLabel={'→'}
          next2Label={null}
          prevLabel={'←'}
          prev2Label={null}
          maxDetail='month'
          // onClickDay={handleModalOpen}
          onClickDay={handleStartScheduleProcess}
          onActiveStartDateChange={handleSetMonthYear}
        />
        {sessSelectOpen && (
          <div className={sessSelect} id='tool-tip'>
            <span className={sessSelectClose} onClick={handleCloseSessSelect}>
              &times;
            </span>
            <ul className={sessLinks}>
              <h5 className={sessHeader}>Session Type</h5>
              {SESSION_TYPES.map((st) => {
                return (
                  <li key={st.type} onClick={() => handleModalOpen(st.url)}>
                    <div className={sessDetails}>
                      <span>{st.type}</span>
                      <span>{st.time}min</span>
                    </div>
                    <button className={sessBtn}>→</button>
                  </li>
                )
              })}
            </ul>
          </div>
        )}
        {modalOpen && (
          <CalendarModal
            position={modalPosition}
            date={currentDate}
            close={() => setModalOpen(false)}
            sessionUrl={apptType}
          />
        )}
      </div>
      <Script src='https://assets.calendly.com/assets/external/widget.js' />
    </div>
  )
}
