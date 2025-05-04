import React from 'react'
import ReactDOM from 'react-dom/client'

import { AppProvider } from './context/AppContext'
import App from './App'
import './style.css'
import 'antd/dist/reset.css'
import { GenreProvider } from './context/GenreContext'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <AppProvider>
      <GenreProvider>
        <App />
      </GenreProvider>
    </AppProvider>
  </React.StrictMode>
)
