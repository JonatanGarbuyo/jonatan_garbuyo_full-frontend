import PaginationNavigation from './paginationNavigation'

import { arrayRange } from '../utils/helperFunctions'

import styles from './pagination.module.css'

export default function Pagination({ currentPage, itemsCount, onPageChange }) {
  const navigationProps = {
    currentPage,
    itemsCount,
    onPageChange,
  }

  let pages = [currentPage - 1, currentPage, currentPage + 1]
  if (currentPage <= 1) {
    pages = arrayRange(1, 3)
  }
  if (currentPage >= itemsCount) {
    pages = arrayRange(itemsCount - 2, itemsCount)
  }

  return (
    <nav className={styles.pagination}>
      <ul>
        <PaginationNavigation navigationProps={navigationProps}>
          {pages.map((page, i) => (
            <li key={i}>
              <a
                className={page === currentPage ? 'lemon' : ''}
                onClick={() => onPageChange(page)}
              >
                {page}
              </a>
            </li>
          ))}
        </PaginationNavigation>
      </ul>
    </nav>
  )
}
