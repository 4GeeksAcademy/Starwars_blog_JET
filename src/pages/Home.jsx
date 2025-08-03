import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFavorites } from '../store.jsx';

const API_BASE = 'https://www.swapi.tech/api';

export default function Home() {
  const [people, setPeople] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [planets, setPlanets] = useState([]);

  // 1) Ref to hold the current id for navigation
  const idRef = useRef(null);
  // 2) Router navigate hook
  const navigate = useNavigate();

  const { favorites, addFavorite, removeFavorite } = useFavorites();

  useEffect(() => {
    fetch(`${API_BASE}/people`)
      .then(res => res.json())
      .then(data => setPeople(data.results));

    fetch(`${API_BASE}/vehicles`)
      .then(res => res.json())
      .then(data => setVehicles(data.results));

    fetch(`${API_BASE}/planets`)
      .then(res => res.json())
      .then(data => setPlanets(data.results));
  }, []);

  // 3) Imperative navigation using ref
  const goToDetails = (category, uid) => {
    idRef.current = uid;
    navigate(`/details/${category}/${idRef.current}`);
  };

  const renderList = (items, category) =>
    items.map(item => {
      const isFav = favorites.some(
        f => f.category === category && f.id === item.uid
      );
      return (
        <li key={item.uid} className="flex justify-between items-center py-1">
          {/* 4) Clickable span replaces Link */}
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => goToDetails(category, item.uid)}
          >
            {item.name}
          </span>
          <button
            onClick={() =>
              isFav
                ? removeFavorite({ category, id: item.uid })
                : addFavorite({ category, id: item.uid, name: item.name })
            }
            className="ml-4"
          >
            {isFav ? '★' : '☆'}
          </button>
        </li>
      );
    });

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl font-semibold mb-2">People</h2>
        <ul>{renderList(people, 'people')}</ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold mb-2">Vehicles</h2>
        <ul>{renderList(vehicles, 'vehicles')}</ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold mb-2">Planets</h2>
        <ul>{renderList(planets, 'planets')}</ul>
      </section>
    </div>
  );
}