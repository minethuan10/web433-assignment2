
const API_Key=process.env.NEXT_PUBLIC_WEATHER_KEY
export const fetchWeatherByCoords = async (lat, lon) => {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_Key}&cnt=6`);
  if (!response.ok) throw new Error('Failed to fetch weather data.');
  return response.json();
};


export const fetchWeatherByQuery = async (query) => {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/find?q=${query}&units=metric&appid=${API_KEY}&cnt=6`);
  if (!response.ok) throw new Error('Failed to fetch weather data');
  const data = await response.json();
  return data.list;
};

export const fetchWeatherById = async (id) => {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?id=${id}&appid=${API_KEY}&cnt=6`);
  if (!response.ok) throw new Error('Failed to fetch weather data.');
  return response.json();
};

export const fetchWeatherByCityId = async (id) => {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?id=${id}&appid=${API_KEY}&cnt=6`);
  const data = await response.json();
  return data;
};