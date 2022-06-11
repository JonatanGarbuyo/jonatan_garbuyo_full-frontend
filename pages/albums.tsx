import AlbumCard from '../components/albumCard'
import Navbar from '../components/navbar'

import Puppets from '/public/images/Master_of_Puppets_cover.jpg'

import styles from '/styles/albums.module.css'

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

export default function Albums() {
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
            {albums.map((album) => (
              <AlbumCard key={album.id} album={album} onClick={handleClick} />
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
