// components/WeatherList.js
import React from 'react';


// components/WeatherList.js

const WeatherList = ({ weatherData }) => {
    return (
      <div className="mt-4">
        {weatherData.length > 0 ? (
          weatherData.map((weather) => (
            <div key={weather.id} className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">{weather.name}</h5>
                <p className="card-text">Temperature: {weather.temperature}°C</p>
                <p className="card-text">Condition: {weather.condition}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No weather data available.</p>
        )}
      </div>
    );
  };
  
  export default WeatherList;
  