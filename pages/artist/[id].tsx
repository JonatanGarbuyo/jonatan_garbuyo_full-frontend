import { useEffect, useState } from 'react'
import Image from 'next/image'
import { getSession } from 'next-auth/react'
import { GetServerSideProps } from 'next'
import { getArtist } from '../../service/artist'

import AlbumCard from '../../components/albumCard'
import Navbar from '../../components/navbar'

import noArtwork from '../../public/images/noArtwork.png'
import certIcon from '/public/icon/certIcon.svg'

import styles from '/styles/[artistName].module.css'

export default function Artist({ artist }) {
  const [albums, setAlbums] = useState([])
  const url = `/api/artist/${artist.id}/albums`

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then(({ artistAlbums }) => {
        setAlbums(artistAlbums)
      })
  }, [url])

  return (
    <div>
      <Navbar />
      <main className={styles.container}>
        <section className={styles.artist}>
          <figure className={styles.artist__image__wrapper}>
            <Image
              src={artist.artwork?.url || noArtwork}
              alt={artist.name}
              layout="fill"
              priority={true}
            />
          </figure>

          <div className={styles.artist__description}>
            <div className={styles.cert}>
              <figure className={styles.certt__image__wrapper}>
                <Image src={certIcon} alt="icon" layout="fill" />{' '}
              </figure>
              <p>Artista certificado</p>
            </div>
            <h1>{`${artist.name}`}</h1>
            <p>Followers: {artist.followers}</p>
            {/* no hay cantidad de oyentes mensuales en la api */}
            {/* <p>Oyentes mensuales: {artist.monthlyListeners}</p> */}
            <p>Oyentes mensuales: {artist.followers * 2}</p>
          </div>
        </section>

        <section className={styles.albums}>
          <p>Guarda tus álbumes favoritos de {artist.name}</p>
          <div className={styles.albums_container}>
            {albums.map((album) => (
              <AlbumCard key={album.id} album={album} />
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

  // TODO: fix const type
  const {
    token: { accessToken },
  }: any = session
  const {
    params: { id },
  } = context
  const response = await getArtist(accessToken, id)
  const data = await response.json()
  const artist = {
    id: data.id,
    name: data.name,
    artwork: data.images[0],
    followers: data.followers.total,
  }

  return {
    props: {
      session,
      artist,
    },
  }
}
