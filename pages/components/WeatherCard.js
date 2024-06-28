import React, { useState } from 'react';

const WeatherCard = ({ data }) => {
  // Check if data is undefined or null
  if (!data || !data.sys || !data.main || !data.weather) {
    return null; // or handle the case where data, sys, main, or weather is not defined
  }

  // Destructure data for easier access
  const { name, sys, weather, main, wind } = data;

  // State for toggle button
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className="col-md-4 mb-4">
      <div className="card weather-card">
        <div className="card-body">
          <h5 className="card-title">{name}, {sys.country}</h5>
          <img src={`http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`} alt="Weather Icon" />
          <p className="card-text">Weather: {weather[0].description}</p>
          <p className="card-text">Temperature: {main.temp}°C</p>
          
          {/* Toggle button for additional details */}
          <button className="btn btn-sm btn-secondary mb-2" onClick={toggleDetails}>
            {showDetails ? 'Hide Details' : 'Show Details'}
          </button>

          {/* Additional details */}
          {showDetails && (
            <>
              <p className="card-text">Min/Max Temperature: {main.temp_min}°C / {main.temp_max}°C</p>
              <p className="card-text">Humidity: {main.humidity}%</p>
              <p className="card-text">Pressure: {main.pressure} hPa</p>
              {wind && <p className="card-text">Wind Speed: {wind.speed} m/s</p>}
              {sys && (
                <>
                  <p className="card-text">Sunrise: {new Date(sys.sunrise * 1000).toLocaleTimeString()}</p>
                  <p className="card-text">Sunset: {new Date(sys.sunset * 1000).toLocaleTimeString()}</p>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
