import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
    const backgroundImageUrl = "https://readdy.ai/api/search-image?query=modern%20tech%20office%20environment%20with%20purple%20and%20teal%20accents%2C%20spacious%20workspace%20with%20computers%2C%20large%20windows%20with%20natural%20light%2C%20minimal%20design%2C%20soft%20lighting%2C%20professional%20atmosphere%2C%20high-quality%20corporate%20setting%2C%20clean%20workspace&width=1920&height=1080&seq=lunar01&orientation=landscape";

    return (
        <section
            className="pt-16 bg-gradient-to-r from-indigo-50 to-purple-50 relative min-h-screen overflow-hidden"
            style={{
                backgroundImage: `url('${backgroundImageUrl}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center right',
                backgroundRepeat: 'no-repeat'
            }}
        >
            {/* Gradient overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent"></div>

            {/* Content container */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="py-20 md:py-28 lg:py-32 max-w-full lg:max-w-2xl">
                    {/* Main heading */}
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                        Launch Your Tech Career at{' '}
                        <span className="text-indigo-600 block sm:inline">Lunar IT</span>
                    </h1>

                    {/* Description */}
                    <p className="mt-6 text-base sm:text-lg md:text-xl text-gray-700 max-w-full lg:max-w-lg">
                        Join our internship program and work alongside industry experts on
                        cutting-edge projects that make a real impact.
                    </p>

                    {/* Call-to-action buttons */}
                    <div className="mt-10 flex flex-col sm:flex-row gap-4">
                        <Link to="/Internship"
                            className="inline-flex items-center justify-center px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all hover:bg-indigo-700 whitespace-nowrap text-center"

                        >
                            <i className="fas fa-search mr-2"></i>
                            Explore Opportunities
                        </Link>
                        <Link
                            to="/Apply"
                            className="inline-flex items-center justify-center px-6 py-3 bg-white text-indigo-600 border border-indigo-600 rounded-lg shadow-sm hover:bg-gray-50 transition-all whitespace-nowrap text-center"
                        >
                            <i className="fas fa-info-circle mr-2"></i>
                            Apply Now
                        </Link>

                    </div>
                </div>
            </div>

            {/* Decorative elements for visual enhancement */}
            <div className="absolute top-20 right-10 w-20 h-20 bg-purple-200 rounded-full opacity-20 animate-pulse hidden lg:block"></div>
            <div className="absolute bottom-20 right-20 w-32 h-32 bg-indigo-200 rounded-full opacity-20 animate-pulse hidden lg:block"></div>
        </section>
    );
};

export default HeroSection;