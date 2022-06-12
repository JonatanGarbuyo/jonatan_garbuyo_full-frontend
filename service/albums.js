import { getAccessToken } from '../lib/spotify'

const ARTIST_ENDPOINT = 'https://api.spotify.com/v1/me/albums'

export const getMyAlbums = async (refresh_token) => {
  const { access_token } = await getAccessToken(refresh_token)

  return fetch(`${ARTIST_ENDPOINT}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })
}
