import { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import logo from '../assets/img2.png';
import { Link } from 'react-router-dom';

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="bg-gray-800">
      {/* Desktop View */}
      <nav className="flex items-center justify-between mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 h-16" role="navigation">
        <Link to="/" >
          <div className="flex lg:flex-1">
            <div className="nav-link p-3 m-4 mr-2">
              <img
                alt="bola dunia"
                src={logo}
                className="h-10 w-12"
              />
            </div>
            <h1 className="text-amber-300 font-semibold px-0 py-9">GLOBAL POPULATION RANK</h1>
          </div>
        </Link>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} // Toggle the mobile menu
            className="-m-18 inline-flex items-center justify-center rounded-md p-2.5 text-white"
          >
            <span className="sr-only">Open main menu</span>
            {mobileMenuOpen ? (
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            ) : (
              <Bars3Icon aria-hidden="true" className="h-6 w-6" />
            )}
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          <ul>
            <li>
              <Link to="/" className="nav-link text-sm leading-6 text-amber-300 hover:bg-gray-50 hover:text-gray-900 block rounded-md px-3 py-2 font-medium">Home</Link>
            </li>
          </ul>
          <ul>
            <li>
              <Link to="/compare" className="nav-link text-sm leading-6 text-amber-300 hover:bg-gray-50 hover:text-gray-900 block rounded-md px-3 py-2 font-medium">Country</Link>
            </li>
          </ul>
          <ul>
            <li>
              <Link to="/article" className="nav-link text-sm leading-6 text-amber-300 hover:bg-gray-50 hover:text-gray-900 block rounded-md px-3 py-2 font-medium">News</Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Mobile View */}
      <div className={`lg:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="flex flex-col p-4 bg-gray-800">
          <ul>
            <li>
              <Link to="/" className="nav-link block rounded-lg px-8 py-2 text-base font-semibold leading-7 text-amber-300 hover:bg-gray-50 hover:text-gray-900" onClick={() => setMobileMenuOpen(false)}>Home</Link>
            </li>
          </ul>
          <ul>
            <li>
              <Link to="/compare" className="nav-link block rounded-lg px-8 py-2 text-base font-semibold leading-7 text-amber-300 hover:bg-gray-50 hover:text-gray-900" onClick={() => setMobileMenuOpen(false)}>Country</Link>
            </li>
          </ul>
          <ul>
            <li>
              <Link to="/article" className="nav-link block rounded-lg px-8 py-2 text-base font-semibold leading-7 text-amber-300 hover:bg-gray-50 hover:text-gray-900" onClick={() => setMobileMenuOpen(false)}>News</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;