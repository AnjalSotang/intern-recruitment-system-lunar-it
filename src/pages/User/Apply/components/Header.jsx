import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="cursor-pointer flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-300 mr-8"
            >
              <i className="fas fa-arrow-left mr-2"></i>
              <span className="font-medium">Back to Home</span>
            </Link>

            <div className="flex items-center">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 w-10 h-10 rounded-lg flex items-center justify-center mr-3">
                <i className="fas fa-moon text-white text-lg"></i>
              </div>
              <span className="text-2xl font-bold text-gray-900">LunarIT</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
