import React, { createContext, useState, useEffect } from 'react'

export const AppContext = createContext({
  genres: {},
  guestSessionId: '',
})

export function AppProvider({ children }) {
  const [genres, setGenres] = useState({})
  const [guestSessionId, setGuestSessionId] = useState('')

  useEffect(() => {
    const BASE = 'https://api.themoviedb.org/3'
    const KEY = process.env.REACT_APP_TMDB_API_KEY

    fetch(`${BASE}/genre/movie/list?api_key=${KEY}&language=ru`)
      .then((res) => {
        if (!res.ok) throw new Error(`Жанры ошибка : ${res.status}`)
        return res.json()
      })
      .then((data) => {
        const map = {}
        data.genres.forEach((g) => {
          map[g.id] = g.name
        })
        setGenres(map)
      })
      .catch((err) => console.error(err))

    fetch(`${BASE}/authentication/guest_session/new?api_key=${KEY}`)
      .then((res) => {
        if (!res.ok) throw new Error(`Гость сессия ошибка: ${res.status}`)
        return res.json()
      })
      .then((data) => {
        setGuestSessionId(data.guest_session_id)
      })
      .catch((err) => console.error(err))
  }, [])

  return (
    <AppContext.Provider value={{ genres, guestSessionId }}>
      {children}
    </AppContext.Provider>
  )
}
