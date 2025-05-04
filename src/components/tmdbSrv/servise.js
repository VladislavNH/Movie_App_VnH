const API_KEY = '5cc7606e70c5d733552f409d1a4a9c00'
const BASE_URL = 'https://api.themoviedb.org/3'
const STORAGE_KEY = 'tmdb_guest_session'

async function getGuestSessionId() {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (raw) {
    const { id, expires_at } = JSON.parse(raw)
    if (new Date(expires_at) > new Date()) return id
  }
  const res = await fetch(
    `${BASE_URL}/authentication/guest_session/new?api_key=${API_KEY}`
  )
  if (!res.ok) throw new Error(`guest session error: ${res.status}`)
  const data = await res.json()
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({ id: data.guest_session_id, expires_at: data.expires_at })
  )
  return data.guest_session_id
}

export async function rateMovie(movieId, value) {
  const sessionId = await getGuestSessionId()
  const res = await fetch(
    `${BASE_URL}/movie/${movieId}/rating?api_key=${API_KEY}&guest_session_id=${sessionId}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value }),
    }
  )
  if (!res.ok) throw new Error(`rate error: ${res.status}`)
  return res.json()
}

export async function fetchRatedMovies(page = 1) {
  const sessionId = await getGuestSessionId()
  const res = await fetch(
    `${BASE_URL}/guest_session/${sessionId}/rated/movies?api_key=${API_KEY}&page=${page}`
  )
  if (!res.ok) throw new Error(`fetch rated error: ${res.status}`)
  return res.json()
}
