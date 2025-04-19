import React, { useEffect, useState } from 'react'
import { Layout, Input, Spin, Alert } from 'antd'

import { searchMovies } from './api'
import MovieList from './components/MovieList'

const { Header, Content } = Layout
const { Search } = Input

export default function App() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSearch = (raw) => {
    const term = raw.trim() || 'return'
    setLoading(true)
    setError('')

    searchMovies(term)
      .then((data) => setMovies(data.results))
      .catch(() => setError('Ошибка при загрузке фильмов'))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    handleSearch('return')
  }, [])

  return (
    <Layout>
      <Header style={{ background: '#fff', padding: '16px 24px' }}>
        <Search
          placeholder="Поиск фильмов"
          defaultValue="return"
          enterButton="Поиск"
          size="large"
          onSearch={handleSearch}
        />
      </Header>

      <Content style={{ background: '#f0f2f5', padding: '24px 0' }}>
        <div className="container">
          {loading ? (
            <Spin
              tip="Загрузка..."
              style={{ display: 'block', margin: '100px auto' }}
            />
          ) : error ? (
            <Alert message={error} type="error" style={{ marginBottom: 24 }} />
          ) : (
            <MovieList movies={movies} />
          )}
        </div>
      </Content>
    </Layout>
  )
}
