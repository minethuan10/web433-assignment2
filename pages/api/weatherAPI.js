

export const fetchWeatherByCoords = async (lat, lon) => {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=29d80837e8d1e5fe92b9b8064c260ae3&cnt=6`);
  if (!response.ok) throw new Error('Failed to fetch weather data.');
  return response.json();
};


export const fetchWeatherByQuery = async (query) => {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/find?q=${query}&units=metric&appid=29d80837e8d1e5fe92b9b8064c260ae3&cnt=6`);
  if (!response.ok) throw new Error('Failed to fetch weather data');
  const data = await response.json();
  return data.list;
};

export const fetchWeatherById = async (id) => {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?id=${id}&appid=29d80837e8d1e5fe92b9b8064c260ae3&cnt=6`);
  if (!response.ok) throw new Error('Failed to fetch weather data.');
  return response.json();
};

export const fetchWeatherByCityId = async (id) => {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?id=${id}&appid=29d80837e8d1e5fe92b9b8064c260ae3&cnt=6`);
  const data = await response.json();
  return data;
};