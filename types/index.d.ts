export interface Artist {
  id: string
  name: string
  artwork: { url: string }
  followers: number
}

export interface Album {
  id: string
  name: string
  artwork: { url: string }
  publishedDate: string
}

interface NavigationProps {
  currentPage: number
  pagesCount: number
  onPageChange: (page: number) => void
}
