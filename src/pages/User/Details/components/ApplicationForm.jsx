import React from 'react'
import viewDetailsForm from "../../../../hooks/viewDetailsForm";
import { requiredSkills,niceToHaveSkills } from '../../../../constants';


const ApplicationForm = () => {
      const {
        formData, selectedSkills, resumeFile,
        handleInputChange, handleSkillToggle,
        handleFileChange, handleSubmit
    } = viewDetailsForm();

    return (
        <div>
            <section className="mb-12">
                <div className="bg-white rounded-xl border border-gray-200 p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-8">
                        Submit Your Application
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Personal Information */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-6">
                                Personal Information
                            </h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        First Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                        placeholder="Enter your first name"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Last Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                        placeholder="Enter your last name"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                        placeholder="Enter your email address"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                        placeholder="Enter your phone number"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Educational Background */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-6">
                                Educational Background
                            </h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        University/College *
                                    </label>
                                    <input
                                        type="text"
                                        name="university"
                                        value={formData.university}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                        placeholder="Enter your university name"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Major/Field of Study *
                                    </label>
                                    <input
                                        type="text"
                                        name="major"
                                        value={formData.major}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                        placeholder="Enter your major"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Expected Graduation Year *
                                    </label>
                                    <select
                                        name="graduationYear"
                                        value={formData.graduationYear}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm cursor-pointer"
                                        required
                                    >
                                        <option value="">Select graduation year</option>
                                        <option value="2024">2024</option>
                                        <option value="2025">2025</option>
                                        <option value="2026">2026</option>
                                        <option value="2027">2027</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        GPA (Optional)
                                    </label>
                                    <input
                                        type="text"
                                        name="gpa"
                                        value={formData.gpa}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                        placeholder="e.g., 3.8/4.0"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Portfolio & Links */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-6">
                                Portfolio & Professional Links
                            </h3>
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Portfolio URL *
                                    </label>
                                    <input
                                        type="url"
                                        name="portfolioUrl"
                                        value={formData.portfolioUrl}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                        placeholder="https://your-portfolio.com"
                                        required
                                    />
                                </div>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            GitHub Profile
                                        </label>
                                        <input
                                            type="url"
                                            name="githubUrl"
                                            value={formData.githubUrl}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                            placeholder="https://github.com/username"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            LinkedIn Profile
                                        </label>
                                        <input
                                            type="url"
                                            name="linkedinUrl"
                                            value={formData.linkedinUrl}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                            placeholder="https://linkedin.com/in/username"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Resume Upload */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-6">
                                Resume Upload
                            </h3>
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors duration-300">
                                <input
                                    type="file"
                                    id="resume"
                                    accept=".pdf,.doc,.docx"
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                                <label htmlFor="resume" className="cursor-pointer">
                                    <div className="mb-4">
                                        <i className="fas fa-cloud-upload-alt text-4xl text-gray-400"></i>
                                    </div>
                                    <div className="text-lg font-medium text-gray-700 mb-2">
                                        {resumeFile ? resumeFile.name : "Upload your resume"}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        PDF, DOC, or DOCX (Max 5MB)
                                    </div>
                                </label>
                            </div>
                        </div>

                        {/* Skills Selection */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-6">
                                Technical Skills
                            </h3>
                            <p className="text-sm text-gray-600 mb-4">
                                Select all skills that apply to you:
                            </p>
                            <div className="flex flex-wrap gap-3">
                                {[...requiredSkills, ...niceToHaveSkills].map(
                                    (skill, index) => (
                                        <button
                                            key={index}
                                            type="button"
                                            onClick={() => handleSkillToggle(skill)}
                                            className={`cursor-pointer px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${selectedSkills.includes(skill)
                                                ? "bg-blue-600 text-white"
                                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                                }`}
                                        >
                                            {skill}
                                        </button>
                                    ),
                                )}
                            </div>
                        </div>

                        {/* Cover Letter */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-6">
                                Cover Letter
                            </h3>
                            <textarea
                                name="coverLetter"
                                value={formData.coverLetter}
                                onChange={handleInputChange}
                                rows={6}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                placeholder="Tell us why you're interested in this internship and what makes you a great candidate..."
                            />
                        </div>

                        {/* Additional Information */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-6">
                                Additional Information
                            </h3>
                            <textarea
                                name="additionalInfo"
                                value={formData.additionalInfo}
                                onChange={handleInputChange}
                                rows={4}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                placeholder="Any additional information you'd like to share (projects, achievements, etc.)"
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="text-center pt-6">
                            <button
                                type="submit"
                                className="!rounded-button whitespace-nowrap cursor-pointer bg-gradient-to-r from-blue-600 to-purple-600 text-white px-12 py-4 text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
                            >
                                <i className="fas fa-paper-plane mr-3"></i>
                                Submit Application
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    )
}

export default ApplicationForm
