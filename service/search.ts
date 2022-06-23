import { Artist } from 'types'

interface Response {
  artists: Artist[]
}

export async function searchArtists(keywords: string) {
  try {
    const response = await fetch(`/api/search/artist/${keywords}`)
    const data: Response = await response.json()
    return data.artists
  } catch (error) {
    console.log(error)
  }
}
