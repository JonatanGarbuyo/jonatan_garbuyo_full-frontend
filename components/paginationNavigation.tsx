import Image from 'next/image'
import next from '../public/icon/next.svg'
import prev from '../public/icon/prev.svg'

export default function PaginationNavigation({ children, navigationProps }) {
  const { currentPage, pagesCount, onPageChange } = navigationProps

  return (
    <>
      {currentPage >= 1 ? (
        <li>
          <a onClick={() => onPageChange(Math.max(1, currentPage - 1))}>
            <Image src={prev} alt="&lt;" layout="fill" />
          </a>
        </li>
      ) : null}
      {currentPage > 2 ? (
        <li>
          <a onClick={() => onPageChange(1)}>1</a>
        </li>
      ) : null}
      {currentPage > 3 ? <li>...</li> : null}
      {
        // children component
        children
      }
      {currentPage < pagesCount - 2 ? <li>...</li> : null}
      {currentPage < pagesCount - 1 ? (
        <li>
          <a onClick={() => onPageChange(pagesCount)}>{pagesCount}</a>
        </li>
      ) : null}
      <li>
        <a onClick={() => onPageChange(Math.min(pagesCount, currentPage + 1))}>
          <Image src={next} alt="&gt;" layout="fill" />
        </a>
      </li>
    </>
  )
}
