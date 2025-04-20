import React from 'react'
import { Row, Col, Card, Skeleton, Empty, Alert } from 'antd'

import MovieList from './MovieList'

export default function MoviesGrid({ loading, error, movies }) {
  if (error) {
    return <Alert message={error} type="error" style={{ marginBottom: 24 }} />
  }

  if (loading) {
    const skeletons = Array.from({ length: 8 })
    return (
      <Row gutter={[16, 16]}>
        {skeletons.map((_, idx) => (
          <Col key={idx} xs={24} sm={12} md={8} lg={6}>
            <Card>
              <Skeleton active paragraph={{ rows: 4 }} />
            </Card>
          </Col>
        ))}
      </Row>
    )
  }

  if (!movies.length) {
    return <Empty description="Ничего не найдено" />
  }

  return <MovieList movies={movies} />
}
