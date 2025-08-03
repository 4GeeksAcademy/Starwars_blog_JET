import React, { useRef} from "react";
import { Link, Outlet } from "react-router-dom";
import { useFavorites } from '../store';
import { Navbar } from "../components/Navbar";

export default function Layout() {
  // refs to key DOM nodes (e.g. for focus or animations later)
  const logoRef = useRef(null);
  const favLinkRef = useRef(null);

  const { favorites } = useFavorites();

  return (
    <div>
      <nav
        ref={logoRef}
        className="flex items-center justify-between p-4 bg-gray-900 text-white"
      >
        <Link to="/" className="text-2xl font-bold">
          StarWarsDB
        </Link>
        <div>
          <Link ref={favLinkRef} to="#favorites" className="relative">
            Favorites
            {favorites.length > 0 && (
              <span className="ml-1 text-yellow-300">
                ({favorites.length})
              </span>
            )}
          </Link>
        </div>
      </nav>

      <main className="p-4">
        <React.Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </React.Suspense>
      </main>
    </div>
  );
}