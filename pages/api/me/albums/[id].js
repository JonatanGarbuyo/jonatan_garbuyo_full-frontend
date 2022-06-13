import { getAccessToken } from '../../../../lib/spotify'
import { getSession } from 'next-auth/react'

const SAVE_ALBUM_ENDPOINT = 'https://api.spotify.com/v1/me/albums?ids='

const saveAlbum = async (refresh_token, id) => {
  const { access_token } = await getAccessToken(refresh_token)

  return fetch(`${SAVE_ALBUM_ENDPOINT}${id}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })
}

const deleteAlbum = async (refresh_token, id) => {
  const { access_token } = await getAccessToken(refresh_token)

  return fetch(`${SAVE_ALBUM_ENDPOINT}${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })
}

const handler = async (req, res) => {
  const {
    query: { id },
  } = req
  const {
    token: { accessToken },
  } = await getSession({ req })

  let response
  if (req.method === 'PUT') {
    response = await saveAlbum(accessToken, id)
  }
  if (req.method === 'DELETE') {
    response = await deleteAlbum(accessToken, id)
  }

  return res.status(200).json({ modified: response.ok })
}

export default handler
