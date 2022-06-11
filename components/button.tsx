import React from 'react'
import styles from './button.module.css'

export default function Button({ children, className, onClick }) {
  return (
    <button className={`${styles.button} ${className}`} onClick={onClick}>
      {children}
    </button>
  )
}
