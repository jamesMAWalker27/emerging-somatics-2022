import React from 'react'

export const CloseBtn = ({ color = 'var(--color-med)' }) => {
  return (
    <svg
      width='17'
      height='17'
      viewBox='0 0 17 17'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M7.11926 8.5L0 15.6193L1.38074 17L8.5 9.88074L15.6193 17L17 15.6193L9.88074 8.5L17 1.38074L15.6193 0L8.5 7.11926L1.38074 0L0 1.38074L7.11926 8.5Z'
        fill={color}
      />
    </svg>
  )
}
