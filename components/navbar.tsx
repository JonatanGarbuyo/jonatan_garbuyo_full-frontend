import Image from 'next/image'
import { signOut } from 'next-auth/react'

import logo from '/public/images/logo.svg'
import logoSmall from '/public/images/logoSmall.svg'
import light from '/public/icon/light.svg'
import logout from '/public/icon/logout.svg'

import styles from './navbar.module.css'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function Navbar() {
  const router = useRouter()

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
          <li className={router.asPath === '/' && `lemon`}>
            <Link href="/">
              <a>Buscar</a>
            </Link>
          </li>
          <li className={router.asPath === '/albums' && `lemon`}>
            <Link href="/albums">
              <a>Mis Albumes</a>
            </Link>
          </li>
          <li>
            <div />
          </li>
          <li>
            <span
              className={`hidden-xs ${styles.logout}`}
              onClick={() => signOut()}
            >
              Cerrar sesión
            </span>
            <span
              id="logout"
              className={`${styles.logout__icon} visible-xs-block`}
              onClick={() => signOut()}
            >
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
