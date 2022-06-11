import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import Button from './button'

import styles from './artistCard.module.css'

export default function ArtistCard({ artist }) {
  const router = useRouter()

  function handleClick(e) {
    e.preventDefault()
    console.log(artist.name)
    router.push(`/artist/${artist.id}`)
  }

  return (
    <Link href={`/artist/${artist.id}`}>
      <a className={styles.card}>
        <div className={styles.artwork__wrapper}>
          <Image src={artist.artwork} alt="art-work" layout="fill" />
        </div>
        <h2>{artist.name}</h2>
        <p className={styles.followers}>Followers: {artist.followers}</p>
        <Button className={styles.card__button} onClick={handleClick}>
          Artist albums
        </Button>
      </a>
    </Link>
  )
}
