import { getAccessToken } from '../lib/spotify'

const ARTIST_ENDPOINT = '	https://api.spotify.com/v1/artists/'

export const getArtist = async (refresh_token, id) => {
  const { access_token } = await getAccessToken(refresh_token)

  return fetch(`${ARTIST_ENDPOINT}${id}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })
}
