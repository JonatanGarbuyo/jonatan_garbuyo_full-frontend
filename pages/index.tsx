import Head from 'next/head'
import { getSession } from 'next-auth/react'
import { GetServerSideProps } from 'next'
import { searchArtists } from '../service/search'
import SearchResults from '../components/searchResults'
import Navbar from '../components/navbar'
import Button from '../components/button'

import styles from '/styles/Home.module.css'
import { useState } from 'react'

export default function Home() {
  const [artists, setArtists] = useState([])
  const [keywords, setKeywords] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setKeywords(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!keywords) return null //TODO  validate imput
    const artistsArray = await searchArtists(keywords)
    setArtists(artistsArray)
    setKeywords('')
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>fullstack-front-test</title>
        <meta name="description" content="Spotify client app" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Navbar />

      <main className={styles.main}>
        <div className={styles.search__title}>
          <h1>Busca tus</h1>
          <h1 className={`lemon`}>artistas</h1>
          <p>
            Encuentra tus artistas favoritos gracias a nuestro buscador y guarda
            tus álbumes favoritos
          </p>
        </div>
        <div className={styles.search__form}>
          <form onSubmit={handleSubmit} autoComplete="on">
            <input
              type="text"
              value={keywords}
              onChange={handleChange}
              autoComplete="on"
            />
            <Button className={styles.search__form__button}>Search</Button>
          </form>
        </div>
        {artists.length ? <SearchResults artists={artists} /> : null}
      </main>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  return {
    props: { session },
  }
}
