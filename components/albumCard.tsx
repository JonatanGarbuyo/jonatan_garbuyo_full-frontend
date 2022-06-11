import Button from '/components/button'

import styles from './albumCard.module.css'
import Image from 'next/image'

export default function AlbumCard({ album, onClick }) {
  return (
    <div className={styles.album__card}>
      <figure className={styles.album__image__wrapper}>
        <Image src={album.artwork} alt={album.name} layout="fill" />
      </figure>
      <h1>{album.name}</h1>
      <p>Publicado: {album.publishedDate}</p>
      {album.followed ? (
        <Button className={styles.album__button__remove} onClick={onClick}>
          - Remove album
        </Button>
      ) : (
        <Button className={styles.album__button__add} onClick={onClick}>
          + Add album
        </Button>
      )}
    </div>
  )
}
