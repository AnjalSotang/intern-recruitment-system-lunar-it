import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex items-center justify-between h-20">
                        {/* Back Button */}
                        <Link
                            to="/"
                            data-readdy="true"
                            className="cursor-pointer flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-300"
                        >
                            <i className="fas fa-arrow-left mr-3 text-lg"></i>
                            <span className="font-medium">Back to Internships</span>
                        </Link>


                        {/* Logo */}
                        <div className="flex items-center">
                            <div className="bg-gradient-to-r from-blue-600 to-purple-600 w-10 h-10 rounded-lg flex items-center justify-center mr-3">
                                <i className="fas fa-code text-white text-lg"></i>
                            </div>
                            <span className="text-2xl font-bold text-gray-900">
                                LunarIT
                            </span>
                        </div>

                        {/* Contact Button */}
                        <button className="!rounded-button whitespace-nowrap cursor-pointer bg-blue-600 text-white px-6 py-2 font-medium hover:bg-blue-700 transition-colors duration-300">
                            <i className="fas fa-envelope mr-2"></i>
                            Contact HR
                        </button>
                    </div>
                </div>
            </header>
  )
}

export default Header
