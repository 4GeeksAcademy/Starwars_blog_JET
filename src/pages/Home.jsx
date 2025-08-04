import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFavorites } from '../store';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';

const API_BASE = 'https://www.swapi.tech/api';

export default function Home() {
  const [people, setPeople] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [planets, setPlanets] = useState([]);

  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const navigate = useNavigate();
  const idRef = useRef(null);

  useEffect(() => {
    fetch(`${API_BASE}/people`)
      .then(r => r.json())
      .then(d => setPeople(d.results));

    fetch(`${API_BASE}/vehicles`)
      .then(r => r.json())
      .then(d => setVehicles(d.results));

    fetch(`${API_BASE}/planets`)
      .then(r => r.json())
      .then(d => setPlanets(d.results));
  }, []);

  const goToDetails = (category, uid) => {
    idRef.current = uid;
    navigate(`/details/${category}/${uid}`);
  };

  const renderCards = (items, category) =>
    items.map(item => {
      const isFav = favorites.some(f => f.category === category && f.id === item.uid);
      const imgSrc = `https://picsum.photos/seed/${category}-${item.uid}/288/180`;

      return (
        <div
          key={item.uid}
          className="card"
          style={{ flex: '0 0 auto', width: '18rem' }}
        >
          <img
            src={imgSrc}
            className="card-img-top fixed-img"
            alt={item.name}
            width="288"
            height="180"
            style={{ objectFit: 'cover' }}
          />
          <div className="card-body d-flex flex-column justify-content-between">
            <h5 className="card-title">{item.name}</h5>
            <div className="d-flex justify-content-between align-items-center mt-3">
              <button
                className="btn btn-primary"
                onClick={() => goToDetails(category, item.uid)}
              >
                More Info, you will have.
              </button>
              <button
                className={`favorite-btn${isFav ? ' selected' : ''}`}
                onClick={() =>
                  isFav
                    ? removeFavorite({ category, id: item.uid })
                    : addFavorite({ category, id: item.uid, name: item.name })
                }
                aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
              >
                <i className={isFav ? 'fa-solid fa-heart' : 'fa-regular fa-heart'} />
              </button>
            </div>
          </div>
        </div>
      );
    });

  return (
    <div className="container mt-4">
      <h2>People</h2>
      <div className="card-container mb-5 scroll-x">
        {renderCards(people, 'people')}
      </div>

      <h2>Vehicles</h2>
      <div className="card-container mb-5 scroll-x">
        {renderCards(vehicles, 'vehicles')}
      </div>

      <h2>Planets</h2>
      <div className="card-container mb-5 scroll-x">
        {renderCards(planets, 'planets')}
      </div>
    </div>
  );
}