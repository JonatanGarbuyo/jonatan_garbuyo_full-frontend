import { ArtistResponseFromApi } from 'types/artist'

const ARTIST_ENDPOINT = '	https://api.spotify.com/v1/artists/'

export const getArtist = async (access_token: string, id: string) => {
  try {
    const response = await fetch(`${ARTIST_ENDPOINT}${id}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })
    const data: ArtistResponseFromApi = await response.json()

    const artist = {
      id: data.id,
      name: data.name,
      artwork: data.images[0],
      followers: data.followers.total,
    }

    return artist
  } catch (error) {
    console.log(error)
    return []
  }
}
