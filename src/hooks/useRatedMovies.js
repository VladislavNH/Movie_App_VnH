import { useState, useEffect } from 'react'

import { fetchRatedMovies } from '../components/tmdbSrv/servise'

export function useRatedMovie(page = 1, enabled = true) {
  const [movies, setMovies] = useState([])
  const [totalResults, setTotalResults] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!enabled) return
    let cancelled = false

    async function load() {
      setLoading(true)
      setError(null)
      try {
        const data = await fetchRatedMovies(page)
        if (!cancelled) {
          setMovies(data.results)
          setTotalResults(data.total_results)
        }
      } catch (e) {
        if (!cancelled) setError(e)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [page, enabled])

  return { movies, totalResults, loading, error }
}
