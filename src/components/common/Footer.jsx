import React from 'react'
import { Link } from 'react-router-dom'


const Footer = () => {
  return (
   <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">

            {/* Company Info */}
            <section className="md:col-span-2">
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 w-10 h-10 rounded-lg flex items-center justify-center mr-3">
                  <i className="fas fa-moon text-white text-lg"></i>
                </div>
                <span className="text-2xl font-bold">LunarIT</span>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed max-w-md">
                Empowering the next generation of tech professionals through
                comprehensive internship programs and hands-on learning
                experiences.
              </p>
              <div className="flex space-x-4">
                <Link
                  to="#"
                  className="cursor-pointer w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors duration-300"
                >
                  <i className="fab fa-linkedin text-lg"></i>
                </Link>
                <Link
                  to="#"
                  className="cursor-pointer w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors duration-300"
                >
                  <i className="fab fa-twitter text-lg"></i>
                </Link>
                <Link
                  to="#"
                  className="cursor-pointer w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors duration-300"
                >
                  <i className="fab fa-github text-lg"></i>
                </Link>
                <Link
                  to="#"
                  className="cursor-pointer w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors duration-300"
                >
                  <i className="fab fa-instagram text-lg"></i>
                </Link>
              </div>
            </section>


            {/* Quick Links */}
            <section>
              <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/"
                    className="cursor-pointer text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <a
                    to="Internship"
                    className="cursor-pointer text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    Internships
                  </a>
                </li>
                <li>
                  <Link
                    to="About"
                    className="cursor-pointer text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="cursor-pointer text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </section>


            {/* Contact Info */}
            <section>
              <h3 className="text-lg font-semibold mb-6">Contact Info</h3>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-400">
                  <i className="fas fa-envelope mr-3"></i>
                  <span>careers@techintern.com</span>
                </li>
                <li className="flex items-center text-gray-400">
                  <i className="fas fa-phone mr-3"></i>
                  <span>+1 (555) 123-4567</span>
                </li>
                <li className="flex items-center text-gray-400">
                  <i className="fas fa-map-marker-alt mr-3"></i>
                  <span>San Francisco, CA</span>
                </li>
              </ul>
            </section>

          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 LunarIT. All rights reserved.</p>
          </div>
        </div>
      </footer>
  )
}

export default Footer
