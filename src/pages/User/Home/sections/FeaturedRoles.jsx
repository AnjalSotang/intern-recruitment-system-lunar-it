import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

const FeaturedRoles = () => {
    const navigate = useNavigate()
    const featuredRoles = [
        {
            id: 1,
            title: "Frontend Developer",
            department: "Engineering",
            location: "Remote (with occasional office visits)",
            description: "Join our UI/UX team to create responsive, user-friendly interfaces using React, TypeScript, and modern CSS frameworks.",
            duration: "3 Months",
            skills: ["React", "TypeScript", "Tailwind CSS"],
            colorClass: "bg-primary",
            badgeClass: "bg-indigo-100 text-primary"
        },
        {
            id: 1,
            title: "Backend Engineer",
            department: "Engineering",
            location: "Hybrid (3 days in office)",
            description: "Develop robust APIs and microservices using Node.js, Express, and MongoDB while learning best practices in backend architecture.",
            duration: "6 Months",
            skills: ["Node.js", "Express", "MongoDB"],
            colorClass: "bg-secondary",
            badgeClass: "bg-teal-100 text-secondary"
        },
        {
            id: 3,
            title: "Data Scientist",
            department: "Data Science",
            location: "On-site (London Office)",
            description: "Analyze complex datasets and build predictive models to help our clients make data-driven decisions using Python and ML frameworks.",
            duration: "4 Months",
            skills: ["Python", "TensorFlow", "SQL"],
            colorClass: "bg-primary",
            badgeClass: "bg-indigo-100 text-primary"
        },
    ];

    const halka = (role) => {
    navigate(`/Details/${role.id}`);
    }
    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900">
                        Available Internship Positions
                    </h2>
                    <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                        Explore our current openings and find the perfect opportunity to
                        kickstart your career.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuredRoles.map((role, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                        >
                            <div className={`h-3 ${role.colorClass}`}></div>
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-xl font-semibold text-gray-900">
                                        {role.title}
                                    </h3>
                                    <span className={`px-3 py-1 ${role.badgeClass} text-xs rounded-full font-medium`}>
                                        {role.duration}
                                    </span>
                                </div>
                                <div className="flex items-center text-gray-500 text-sm mb-4">
                                    <div className="w-4 h-4 flex items-center justify-center mr-2">
                                        <i className="fas fa-map-marker-alt"></i>
                                    </div>
                                    <span>{role.location}</span>
                                </div>
                                <p className="text-gray-600 mb-6">
                                    {role.description}
                                </p>
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {role.skills.map((skill, skillIndex) => (
                                        <span
                                            key={skillIndex}
                                            className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                                <button
                                    onClick={() => {halka(role)}}
                                    className={`block w-full text-center px-4 py-2 ${role.colorClass} text-white rounded-button shadow-sm hover:${role.colorClass}/90 transition-colors whitespace-nowrap`}
                                >
                                                                        View Details

                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-12 text-center">
                    <Link
                        to="/Internship"
                        data-readdy="true"
                        className="inline-flex items-center px-6 py-3 border border-primary text-primary bg-white rounded-button shadow-sm hover:bg-gray-50 transition-colors whitespace-nowrap"

                    >
                        View All Positions
                        <div className="w-5 h-5 flex items-center justify-center ml-2">
                            <i className="fas fa-arrow-right"></i>
                        </div>
                    </Link>

                </div>
            </div>
        </section>
    )
}

export default FeaturedRoles