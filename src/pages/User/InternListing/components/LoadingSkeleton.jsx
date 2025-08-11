import React from 'react'


const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3].map(i => (
            <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-3 bg-gray-200 animate-pulse"></div>
                <div className="p-6 space-y-4">
                    <div className="h-6 bg-gray-200 rounded animate-pulse w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-1/4"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
                    <div className="h-16 bg-gray-200 rounded animate-pulse"></div>
                    <div className="flex space-x-2">
                        <div className="h-6 bg-gray-200 rounded animate-pulse w-16"></div>
                        <div className="h-6 bg-gray-200 rounded animate-pulse w-16"></div>
                        <div className="h-6 bg-gray-200 rounded animate-pulse w-16"></div>
                    </div>
                    <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                </div>
            </div>
        ))}
    </div>
);


export default LoadingSkeleton
