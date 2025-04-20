import React from 'react'
import { Pagination } from 'antd'

export default function PaginationControl({
  page,
  total,
  onChange,
  pageSize = 20,
}) {
  return (
    <Pagination
      current={page}
      pageSize={pageSize}
      total={total}
      onChange={onChange}
      style={{ textAlign: 'center', marginTop: 24 }}
      showSizeChanger={false}
    />
  )
}
