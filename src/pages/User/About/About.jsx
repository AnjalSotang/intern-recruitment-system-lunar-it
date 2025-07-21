// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.

import React from 'react';
import Layout from '../../../layout/MainLayout';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="min-h-screen bg-white">

      <Layout>
        {/* Main Content */}
        <div className="max-w-7xl my-16 mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">About Lunar IT</h1>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Pioneering the future of technology through innovation, collaboration, and exceptional talent development
            </p>
          </div>

          {/* Company Description */}
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                Founded in 2015, Lunar IT has emerged as a leading technology company specializing in cutting-edge software solutions, cloud infrastructure, and digital transformation services. Our journey began with a simple vision: to bridge the gap between innovative technology and real-world business challenges.
              </p>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                Over the years, we have grown from a small startup to a dynamic organization serving clients across various industries. Our commitment to excellence, continuous learning, and fostering young talent has been the cornerstone of our success.
              </p>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                Today, Lunar IT stands at the forefront of technological advancement, consistently delivering solutions that drive business growth and create meaningful impact in the digital landscape.
              </p>
            </div>
            <div className="relative overflow-hidden rounded-lg shadow-lg">
              <img
                src="https://readdy.ai/api/search-image?query=modern%20tech%20office%20with%20diverse%20team%20of%20professionals%20working%20collaboratively%20on%20computers%20and%20digital%20projects%20in%20a%20bright%20contemporary%20workspace%20with%20glass%20walls%20and%20natural%20lighting&width=600&height=400&seq=about-office-1&orientation=landscape"
                alt="Lunar IT Office"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>

          {/* Mission Statement */}
          <div className="bg-gray-50 rounded-lg p-8 mb-16 border-l-4 border-blue-500">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-lg text-gray-700 italic leading-relaxed max-w-4xl mx-auto">
                "To empower businesses through innovative technology solutions while nurturing the next generation of tech professionals. We believe in creating an ecosystem where creativity meets functionality, and where every intern becomes a catalyst for future innovation."
              </p>
            </div>
          </div>

          {/* Core Values */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Core Values</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-lightbulb text-2xl text-blue-600"></i>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Innovation</h3>
                  <p className="text-gray-600 leading-relaxed">
                    We constantly push boundaries and embrace new technologies to deliver groundbreaking solutions that shape the future of digital experiences.
                  </p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-users text-2xl text-green-600"></i>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Collaboration</h3>
                  <p className="text-gray-600 leading-relaxed">
                    We believe in the power of teamwork and foster an environment where diverse perspectives come together to create exceptional outcomes.
                  </p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-graduation-cap text-2xl text-purple-600"></i>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Growth</h3>
                  <p className="text-gray-600 leading-relaxed">
                    We are committed to continuous learning and development, providing opportunities for both personal and professional advancement.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Company Statistics */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-lg p-12 mb-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
              <div>
                <div className="text-4xl font-bold mb-2">150+</div>
                <div className="text-blue-100">Projects Completed</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">50+</div>
                <div className="text-blue-100">Happy Clients</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">200+</div>
                <div className="text-blue-100">Interns Trained</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">8+</div>
                <div className="text-blue-100">Years Experience</div>
              </div>
            </div>
          </div>

          {/* Internship Focus */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative overflow-hidden rounded-lg shadow-lg">
              <img
                src="https://readdy.ai/api/search-image?query=young%20diverse%20interns%20and%20mentors%20working%20together%20on%20laptops%20and%20coding%20projects%20in%20a%20modern%20tech%20office%20environment%20with%20collaborative%20workspace%20and%20learning%20atmosphere&width=600&height=400&seq=internship-focus-1&orientation=landscape"
                alt="Internship Program"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900">Empowering Future Tech Leaders</h2>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                Our internship program is designed to provide hands-on experience in real-world projects while working alongside industry experts. We believe in learning by doing, and our interns contribute to meaningful projects from day one.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <i className="fas fa-check-circle text-green-500 mt-1"></i>
                  <span className="text-gray-700">Mentorship from senior developers and tech leads</span>
                </div>
                <div className="flex items-start space-x-3">
                  <i className="fas fa-check-circle text-green-500 mt-1"></i>
                  <span className="text-gray-700">Exposure to cutting-edge technologies and frameworks</span>
                </div>
                <div className="flex items-start space-x-3">
                  <i className="fas fa-check-circle text-green-500 mt-1"></i>
                  <span className="text-gray-700">Collaborative project work with cross-functional teams</span>
                </div>
                <div className="flex items-start space-x-3">
                  <i className="fas fa-check-circle text-green-500 mt-1"></i>
                  <span className="text-gray-700">Professional development workshops and training sessions</span>
                </div>
              </div>
              <div className="pt-4">
                <Link
                  to="/Internship"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 cursor-pointer whitespace-nowrap !rounded-button"
                >
                  Explore Internship Opportunities
                  <i className="fas fa-arrow-right ml-2"></i>
                </Link>

              </div>
            </div>
          </div>
        </div>

      </Layout>


    </div>
  );
};

export default About;
