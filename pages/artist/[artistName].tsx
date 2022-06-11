import Image from 'next/image'
import { useRouter } from 'next/router'

import Navbar from '/components/navbar'
import Button from '/components/button'

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
              <div key={album.id} className={styles.album__card}>
                <figure className={styles.album__image__wrapper}>
                  <Image src={album.artwork} alt={album.name} layout="fill" />
                </figure>
                <h1>{album.name}</h1>
                <p>Publicado: {album.publishedDate}</p>
                {album.followed ? (
                  <Button
                    className={styles.album__button__remove}
                    onClick={handleClick}
                  >
                    - Remove album
                  </Button>
                ) : (
                  <Button
                    className={styles.album__button__add}
                    onClick={handleClick}
                  >
                    + Add album
                  </Button>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

export async function getServerSideProps() {
  return {
    props: {
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
