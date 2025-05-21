import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ManageRestaurant() {
  const navigate = useNavigate();
  const [restaurantId, setRestaurantId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    cuisine: '',
    address: ''
  });
  const [isLoading, setIsLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    // Get owned restaurant ID
    const ownedRestaurantId = localStorage.getItem('ownedRestaurantId');
    setRestaurantId(ownedRestaurantId);
    
    // Fetch restaurant data
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
      setFormData({
        name: userRestaurant.name,
        description: userRestaurant.description,
        cuisine: userRestaurant.cuisine,
        address: userRestaurant.address
      });
    } else {
      // If restaurant not found, redirect to login
      navigate('/login');
    }
    
    setIsLoading(false);
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form
    if (!formData.name.trim()) {
      alert("Restaurant name is required");
      return;
    }

    // Get current restaurants data
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

    // Find if it's a default restaurant or a custom one
    const isDefaultRestaurant = defaultRestaurants.some(r => r.id === parseInt(restaurantId));
    
    if (isDefaultRestaurant) {
      // If it's a default restaurant, we need to add it to stored restaurants with updated values
      const updatedRestaurant = {
        id: parseInt(restaurantId),
        ...formData
      };
      
      // Remove if it already exists in stored restaurants
      const filteredStored = storedRestaurants.filter(r => r.id !== parseInt(restaurantId));
      
      // Add the updated version
      localStorage.setItem('restaurants', JSON.stringify([...filteredStored, updatedRestaurant]));
    } else {
      // If it's a custom restaurant, update it in the stored restaurants
      const updatedStoredRestaurants = storedRestaurants.map(r => 
        r.id === parseInt(restaurantId) ? { ...r, ...formData } : r
      );
      
      localStorage.setItem('restaurants', JSON.stringify(updatedStoredRestaurants));
    }
    
    // Show success message
    setSuccessMessage('Restaurant details updated successfully!');
    
    // Clear message after 3 seconds
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="page-container">
      <div className="content-section">
        <div className="dashboard-header">
          <h1>Manage Restaurant Details</h1>
          <button className="btn btn-secondary" onClick={() => navigate('/owner-dashboard')}>
            Back to Dashboard
          </button>
        </div>
        
        {successMessage && (
          <div className="success-message">
            {successMessage}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="restaurant-form">
          <div className="form-group">
            <label htmlFor="name">Restaurant Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="cuisine">Cuisine Type</label>
            <input
              type="text"
              id="cuisine"
              name="cuisine"
              value={formData.cuisine}
              onChange={handleChange}
              placeholder="e.g., Italian, Japanese, etc."
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="description">Restaurant Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              placeholder="Tell customers about your restaurant..."
            ></textarea>
          </div>
          
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows="2"
              placeholder="Full restaurant address"
            ></textarea>
          </div>
          
          <button type="submit" className="btn btn-primary">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
} 