import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Card } from 'antd'
import { format } from 'date-fns'

import truncateText from '../utils/truncateText'

const { Meta } = Card

export default function MovieList({ movies }) {
  return (
    <Row gutter={[16, 16]}>
      {movies.map((m) => (
        <Col key={m.id} xs={24} sm={12} md={8} lg={6}>
          <Card
            hoverable
            cover={
              m.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/original${m.poster_path}`}
                  alt={m.title}
                />
              ) : (
                <div style={{ height: 300, background: '#efefef' }} />
              )
            }
          >
            <Meta
              title={m.title}
              description={
                <>
                  <div>
                    {m.release_date
                      ? format(new Date(m.release_date), 'dd.MM.yyyy')
                      : ''}
                  </div>
                  <p style={{ marginTop: 8 }}>
                    {truncateText(m.overview, 100)}
                  </p>
                </>
              }
            />
          </Card>
        </Col>
      ))}
    </Row>
  )
}

MovieList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      poster_path: PropTypes.string,
      release_date: PropTypes.string,
      overview: PropTypes.string,
    })
  ).isRequired,
}
