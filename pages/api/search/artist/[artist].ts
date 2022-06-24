import { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt'
import { Artist } from 'types/artist'
import { SearchArtistResponseFromApi } from 'types/search'

const SEARCH_ENDPOINT = 'https://api.spotify.com/v1/search?'

const searchArtist = async (
  access_token: string,
  key: string,
  value: string | string[],
): Promise<any> => {
  //max limit 50
  return fetch(`${SEARCH_ENDPOINT}q=${key}:${value}&type=${key}&limit=50`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { query } = req
    const [[key, value]] = Object.entries(query)
    const jwt = await getToken({ req })
    const access_token = jwt?.accessToken || ''

    const response = await searchArtist(access_token, key, value)
    const data: SearchArtistResponseFromApi = await response.json()

    const artists: Artist[] = data.artists.items.map((artist) => ({
      id: artist.id,
      name: artist.name,
      artwork: artist.images[0],
      followers: artist.followers.total,
    }))
    return res.status(200).json({ artists })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error })
  }
}
