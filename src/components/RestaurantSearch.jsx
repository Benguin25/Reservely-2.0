import React, { useState, useMemo } from 'react';

export default function RestaurantSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Sample restaurant data (will be replaced with actual data later)
  const [restaurants] = useState([
    {
      id: 1,
      name: "La Bella Italia",
      description: "Authentic Italian cuisine in a cozy atmosphere. Known for homemade pasta and wood-fired pizzas.",
      rating: 4.5,
      cuisine: "Italian"
    },
    {
      id: 2,
      name: "Sushi Master",
      description: "Fresh sushi and Japanese delicacies. Traditional dining experience with modern twists.",
      rating: 4.8,
      cuisine: "Japanese"
    },
    {
      id: 3,
      name: "The Grill House",
      description: "Premium steaks and grilled specialties. Perfect for special occasions and business dinners.",
      rating: 4.6,
      cuisine: "Steakhouse"
    },
    {
      id: 4,
      name: "Thai Spice",
      description: "Authentic Thai flavors with a modern presentation. Famous for our Pad Thai and curry dishes.",
      rating: 4.7,
      cuisine: "Thai"
    },
    {
      id: 5,
      name: "Mediterranean Delight",
      description: "Fresh Mediterranean dishes featuring homemade hummus, falafel, and grilled specialties.",
      rating: 4.4,
      cuisine: "Mediterranean"
    }
  ]);

  // Filter restaurants based on search query
  const filteredRestaurants = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return restaurants;

    return restaurants.filter(restaurant => 
      restaurant.name.toLowerCase().includes(query) ||
      restaurant.description.toLowerCase().includes(query) ||
      restaurant.cuisine.toLowerCase().includes(query)
    );
  }, [restaurants, searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="page-container">
      <div className="content-section">
        <div className="search-section">
          <h1>Find a Restaurant</h1>
          <div className="search-form">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search by restaurant name, cuisine, or description..."
              className="search-input"
            />
          </div>
          <div className="search-results-count">
            {filteredRestaurants.length} restaurants found
          </div>
        </div>

        <div className="restaurant-list">
          {filteredRestaurants.map(restaurant => (
            <div key={restaurant.id} className="restaurant-card">
              <div className="restaurant-info">
                <h2>{restaurant.name}</h2>
                <div className="restaurant-cuisine">{restaurant.cuisine}</div>
                <p>{restaurant.description}</p>
                <div className="restaurant-rating">
                  {[...Array(Math.floor(restaurant.rating))].map((_, i) => (
                    <span key={i} className="star">⭐</span>
                  ))}
                  <span className="rating-number">({restaurant.rating})</span>
                </div>
              </div>
              <div className="restaurant-actions">
                <button className="btn btn-primary">Reserve Now</button>
              </div>
            </div>
          ))}
          {filteredRestaurants.length === 0 && (
            <div className="no-results">
              No restaurants found matching "{searchQuery}"
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
