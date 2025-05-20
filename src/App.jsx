import { useState } from 'react'
import './App.css'

function App() {
  return (
    <div className="app">
      <header className="header">
        <div className="container">
          <div className="logo">Reservely</div>
        </div>
      </header>

      <main className="main">
        <div className="hero">
          <h1>Reservely</h1>
          <p className="tagline">Affordable reservation system for small businesses</p>
          
          <div className="cta-buttons">
            <button className="btn btn-primary">Create Reservation Page</button>
            <button className="btn btn-secondary">Visit My Reservation Link</button>
          </div>
        </div>
      </main>

      <footer className="footer">
        <div className="container">
          <p>&copy; 2023 Reservely. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
