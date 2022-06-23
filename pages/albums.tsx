import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'

import { getMyAlbums } from '../service/albums'

import AlbumCard from '../components/albumCard'
import Navbar from '../components/navbar'

import styles from '/styles/albums.module.css'
import { Album } from 'types'
import { getToken } from 'next-auth/jwt'

interface Props {
  albums: Album[]
}

export default function Albums({ albums }: Props) {
  return (
    <div>
      <Navbar />
      <main className={styles.container}>
        <section className={styles.my__albums}>
          <h1>Mis albumes</h1>
          <h1 className={`lemon`}>guardados</h1>
          <p>
            Disfruta de tu música a un solo click y descube que discos has
            guardado dentro de “mis álbumes”
          </p>
        </section>

        <section className={styles.albums}>
          <div className={styles.albums_container}>
            {albums.length
              ? albums.map((album) => (
                  <AlbumCard key={album.id} album={album} />
                ))
              : null}
          </div>
        </section>
      </main>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  const jwt = await getToken({ req })
  const access_token = jwt?.accessToken || ''
  const albums = await getMyAlbums(access_token)

  return {
    props: { session, albums },
  }
}
