import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Initialize default restaurants in localStorage if they don't exist
const initializeData = () => {
  // Default restaurants
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

  // Check if restaurants exist in localStorage
  const storedRestaurants = localStorage.getItem('restaurants');
  
  if (!storedRestaurants) {
    // If not, initialize with default restaurants
    localStorage.setItem('restaurants', JSON.stringify(defaultRestaurants));
  }
};

// Run initialization
initializeData();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
