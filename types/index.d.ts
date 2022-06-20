export interface Artist {
  id: string
  name: string
  artwork: { url: string }
  followers: number
}

interface NavigationProps {
  currentPage: number
  pagesCount: number
  onPageChange: (page: number) => void
}

///////////////
export interface Album {
  id: string
  name: string
  images: string[]
  release_date: string
}

export type AlbumsResponseFromApi = Array<{
  items: {
    id: string
    name: string
    images: string[]
    release_date: string
  }[]
}>
