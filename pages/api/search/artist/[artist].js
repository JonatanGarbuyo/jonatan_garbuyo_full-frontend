import { getAccessToken } from '../../../../lib/spotify'
import { getSession } from 'next-auth/react'

const SEARCH_ENDPOINT = 'https://api.spotify.com/v1/search?'

const searchArtist = async (refresh_token, query) => {
  const [[key, value]] = Object.entries(query)
  const { access_token } = await getAccessToken(refresh_token)

  //max limit 50
  return fetch(`${SEARCH_ENDPOINT}q=${key}:${value}&type=${key}&limit=48`, {
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

  let artists
  try {
    const response = await searchArtist(accessToken, query)
    const data = await response.json()
    if (data.error) {
      const { status, message } = data.error
      return res.status(status).json({ message })
    }
    artists = data.artists.items.map((artist) => ({
      id: artist.id,
      name: artist.name,
      artwork: artist.images[0],
      followers: artist.followers.total,
    }))
  } catch (error) {
    console.log(error)
  }

  return res.status(200).json({ artists })
}

export default handler
