import React from 'react'

export const ArrowIcon = ({ color = 'var(--color-med)' }) => {
  return (
    <svg
      width='30'
      height='32'
      viewBox='0 0 30 32'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M29 14.125L15 0.999999L0.999999 14.125M15 0.999999L15 31'
        stroke={color}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
