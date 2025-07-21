import React from 'react'

const InternshipPreferenceSection = ({formData, handleInputChange, errors }) => {
  return (
     <div className="bg-white rounded-xl p-8 shadow-lg">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                            <i className="fas fa-briefcase mr-3 text-blue-600"></i>
                            Internship Preferences
                        </h2>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Preferred Internship Role <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="preferredRole"
                                    value={formData.preferredRole}
                                    onChange={handleInputChange}
                                    className={`w-full px-4 py-3 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors cursor-pointer ${errors.preferredRole ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                >
                                    <option value="">Select preferred role</option>
                                    <option value="frontend-developer">Frontend Developer Intern</option>
                                    <option value="backend-developer">Backend Developer Intern</option>
                                    <option value="fullstack-developer">Full Stack Developer Intern</option>
                                    <option value="ui-ux-designer">UI/UX Designer Intern</option>
                                    <option value="data-analyst">Data Analyst Intern</option>
                                    <option value="mobile-developer">Mobile Developer Intern</option>
                                </select>
                                {errors.preferredRole && <p className="text-red-500 text-sm mt-1">{errors.preferredRole}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                    Work Arrangement Preference <span className="text-red-500">*</span>
                                </label>
                                <div className="space-y-3">
                                    {['Remote', 'Hybrid', 'On-site'].map((arrangement) => (
                                        <label key={arrangement} className="flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                name="workArrangement"
                                                value={arrangement.toLowerCase()}
                                                checked={formData.workArrangement.includes(arrangement.toLowerCase())}
                                                onChange={handleInputChange}
                                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                                            />
                                            <span className="ml-3 text-sm font-medium text-gray-700">{arrangement}</span>
                                        </label>
                                    ))}
                                </div>
                                {errors.workArrangement && <p className="text-red-500 text-sm mt-1">{errors.workArrangement}</p>}
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Availability Start Date <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        name="availabilityDate"
                                        value={formData.availabilityDate}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-3 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors cursor-pointer ${errors.availabilityDate ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                    />
                                    {errors.availabilityDate && <p className="text-red-500 text-sm mt-1">{errors.availabilityDate}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Duration Preference <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="duration"
                                        value={formData.duration}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-3 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors cursor-pointer ${errors.duration ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                    >
                                        <option value="">Select duration</option>
                                        <option value="3-months">3 Months</option>
                                        <option value="6-months">6 Months</option>
                                        <option value="12-months">12 Months</option>
                                        <option value="flexible">Flexible</option>
                                    </select>
                                    {errors.duration && <p className="text-red-500 text-sm mt-1">{errors.duration}</p>}
                                </div>
                            </div>
                        </div>
                    </div>
  )
}

export default InternshipPreferenceSection
