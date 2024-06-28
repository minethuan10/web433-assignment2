import React, { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { visitedCitiesAtom } from '../atoms/jotai';
import { fetchWeatherByCoords } from '../api/weatherAPI';
import WeatherList from './WeatherList';
import Pagination from './Pagination';
import { fetchWeatherByQuery } from '../api/weatherAPI';

const Search = () => {
  const [query, setQuery] = useState('');
  const [weatherData, setWeatherData] = useState([]);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [, setVisitedCities] = useAtom(visitedCitiesAtom);
  const [localWeather, setLocalWeather] = useState(null); // Track local weather
  const [localWeatherLoaded, setLocalWeatherLoaded] = useState(false); // Track if local weather is loaded

  useEffect(() => {
    // Fetch local weather when component mounts
    const fetchLocalWeather = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            try {
              const data = await fetchWeatherByCoords(latitude, longitude);
              setLocalWeather(data);
              setLocalWeatherLoaded(true);
              // Add local weather to visitedCities if not already added
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
    };

    fetchLocalWeather();
  }, [setVisitedCities]); // Run effect only once on mount

  const handleSearch = () => {
    if (query.trim()) {
      fetchWeatherByQuery(query.trim())
        .then(data => {
          if (data.length > 0) {
            setWeatherData(data);
            setError('');
            setCurrentPage(0);
            setVisitedCities(prev => {
              const cityNames = new Set(prev.map(city => city.name.toLowerCase()));
              const newCities = data.filter(city => !cityNames.has(city.name.toLowerCase()));
              return [...prev, ...newCities];
            });
          } else {
            setError('No results found.');
            setWeatherData([]);
          }
        })
        .catch(() => setError('Error fetching weather data.'));
    } else {
      setError('Please enter a valid city name or city_name,country_code.');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if ((currentPage + 1) * itemsPerPage < weatherData.length) setCurrentPage(currentPage + 1);
  };

  const itemsPerPage = 3;
  const paginatedData = weatherData.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  return (
    <div className="container mt-3">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            className="form-control"
            placeholder="Enter city name or city_name,country_code"
          />
          <button onClick={handleSearch} className="btn btn-primary mt-2">Search</button>
          {error && <p className="text-danger mt-2">{error}</p>}
        </div>
      </div>
      <h2 className="text-center mt-4">Weather</h2>
      {localWeatherLoaded && !weatherData.length && <WeatherList weatherData={[localWeather]} />}
      {weatherData.length > 0 && <WeatherList weatherData={paginatedData} />}
      {weatherData.length > itemsPerPage && (
        <Pagination
          currentPage={currentPage}
          totalItems={weatherData.length}
          itemsPerPage={itemsPerPage}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}
    </div>
  );
};

export default Search;
