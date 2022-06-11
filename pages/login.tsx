import Head from 'next/head'
import Image from 'next/image'

import logo from '/public/images/logo.svg'
import arrowR from '/public/icon/arrowR.svg'
import arrow from '/public/images/arrow.svg'
import styles from '/styles/Login.module.css'

export default function Login() {
  const handleLogin = (event) => {
    event.preventDefault()
    console.log('Login')
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Login</title>
        <meta name="description" content="Login app" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <header className={styles.header}>
        <div className={styles.logo__image__wrapper}>
          <Image src={logo} alt="logo" layout={'fill'} />
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.main__image__wrapper}>
          <Image src={arrow} alt="arrow" layout={'fill'} />
        </div>
        <div className={styles.main__description}>
          <div>
            <h1>Disfruta de la</h1>
            <h1>
              <span>mejor música</span>
            </h1>
            <p>Accede a tu cuenta para guardar tus albumes favoritos.</p>
          </div>
          <div className={styles.main__login}>
            <a href="#" onClick={handleLogin}>
              <p>Log in con Spotify</p>
              <Image src={arrowR} alt="login" />
            </a>
          </div>
        </div>
      </main>
    </div>
  )
}
