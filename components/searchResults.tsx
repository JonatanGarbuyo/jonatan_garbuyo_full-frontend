import ArtistCard from './artistCard'

import styles from './searchResults.module.css'

export default function SearchResults({ artists }) {
  return (
    <div className={styles.search__result}>
      <p>Mostrando 4 resultados de {artists.length}</p>
      <div className={styles.search__results}>
        {artists.map((artist) => (
          <ArtistCard key={artist.id} artist={artist} />
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
  )
}
