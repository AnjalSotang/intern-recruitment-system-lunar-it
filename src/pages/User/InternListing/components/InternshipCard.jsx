import { MapPin } from 'lucide-react';
import React from 'react'

const InternshipCard = ({ internship }) => {
    console.log(internship)
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            {/* <div className={`h-3 ${internship.color}`}></div> */}
            <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-gray-900">{internship.title}</h3>
                    {/* <span className={`px-3 py-1 ${internship.color === 'bg-violet-700' ? 'bg-violet-100 text-violet-700' : 'bg-teal-100 text-teal-600'} text-xs rounded-full font-medium`}> */}
                    {internship.duration ?? "Three"} Months
                    {/* </span> */}
                </div>

                <div className="flex items-center text-gray-500 text-sm mb-4">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{internship.location}</span>
                </div>
                <p className="text-gray-600 mb-6">{internship.description}</p>
                <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Requirements:</h4>
                    <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                        {internship?.requirements?.length > 0
                            ? internship.requirements.map((req, index) => (
                                <li key={index}>{req}</li>
                            ))
                            : <li className="text-gray-400 italic">No requirements listed</li>
                        }
                    </ul>

                </div>
                <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Application Deadline:</h4>
                    <p className="text-sm text-gray-600">
                        {internship?.deadline
                            ? new Date(internship.deadline).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })
                            : 'No deadline specified'}
                    </p>

                </div>
                <div className="flex flex-wrap gap-2 mb-6">
                    {internship?.skills?.length > 0
                        ? internship.skills.map((skill, index) => (
                            <span
                                key={index}
                                className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
                            >
                                {skill}
                            </span>
                        ))
                        : <span className="text-gray-400 italic">No skills listed</span>
                    }

                </div>

                {/* <button className={`block w-full text-center px-4 py-2 ${internship.color} text-white rounded shadow-sm hover:opacity-90 transition-opacity`}> */}
                <button className={'block w-full text-center px-4 py-2 bg-violet-700 text-white rounded shadow-sm hover:opacity-90 transition-opacity'}>
                    Apply Now
                </button>
            </div>
        </div>
    )
};

export default InternshipCard
