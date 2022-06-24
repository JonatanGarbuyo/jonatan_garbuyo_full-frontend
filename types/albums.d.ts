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

export type MyAlbumsResponseFromApi = {
  href: 'https://api.spotify.com/v1/me/albums?offset=0&limit=20'
  items: {
    added_at: string
    album: {
      album_type: string
      artists: [Array]
      available_markets: [Array]
      copyrights: [Array]
      external_ids: [Object]
      external_urls: [Object]
      genres: []
      href: string
      id: string
      images: { url: string }[]
      label: string
      name: string
      popularity: number
      release_date: string
      release_date_precision: string
      total_tracks: number
      tracks: [Object]
      type: string
      uri: string
    }
  }[]
  limit: number
  next?: number
  offset: number
  previous?: number
  total: number
}
