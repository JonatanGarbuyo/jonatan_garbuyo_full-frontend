import { getAccessToken } from '../../../../../lib/spotify'
import { getSession } from 'next-auth/react'

const CONTAINS_ENDPOINT = 'https://api.spotify.com/v1/me/albums/contains?ids='

const checkAlbum = async (refresh_token, id) => {
  const { access_token } = await getAccessToken(refresh_token)

  return fetch(`${CONTAINS_ENDPOINT}${id}`, {
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

  const response = await checkAlbum(accessToken, id)
  const [isSaved] = await response.json()

  return res.status(200).json({ isSaved })
}

export default handler
