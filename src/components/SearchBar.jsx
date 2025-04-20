import React from 'react'
import { Input } from 'antd'

export default function SearchBar({ value, onChange }) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        margin: '0 0 24px',
      }}
    >
      <Input
        placeholder="Type to search..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        allowClear
        autoFocus
        style={{
          width: 400,
          maxWidth: '100%',
        }}
      />
    </div>
  )
}
