const BASE_URL = 'https://api.themoviedb.org/3'
const API_KEY = process.env.REACT_APP_TMDB_API_KEY
const READ_TOKEN = process.env.REACT_APP_TMDB_READ_TOKEN

async function fetchMoviesPage(query, page = 1) {
  const url = new URL(`${BASE_URL}/search/movie`)
  url.searchParams.set('api_key', API_KEY)
  url.searchParams.set('language', 'en-US')
  url.searchParams.set('query', query)
  url.searchParams.set('page', page)
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Search failed: ${res.status}`)
  return res.json()
}

async function fetchMovieAccountState(movieId, guestSessionId) {
  if (!guestSessionId) {
    return { rated: { value: null } }
  }
  const url = new URL(`${BASE_URL}/movie/${movieId}/account_states`)
  url.searchParams.set('api_key', API_KEY)
  url.searchParams.set('guest_session_id', guestSessionId)
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${READ_TOKEN}`,
    },
  })
  if (!res.ok) {
    console.warn(`Account state fetch failed for ${movieId}: ${res.status}`)
    return { rated: { value: null } }
  }
  return res.json()
}

export async function searchMoviesWithRating(query, guestSessionId, page = 1) {
  const { results, total_results, total_pages } = await fetchMoviesPage(
    query,
    page
  )

  const enriched = await Promise.all(
    results.map(async (movie) => {
      const state = await fetchMovieAccountState(movie.id, guestSessionId)
      return {
        ...movie,
        rating: state.rated.value ?? movie.vote_average,
      }
    })
  )

  return {
    page,
    totalResults: total_results,
    totalPages: total_pages,
    results: enriched,
  }
}
