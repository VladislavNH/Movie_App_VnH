import React from 'react'

import SearchBar from '../SearchBar'
import MovieGrid from '../MovieGrid'
import { useMovies } from '../../hooks/useMovie'
import PaginationControl from '../Pagination'

export default function SearchTab() {
  const {
    query,
    onSearchChange,
    movies,
    loading,
    error,
    page,
    totalResults,
    onPageChange,
  } = useMovies()

  return (
    <>
      <SearchBar value={query} onChange={onSearchChange} />
      <MovieGrid loading={loading} error={error} movies={movies} />
      {!loading && !error && movies.length > 0 && (
        <PaginationControl>
          page={page}
          total={totalResults}
          onChange={onPageChange}
        </PaginationControl>
      )}
    </>
  )
}
