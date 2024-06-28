// pages/city/[id].js

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { fetchWeatherById } from '../api/weatherAPI'; // Adjust the path as necessary
import WeatherList from '../components/WeatherList'; // Adjust the path as necessary

const CityById = () => {
  const router = useRouter();
  const { id } = router.query;
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const getWeather = async () => {
      if (id) {
        try {
          const data = await fetchWeatherById(id); // Ensure fetchWeatherById is correctly implemented
          setWeatherData(data);
        } catch (error) {
          console.error('Error fetching weather by ID:', error);
          setError('Error fetching weather data.');
        }
      }
    };

    getWeather();
  }, [id]);

  return (
    <div className="container mt-5">
      <h1 className="text-center">Weather for City ID: {id}</h1>
      {error && <p className="text-danger text-center">{error}</p>}
      {weatherData ? (
        <WeatherList weatherData={[weatherData]} />
      ) : (
        <p className="text-center">Loading...</p>
      )}
    </div>
  );
};

export default CityById;
