import React from 'react'

export const MenuThumb = ({ color = 'var(--color-med)' }) => {
  return (
    <svg
      width='25'
      height='25'
      viewBox='0 0 25 25'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M18.3335 18.334H24.1668V24.1673H18.3335V18.334ZM9.5835 18.334H15.4168V24.1673H9.5835V18.334ZM0.833496 18.334H6.66683V24.1673H0.833496V18.334ZM18.3335 9.58398H24.1668V15.4173H18.3335V9.58398ZM9.5835 9.58398H15.4168V15.4173H9.5835V9.58398ZM0.833496 9.58398H6.66683V15.4173H0.833496V9.58398ZM18.3335 0.833984H24.1668V6.66732H18.3335V0.833984ZM9.5835 0.833984H15.4168V6.66732H9.5835V0.833984ZM0.833496 0.833984H6.66683V6.66732H0.833496V0.833984Z'
        fill={color}
      />
    </svg>
  )
}
