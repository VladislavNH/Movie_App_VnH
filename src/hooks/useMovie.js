import { useState, useEffect, useCallback } from 'react'
import debounce from 'lodash.debounce'

import { searchMoviesWithRating } from '../api'

export function useMovies(initialQuery = 'Naruto') {
  const [query, setQuery] = useState(initialQuery)
  const [page, setPage] = useState(1)
  const [movies, setMovies] = useState([])
  const [totalResults, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const guestSessionId = localStorage.getItem('tmdb_guest_session')

  const fetchPage = useCallback(
    (q, p = 1) => {
      setLoading(true)
      setError('')
      searchMoviesWithRating(q, guestSessionId, p)
        .then(({ results, totalResults }) => {
          setMovies(results)
          setTotal(totalResults)
        })
        .catch((err) => {
          console.error(err)
          setError(
            navigator.onLine
              ? 'Не удалось загрузить фильмы. Попробуйте ещё раз.'
              : 'Похоже, вы офлайн. Проверьте подключение.'
          )
        })
        .finally(() => setLoading(false))
    },
    [guestSessionId]
  )

  const debouncedFetch = useCallback(debounce(fetchPage, 500), [fetchPage])

  useEffect(() => {
    fetchPage(initialQuery, 1)
    return () => debouncedFetch.cancel()
  }, [initialQuery, fetchPage, debouncedFetch])

  function onSearchChange(v) {
    setQuery(v)
    setPage(1)
    debouncedFetch(v, 1)
  }

  function onPageChange(p) {
    setPage(p)
    fetchPage(query, p)
  }

  return {
    query,
    movies,
    loading,
    error,
    page,
    totalResults,
    onSearchChange,
    onPageChange,
  }
}
