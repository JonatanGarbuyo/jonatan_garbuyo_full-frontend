import Head from 'next/head'
import Image from 'next/image'

import Navbar from '/components/navbar'
import test from '/public/images/test.png'
import styles from '/styles/Home.module.css'

export default function Home() {
  const artists = [
    {
      id: 12343221231,
      name: 'Metallica',
      followers: 234,
      artwork: test,
      publishedDate: '10-12-1998',
    },
    {
      id: 12343221231,
      name: 'Metallica',
      followers: 234,
      artwork: test,
      publishedDate: '10-12-1998',
    },
    {
      id: 12343221231,
      name: 'Metallica',
      followers: 234,
      artwork: test,
      publishedDate: '10-12-1998',
    },
    {
      id: 12343221231,
      name: 'Metallica',
      followers: 234,
      artwork: test,
      publishedDate: '10-12-1998',
    },
  ]

  return (
    <div className={styles.container}>
      <Head>
        <title>fullstack-front-test</title>
        <meta name="description" content="Spotify client app" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Navbar />

      <main className={styles.main}>
        <div className={styles.search__title}>
          <h1>Busca tus</h1>
          <h1 className={`lemon`}>artistas</h1>
          <p>
            Encuentra tus artistas favoritos gracias a nuestro buscador y guarda
            tus álbumes favoritos
          </p>
        </div>
        <div className={styles.search__form}>
          <form>
            <input></input>
            <button>Search</button>
          </form>
        </div>

        <div className={styles.search__result}>
          <p>Mostrando 4 resultados de {artists.length}</p>

          <div className={styles.search__results}>
            {artists.map((artist) => (
              <div key={artist.id} className={styles.card}>
                <div className={styles.artwork__wrapper}>
                  <Image src={artist.artwork} alt="art-work" layout="fill" />
                </div>
                <h2>{artist.name}</h2>
                <p className={styles.followers}>
                  Followers: {artist.followers}
                </p>
                <div className={styles.visible__tablet}>
                  <p>Publicado: {artist.publishedDate}</p>
                  <button>+ add album</button>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.pagination}>
            <span>&lt;</span>
            <span>10</span>
            <span>...</span>
            <span className={`lemon`}>12</span>
            <span>13</span>
            <span>14</span>
            <span>...</span>
            <span>20</span>
            <span>&gt;</span>
          </div>
        </div>
      </main>
    </div>
  )
}
