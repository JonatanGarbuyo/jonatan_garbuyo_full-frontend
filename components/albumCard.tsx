import { useEffect, useState } from 'react'
import Image from 'next/image'

import Button from './button'
import noArtwork from '../public/images/noArtwork.png'

import styles from './albumCard.module.css'

export default function AlbumCard({ album }) {
  const [saved, setSaved] = useState(null)

  useEffect(() => {
    fetch(`/api/me/albums/contains/${album.id}`)
      .then((response) => response.json())
      .then(({ isSaved }) => {
        setSaved(isSaved)
      })
  }, [album.id])

  const handleAddAlbum = (albumId) => {
    fetch(`/api/me/albums/${albumId}`, {
      method: 'PUT',
    })
      .then((respose) => respose.json())
      .then(({ modified }) => {
        if (modified) setSaved(true)
      })
  }
  const handleRemoveAlbum = (albumId) => {
    fetch(`/api/me/albums/${albumId}`, {
      method: 'DELETE',
    })
      .then((respose) => respose.json())
      .then(({ modified }) => {
        if (modified) setSaved(false)
      })
  }

  return (
    <div className={styles.album__card}>
      <figure className={styles.album__image__wrapper}>
        <Image
          src={album.artwork?.url || noArtwork}
          alt={album.name}
          layout="fill"
        />
      </figure>
      <h1>{album.name}</h1>
      <p>Publicado: {album.publishedDate}</p>
      {saved ? (
        <Button
          className={styles.album__button__remove}
          onClick={() => handleRemoveAlbum(album.id)}
        >
          - Remove album
        </Button>
      ) : (
        <Button
          className={styles.album__button__add}
          onClick={() => handleAddAlbum(album.id)}
        >
          + Add album
        </Button>
      )}
    </div>
  )
}
