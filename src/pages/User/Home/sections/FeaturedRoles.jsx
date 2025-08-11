import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { usePositionStore } from '../../../../store/PositionStore'


const FeaturedRoles = () => {
    const navigate = useNavigate()
    const positions = usePositionStore(state => state.positions);
    const fetchPositions = usePositionStore(state => state.fetchPositions);
    const loading = usePositionStore(state => state.loading);
    const error = usePositionStore(state => state.error);
    const status = usePositionStore(state => state.status);
    const message = usePositionStore(state => state.message)

    useEffect(() => {
        fetchPositions();
    }, [])


    const featuredRoles = [
        {
            id: 1,
            title: "Frontend Developer",
            department: "Engineering",
            location: "Remote (with occasional office visits)",
            description: "Join our UI/UX team to create responsive, user-friendly interfaces using React, TypeScript, and modern CSS frameworks.",
            duration: "3 Months",
            skills: ["React", "TypeScript", "Tailwind CSS"],
            colorClass: "bg-violet-700",
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
            colorClass: "bg-teal-600",
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
            colorClass: "bg-violet-700",
            badgeClass: "bg-indigo-100 text-primary"
        },
    ];

    const halka = (role) => {
        navigate(`/Details/${role._id}`);
    }

    // Render loading state
    if (loading) {
        // Render 3 skeleton cards as placeholders
        return (
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
                                <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div> {/* title skeleton */}
                                <div className="h-4 bg-gray-300 rounded w-1/4 mb-6"></div> {/* duration skeleton */}
                                <div className="h-4 bg-gray-300 rounded w-full mb-4"></div> {/* location */}
                                <div className="h-4 bg-gray-300 rounded w-full mb-4"></div> {/* description line 1 */}
                                <div className="h-4 bg-gray-300 rounded w-5/6 mb-4"></div> {/* description line 2 */}
                                <div className="flex flex-wrap gap-2 mb-6">
                                    <div className="h-6 bg-gray-300 rounded w-16"></div> {/* skill badge skeleton */}
                                    <div className="h-6 bg-gray-300 rounded w-16"></div>
                                    <div className="h-6 bg-gray-300 rounded w-16"></div>
                                </div>
                                <div className="h-10 bg-gray-300 rounded w-full"></div> {/* button skeleton */}
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }



    // Render error state
    if (error) {
        return (
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="w-16 h-16 mx-auto flex items-center justify-center bg-red-100 rounded-full text-red-500">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-8 h-8"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </div>
                    <h3 className="mt-4 text-lg font-medium text-red-600">Oops! Something went wrong.</h3>
                    <p className="mt-2 text-gray-600">{message || "Unable to fetch internship positions."}</p>
                    <button
                        onClick={() => fetchPositions()}
                        className="mt-6 px-6 py-2 bg-red-600 text-white rounded shadow-sm hover:bg-red-700 transition-colors"
                    >
                        Retry
                    </button>
                </div>
            </section>
        );
    }

    // Render empty state if positions array is empty
    if (!positions || positions.length === 0) {
        return (
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <p className="text-lg text-gray-600">No internship positions available right now.</p>
                    <Link
                        to="/Internship"
                        className="mt-4 inline-block px-6 py-3 border border-indigo-600 text-indigo-600 bg-white rounded shadow-sm hover:bg-gray-50 transition"
                    >
                        Check back later
                    </Link>
                </div>
            </section>
        );
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
                    {positions.map((role, _id) => (
                        <div
                            key={_id}
                            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                        >
                            {/* <div className={`h-3 ${role.colorClass}`}></div> */}
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-xl font-semibold text-gray-900">
                                        {role.title}
                                    </h3>
                                    <span className="px-3 py-1 bg-teal-100 text-teal-600 text-xs rounded-full font-medium">
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
                                    {role?.skills?.length > 0
                                        ? role.skills.map((skill, skillIndex) => (
                                            <span
                                                key={skillIndex}
                                                className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
                                            >
                                                {skill}
                                            </span>
                                        ))
                                        : <span className="text-gray-400 italic">No skills listed</span>
                                    }
                                </div>
                                <button
                                    onClick={() => { halka(role) }}
                                    className={'block w-full text-center px-4 py-2 bg-violet-700 text-white rounded shadow-sm hover:opacity-90 transition-opacity'}>

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
                        className="inline-flex items-center px-6 py-3 border border-indigo-600 text-indigo-600 bg-white rounded-button shadow-sm hover:bg-gray-50 transition-colors whitespace-nowrap"

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