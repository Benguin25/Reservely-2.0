import { useState } from 'react'
import './App.css'

function App() {
  return (
    <div className="app">
      <header className="header">
        <div className="container header-content">
          <div className="logo">Reservely</div>
          <nav className="nav-menu">
            <a href="/about" className="nav-link">About</a>
            <a href="/contact" className="nav-link">Contact</a>
            <a href="/faqs" className="nav-link">FAQs</a>
          </nav>
        </div>
      </header>

      <main className="main">
        <div className="hero">
          <h1>Reservely</h1>
          <p className="tagline">Affordable reservation system for small businesses</p>
          
          <div className="cta-buttons">
            <button className="btn btn-primary">I am a restaurant owner</button>
            <button className="btn btn-secondary">I am a customer</button>
          </div>
        </div>
      </main>

      <footer className="footer">
        <div className="container">
          <p>&copy; 2025 Reservely. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
