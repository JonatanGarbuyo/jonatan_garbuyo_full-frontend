import Image from 'next/image'
import { useRouter } from 'next/router'
import { getSession } from 'next-auth/react'
import { GetServerSideProps } from 'next'

import AlbumCard from '../../components/albumCard'
import Navbar from '../../components/navbar'

import test from '/public/images/test.png'
import Puppets from '/public/images/Master_of_Puppets_cover.jpg'
import certIcon from '/public/icon/certIcon.svg'

import styles from '/styles/[artistName].module.css'

const albums = [
  {
    id: 1,
    name: 'Master of Puppets',
    publishedDate: '1986',
    artwork: Puppets,
    followed: true,
  },
  {
    id: 2,
    name: 'Master of Puppets',
    publishedDate: '1986',
    artwork: Puppets,
    followed: false,
  },
  {
    id: 3,
    name: 'Master of Puppets',
    publishedDate: '1986',
    artwork: Puppets,
    followed: false,
  },
  {
    id: 4,
    name: 'Master of Puppets',
    publishedDate: '1986',
    artwork: Puppets,
    followed: true,
  },
]

export default function Artist({ artist }) {
  // const router = useRouter()
  // const { artistName } = router.query
  function handleClick(e) {
    e.preventDefault()
    console.log('button clicked')
  }

  return (
    <div>
      <Navbar />
      <main className={styles.container}>
        <section className={styles.artist}>
          <figure className={styles.artist__image__wrapper}>
            <Image src={artist.artwork} alt={artist.name} layout="fill" />
          </figure>

          <div className={styles.artist__description}>
            <div className={styles.cert}>
              <figure className={styles.certt__image__wrapper}>
                <Image src={certIcon} alt="icon" layout="fill" />{' '}
              </figure>
              <p>Artista certificado</p>
            </div>
            <h1>{`{${artist.name}}`}</h1>
            <p>Followers: {artist.followers}</p>
            <p>Oyentes mensuales: {artist.monthlyListeners}</p>
          </div>
        </section>

        <section className={styles.albums}>
          <p>Guarda tus álbumes favoritos de {artist.name}</p>
          <div className={styles.albums_container}>
            {albums.map((album) => (
              <AlbumCard key={album.id} album={album} onClick={handleClick} />
            ))}
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

  return {
    props: {
      session,
      artist: {
        id: 12343221231,
        name: 'Metallica',
        followers: 234,
        artwork: test,
        publishedDate: '10-12-1998',
        monthlyListeners: 789,
      },
    },
  }
}
