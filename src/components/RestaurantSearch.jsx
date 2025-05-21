import React, { useState } from 'react';

export default function RestaurantSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Sample restaurant data (will be replaced with actual data later)
  const [restaurants] = useState([
    {
      id: 1,
      name: "La Bella Italia",
      description: "Authentic Italian cuisine in a cozy atmosphere. Known for homemade pasta and wood-fired pizzas.",
      rating: 4.5,
    },
    {
      id: 2,
      name: "Sushi Master",
      description: "Fresh sushi and Japanese delicacies. Traditional dining experience with modern twists.",
      rating: 4.8,
    },
    {
      id: 3,
      name: "The Grill House",
      description: "Premium steaks and grilled specialties. Perfect for special occasions and business dinners.",
      rating: 4.6,
    }
  ]);

  const handleSearch = (e) => {
    e.preventDefault();
    // Will implement actual search functionality later
    console.log('Searching for:', searchQuery);
  };

  return (
    <div className="page-container">
      <div className="content-section">
        <div className="search-section">
          <h1>Find a Restaurant</h1>
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search restaurants..."
              className="search-input"
            />
            <button type="submit" className="btn btn-primary search-button">
              Search
            </button>
          </form>
        </div>

        <div className="restaurant-list">
          {restaurants.map(restaurant => (
            <div key={restaurant.id} className="restaurant-card">
              <div className="restaurant-info">
                <h2>{restaurant.name}</h2>
                <p>{restaurant.description}</p>
                <div className="restaurant-rating">
                  Rating: {restaurant.rating} ⭐
                </div>
              </div>
              <div className="restaurant-actions">
                <button className="btn btn-primary">Reserve Now</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
