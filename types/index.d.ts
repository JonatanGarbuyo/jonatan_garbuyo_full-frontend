export interface NavigationProps {
  currentPage: number
  pagesCount: number
  onPageChange: (page: number) => void
}
