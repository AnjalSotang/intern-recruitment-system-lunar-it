import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faCode } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from "react-router-dom";
import { faMoon } from '@fortawesome/free-solid-svg-icons/faMoon';
import logo from "/logo.ico"

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItemClass = (path) =>
    ` cursor-pointer font-medium transition-colors duration-300 ${location.pathname === path ? "text-blue-600" : "text-gray-700 hover:text-blue-600"}`;

  const navItemClass1 = (path) =>
    ` block cursor-pointer font-medium transition-colors duration-300 ${location.pathname === path ? "text-blue-600" : "text-gray-700 hover:text-blue-600"}`;


  return (
    <div className="bg-white" style={{ fontFamily: "Inter, sans-serif" }}>
      <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-sm z-50">
        
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center cursor-pointer">
              <div className="w-10 h-14 rounded-lg flex items-center justify-center ml-1.5 ">
              <img src={logo} alt="" />
              </div>
              <span className="text-1xl font-bold text-gray-900">Lunar I.T. Solution
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/" className={navItemClass("/")}>Home</Link>
              <Link to="/Internship" className={navItemClass("/Internship")}>Internships</Link>
              <Link to="/about" className={navItemClass("/about")}>About Us</Link>
              <Link to="/contact" className={navItemClass("/contact")}>Contact Us</Link>
              {/* <Link
                to="/admin/login"
                className="!rounded-button whitespace-nowrap bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
              >
                Admin Login
              </Link> */}
            </nav>

            {/* Mobile Menu Button */}
            <button className="md:hidden cursor-pointer p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <FontAwesomeIcon icon={mobileMenuOpen ? faTimes : faBars} className="text-xl text-gray-700" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-6 py-4 space-y-4">
              <Link to="/" onClick={() => setMobileMenuOpen(false)} className={navItemClass1("/")}>Home</Link>
              <Link to="/Internship" onClick={() => setMobileMenuOpen(false)} className={navItemClass1("/Internship")}>Internships</Link>
              <Link to="/about" onClick={() => setMobileMenuOpen(false)} className={navItemClass1("/about")}>About us</Link>
              <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className={navItemClass1("/contact")}>Contact Us</Link>
              <Link
                to="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-left font-medium bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-md hover:from-blue-700 hover:to-purple-700"
              >
                Admin Login
              </Link>
            </div>
          </div>
        )}
      </header>
    </div>

  );
};

export default Navbar;
