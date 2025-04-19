import axios from 'axios'

const BASE = 'https://api.themoviedb.org/3'
const KEY = process.env.REACT_APP_API_KEY

export async function searchMovies(query, page = 1) {
  const { data } = await axios.get(`${BASE}/search/movie`, {
    params: { api_key: KEY, query, page },
  })
  return data
}
