import { getAccessToken } from '../lib/spotify'

const MY_ALBUMS_ENDPOINT = 'https://api.spotify.com/v1/me/albums'

export const getMyAlbums = async (refresh_token) => {
  const { access_token } = await getAccessToken(refresh_token)

  return fetch(MY_ALBUMS_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })
}

export const checkSavedAlbum = async (refresh_token, id) => {
  const { access_token } = await getAccessToken(refresh_token)

  return fetch(`https://api.spotify.com/v1/me/albums/contains?ids=${id}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })
}
