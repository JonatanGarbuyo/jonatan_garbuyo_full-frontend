export type AlbumsResponseFromApi = {
  items: {
    album: {
      id: string
      name: string
      images: {
        url: string
      }[]
      release_date: string
    }
  }[]
}
