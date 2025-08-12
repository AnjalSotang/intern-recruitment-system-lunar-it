import React from 'react'

const Header = () => {
    return (
         <section className="bg-gradient-to-r from-indigo-50 to-purple-50 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent"></div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="py-32 md:py-28 lg:py-32 text-center">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Contact <span className="text-primary">Us</span>
                </h1>
                <p className="mt-6 text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
               Have questions about our internship program? Want to partner with us? We'd love to hear from you and help you get started.
                </p>
              </div>
            </div>
          </section>

    )
}

export default Header
