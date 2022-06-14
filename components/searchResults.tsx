import { useEffect, useState } from 'react'

import { paginate } from '../utils/paginate'

import ArtistCard from './artistCard'
import Pagination from './pagination'

import styles from './searchResults.module.css'

export default function SearchResults({ artists }) {
  const pageSize = 4
  const [currentPage, setCurrentPage] = useState(1)

  const pageContent = paginate(artists, currentPage, pageSize)

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  return (
    <div className={styles.search__result}>
      <p>Mostrando 4 resultados de {artists.length}</p>
      <div className={styles.search__results}>
        {pageContent.map((artist) => (
          <ArtistCard key={artist.id} artist={artist} />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        pagesCount={artists.length / pageSize}
        onPageChange={handlePageChange}
      />
    </div>
  )
}
