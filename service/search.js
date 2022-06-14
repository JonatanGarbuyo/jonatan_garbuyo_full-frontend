export async function searchArtists(keywords) {
  let data = []
  try {
    const response = await fetch(`/api/search/artist/${keywords}`)
    const { artists } = await response.json()
    data = artists
  } catch (error) {
    console.log(error)
  }
  return data
}
