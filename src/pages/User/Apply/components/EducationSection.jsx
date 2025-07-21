import React from 'react'

const EducationSection = ({formData, handleInputChange, errors}) => {
    return (
        <div className="bg-white rounded-xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <i className="fas fa-graduation-cap mr-3 text-blue-600"></i>
                Educational Background
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Education Level <span className="text-red-500">*</span>
                    </label>
                    <select
                        name="educationLevel"
                        value={formData.educationLevel}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors cursor-pointer ${errors.educationLevel ? 'border-red-500' : 'border-gray-300'
                            }`}
                    >
                        <option value="">Select education level</option>
                        <option value="high-school">High School</option>
                        <option value="associate">Associate Degree</option>
                        <option value="bachelor">Bachelor's Degree</option>
                        <option value="master">Master's Degree</option>
                        <option value="phd">PhD</option>
                    </select>
                    {errors.educationLevel && <p className="text-red-500 text-sm mt-1">{errors.educationLevel}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Institution Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="institution"
                        value={formData.institution}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${errors.institution ? 'border-red-500' : 'border-gray-300'
                            }`}
                        placeholder="Enter your institution name"
                    />
                    {errors.institution && <p className="text-red-500 text-sm mt-1">{errors.institution}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Field of Study <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="fieldOfStudy"
                        value={formData.fieldOfStudy}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${errors.fieldOfStudy ? 'border-red-500' : 'border-gray-300'
                            }`}
                        placeholder="e.g., Computer Science, Engineering"
                    />
                    {errors.fieldOfStudy && <p className="text-red-500 text-sm mt-1">{errors.fieldOfStudy}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Graduation Year <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="graduationYear"
                        value={formData.graduationYear}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${errors.graduationYear ? 'border-red-500' : 'border-gray-300'
                            }`}
                        placeholder="e.g., 2024 or Expected 2025"
                    />
                    {errors.graduationYear && <p className="text-red-500 text-sm mt-1">{errors.graduationYear}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        GPA/CGPA (Optional)
                    </label>
                    <input
                        type="text"
                        name="gpa"
                        value={formData.gpa}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="e.g., 3.8/4.0"
                    />
                </div>
            </div>
        </div>

    )
}

export default EducationSection
