import React, { useEffect, useState } from 'react'
import { Empty } from 'antd'

import MovieGrid from '../MovieGrid'

export default function RatedTab() {
  const [movies, setMovies] = useState([])

  const loadRated = () => {
    const raw = localStorage.getItem('rated_movies') || '[]'
    let list
    try {
      list = JSON.parse(raw)
      if (!Array.isArray(list)) list = []
    } catch {
      list = []
    }
    setMovies(list)
  }

  useEffect(() => {
    loadRated()

    window.addEventListener('ratedMoviesChanged', loadRated)
    return () => {
      window.removeEventListener('ratedMoviesChanged', loadRated)
    }
  }, [])

  if (movies.length === 0) {
    return <Empty description="Вы ещё не оценили ни одного фильма." />
  }

  return <MovieGrid loading={false} error={null} movies={movies} />
}
