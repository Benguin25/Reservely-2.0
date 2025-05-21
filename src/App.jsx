import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom'
import './App.css'
import About from './components/About'
import Contact from './components/Contact'
import FAQs from './components/FAQs'
import RestaurantSearch from './components/RestaurantSearch'

function HomePage() {
  const navigate = useNavigate();
  
  return (
    <div className="hero">
      <h1>Reservely</h1>
      <p className="tagline">Affordable reservation system for small businesses</p>
      
      <div className="cta-buttons">
        <button className="btn btn-primary">I am a restaurant owner</button>
        <button 
          className="btn btn-secondary"
          onClick={() => navigate('/search')}
        >
          I am a customer
        </button>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="app">
        <header className="header">
          <div className="container header-content">
            <Link to="/" className="logo">Reservely</Link>
            <nav className="nav-menu">
              <Link to="/about" className="nav-link">About</Link>
              <Link to="/contact" className="nav-link">Contact</Link>
              <Link to="/faqs" className="nav-link">FAQs</Link>
            </nav>
          </div>
        </header>

        <main className="main">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faqs" element={<FAQs />} />
            <Route path="/search" element={<RestaurantSearch />} />
          </Routes>
        </main>

        <footer className="footer">
          <div className="container">
            <p>&copy; 2025 Reservely. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </Router>
  )
}

export default App
