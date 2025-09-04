import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from "react-router-dom";
import logo from "/logo.ico";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const underlineClass = (path) =>
    `relative cursor-pointer font-medium transition-colors duration-300 ease-in-out
   ${location.pathname === path ? "text-indigo-600 after:scale-x-100" : "text-gray-700 hover:text-indigo-600 hover:after:scale-x-100"}
   after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 after:-bottom-1 after:h-[2px]
   after:bg-indigo-600 after:w-full after:scale-x-0 after:origin-center
   after:transition-transform after:duration-300 after:ease-in-out after:rounded-full`;


  return (
    <div className="bg-white" style={{ fontFamily: "Inter, sans-serif" }}>
      <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center cursor-pointer">
              <div className="w-10 h-14 rounded-lg flex items-center justify-center ml-1.5">
                <img src={logo} alt="Logo" />
              </div>
              <span className="text-1xl font-bold text-gray-900">
                Lunar I.T. Solution
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/" className={underlineClass("/")}>Home</Link>
              <Link to="/Internship" className={underlineClass("/Internship")}>Internships</Link>
              <Link to="/about" className={underlineClass("/about")}>About Us</Link>
              <Link to="/contact" className={underlineClass("/contact")}>Contact Us</Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden cursor-pointer p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <FontAwesomeIcon
                icon={mobileMenuOpen ? faTimes : faBars}
                className="text-xl text-gray-700"
              />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed z-40">
            <div className="flex flex-col mt-2 ml-40 px-6 py-4 space-y-4 max-w-44 bg-white rounded-md shadow-md relative z-50">
              <Link to="/" onClick={() => setMobileMenuOpen(false)} className={underlineClass("/")}>Home</Link>
              <Link to="/Internship" onClick={() => setMobileMenuOpen(false)} className={underlineClass("/Internship")}>Internships</Link>
              <Link to="/about" onClick={() => setMobileMenuOpen(false)} className={underlineClass("/about")}>About Us</Link>
              <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className={underlineClass("/contact")}>Contact Us</Link>
              {/* <Link
                to="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-left font-small bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-2 rounded-md hover:from-blue-700 hover:to-purple-700"
              >
                Admin Login
              </Link> */}
            </div>
          </div>
        )}
      </header>
    </div>
  );
};

export default Navbar;
