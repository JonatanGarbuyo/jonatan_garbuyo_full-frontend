import Image from 'next/image'

import logo from '/public/images/logo.svg'
import logoSmall from '/public/images/logoSmall.svg'
import light from '/public/icon/light.svg'
import logout from '/public/icon/logout.svg'

import styles from './navbar.module.css'

export default function Navbar() {
  return (
    <header className={styles.header}>
      <div className={`hidden-xs ${styles.logo__image__wrapper}`}>
        <Image src={logo} alt="logo" layout={'fill'} />
      </div>
      <div className={`${styles.logo__image__wrapper} hidden-sm`}>
        <Image src={logoSmall} alt="logo" layout={'fill'} />
      </div>
      <nav>
        <ul>
          <li className={`lemon`}>Buscar</li>
          <li>Mis Albumes</li>
          <li>
            <div />
          </li>
          <li>
            <span className={`hidden-xs`}>Cerrar sesión</span>
            <span id="logout" className={`${styles.logout} visible-xs-block`}>
              <Image src={logout} alt="logout" layout="fill" />
            </span>
          </li>

          <li className={`hidden-sm`}>
            <div />
          </li>
          <li className={`${styles.light}  visible-xs-block  hidden-sm`}>
            <Image src={light} alt="light icon" layout="fill" />
          </li>
        </ul>
      </nav>
    </header>
  )
}
