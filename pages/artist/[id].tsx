import { useEffect, useState } from 'react'
import { GetServerSideProps } from 'next'
import Image from 'next/image'
import { getSession } from 'next-auth/react'
import { getToken } from 'next-auth/jwt'

import AlbumCard from '../../components/albumCard'
import Navbar from '../../components/navbar'
import { getArtist } from '../../service/artist'
import noArtwork from '../../public/images/noArtwork.png'
import certIcon from '/public/icon/certIcon.svg'

import { Artist } from 'types/artist'
import { Album } from 'types/albums'

import styles from '/styles/[artistName].module.css'

interface Props {
  artist: Artist
}

export default function ArtistPage({ artist }: Props) {
  const [albums, setAlbums] = useState<Album[]>([])
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
  const id = context.params?.id

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
  const artist = await getArtist(access_token, id as string)
  return {
    props: {
      session,
      artist,
    },
  }
}
