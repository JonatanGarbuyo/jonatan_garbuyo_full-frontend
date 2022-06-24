export type SearchArtistResponseFromApi = {
  artists: {
    href: string
    items: {
      external_urls: { spotify: string }
      followers: { href?: string; total: number }
      genres: string[]
      href: string
      id: string
      images: { url: string }[]
      name: string
      popularity: number
      type: string
      uri: string
    }[]
    limit: number
    next: string
    offset: number
    previous?: string
    total: number
  }
}
