// components/WeatherList.js
import React from 'react';
import WeatherCard from './WeatherCard';

const WeatherList = ({ weatherData }) => {
  return (
    <div className="d-flex flex-wrap mt-5">
      {weatherData.map((data, index) => (
        <WeatherCard key={index} data={data} />
      ))}
    </div>
  );
};

export default WeatherList;
