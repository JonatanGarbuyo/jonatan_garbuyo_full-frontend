import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import Button from './button'
import noArtwork from '../public/images/noArtwork.png'
import styles from './artistCard.module.css'

export default function ArtistCard({ artist }) {
  const router = useRouter()

  function handleClick(e) {
    e.preventDefault()
    router.push(`/artist/${artist.id}`)
  }

  return (
    <div className={styles.card}>
      <Link href={`/artist/${artist.id}`}>
        <a className={styles.card__link}>
          <div className={styles.artwork__wrapper}>
            <Image
              src={artist.artwork?.url || noArtwork}
              alt="art-work"
              layout="fill"
            />
          </div>
          <h2>{artist.name}</h2>
          <p className={styles.followers}>Followers: {artist.followers}</p>
        </a>
      </Link>
      <Button className={styles.card__button} onClick={handleClick}>
        Artist albums
      </Button>
    </div>
  )
}
