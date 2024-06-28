// components/WeatherCard.js
import React from 'react';

const WeatherCard = ({ data }) => {
  // Check if data is undefined or null
  if (!data || !data.sys) {
    return null; // or handle the case where data or sys is not defined
  }

  // Destructure data for easier access
  const { name, sys, weather, main, wind } = data;

  return (
    <div className="col-md-4 mb-4">
      <div className="card weather-card">
        <div className="card-body">
          <h5 className="card-title">{name}, {sys.country}</h5>
          {weather && weather.length > 0 && (
            <>
              <img src={`http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`} alt="Weather Icon" />
              <p className="card-text">Weather: {weather[0].description}</p>
            </>
          )}
          {main && (
            <>
              <p className="card-text">Temperature: {main.temp}°C</p>
              <p className="card-text">Min/Max: {main.temp_min}°C / {main.temp_max}°C</p>
              <p className="card-text">Humidity: {main.humidity}%</p>
              <p className="card-text">Pressure: {main.pressure} hPa</p>
            </>
          )}
          {wind && (
            <p className="card-text">Wind Speed: {wind.speed} m/s</p>
          )}
          {sys && (
            <>
              <p className="card-text">Sunrise: {new Date(sys.sunrise * 1000).toLocaleTimeString()}</p>
              <p className="card-text">Sunset: {new Date(sys.sunset * 1000).toLocaleTimeString()}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
