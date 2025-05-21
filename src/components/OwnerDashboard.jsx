import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function OwnerDashboard() {
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    // Get owned restaurant ID
    const ownedRestaurantId = localStorage.getItem('ownedRestaurantId');
    
    // Fetch restaurant data
    // In a real app, this would be an API call
    // For demo, we'll use localStorage or the hardcoded restaurants
    
    const storedRestaurants = JSON.parse(localStorage.getItem('restaurants') || '[]');
    
    // Default restaurants from the app
    const defaultRestaurants = [
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
    ];
    
    // Combine default restaurants with any stored restaurants
    const allRestaurants = [...defaultRestaurants, ...storedRestaurants.filter(r => 
      !defaultRestaurants.some(dr => dr.id === r.id)
    )];
    
    // Find the user's restaurant
    const userRestaurant = allRestaurants.find(r => r.id === parseInt(ownedRestaurantId));
    
    if (userRestaurant) {
      setRestaurant(userRestaurant);
    } else {
      // If restaurant not found, redirect to login
      navigate('/login');
    }
    
    setIsLoading(false);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('ownedRestaurantId');
    navigate('/');
  };

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  if (!restaurant) {
    return <div>No restaurant found. Please <Link to="/login">login</Link>.</div>;
  }

  return (
    <div className="page-container">
      <div className="content-section">
        <div className="dashboard-header">
          <h1>Restaurant Owner Dashboard</h1>
          <div className="user-controls">
            <span>Welcome, {localStorage.getItem('userEmail')}</span>
            <button className="btn btn-secondary" onClick={handleLogout}>Logout</button>
          </div>
        </div>
        
        <div className="restaurant-overview">
          <h2>{restaurant.name}</h2>
          <p>{restaurant.description}</p>
          <p><strong>Cuisine:</strong> {restaurant.cuisine}</p>
          <p><strong>Address:</strong> {restaurant.address}</p>
        </div>
        
        <div className="dashboard-link">
          <h3>Your Restaurant Booking Link</h3>
          <div className="link-display">
            <span>https://reservely.example.com/reserve/{restaurant.id}</span>
            <button 
              className="btn btn-secondary"
              onClick={() => {
                navigator.clipboard.writeText(`https://reservely.example.com/reserve/${restaurant.id}`);
                alert('Link copied to clipboard!');
              }}
            >
              Copy Link
            </button>
          </div>
          <p>Share this link with your customers to allow them to make reservations at your restaurant.</p>
        </div>
        
        <div className="dashboard-actions">
          <div className="action-card" onClick={() => navigate('/owner/seating')}>
            <h3>Edit Seating</h3>
            <p>Manage your restaurant's tables and seating capacity</p>
          </div>
          
          <div className="action-card" onClick={() => navigate('/owner/manage')}>
            <h3>Manage Restaurant</h3>
            <p>Update your restaurant's details, description, cuisine, and address</p>
          </div>
          
          <div className="action-card" onClick={() => navigate('/owner/reservations')}>
            <h3>View Reservations</h3>
            <p>View and manage customer reservations</p>
          </div>
        </div>
      </div>
    </div>
  );
} 