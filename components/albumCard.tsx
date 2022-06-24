import { useEffect, useState } from 'react'
import Image from 'next/image'

import { Album } from 'types/albums'
import Button from './button'
import noArtwork from '../public/images/noArtwork.png'

import styles from './albumCard.module.css'

interface Props {
  album: Album
}

export default function AlbumCard({ album }: Props) {
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    fetch(`/api/me/albums/contains/${album.id}`)
      .then((response) => response.json())
      .then(({ isSaved }: { isSaved: boolean }) => {
        setSaved(isSaved)
      })
  }, [album.id])

  const handleAddAlbum = (albumId: string) => {
    fetch(`/api/me/albums/${albumId}`, {
      method: 'PUT',
    })
      .then((respose) => respose.json())
      .then((modified: boolean) => {
        if (modified) setSaved(true)
      })
  }

  const handleRemoveAlbum = (albumId: string) => {
    fetch(`/api/me/albums/${albumId}`, {
      method: 'DELETE',
    })
      .then((respose) => respose.json())
      .then((modified: boolean) => {
        if (modified) setSaved(false)
      })
  }

  return (
    <div className={styles.album__card}>
      <figure className={styles.album__image__wrapper}>
        <Image
          src={album.artwork.url || noArtwork}
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
