import React from 'react'

const Search = ({
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    positionFilter,
    setPositionFilter,
    type
}) => {
    return (
        <div
            className={
                type === "Intern"
                    ? "flex flex-row justify-between items-center gap-4 mb-6"
                    : "flex flex-col lg:flex-row gap-4 mb-6 lg:items-center"
            }
        >
            {/* Show heading only if type is Intern */}
            {type === "Intern" && (
                <h1 className="ml-4 text-lg font-semibold whitespace-nowrap flex-shrink-0 text-gray-800">
                    All Positions
                </h1>
            )}

            {/* Search input */}
            <div
                className={`relative ${type === "Intern" ? "flex-grow-0 w-0/2" : "flex-grow"}`}
            >

                <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 "></i>
                <input
                    type="text"
                    placeholder={
                        type === "Intern"
                            ? "Search positions..."
                            : "Search by name, email or position"
                    }
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Filters only if type === "Application" */}
            {
                type === "Application" && (
                    <div className="flex gap-3 mt-4 lg:mt-0">
                        <div className="relative">
                            <select
                                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
                                value={positionFilter}
                                onChange={(e) => setPositionFilter(e.target.value)}
                            >
                                <option value="all">All Positions</option>
                                <option value="Software Engineer Intern">Software Engineer</option>
                                <option value="Data Science Intern">Data Science</option>
                                <option value="UX Design Intern">UX Design</option>
                            </select>
                            <i className="fas fa-chevron-down absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"></i>
                        </div>

                        <div className="relative">
                            <select
                                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                            >
                                <option value="all">All Status</option>
                                <option value="new">New</option>
                                <option value="shortlisted">Shortlisted</option>
                                <option value="rejected">Rejected</option>
                            </select>
                            <i className="fas fa-chevron-down absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"></i>
                        </div>
                    </div>
                )
            }
        </div >
    )
}

export default Search
