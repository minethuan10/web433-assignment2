import React, { useEffect, useState } from 'react';
import Search from './components/Search';
import WeatherList from './components/WeatherList';
import { useAtom } from 'jotai';
import { visitedCitiesAtom } from './atoms/jotai';
import { fetchWeatherByCoords } from './api/weatherAPI';

const Home = () => {
  const [localWeather, setLocalWeather] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [, setVisitedCities] = useAtom(visitedCitiesAtom);
  const [error, setError] = useState('');
  const [localWeatherLoaded, setLocalWeatherLoaded] = useState(false);

  const handleSearch = (data) => {
    setSearchResults(data);
  };

  const getLocalWeather = async (latitude, longitude) => {
    try {
      const data = await fetchWeatherByCoords(latitude, longitude);
      if (!localWeather) { // Check if local weather has already been set
        setLocalWeather(data);
        setLocalWeatherLoaded(true);
      }
      setVisitedCities((prev) => {
        const cityNames = new Set(prev.map((city) => city.name.toLowerCase()));
        if (!cityNames.has(data.name.toLowerCase())) {
          return [...prev, data];
        }
        return prev;
      });
    } catch (error) {
      console.error('Error fetching local weather:', error);
      setError('Error fetching local weather.');
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          getLocalWeather(latitude, longitude);
        },
        (error) => {
          console.error('Geolocation error:', error);
          setError('Location access denied.');
        }
      );
    } else {
      console.error('Geolocation not supported');
      setError('Geolocation is not supported by this browser.');
    }
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="text-center">Weather Search</h1>
      {error && <p className="text-danger text-center">{error}</p>}
      <Search onSearch={handleSearch} />
      {/* Render search results if available */}
      
    </div>
  );
};

export default Home;
