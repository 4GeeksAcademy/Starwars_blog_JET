import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { StoreContext } from "../store";

export default function Navbar() {
  const { store } = useContext(StoreContext);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-gray-900">
      <Link to="/" className="text-yellow-400 text-xl font-bold">
        Star Wars
      </Link>
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white bg-gray-700 px-4 py-2 rounded"
        >
          Favorites ⬇
        </button>
        {isOpen && (
          <ul className="absolute right-0 mt-2 w-64 bg-white text-black rounded shadow-lg z-10 max-h-60 overflow-y-auto">
            {store.favorites.length === 0 ? (
              <li className="px-4 py-2">No favorites yet</li>
            ) : (
              store.favorites.map((fav, index) => (
                <li key={index} className="px-4 py-2 border-b hover:bg-gray-200">
                  <Link
                    to={`/single/${fav.uid}`}
                    state={{ type: fav.type }}
                    onClick={() => setIsOpen(false)}
                  >
                    {fav.name} ({fav.type})
                  </Link>
                </li>
              ))
            )}
          </ul>
        )}
      </div>
    </nav>
  );
}