import React from 'react'

const ApplicationTable = ({
    handleSelectAll,
    filteredApplications,
    selectedApplications, setSelectedApplication,
    handleSelectApplication, getStatusBadge, getStatusText,
    type
}) => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            {
                                type === "Application" && (
                                    <th className="px-6 py-4 text-left">
                                        <input
                                            type="checkbox"
                                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                                            checked={selectedApplications.length === filteredApplications.length}
                                            onChange={(e) => handleSelectAll(e.target.checked)}
                                        />
                                    </th>
                                )
                            }

                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Applicant
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Position
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                University
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Date
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>



                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredApplications.map((application, index) => (
                            <tr key={application.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                {
                                    type === "Application" && (
                                        <td className="px-6 py-4">
                                            <input
                                                type="checkbox"
                                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                                                checked={selectedApplications.includes(application.id)}
                                                onChange={(e) => handleSelectApplication(application.id, e.target.checked)}
                                            />
                                        </td>
                                    )
                                }

                                <td className="px-6 py-4">
                                    <div className="flex items-center">
                                        <img
                                            src={application.avatar}
                                            alt={application.name}
                                            className="w-10 h-10 rounded-full mr-4 object-cover"
                                        />
                                        <div>
                                            <div className="text-sm font-medium text-gray-900">{application.name}</div>
                                            <div className="text-sm text-gray-500">{application.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-900">{application.position}</td>
                                <td className="px-6 py-4 text-sm text-gray-900">{application.university}</td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(application.status)}`}>
                                        {getStatusText(application.status)}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500">{application.date}</td>
                                <td className="px-6 py-4">
                                    <button
                                        onClick={() => setSelectedApplication(application)}
                                        className="text-blue-600 hover:text-blue-800 text-sm font-medium cursor-pointer"
                                    >
                                        View Details
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>



            {/* Pagination */}
            <div className="bg-white px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                <div className="text-sm text-gray-500">
                    Showing 1 to {filteredApplications.length} of {filteredApplications.length} entries
                </div>
                <div className="flex items-center space-x-2">
                    <button className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-500 hover:bg-gray-50 cursor-pointer">
                        Previous
                    </button>
                    <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm cursor-pointer">
                        1
                    </button>
                    <button className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-500 hover:bg-gray-50 cursor-pointer">
                        Next
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ApplicationTable
