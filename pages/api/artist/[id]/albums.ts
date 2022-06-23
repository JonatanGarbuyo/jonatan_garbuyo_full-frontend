import { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt'
import { AlbumsResponseFromApi } from 'types/albums'
import { Album } from 'types'

const ARTIST_ALBUMS_ENDPOINT = 'https://api.spotify.com/v1/artists/'

const fetchArtistAlbums = async (
  access_token: string,
  id: string | string[],
) => {
  return fetch(`${ARTIST_ALBUMS_ENDPOINT}${id}/albums?`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  }).then((response) => response.json())
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  let artistAlbums: Album[]

  try {
    const { id } = req.query
    const jwt = await getToken({ req })
    const access_token = jwt?.accessToken || ''

    const { items }: AlbumsResponseFromApi = await fetchArtistAlbums(
      access_token,
      id,
    )

    artistAlbums = items.map(({ album }) => ({
      id: album.id,
      name: album.name,
      artwork: album.images[0],
      publishedDate: album.release_date,
    }))
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error })
  }
  return res.status(200).json({ albums: artistAlbums })
}
