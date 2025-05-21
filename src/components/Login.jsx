import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    restaurantName: '',
    phoneNumber: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (!isLogin && formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // In a real app, this would involve API calls for authentication
    // For demo purposes, we'll simulate successful login/registration
    if (isLogin) {
      // Simulate login
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userEmail', formData.email);
      // In a real app, you would store a token instead
      
      // For demo, let's assume they have a restaurant with ID 1
      localStorage.setItem('ownedRestaurantId', '1');
      navigate('/owner-dashboard');
    } else {
      // Simulate registration
      // Create new restaurant with ID 6 (since we have 5 restaurants already)
      const newRestaurantId = '6';
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userEmail', formData.email);
      localStorage.setItem('ownedRestaurantId', newRestaurantId);
      
      // In a real app, you would also create the restaurant in the database
      // For demo, we'll just add it to localStorage
      const newRestaurant = {
        id: parseInt(newRestaurantId),
        name: formData.restaurantName,
        phoneNumber: formData.phoneNumber,
        description: "New restaurant on Reservely",
        cuisine: "Various",
        address: "Please update your restaurant details"
      };
      
      const storedRestaurants = JSON.parse(localStorage.getItem('restaurants') || '[]');
      storedRestaurants.push(newRestaurant);
      localStorage.setItem('restaurants', JSON.stringify(storedRestaurants));
      
      navigate('/owner-dashboard');
    }
  };

  return (
    <div className="page-container">
      <div className="content-section">
        <div className="login-container">
          <h1>{isLogin ? 'Restaurant Owner Login' : 'Register Your Restaurant'}</h1>
          
          {error && <div className="error-message">{error}</div>}
          
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            
            {!isLogin && (
              <>
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="restaurantName">Restaurant Name</label>
                  <input
                    type="text"
                    id="restaurantName"
                    name="restaurantName"
                    value={formData.restaurantName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phoneNumber">Phone Number</label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="e.g., 555-123-4567"
                    required
                  />
                </div>
              </>
            )}
            
            <button type="submit" className="btn btn-primary">
              {isLogin ? 'Login' : 'Register'}
            </button>
          </form>
          
          <div className="login-toggle">
            {isLogin ? (
              <p>
                Don't have an account?{' '}
                <button 
                  className="link-button"
                  onClick={() => setIsLogin(false)}
                >
                  Register your restaurant
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{' '}
                <button 
                  className="link-button"
                  onClick={() => setIsLogin(true)}
                >
                  Login
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 