import React from "react"

import { useState } from "react"
import { Calendar, Clock, HelpCircle, Upload } from "lucide-react"

export default function ApplicationFormSection() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    position: "",
    availability: "",
    coverLetter: "",
    terms: false,
  })
  const [selectedFile, setSelectedFile] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target).checked : value,
    }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Store in localStorage (simulating backend)
    const applicationData = {
      id: Date.now(),
      ...formData,
      resumeFileName: selectedFile?.name || "No file uploaded",
      submittedAt: new Date().toISOString(),
    }

    const existingApplications = JSON.parse(localStorage.getItem("internshipApplications") || "[]")
    existingApplications.push(applicationData)
    localStorage.setItem("internshipApplications", JSON.stringify(existingApplications))

    alert("Application submitted successfully! Thank you for applying.")

    // Reset form
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      position: "",
      availability: "",
      coverLetter: "",
      terms: false,
    })
    setSelectedFile(null)
    setIsSubmitting(false)
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 font-poppins">Ready to Apply?</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Fill out the form below to express your interest in our internship program.
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="md:grid md:grid-cols-3">
            {/* Form Info Sidebar */}
            <div className="bg-gradient-to-b from-primary to-primary/80 p-8 text-white">
              <h3 className="text-xl font-semibold mb-6 font-poppins">Application Information</h3>

              <div className="space-y-6">
                <div className="flex items-start">
                  <HelpCircle className="w-6 h-6 mt-0.5 mr-3" />
                  <div>
                    <h4 className="font-medium">What to Include</h4>
                    <p className="text-white/80 text-sm mt-1">
                      Make sure to include your resume, cover letter, and any relevant portfolio links.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Clock className="w-6 h-6 mt-0.5 mr-3" />
                  <div>
                    <h4 className="font-medium">Timeline</h4>
                    <p className="text-white/80 text-sm mt-1">
                      Applications are reviewed on a rolling basis. We aim to respond within 2 weeks.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <HelpCircle className="w-6 h-6 mt-0.5 mr-3" />
                  <div>
                    <h4 className="font-medium">Questions?</h4>
                    <p className="text-white/80 text-sm mt-1">
                      If you have any questions about the application process, please contact us at{" "}
                      <a href="mailto:internships@lunarit.com" className="underline hover:text-white">
                        internships@lunarit.com
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-6 border-t border-white/20">
                <h4 className="font-medium mb-4">Current Application Deadline</h4>
                <div className="flex items-center">
                  <Calendar className="w-6 h-6 mr-2" />
                  <span>August 15, 2025</span>
                </div>
              </div>
            </div>

            {/* Application Form */}
            <div className="col-span-2 p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4 font-poppins">Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Application Details */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4 font-poppins">Application Details</h3>
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-1">
                        Position of Interest
                      </label>
                      <select
                        id="position"
                        name="position"
                        value={formData.position}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded appearance-none focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                        required
                      >
                        <option value="" disabled>
                          Select a position
                        </option>
                        <option value="frontend">Frontend Developer</option>
                        <option value="backend">Backend Engineer</option>
                        <option value="data">Data Scientist</option>
                        <option value="design">UI/UX Designer</option>
                        <option value="product">Product Management</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="availability" className="block text-sm font-medium text-gray-700 mb-1">
                        Earliest Start Date
                      </label>
                      <input
                        type="date"
                        id="availability"
                        name="availability"
                        value={formData.availability}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700 mb-1">
                        Cover Letter
                      </label>
                      <textarea
                        id="coverLetter"
                        name="coverLetter"
                        rows={4}
                        value={formData.coverLetter}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-primary outline-none resize-none"
                        placeholder="Tell us why you're interested in this position and what makes you a good fit..."
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Resume/CV</label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary transition-colors">
                        <input
                          type="file"
                          id="resume"
                          name="resume"
                          className="hidden"
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileChange}
                        />
                        <label htmlFor="resume" className="cursor-pointer">
                          <div className="space-y-2">
                            <Upload className="mx-auto w-12 h-12 text-gray-400" />
                            <p className="text-sm text-gray-600">
                              <span className="font-medium text-primary">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-gray-500">PDF, DOC, or DOCX (max. 5MB)</p>
                          </div>
                        </label>
                        {selectedFile && (
                          <div className="mt-4 text-sm text-gray-600 bg-gray-50 p-2 rounded">
                            Selected file: {selectedFile.name}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Terms and Submit */}
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-start mb-6">
                    <input
                      id="terms"
                      name="terms"
                      type="checkbox"
                      checked={formData.terms}
                      onChange={handleInputChange}
                      className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary"
                      required
                    />
                    <label htmlFor="terms" className="ml-2 text-sm text-gray-700">
                      I agree to the{" "}
                      <a href="#" className="text-primary hover:underline">
                        Terms and Conditions
                      </a>{" "}
                      and{" "}
                      <a href="#" className="text-primary hover:underline">
                        Privacy Policy
                      </a>
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-6 py-3 bg-primary text-white rounded-button shadow-md hover:bg-primary/90 transition-colors whitespace-nowrap disabled:opacity-50"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
