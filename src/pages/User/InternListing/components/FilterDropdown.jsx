import { ChevronDown } from 'lucide-react';
import React from 'react'

const FilterDropdown = ({ title, options, selectedValues, filterType, openDropdown, toggleDropdown, handleFilterChange = { handleFilterChange }
}) => (
    <div className="relative">
        <button
            onClick={() => toggleDropdown(filterType)}
            className="px-3 py-2 bg-white border border-gray-300 rounded flex items-center text-sm text-gray-700 hover:border-violet-700 transition-colors whitespace-nowrap"
        >
            <span>{title}</span>
            <ChevronDown className="w-4 h-4 ml-2" />
        </button>
        {openDropdown === filterType && (
            <div className="absolute left-0 mt-1 w-56 bg-white rounded-md shadow-lg z-10 border">
                <div className="p-2">
                    <div className="space-y-1">
                        {options.map(option => (
                            <label
                                key={option.value}
                                className="flex items-center p-2 hover:bg-gray-50 rounded cursor-pointer"
                            >
                                <input
                                    type="checkbox"
                                    className="h-4 w-4 text-violet-700 border-gray-300 rounded"
                                    checked={selectedValues.includes(option.value)}
                                    onChange={() => handleFilterChange(filterType, option.value)}
                                />
                                <span className="ml-2 text-sm text-gray-700">{option.label}</span>
                            </label>
                        ))}
                    </div>
                </div>
            </div>
        )}
    </div>
);

export default FilterDropdown
