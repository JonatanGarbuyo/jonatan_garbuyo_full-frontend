import { getAccessToken } from '../../../../lib/spotify'
import { getSession } from 'next-auth/react'

const SEARCH_ENDPOINT = 'https://api.spotify.com/v1/search?'

const searchArtist = async (refresh_token, query) => {
  const [[key, value]] = Object.entries(query)
  const { access_token } = await getAccessToken(refresh_token)

  return fetch(`${SEARCH_ENDPOINT}q=${key}:${value}&type=${key}&limit=4`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })
}

const handler = async (req, res) => {
  const { query } = req
  const {
    token: { accessToken },
  } = await getSession({ req })

  const response = await searchArtist(accessToken, query)
  const data = await response.json()
  const artists = data.artists.items.map((artist) => ({
    id: artist.id,
    name: artist.name,
    artwork: artist.images[0],
    followers: artist.followers.total,
  }))

  return res.status(200).json({ artists })
}

export default handler
