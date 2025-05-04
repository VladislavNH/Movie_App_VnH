import React, { createContext, useState, useEffect } from 'react'

export const GenreContext = createContext([])

export function GenreProvider({ children }) {
  const [genres, setGenres] = useState([])

  useEffect(() => {
    const KEY = process.env.REACT_APP_TMDB_API_KEY
    const BASE = 'https://api.themoviedb.org/3'

    fetch(`${BASE}/genre/movie/list?api_key=${KEY}&language=ru`)
      .then((res) => {
        if (!res.ok) throw new Error('Не удалось получить список жанров')
        return res.json()
      })
      .then((data) => {
        setGenres(data.genres)
      })
      .catch((err) => {
        console.error(err)
      })
  }, [])

  return (
    <GenreContext.Provider value={genres}>{children}</GenreContext.Provider>
  )
}
