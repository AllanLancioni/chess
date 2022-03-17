import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './pages/Home'
import Game from './pages/game/Game'

ReactDOM.render(
  <React.StrictMode >
    <main className="bg-neutral-200" style={{ height: '100vh' }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="game/:gameId" element={<Game />} />
        </Routes>
      </BrowserRouter>
    </main>
  </React.StrictMode>,
  document.getElementById('root')
)
