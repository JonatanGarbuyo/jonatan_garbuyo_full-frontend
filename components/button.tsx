import React from 'react'
import styles from './button.module.css'

interface Props {
  children: string
  className: string
  onClick?: () => void
}

export default function Button({ children, className, onClick }: Props) {
  return (
    <button className={`${styles.button} ${className}`} onClick={onClick}>
      {children}
    </button>
  )
}
