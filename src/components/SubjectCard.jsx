import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { StoreContext } from "../store";

export default function SubjectCard({ item, type }) {
  const { store, dispatch } = useContext(StoreContext);

  const isFavorite = store.favorites.some(
    fav => fav.uid === item.uid && fav.type === type
  );

  const toggleFavorite = () => {
    dispatch({
      type: isFavorite ? "REMOVE_FAVORITE" : "ADD_FAVORITE",
      payload: { ...item, type },
    });
  };

  return (
    <div className="bg-gray-800 rounded shadow p-4 relative">
      <img
        src={`https://starwars-visualguide.com/assets/img/${type}/${item.uid}.jpg`}
        alt={item.name}
        className="w-full h-48 object-cover mb-2 rounded"
        onError={(e) => (e.target.style.display = "none")}
      />
      <h3 className="text-lg font-bold">{item.name}</h3>
      <p className="text-sm">ID: {item.uid}</p>
      <div className="flex justify-between items-center mt-4 text-sm">
        <Link
          to={`/single/${item.uid}`}
          state={{ type }}
          className="text-blue-400"
        >
          Learn more
        </Link>
        <button onClick={toggleFavorite} className="text-red-500 text-lg">
          {isFavorite ? "♥" : "♡"}
        </button>
      </div>
    </div>
  );
}