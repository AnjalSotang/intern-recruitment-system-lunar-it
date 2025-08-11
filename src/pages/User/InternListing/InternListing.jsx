import React, { useState, useEffect } from 'react';
import { Search, MapPin, ArrowLeft, Menu, X, Filter, ChevronDown, ArrowDownUp } from 'lucide-react';
import Layout from '../../../layout/MainLayout';
import FilterDropdown from './components/FilterDropDown';
import InternshipCard from './components/InternshipCard';
import LoadingSkeleton from './components/LoadingSkeleton';
import { filterOptions } from '../../../constants';
import { usePositionStore } from '../../../store/PositionStore'


const InternshipListings = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRoles, setSelectedRoles] = useState([]);
    const [selectedDurations, setSelectedDurations] = useState([]);
    const [selectedLocations, setSelectedLocations] = useState([]);
    const [sortBy, setSortBy] = useState('newest');

    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null);
    const positions = usePositionStore(state => state.positions);
    const fetchPositions = usePositionStore(state => state.fetchPositions);
    const loading = usePositionStore(state => state.loading);
    const error = usePositionStore(state => state.error);
    const status = usePositionStore(state => state.status);
    const message = usePositionStore(state => state.message)


    useEffect(() => {
        fetchPositions();
    }, [])



    // Filter internships
    const filteredInternships = positions.filter(internship => {
        const matchesSearch = searchTerm === '' ||
            internship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            internship.description.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesRole = selectedRoles.length === 0 || selectedRoles.includes(internship.role);
        const matchesDuration = selectedDurations.length === 0 || selectedDurations.includes(internship.duration);
        const matchesLocation = selectedLocations.length === 0 || selectedLocations.includes(internship.location);

        return matchesSearch && matchesRole && matchesDuration && matchesLocation;
    });

    // Sort internships
    const sortedInternships = [...filteredInternships].sort((a, b) => {
        switch (sortBy) {
            case 'duration-asc':
                return parseInt(a.duration) - parseInt(b.duration);
            case 'duration-desc':
                return parseInt(b.duration) - parseInt(a.duration);
            case 'alphabetical':
                return a.title.localeCompare(b.title);
            default:
                return 0;
        }
    });

    const handleFilterChange = (filterType, value) => {
        const setters = {
            role: setSelectedRoles,
            duration: setSelectedDurations,
            location: setSelectedLocations
        };

        const currentValues = {
            role: selectedRoles,
            duration: selectedDurations,
            location: selectedLocations
        }[filterType];

        const setter = setters[filterType];

        if (currentValues.includes(value)) {
            setter(currentValues.filter(item => item !== value));
        } else {
            setter([...currentValues, value]);
        }
    };

    const clearAllFilters = () => {
        setSearchTerm('');
        setSelectedRoles([]);
        setSelectedDurations([]);
        setSelectedLocations([]);
    };

    const toggleDropdown = (dropdownName) => {
        setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
    };

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col">

            <Layout>
                <div className="pt-24 pb-6 bg-white border-b border-gray-200">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                            <div className="flex items-center">
                                {/* <a href="#" className="inline-flex items-center text-violet-700 hover:text-violet-600 transition-colors mr-4">
                <ArrowLeft className="w-5 h-5 mr-1" />
                <span className="text-sm font-medium">Back to Overview</span>
              </a> */}
                                <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">All Internship Positions</h1>
                            </div>
                            <p className="mt-2 md:mt-0 text-gray-600">Find the perfect opportunity to kickstart your tech career</p>
                        </div>
                    </div>
                </div>

                {/* Filter Section */}
                <div className="bg-white py-4 shadow-sm sticky top-16 z-40">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                            <div className="relative flex-grow max-w-lg">
                                <input
                                    type="text"
                                    placeholder="Search positions..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full text-black pl-10 pr-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-violet-700 focus:border-violet-700 outline-none text-sm"
                                />
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                            </div>

                            <div className="hidden md:flex items-center gap-3">
                                <FilterDropdown
                                    title="Role Type"
                                    options={filterOptions.roles}
                                    selectedValues={selectedRoles}
                                    filterType="role"
                                    openDropdown={openDropdown}
                                    toggleDropdown={toggleDropdown}
                                    handleFilterChange={handleFilterChange}
                                />
                                <FilterDropdown
                                    title="Duration"
                                    options={filterOptions.durations}
                                    selectedValues={selectedDurations}
                                    filterType="duration"
                                    openDropdown={openDropdown}
                                    toggleDropdown={toggleDropdown}
                                    handleFilterChange={handleFilterChange}
                                />
                                <FilterDropdown
                                    title="Location"
                                    options={filterOptions.locations}
                                    selectedValues={selectedLocations}
                                    filterType="location"
                                    openDropdown={openDropdown}
                                    toggleDropdown={toggleDropdown}
                                    handleFilterChange={handleFilterChange}
                                />
                                <button
                                    onClick={clearAllFilters}
                                    className="px-3 py-2 text-sm text-violet-700 hover:bg-violet-50 rounded transition-colors"
                                >
                                    Clear Filters
                                </button>
                            </div>
                        </div>

                        {/* Mobile Filter Button */}
                        <div className="md:hidden mt-4">
                            <button
                                onClick={() => setIsMobileFilterOpen(true)}
                                className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 flex items-center justify-center"
                            >
                                <Filter className="w-4 h-4 mr-2" />
                                <span>Filters</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Filter Overlay */}
                {isMobileFilterOpen && (
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 z-50">
                        <div className="fixed inset-y-0 right-0 max-w-full flex">
                            <div className="relative w-screen max-w-md">
                                <div className="h-full flex flex-col bg-white shadow-xl overflow-y-auto">
                                    <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
                                        <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                                        <button
                                            onClick={() => setIsMobileFilterOpen(false)}
                                            className="text-gray-400 hover:text-gray-500"
                                        >
                                            <X className="w-6 h-6" />
                                        </button>
                                    </div>
                                    <div className="divide-y divide-gray-200 px-4 py-6 space-y-6">
                                        {/* Mobile filter content */}
                                        <div>
                                            <h3 className="text-base font-medium text-gray-900 mb-3">Role Type</h3>
                                            <div className="space-y-2">
                                                {filterOptions.roles.map(option => (
                                                    <label key={option.value} className="flex items-center">
                                                        <input
                                                            type="checkbox"
                                                            className="h-4 w-4 text-violet-700 border-gray-300 rounded"
                                                            checked={selectedRoles.includes(option.value)}
                                                            onChange={() => handleFilterChange('role', option.value)}
                                                        />
                                                        <span className="ml-2 text-sm text-gray-700">{option.label}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="pt-6">
                                            <h3 className="text-base font-medium text-gray-900 mb-3">Duration</h3>
                                            <div className="space-y-2">
                                                {filterOptions.durations.map(option => (
                                                    <label key={option.value} className="flex items-center">
                                                        <input
                                                            type="checkbox"
                                                            className="h-4 w-4 text-violet-700 border-gray-300 rounded"
                                                            checked={selectedDurations.includes(option.value)}
                                                            onChange={() => handleFilterChange('duration', option.value)}
                                                        />
                                                        <span className="ml-2 text-sm text-gray-700">{option.label}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="pt-6">
                                            <h3 className="text-base font-medium text-gray-900 mb-3">Location</h3>
                                            <div className="space-y-2">
                                                {filterOptions.locations.map(option => (
                                                    <label key={option.value} className="flex items-center">
                                                        <input
                                                            type="checkbox"
                                                            className="h-4 w-4 text-violet-700 border-gray-300 rounded"
                                                            checked={selectedLocations.includes(option.value)}
                                                            onChange={() => handleFilterChange('location', option.value)}
                                                        />
                                                        <span className="ml-2 text-sm text-gray-700">{option.label}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="border-t border-gray-200 px-4 py-4">
                                        <div className="flex space-x-3">
                                            <button
                                                onClick={clearAllFilters}
                                                className="flex-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                                            >
                                                Clear All
                                            </button>
                                            <button
                                                onClick={() => setIsMobileFilterOpen(false)}
                                                className="flex-1 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-violet-700 hover:bg-violet-600"
                                            >
                                                Apply Filters
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Results Count */}
                <div className="bg-gray-50 py-4 border-b border-gray-200">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-700">
                                Showing <span className="font-medium">{sortedInternships.length}</span> positions
                            </p>
                            <div className="flex items-center space-x-2">
                                <span className="text-sm text-gray-600">Sort by:</span>
                                <div className="relative">
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        className="appearance-none bg-white border border-gray-300 rounded pl-3 pr-8 py-1 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-700 focus:border-violet-700 cursor-pointer"
                                    >
                                        <option value="newest">Newest</option>
                                        <option value="duration-asc">Duration (Shortest first)</option>
                                        <option value="duration-desc">Duration (Longest first)</option>
                                        <option value="alphabetical">Alphabetical (A-Z)</option>
                                    </select>
                                    {/* Icon container */}
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                        <ChevronDown className="w-4 h-4 text-gray-500" />
                                    </div>                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="py-8 flex-grow">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {loading ? (
                            <LoadingSkeleton />
                        ) : error ? (
                            <div className="py-16 text-center">
                                <div className="w-16 h-16 mx-auto flex items-center justify-center bg-red-100 rounded-full text-red-500">
                                    {/* You can use an error icon here if you have one */}
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="mt-4 text-lg font-medium text-red-600">Failed to load positions</h3>
                                <p className="mt-2 text-gray-600">{message || "Please try again later."}</p>
                                <button
                                    onClick={fetchPositions} // or your retry function
                                    className="mt-4 px-4 py-2 bg-red-600 text-white rounded shadow-sm hover:bg-red-700 transition-colors"
                                >
                                    Retry
                                </button>
                            </div>
                        ) : sortedInternships.length === 0 ? (
                            <div className="py-16 text-center">
                                <div className="w-16 h-16 mx-auto flex items-center justify-center bg-gray-100 rounded-full text-gray-400">
                                    <Search className="w-8 h-8" />
                                </div>
                                <h3 className="mt-4 text-lg font-medium text-gray-900">No positions found</h3>
                                <p className="mt-2 text-gray-600">Try adjusting your search or filter criteria</p>
                                <button
                                    onClick={clearAllFilters}
                                    className="mt-4 px-4 py-2 bg-violet-700 text-white rounded shadow-sm hover:bg-violet-600 transition-colors"
                                >
                                    Reset Search
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {sortedInternships.map(internship => (
                                    <InternshipCard key={internship._id} internship={internship} />
                                ))}
                            </div>
                        )}

                        {/* Pagination */}
                        {!loading && sortedInternships.length > 0 && (
                            <div className="mt-12 flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-700">
                                        Showing <span className="font-medium">1</span> to{' '}
                                        <span className="font-medium">{sortedInternships.length}</span> of{' '}
                                        <span className="font-medium">{sortedInternships.length}</span> results
                                    </p>
                                </div>
                                <div className="flex space-x-2">
                                    <button
                                        className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-500 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                        disabled
                                    >
                                        Previous
                                    </button>
                                    <button
                                        className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-500 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                        disabled
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

            </Layout>

            {/* Click outside to close dropdowns */}
            {openDropdown && (
                <div
                    className="fixed inset-0 z-30"
                    onClick={() => setOpenDropdown(null)}
                />
            )}


        </div>
    );
};

export default InternshipListings;