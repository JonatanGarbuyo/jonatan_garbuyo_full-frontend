import { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt'
import { checkSavedAlbum } from 'service/albums'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { id } = req.query
    const jwt = await getToken({ req })
    const access_token = jwt?.accessToken || ''

    const [isSaved] = await checkSavedAlbum(access_token, id as string)
    return res.status(200).json({ isSaved })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error })
  }
}
