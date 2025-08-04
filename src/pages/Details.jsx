// src/pages/Details.jsx

import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useFavorites } from "../store";
import "bootstrap/dist/css/bootstrap.min.css";
import "../index.css";

const API_BASE = "https://www.swapi.tech/api";

export default function Details() {
  const { category, id } = useParams();
  const idRef = useRef(id);
  const [properties, setProperties] = useState(null);
  const [name, setName] = useState("");
  const { favorites, addFavorite, removeFavorite } = useFavorites();

  useEffect(() => {
    idRef.current = id;
    fetch(`${API_BASE}/${category}/${id}`)
      .then((res) => res.json())
      .then((json) => {
        setProperties(json.result.properties);
        setName(json.result.name);
      });
  }, [category, id]);

  if (!properties)
    return <div className="text-center my-4">Loading…</div>;

  const isFav = favorites.some(
    (f) => f.category === category && f.id === idRef.current
  );

  const imgSrc = `https://picsum.photos/seed/${category}-${id}/288/180`;

  return (
    <div className="container my-4">
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8">
          <div className="card" style={{ width: "30rem" }}>
            <img
              src={imgSrc}
              className="card-img-top fixed-img"
              alt={name}
              width="288"
              height="180"
              style={{ objectFit: "cover" }}
            />
            <div className="card-body">
              <h5 className="card-title d-flex justify-content-between align-items-center">
                {name}
                <button
                  className="favorite-btn"
                  onClick={() =>
                    isFav
                      ? removeFavorite({ category, id })
                      : addFavorite({ category, id, name })
                  }
                >
                  {isFav ? "★" : "☆"}
                </button>
              </h5>
            </div>
            <ul className="list-group list-group-flush">
              {Object.entries(properties).map(([key, value]) => (
                <li key={key} className="list-group-item">
                  <strong>{key.replace(/_/g, " ")}:</strong>{" "}
                  {String(value)}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}