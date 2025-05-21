import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RestaurantSearch() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  
  const [restaurants] = useState([
    {
      id: 1,
      name: "La Bella Italia",
      description: "Authentic Italian cuisine in a cozy atmosphere. Known for homemade pasta and wood-fired pizzas.",
      cuisine: "Italian",
      address: "123 Main Street, Downtown, Toronto, ON M5V 2T6"
    },
    {
      id: 2,
      name: "Sushi Master",
      description: "Fresh sushi and Japanese delicacies. Traditional dining experience with modern twists.",
      cuisine: "Japanese",
      address: "456 Queen Street West, Toronto, ON M5V 2B3"
    },
    {
      id: 3,
      name: "The Grill House",
      description: "Premium steaks and grilled specialties. Perfect for special occasions and business dinners.",
      cuisine: "Steakhouse",
      address: "789 King Street East, Toronto, ON M5A 1N2"
    },
    {
      id: 4,
      name: "Thai Spice",
      description: "Authentic Thai flavors with a modern presentation. Famous for our Pad Thai and curry dishes.",
      cuisine: "Thai",
      address: "321 Yonge Street, Toronto, ON M5B 1R8"
    },
    {
      id: 5,
      name: "Mediterranean Delight",
      description: "Fresh Mediterranean dishes featuring homemade hummus, falafel, and grilled specialties.",
      cuisine: "Mediterranean",
      address: "567 College Street, Toronto, ON M6G 1B2"
    }
  ]);

  // Filter restaurants based on search query
  const filteredRestaurants = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return restaurants;

    return restaurants.filter(restaurant => 
      restaurant.name.toLowerCase().includes(query) ||
      restaurant.description.toLowerCase().includes(query) ||
      restaurant.cuisine.toLowerCase().includes(query) ||
      restaurant.address.toLowerCase().includes(query)
    );
  }, [restaurants, searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleReserveClick = (restaurantId) => {
    navigate(`/reserve/${restaurantId}`);
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
              placeholder="Search by restaurant name, cuisine, or location..."
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
                <div className="restaurant-address">📍 {restaurant.address}</div>
              </div>
              <div className="restaurant-actions">
                <button 
                  className="btn btn-primary"
                  onClick={() => handleReserveClick(restaurant.id)}
                >
                  Reserve Now
                </button>
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
