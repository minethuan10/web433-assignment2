// components/PreviouslyViewedCities.js

import { useAtom } from 'jotai';
import { visitedCitiesAtom } from '../atoms/jotai'; // Adjust the path as necessary

const PreviouslyViewedCities = () => {
  const [visitedCities] = useAtom(visitedCitiesAtom);

  return (
    <div className="mt-3">
      <h3>Previously Viewed Cities (by ID):</h3>
      <ul>
        {visitedCities.map((city) => (
          <li key={city.id}>
            {city.id}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PreviouslyViewedCities;
