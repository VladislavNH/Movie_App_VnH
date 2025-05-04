const API_KEY = '5cc7606e70c5d733552f409d1a4a9c00'
const BASE_URL = 'https://api.themoviedb.org/3'

export async function fetchGenres() {
  const res = await fetch(
    `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=ru`
  )
  if (!res.ok) {
    throw new Error(`Ошибка загрузки жанров (${res.status})`)
  }
  const data = await res.json()
  return data.genres
}
