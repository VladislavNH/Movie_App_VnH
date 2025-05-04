import React, { useContext, useState } from 'react'
import { Card, Rate, Tag } from 'antd'
import { format } from 'date-fns'

import truncateText from '../../utils/truncateText'
import { GenreContext } from '../../context/GenreContext'
import './MovieCard.css'

function getBadgeColor(r) {
  if (r > 7) return '#66E900'
  if (r > 5) return '#E9D100'
  if (r > 3) return '#E97E00'
  return '#E90000'
}

export default function MovieCard({ movie }) {
  const genres = useContext(GenreContext)
  const movieGenres = genres.filter((g) => movie.genre_ids.includes(g.id))

  const STORAGE_KEY = `movie-rating-${movie.id}`
  const LIST_KEY = 'rated_movies'
  const initialRating = (() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved !== null) return Number(saved)
    if (movie.rating != null) return movie.rating
    return movie.vote_average ?? 0
  })()

  const [rating, setRating] = useState(initialRating)

  const handleRate = (value) => {
    setRating(value)
    localStorage.setItem(STORAGE_KEY, value.toString())

    const raw = localStorage.getItem(LIST_KEY) || '[]'
    let list = []
    try {
      list = JSON.parse(raw)
      if (!Array.isArray(list)) list = []
    } catch {
      list = []
    }
    list = list.filter((m) => m.id !== movie.id)
    if (value > 0) {
      list.push({ ...movie, rating: value })
    }
    localStorage.setItem(LIST_KEY, JSON.stringify(list))

    window.dispatchEvent(new Event('ratedMoviesChanged'))
  }

  return (
    <Card hoverable className="movie-card">
      <div
        className="movie-card__rating-circle"
        style={{
          borderColor: getBadgeColor(rating),
          color: getBadgeColor(rating),
        }}
      >
        {rating.toFixed(1)}
      </div>

      <div className="movie-card__inner">
        <div className="movie-card__poster">
          {movie.poster_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
          ) : (
            <div className="movie-card__placeholder" />
          )}
        </div>

        <div className="movie-card__info">
          <h3 className="movie-card__title">{movie.title}</h3>
          <div className="movie-card__date">
            {movie.release_date
              ? format(new Date(movie.release_date), 'dd.MM.yyyy')
              : '—'}
          </div>

          <div className="movie-card__genres">
            {movieGenres.map((g) => (
              <Tag key={g.id} style={{ marginBottom: 4 }}>
                {g.name}
              </Tag>
            ))}
          </div>

          <p className="movie-card__overview">
            {truncateText(movie.overview, 100)}
          </p>

          <Rate count={10} allowHalf value={rating} onChange={handleRate} />
        </div>
      </div>
    </Card>
  )
}
