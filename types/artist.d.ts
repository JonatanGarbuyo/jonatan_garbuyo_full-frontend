export interface Artist {
  id: string
  name: string
  artwork: { url: string }
  followers: number
}

export type ArtistResponseFromApi = {
  external_urls: {
    spotify: string
  }
  followers: {
    href?: string
    total: number
  }
  genres: string[]
  href: string
  id: string
  images: {
    height: number
    url: string
    width: number
  }[]
  name: string
  popularity: number
  type: string
  uri: string
}
