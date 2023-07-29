import { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt'

const SAVE_ALBUM_ENDPOINT = 'https://api.spotify.com/v1/me/albums?ids='

const saveAlbum = async (access_token: string, id: string) => {
  return fetch(`${SAVE_ALBUM_ENDPOINT}${id}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })
}

const deleteAlbum = async (access_token: string, id: string) => {
  return fetch(`${SAVE_ALBUM_ENDPOINT}${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { id } = req.query
  const jwt = await getToken({ req })
  const access_token = jwt?.accessToken || ''

  let response
  if (req.method === 'PUT') {
    response = await saveAlbum(access_token, id as string)
  }
  if (req.method === 'DELETE') {
    response = await deleteAlbum(access_token, id as string)
  }

  return res.status(200).json({ modified: response?.ok || false })
}
