import React from 'react'
import { Layout, Tabs } from 'antd'

import { useMovies } from './hooks/useMovie'
import SearchBar from './components/SearchBar'
import MoviesGrid from './components/MovieGrid'
import PaginationControl from './components/Pagination'
import RatedTab from './components/Rated/RatedTab'

const { Content } = Layout
const { TabPane } = Tabs

export default function App() {
  const {
    query,
    movies,
    loading,
    error,
    page,
    totalResults,
    onSearchChange,
    onPageChange,
  } = useMovies()

  return (
    <Layout>
      <Content style={{ background: '#fff', padding: '16px 24px' }}>
        <Tabs defaultActiveKey="1" centered>
          <TabPane tab="Search" key="1">
            <SearchBar value={query} onChange={onSearchChange} />

            <MoviesGrid loading={loading} error={error} movies={movies} />

            {!loading && !error && movies.length > 0 && (
              <PaginationControl
                page={page}
                total={totalResults}
                onChange={onPageChange}
              />
            )}
          </TabPane>

          <TabPane tab="Rated" key="2">
            <RatedTab />
          </TabPane>
        </Tabs>
      </Content>
    </Layout>
  )
}
