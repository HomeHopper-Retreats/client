import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { useContext, useState } from "react";
import logo from "../assets/images/homehopper-logo.png";

function Navbar() {
  const { isLoggedIn, isAdmin } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="sticky top-0 z-10 border-gray-700 bg-gray-800 mb-5">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        <Link to="/" className="flex-shrink-0">
          <img className="w-auto h-16" src={logo} alt="HomeHopper Logo" />
        </Link>
        <div id="linklist" className="ml-auto">
          <ul className="flex flex-row font-medium bg-gray-800 border-gray-700">
            {isLoggedIn && (
              <li>
                <Link
                  to="/reservations"
                  onClick={toggleMenu}
                  className="block py-2 px-3 text-gray-400 rounded hover:bg-gray-700 hover:text-white"
                >
                  My Reservations
                </Link>
              </li>
            )}
            {isLoggedIn && isAdmin() && (
              <li>
                <Link
                  to="/admin"
                  onClick={toggleMenu}
                  className="block py-2 px-3 text-gray-400 rounded hover:bg-gray-700 hover:text-white"
                  aria-current="page"
                >
                  Admin
                </Link>
              </li>
            )}
            <li>
              <Link
                to="/about"
                onClick={toggleMenu}
                className="block py-2 px-3 text-gray-400 rounded hover:bg-gray-700 hover:text-white"
              >
                About us
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                onClick={toggleMenu}
                className="block py-2 px-3 text-gray-400 rounded hover:bg-gray-700 hover:text-white"
              >
                {isLoggedIn ? "Logout" : "Login"}
              </Link>
            </li>
          </ul>
        </div>

        <div id="linkmenu">
          <button
            onClick={toggleMenu}
            type="button"
            className="inline-flex items-center justify-center p-2 w-10 h-10 text-sm text-gray-400 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
            aria-controls="navbar-hamburger"
            aria-expanded={menuOpen ? "true" : "false"}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div
            onMouseLeave={toggleMenu}
            className={`absolute right-0 top-full w-2/5 mt-0 bg-gray-800 border-gray-700 ${
              menuOpen ? "" : "hidden"
            }`}
            id="navbar-hamburger"
          >
            <ul className="flex flex-col font-medium">
              {isLoggedIn && (
                <li>
                  <Link
                    to="/reservations"
                    onClick={toggleMenu}
                    className="block py-2 px-3 text-gray-400 rounded hover:bg-gray-700 hover:text-white"
                  >
                    My Reservations
                  </Link>
                </li>
              )}
              {isLoggedIn && isAdmin() && (
                <li>
                  <Link
                    to="/admin"
                    onClick={toggleMenu}
                    className="block py-2 px-3 text-gray-400 rounded hover:bg-gray-700 hover:text-white"
                    aria-current="page"
                  >
                    Admin
                  </Link>
                </li>
              )}
              <li>
                <Link
                  to="/about"
                  onClick={toggleMenu}
                  className="block py-2 px-3 text-gray-400 rounded hover:bg-gray-700 hover:text-white"
                >
                  About us
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  onClick={toggleMenu}
                  className="block py-2 px-3 text-gray-400 rounded hover:bg-gray-700 hover:text-white"
                >
                  {isLoggedIn ? "Logout" : "Login"}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
