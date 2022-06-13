import { getAccessToken } from '../../../../lib/spotify'
import { getSession } from 'next-auth/react'

const ARTIST_ALBUMS_ENDPOINT = 'https://api.spotify.com/v1/artists/'

const getArtistAlbums = async (refresh_token, id) => {
  const { access_token } = await getAccessToken(refresh_token)

  return fetch(`${ARTIST_ALBUMS_ENDPOINT}${id}/albums?limit=4`, {
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

  const response = await getArtistAlbums(accessToken, id)
  const data = await response.json()
  const artistAlbums = data.items.map((album) => ({
    id: album.id,
    name: album.name,
    artwork: album.images[0],
    publishedDate: album.release_date,
  }))

  return res.status(200).json({ artistAlbums })
}

export default handler
