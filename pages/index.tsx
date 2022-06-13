import Head from 'next/head'
import { getSession } from 'next-auth/react'
import { GetServerSideProps } from 'next'

import SearchResults from '../components/searchResults'
import Navbar from '../components/navbar'
import Button from '../components/button'

import styles from '/styles/Home.module.css'
import { useState } from 'react'

export default function Home() {
  const [artists, setArtists] = useState([])
  const [search, setSearch] = useState('')

  const handleChange = (e) => {
    setSearch(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const url = `/api/search/artist/${search}`
    if (!search) setArtists([])
    if (search)
      fetch(url)
        .then((response) => response.json())
        .then(({ artists }) => {
          setArtists(artists)
          setSearch('')
        })
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
              value={search}
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
