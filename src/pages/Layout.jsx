// src/pages/Layout.jsx

import React, { useRef } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useFavorites } from "../store";
import "bootstrap/dist/css/bootstrap.min.css";
import "../index.css";

export default function Layout() {
  const logoRef = useRef(null);
  const favLinkRef = useRef(null);
  const navigate = useNavigate();

  // Grab only the removeFavorite action here
  const { favorites, removeFavorite } = useFavorites();

  return (
    <div>
      <nav
        ref={logoRef}
        className="navbar navbar-expand-lg navbar-dark custom-navbar"
      >
        <div className="container-fluid">
          {/* Logo on the left */}
          <Link to="/" className="navbar-brand">
            <img
              src="data:image/jpeg;base64,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pxZI/LPylvzqcMfmhDtZeJNMcMMcjH3Je7Ye2QANyaCWkjO5PctLo3HMTa0xMd3PkztfqaXrFaTv3tpoJjMb6FkcksbHwFzLSSMjJjvtMI2iL+kR3KvrsFozTasTMTz5RM80mi1NK49rztskX/EYBm6op9kZm00RNhvyDrlU/RZJ5RW3ylbnV4duVlXYRVMqcWE9Q9rWGV0ri8hos0lzGZ9jQt3LS2LTcFI57bcmHj2yZom096zhi0Ds+Xgz6ZYx+bliehvHLhn5S3Z1GGPzQiGmel0sMzGUkzLbN3ubycrSScm3zFwB8VoaPR0vWZyV+e8KGs1nOIxS0B08xD1493F5Vb9X6fy/WfupdazeZZOH45BNEyTloWlzGFzXSRsLXkDabZxHG6xcmnvjtNeGZ5+Ey2MWrxcETa3Np9O+RloX2mgc+NzXsDZY3OOey4ANcSeaT4KzoeOmaPwztPKeUq+ty4smP8MxvDYaOV0PyGlBngBbC0EOljY4OubghzrhQ6jHf01/wz2+Eu9LqMVMURaebvxGvh5GT9/AeY7ITRuO48A5c4sd+OPwz2+Ep51WGYmItHYrTRHSd1I/Zfd0DvSaN7T6xl+PVuPxG1qtLGaOXK3j/aWNp9TbDPs8FmU2MU0jQ6OpgIP1pGxOHa2SxCxLYctZ2mk/Lf8ARsV1uC0duztNfD9og99F5l89Hfyz8pd9aweaHz5fD9op/fReZPR38s/KTreHzQ4vxCAfx4O6aM/1L7GO8/ln5S+xqsPmhg1uktHECXzNdb6EZEj3HoFsh2kqWmlzX7I29/Jxl1uGkbxO8+xV2kGMPq6h0zxa9g1ozDIx6LB026eJuVt4MNcNIpX/AHLBy5JyWm0tapkYgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICD/9k="
              alt="Star Wars"
              className="navbar-logo"
            />
          </Link>

          {/* Favorites dropdown on the right */}
          <div className="dropdown ms-auto" ref={favLinkRef}>
            <button
              className="btn btn-secondary dropdown-toggle fav-dropdown-btn"
              type="button"
              id="favDropdown"
              data-bs-toggle="dropdown"
              data-bs-auto-close="outside"
              aria-expanded="false"
            >
              Favorites ({favorites.length})
            </button>
            <ul
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="favDropdown"
            >
              {favorites.length === 0 && (
                <li>
                  <span className="dropdown-item-text">Favorites you have not</span>
                </li>
              )}
              {favorites.map((f, i) => (
                <li key={i}>
                  <div className="d-flex justify-content-between align-items-center px-2">
                    {/* Name button */}
                    <button
                      className="dropdown-item flex-grow-1 text-start p-0"
                      onClick={() =>
                        navigate(`/details/${f.category}/${f.id}`)
                      }
                    >
                      {f.name}
                    </button>
                    {/* Trash icon button */}
                    <button
                      className="btn btn-link text-danger p-0 ms-2"
                      onClick={() =>
                        removeFavorite({ category: f.category, id: f.id })
                      }
                      aria-label={`Remove ${f.name}`}
                    >
                      <i className="fa-solid fa-trash-can"></i>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      <main className="p-4">
        <React.Suspense
          fallback={
            <div className="text-center my-5">
              <div className="spinner-border" role="status"></div>
            </div>
          }
        >
          <Outlet />
        </React.Suspense>
      </main>
    </div>
  );
}