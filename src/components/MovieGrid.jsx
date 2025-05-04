import React from 'react'
import { Row, Col, Card, Skeleton, Empty, Alert } from 'antd'

import MovieCard from './MovieCard/MovieCard'

export default function MoviesGrid({ loading, error, movies }) {
  if (error) {
    return <Alert message={error} type="error" style={{ margin: '24px 0' }} />
  }

  if (loading) {
    const skeletons = Array.from({ length: 8 })
    return (
      <Row gutter={[24, 24]}>
        {skeletons.map((_, idx) => (
          <Col key={idx} xs={24} sm={24} md={12} lg={12}>
            <Card>
              <Skeleton active paragraph={{ rows: 4 }} />
            </Card>
          </Col>
        ))}
      </Row>
    )
  }

  if (movies.length === 0) {
    return <Empty description="Ничего не найдено" />
  }

  return (
    <Row gutter={[24, 24]}>
      {movies.map((m) => (
        <Col key={m.id} xs={24} sm={12} md={12} lg={12}>
          <MovieCard movie={m} />
        </Col>
      ))}
    </Row>
  )
}
