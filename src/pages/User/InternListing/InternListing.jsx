import React, { useState, useEffect, useCallback } from 'react';
import { Search, MapPin, ArrowLeft, Menu, X, Filter, ChevronDown, ArrowDownUp } from 'lucide-react';
import Layout from '../../../layout/MainLayout';
import FilterDropdown from './components/FilterDropdown';
import InternshipCard from './components/InternshipCard';
import LoadingSkeleton from './components/LoadingSkeleton';
import { usePositionStore } from '../../../store/PositionStore';

const InternshipListings = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDepartments, setSelectedDepartments] = useState([]);
    const [selectedDurations, setSelectedDurations] = useState([]);
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [sortBy, setSortBy] = useState('newest');
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null);

    const positions = usePositionStore(state => state.positions);
    const fetchPositions = usePositionStore(state => state.fetchPositions);
    const loading = usePositionStore(state => state.loading);
    const error = usePositionStore(state => state.error);
    const message = usePositionStore(state => state.message);

    // Filter options based on your model
    const filterOptions = {
        departments: [
            { value: 'frontend', label: 'Frontend' },
            { value: 'backend', label: 'Backend' },
            { value: 'fullstack', label: 'Full Stack' },
            { value: 'data', label: 'Data' },
            { value: 'design', label: 'Design' },
            { value: 'product', label: 'Product' },
            { value: 'devops', label: 'DevOps' }
        ],
        types: [
            { value: 'Full-time', label: 'Full-time' },
            { value: 'Part-time', label: 'Part-time' },
            { value: 'Remote', label: 'Remote' },
            { value: 'Hybrid', label: 'Hybrid' }
        ],
        durations: [
            { value: '1 month', label: '1 Month' },
            { value: '2 months', label: '2 Months' },
            { value: '3 months', label: '3 Months' },
            { value: '4 months', label: '4 Months' },
            { value: '5 months', label: '5 Months' },
            { value: '6 months', label: '6 Months' },
            { value: '1 year', label: '1 Year' }
        ]
    };

    useEffect(() => {
        fetchPositions();
    }, []);

    const handleFilterChange = useCallback((filterType, value) => {
        const setters = {
            department: setSelectedDepartments,
            duration: setSelectedDurations,
            type: setSelectedTypes
        };

        const currentValues = {
            department: selectedDepartments,
            duration: selectedDurations,
            type: selectedTypes
        }[filterType];

        const setter = setters[filterType];

        if (!setter) {
            console.error(`No setter found for filterType: ${filterType}`);
            return;
        }

        if (currentValues.includes(value)) {
            setter(currentValues.filter(item => item !== value));
        } else {
            setter([...currentValues, value]);
        }
    }, [selectedDepartments, selectedDurations, selectedTypes]);

    // Filter internships based on model fields: department, duration, type
    const filteredInternships = positions.filter(internship => {
        if (!internship) return false;

        const matchesSearch = searchTerm === '' ||
            (internship.title && internship.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (internship.description && internship.description.toLowerCase().includes(searchTerm.toLowerCase()));

        const matchesDepartment = selectedDepartments.length === 0 || 
            (internship.department && selectedDepartments.includes(internship.department));
        
        const matchesDuration = selectedDurations.length === 0 || 
            (internship.duration && selectedDurations.includes(internship.duration));
        
        const matchesType = selectedTypes.length === 0 || 
            (internship.type && selectedTypes.includes(internship.type));

        return matchesSearch && matchesDepartment && matchesDuration && matchesType;
    });

    // Sort internships
    const sortedInternships = [...filteredInternships].sort((a, b) => {
        switch (sortBy) {
            case 'duration-asc':
                return (a.duration || '').localeCompare(b.duration || '');
            case 'duration-desc':
                return (b.duration || '').localeCompare(a.duration || '');
            case 'alphabetical':
                return (a.title || '').localeCompare(b.title || '');
            case 'department':
                return (a.department || '').localeCompare(b.department || '');
            default:
                return new Date(b.createdAt || 0) - new Date(a.createdAt || 0); // newest first
        }
    });

    const clearAllFilters = () => {
        setSearchTerm('');
        setSelectedDepartments([]);
        setSelectedDurations([]);
        setSelectedTypes([]);
        setOpenDropdown(null);
    };

    const toggleDropdown = useCallback((dropdownName) => {
        setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
    }, [openDropdown]);

    const handleOutsideClick = useCallback(() => {
        setOpenDropdown(null);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <Layout>
                <div className="text-center mt-10 pt-24 mb-12">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Internship Opportunities
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Discover exciting internship opportunities across various departments and kickstart your career in tech
                    </p>
                </div>

                {/* Filter Section */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100 max-w-7xl mx-auto">
                    <div className="px-4 sm:px-6 lg:px-8">
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
                                    title="Department"
                                    options={filterOptions.departments}
                                    selectedValues={selectedDepartments}
                                    filterType="department"
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
                                    title="Type"
                                    options={filterOptions.types}
                                    selectedValues={selectedTypes}
                                    filterType="type"
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
                                        {/* Mobile Department Filter */}
                                        <div>
                                            <h3 className="text-base font-medium text-gray-900 mb-3">Department</h3>
                                            <div className="space-y-2">
                                                {filterOptions.departments.map(option => (
                                                    <label key={option.value} className="flex items-center">
                                                        <input
                                                            type="checkbox"
                                                            className="h-4 w-4 text-violet-700 border-gray-300 rounded"
                                                            checked={selectedDepartments.includes(option.value)}
                                                            onChange={() => handleFilterChange('department', option.value)}
                                                        />
                                                        <span className="ml-2 text-sm text-gray-700">{option.label}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                        
                                        {/* Mobile Duration Filter */}
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
                                        
                                        {/* Mobile Type Filter */}
                                        <div className="pt-6">
                                            <h3 className="text-base font-medium text-gray-900 mb-3">Type</h3>
                                            <div className="space-y-2">
                                                {filterOptions.types.map(option => (
                                                    <label key={option.value} className="flex items-center">
                                                        <input
                                                            type="checkbox"
                                                            className="h-4 w-4 text-violet-700 border-gray-300 rounded"
                                                            checked={selectedTypes.includes(option.value)}
                                                            onChange={() => handleFilterChange('type', option.value)}
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
                <div className="">
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
                                        <option value="duration-asc">Duration (A-Z)</option>
                                        <option value="duration-desc">Duration (Z-A)</option>
                                        <option value="alphabetical">Title (A-Z)</option>
                                        <option value="department">Department (A-Z)</option>
                                    </select>
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                        <ChevronDown className="w-4 h-4 text-gray-500" />
                                    </div>
                                </div>
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
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="mt-4 text-lg font-medium text-red-600">Failed to load positions</h3>
                                <p className="mt-2 text-gray-600">{message || "Please try again later."}</p>
                                <button
                                    onClick={fetchPositions}
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
                    onClick={handleOutsideClick}
                />
            )}
        </div>
    );
};

export default InternshipListings;