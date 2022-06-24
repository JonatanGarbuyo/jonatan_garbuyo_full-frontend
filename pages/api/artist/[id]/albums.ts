import { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt'
import { Album, AlbumsResponseFromApi } from 'types/albums'

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
  try {
    const { id } = req.query
    const jwt = await getToken({ req })
    const access_token = jwt?.accessToken || ''

    const { items }: AlbumsResponseFromApi = await fetchArtistAlbums(
      access_token,
      id,
    )
    const albums: Album[] = items.map((album) => ({
      id: album.id || 'nada',
      name: album.name,
      artwork: album.images[0],
      publishedDate: album.release_date,
    }))

    return res.status(200).json({ artistAlbums: albums })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error })
  }
}
