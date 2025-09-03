import { ChevronDown } from 'lucide-react';
import React from 'react';

const FilterDropdown = ({ 
    title, 
    options, 
    selectedValues, 
    filterType, 
    openDropdown, 
    toggleDropdown, 
    handleFilterChange 
}) => {
    return (
        <div className="relative">
            <button
                onClick={() => toggleDropdown(filterType)}
                className="px-3 py-2 bg-white border border-gray-300 rounded flex items-center text-sm text-gray-700 hover:border-violet-700 transition-colors whitespace-nowrap"
            >
                <span>{title}</span>
                {selectedValues && selectedValues.length > 0 && (
                    <span className="ml-1 px-1.5 py-0.5 bg-violet-100 text-violet-700 text-xs rounded-full">
                        {selectedValues.length}
                    </span>
                )}
                <ChevronDown className="w-4 h-4 ml-2" />
            </button>
            
            {openDropdown === filterType && (
                <div className="absolute left-0 mt-1 w-56 bg-white rounded-md shadow-lg z-50 border">
                    <div className="p-2">
                        <div className="space-y-1 max-h-64 overflow-y-auto">
                            {options && options.length > 0 ? (
                                options.map(option => (
                                    <label
                                        key={option.value}
                                        className="flex items-center p-2 hover:bg-gray-50 rounded cursor-pointer"
                                    >
                                        <input
                                            type="checkbox"
                                            className="h-4 w-4 text-violet-700 border-gray-300 rounded focus:ring-violet-500"
                                            checked={selectedValues ? selectedValues.includes(option.value) : false}
                                            onChange={(e) => {
                                                e.stopPropagation();
                                                if (handleFilterChange) {
                                                    handleFilterChange(filterType, option.value);
                                                }
                                            }}
                                        />
                                        <span className="ml-2 text-sm text-gray-700 select-none">
                                            {option.label}
                                        </span>
                                    </label>
                                ))
                            ) : (
                                <div className="p-2 text-sm text-gray-500">No options available</div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FilterDropdown;