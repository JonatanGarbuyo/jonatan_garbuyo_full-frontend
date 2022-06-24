import { AlbumsResponseFromApi } from 'types/albums'

const MY_ALBUMS_ENDPOINT = 'https://api.spotify.com/v1/me/albums'
const CONTAINS_ENDPOINT = 'https://api.spotify.com/v1/me/albums/contains'

export const getMyAlbums = async (access_token: string) => {
  try {
    const response = await fetch(MY_ALBUMS_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })
    const { items }: AlbumsResponseFromApi = await response.json()

    return items.map((album) => ({
      id: album.id,
      name: album.name,
      artwork: album.images[0],
      publishedDate: album.release_date,
      followed: true,
    }))
  } catch (error) {
    console.log(error)
    return []
  }
}

export const checkSavedAlbum = async (access_token: string, id: string) => {
  return fetch(`${CONTAINS_ENDPOINT}?ids=${id}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  }).then((response) => response.json())
}
