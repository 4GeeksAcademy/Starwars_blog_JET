import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useFavorites } from "../store";
import "bootstrap/dist/css/bootstrap.min.css";
import "../index.css";

const API_BASE = "https://www.swapi.tech/api";

export default function Home() {
  const [people, setPeople] = useState([]);
  const [peopleDetails, setPeopleDetails] = useState({});
  const [vehicles, setVehicles] = useState([]);
  const [vehicleDetails, setVehicleDetails] = useState({});
  const [planets, setPlanets] = useState([]);
  const [planetDetails, setPlanetDetails] = useState({});

  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const navigate = useNavigate();
  const idRef = useRef(null);

  useEffect(() => {
    fetch(`${API_BASE}/people`)
      .then((r) => r.json())
      .then((d) => {
        setPeople(d.results);
        d.results.forEach((item) => {
          fetch(`${API_BASE}/people/${item.uid}`)
            .then((r2) => r2.json())
            .then((j) =>
              setPeopleDetails((p) => ({
                ...p,
                [item.uid]: {
                  ...j.result.properties,
                  description: j.result.description,
                },
              }))
            );
        });
      });

    fetch(`${API_BASE}/vehicles`)
      .then((r) => r.json())
      .then((d) => {
        setVehicles(d.results);
        d.results.forEach((item) => {
          fetch(`${API_BASE}/vehicles/${item.uid}`)
            .then((r2) => r2.json())
            .then((j) =>
              setVehicleDetails((p) => ({
                ...p,
                [item.uid]: j.result.properties,
              }))
            );
        });
      });

    fetch(`${API_BASE}/planets`)
      .then((r) => r.json())
      .then((d) => {
        setPlanets(d.results);
        d.results.forEach((item) => {
          fetch(`${API_BASE}/planets/${item.uid}`)
            .then((r2) => r2.json())
            .then((j) =>
              setPlanetDetails((p) => ({
                ...p,
                [item.uid]: j.result.properties,
              }))
            );
        });
      });
  }, []);

  const goToDetails = (category, uid) => {
    idRef.current = uid;
    navigate(`/details/${category}/${uid}`);
  };

  const renderCards = (items, category) =>
    items.map((item) => {
      const details =
        category === "people"
          ? peopleDetails[item.uid]
          : category === "vehicles"
          ? vehicleDetails[item.uid]
          : planetDetails[item.uid];

      const isFav = favorites.some(
        (f) => f.category === category && f.id === item.uid
      );

      const imgSrc = `https://picsum.photos/seed/${category}-${item.uid}/288/180`;

      return (
        <div key={item.uid} className="card" style={{ width: "18rem" }}>
          <img
            src={imgSrc}
            className="card-img-top fixed-img"
            alt={item.name}
            width="288"
            height="180"
            style={{ objectFit: "cover" }}
          />

          <div className="card-body d-flex flex-column justify-content-between">
            <h5 className="card-title">{item.name}</h5>

            {details ? (
              <div className="card-text mb-3">
                {category === "people" && (
                  <>
                    <p className="mb-1">
                      <strong>Gender:</strong> {details.gender}
                    </p>
                    <p className="mb-1">
                      <strong>Mass:</strong> {details.mass}
                    </p>
                    <p className="mb-1">
                      <strong>Birth Year:</strong> {details.birth_year}
                    </p>
                  </>
                )}
                {category === "vehicles" && (
                  <>
                    <p className="mb-1">
                      <strong>Model:</strong> {details.model}
                    </p>
                    <p className="mb-1">
                      <strong>Crew:</strong> {details.crew}
                    </p>
                    <p className="mb-1">
                      <strong>Consumables:</strong> {details.consumables}
                    </p>
                  </>
                )}
                {category === "planets" && (
                  <>
                    <p className="mb-1">
                      <strong>Terrain:</strong> {details.terrain}
                    </p>
                    <p className="mb-1">
                      <strong>Climate:</strong> {details.climate}
                    </p>
                    <p className="mb-1">
                      <strong>Gravity:</strong> {details.gravity}
                    </p>
                  </>
                )}
              </div>
            ) : (
              <div className="mb-3 text-muted">Loading info…</div>
            )}

            <div className="d-flex justify-content-between align-items-center mt-3">
              <button
                className="btn btn-primary"
                onClick={() => goToDetails(category, item.uid)}
              >
                Info More you will find
              </button>
              <button
                className="favorite-btn"
                onClick={() =>
                  isFav
                    ? removeFavorite({ category, id: item.uid })
                    : addFavorite({
                        category,
                        id: item.uid,
                        name: item.name,
                      })
                }
              >
                {isFav ? "★" : "☆"}
              </button>
            </div>
          </div>
        </div>
      );
    });

  return (
    <>
      {/* Content */}
      <div className="container mt-4">
        <h2>People</h2>
        <div className="card-container mb-5 scroll-x">
          {renderCards(people, "people")}
        </div>

        <h2>Vehicles</h2>
        <div className="card-container mb-5 scroll-x">
          {renderCards(vehicles, "vehicles")}
        </div>

        <h2>Planets</h2>
        <div className="card-container mb-5 scroll-x">
          {renderCards(planets, "planets")}
        </div>
      </div>
    </>
  );
}
