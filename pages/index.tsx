import Head from 'next/head'
import { useRouter } from 'next/router'
import { getSession, useSession } from 'next-auth/react'
import { GetServerSideProps } from 'next'

import ArtistCard from '../components/artistCard'
import Navbar from '../components/navbar'
import Button from '../components/button'
import test from '/public/images/test.png'

import styles from '/styles/Home.module.css'

const artists = [
  {
    id: 12343221231,
    name: 'Metallica',
    followers: 234,
    artwork: test,
    publishedDate: '10-12-1998',
  },
  {
    id: 12343221231,
    name: 'Metallica',
    followers: 234,
    artwork: test,
    publishedDate: '10-12-1998',
  },
  {
    id: 12343221231,
    name: 'Metallica',
    followers: 234,
    artwork: test,
    publishedDate: '10-12-1998',
  },
  {
    id: 12343221231,
    name: 'Metallica',
    followers: 234,
    artwork: test,
    publishedDate: '10-12-1998',
  },
]

export default function Home() {
  const router = useRouter()
  const { data: session } = useSession()
  console.log('session: ', session?.user)

  function handleClick(e) {
    e.preventDefault()
    console.log('button clicked')
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
          <form>
            <input></input>
            <Button
              className={styles.search__form__button}
              onClick={handleClick}
            >
              Search
            </Button>
          </form>
        </div>

        <div className={styles.search__result}>
          <p>Mostrando 4 resultados de {artists.length}</p>
          <div className={styles.search__results}>
            {artists.map((artist) => (
              <ArtistCard key={artist.id} artist={artist} />
            ))}
          </div>

          <div className={styles.pagination}>
            <span>&lt;</span>
            <span>10</span>
            <span>...</span>
            <span className={`lemon`}>12</span>
            <span>13</span>
            <span>14</span>
            <span>...</span>
            <span>20</span>
            <span>&gt;</span>
          </div>
        </div>
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