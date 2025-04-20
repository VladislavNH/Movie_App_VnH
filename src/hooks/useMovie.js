import { useState, useEffect, useCallback } from 'react'
import debounce from 'lodash.debounce'

import { searchMovies } from '../api'

export function useMovies(initialQuery = 'return') {
  const [query, setQuery] = useState(initialQuery)
  const [movies, setMovies] = useState([])
  const [page, setPage] = useState(1)
  const [totalResults, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const fetch = useCallback((q, p = 1) => {
    setLoading(true)
    setError('')
    searchMovies(q, p)
      .then(({ results, total_results }) => {
        setMovies(results)
        setTotal(total_results)
      })
      .catch((err) => {
        console.error(err)
        setError(
          navigator.onLine
            ? 'Не удалось загрузить фильмы. Попробуйте ещё раз'
            : 'Похоже, вы оффлайн. Проверьте подключение к интернету'
        )
      })
      .finally(() => setLoading(false))
  }, [])

  const debouncedFetch = useCallback(
    debounce((v) => {
      setPage(1)
      fetch(v || initialQuery, 1)
    }, 500),
    [fetch, initialQuery]
  )

  useEffect(() => {
    fetch(initialQuery, 1)
    return () => debouncedFetch.cancel()
  }, [fetch, debouncedFetch, initialQuery])

  const onSearchChange = (v) => {
    setQuery(v)
    debouncedFetch(v)
  }

  const onPageChange = (p) => {
    setPage(p)
    fetch(query || initialQuery, p)
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
