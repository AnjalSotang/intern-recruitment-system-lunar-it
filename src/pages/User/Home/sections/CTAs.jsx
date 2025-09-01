import React from 'react'
import { Link } from 'react-router-dom'

const CTAs = () => {
  return (
    <section className="py-24 bg-gradient-to-r from-blue-600 to-purple-600">
      <div className="max-w-4xl mx-auto text-center px-6">
        <h2 className="text-4xl font-bold text-white mb-6">
          Ready to Start Your Tech Journey?
        </h2>
        <p className="text-xl text-blue-100 mb-12 leading-relaxed">
          Join hundreds of successful interns who have launched their
          careers with us. Your future in technology starts here.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Link
            to="/Internship"
            className="!rounded-button whitespace-nowrap cursor-pointer bg-white text-blue-600 px-8 py-4 text-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
          >
            Explore Opportunities
          </Link>
        
          <Link
            to="/contact"
            className="!rounded-button whitespace-nowrap cursor-pointer border-2 border-white text-white px-8 py-4 text-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300">
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  )
}

export default CTAs
