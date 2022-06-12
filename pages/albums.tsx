import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'

import { getMyAlbums } from '../service/albums'

import AlbumCard from '../components/albumCard'
import Navbar from '../components/navbar'

import styles from '/styles/albums.module.css'

export default function Albums({ albums }) {
  function handleClick(e) {
    e.preventDefault()
    console.log('button clicked')
  }

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
                  <AlbumCard
                    key={album.id}
                    album={album}
                    onClick={handleClick}
                  />
                ))
              : null}
          </div>
        </section>
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

  // TODO: fix const type
  const {
    token: { accessToken },
  }: any = session

  const response = await getMyAlbums(accessToken)
  const data = await response.json()
  const albums = data.items.map(({ album }) => ({
    id: album.id,
    name: album.name,
    artwork: album.images[0],
    publishedDate: album.release_date,
    followed: true,
  }))

  return {
    props: { session, albums },
  }
}
