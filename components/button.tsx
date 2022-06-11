import React from 'react'
import styles from './button.module.css'

export default function Button({ children, className }) {
  return <button className={`${styles.button} ${className}`}>{children}</button>
}
