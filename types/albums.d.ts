export interface Album {
  id: string
  name: string
  artwork: { url: string }
  publishedDate: string
}

export type AlbumsResponseFromApi = {
  items: {
    album_group: string
    album_type: string
    artists: [[Object]]
    available_markets: string[]
    external_urls: {
      spotify: string
    }
    href: string
    id: string
    images: { url: string }[]
    name: string
    release_date: string
    release_date_precision: string
    total_tracks: number
    type: string
    uri: string
  }[]
}
