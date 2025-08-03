import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFavorites } from '../store.jsx';

const API = 'https://www.swapi.tech/api';

export default function Details() {
  const { category, id } = useParams();

  // Keep the current id in a ref (e.g. for logging or comparing past vs. current)
  const idRef = useRef(id);
  // Store raw fetched result in a ref without triggering re-renders
  const resultRef = useRef(null);

  const [properties, setProperties] = useState(null);
  const [name, setName] = useState('');

  const { favorites, addFavorite, removeFavorite } = useFavorites();

  useEffect(() => {
    // Update the ref when the URL param changes
    idRef.current = id;

    fetch(`${API}/${category}/${idRef.current}`)
      .then(res => res.json())
      .then(json => {
        resultRef.current = json.result;
        setProperties(json.result.properties);
        setName(json.result.name);
      });
  }, [category, id]);

  if (!properties) return <div>Loading...</div>;

  const isFav = favorites.some(
    f => f.category === category && f.id === idRef.current
  );

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{name}</h1>
      <button
        onClick={() =>
          isFav
            ? removeFavorite({ category, id: idRef.current })
            : addFavorite({ category, id: idRef.current, name })
        }
        className="mb-4"
      >
        {isFav ? 'Remove from Favorites ★' : 'Add to Favorites ☆'}
      </button>

      <dl className="grid grid-cols-2 gap-4">
        {Object.entries(properties).map(([key, value]) => (
          <React.Fragment key={key}>
            <dt className="font-semibold">
              {key.replace(/_/g, ' ')}
            </dt>
            <dd>{String(value)}</dd>
          </React.Fragment>
        ))}
      </dl>
    </div>
  );
}