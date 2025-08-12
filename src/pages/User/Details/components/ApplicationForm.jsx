import React, { useState } from 'react';
import { requiredSkills, niceToHaveSkills } from '../../../../constants';
import API from "../../../../http/index"
import { ToastContainer, toast } from 'react-toastify';

const ApplicationForm = ({ id }) => {
    // Form state
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        university: '',
        major: '',
        graduationYear: '',
        gpa: '',
        portfolioUrl: '',
        githubUrl: '',
        linkedinUrl: '',
        coverLetter: '',
        additionalInfo: ''
    });

    const [selectedSkills, setSelectedSkills] = useState([]);
    const [resumeFile, setResumeFile] = useState(null);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null); // 'success' or 'error'

    // Validation rules
    const validateField = (name, value) => {
        switch (name) {
            case 'firstName':
            case 'lastName':
                return value.trim().length < 2 ? 'Must be at least 2 characters long' : '';

            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return !emailRegex.test(value) ? 'Please enter a valid email address' : '';

            case 'phone':
                if (value && value.trim()) {
                    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
                    return !phoneRegex.test(value.replace(/[\s\-\(\)]/g, '')) ? 'Please enter a valid phone number' : '';
                }
                return '';

            case 'university':
            case 'major':
                return value.trim().length < 2 ? 'This field is required' : '';

            case 'graduationYear':
                return !value ? 'Please select your graduation year' : '';

            case 'gpa':
                if (value && value.trim()) {
                    const gpaRegex = /^\d+(\.\d+)?(\s*\/\s*\d+(\.\d+)?)?$/;
                    return !gpaRegex.test(value) ? 'Please enter a valid GPA (e.g., 3.8 or 3.8/4.0)' : '';
                }
                return '';

            case 'portfolioUrl':
                const urlRegex = /^https?:\/\/.+\..+/;
                return !urlRegex.test(value) ? 'Please enter a valid URL starting with http:// or https://' : '';

            case 'githubUrl':
            case 'linkedinUrl':
                if (value && value.trim()) {
                    const urlRegex = /^https?:\/\/.+\..+/;

                    return !urlRegex.test(value) ? 'Please enter a valid URL starting with http:// or https://' : '';
                }
                return '';

            default:
                return '';
        }
    };

    // Validate entire form
    const validateForm = () => {
        const newErrors = {};

        // Validate required fields
        Object.keys(formData).forEach(key => {
            if (['firstName', 'lastName', 'email', 'university', 'major', 'graduationYear', 'portfolioUrl'].includes(key)) {
                const error = validateField(key, formData[key]);
                if (error) newErrors[key] = error;
            }
        });

        // Validate optional fields that have values
        ['phone', 'gpa', 'githubUrl', 'linkedinUrl'].forEach(key => {
            if (formData[key]) {
                const error = validateField(key, formData[key]);
                if (error) newErrors[key] = error;
            }
        });

        // Validate file size if resume is uploaded
        if (resumeFile && resumeFile.size > 5 * 1024 * 1024) {
            newErrors.resume = 'File size must be less than 5MB';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }

        // Real-time validation for immediate feedback
        const error = validateField(name, value);
        if (error) {
            setErrors(prev => ({
                ...prev,
                [name]: error
            }));
        }
    };

    // Handle skill selection
    const handleSkillToggle = (skill) => {
        setSelectedSkills(prev =>
            prev.includes(skill)
                ? prev.filter(s => s !== skill)
                : [...prev, skill]
        );
    };

    // Handle file upload
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validate file type
            const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
            if (!allowedTypes.includes(file.type)) {
                setErrors(prev => ({
                    ...prev,
                    resume: 'Please upload a PDF, DOC, or DOCX file'
                }));
                return;
            }

            // Validate file size
            if (file.size > 5 * 1024 * 1024) {
                setErrors(prev => ({
                    ...prev,
                    resume: 'File size must be less than 5MB'
                }));
                return;
            }

            setResumeFile(file);
            // Clear any existing resume errors
            if (errors.resume) {
                setErrors(prev => ({
                    ...prev,
                    resume: ''
                }));
            }
        }
    };

    // Handle form submission
    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            // Create FormData for file upload
            const submitData = new FormData();

            // Append form data
            Object.keys(formData).forEach(key => {
                submitData.append(key, formData[key]);
            });

            // Append additional data
            submitData.append('skills', JSON.stringify(selectedSkills));
            // Remove this line - don't append 'id' as it's in the URL parameter
            // submitData.append('id', id);

            if (resumeFile) {
                submitData.append('resume', resumeFile);
            }

            // Debug: Print FormData contents BEFORE sending
            // console.log('=== FormData Contents ===');
            // for (let [key, value] of submitData.entries()) {
            //     if (value instanceof File) {
            //         console.log(`${key}:`, {
            //             name: value.name,
            //             size: value.size,
            //             type: value.type
            //         });
            //     } else {
            //         console.log(`${key}:`, value);
            //     }
            // }

            // Fix the typo in URL: "appication" should be "application"
            // console.log('Submitting to:', `/api/application/${id}`);

            const response = await API.post(`/api/application/${id}`, submitData, {
                headers: {
                    // Don't manually set Content-Type for FormData - let the browser set it with boundary
                    // "Content-Type": "multipart/form-data", // Remove this line
                },
            });

            // console.log('API Response:', response.data);

            // Axios returns response.data for successful requests, not response.ok
            if (response.status === 201 || response.status === 200) {
                setSubmitStatus('success');
                toast.success(response.data.message, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                // console.log('Application submitted successfully!', response.data);

                // Optional: Reset form after successful submission
                // setFormData({
                //     firstName: '', lastName: '', email: '', phone: '',
                //     university: '', major: '', graduationYear: '', gpa: '',
                //     portfolioUrl: '', githubUrl: '', linkedinUrl: '',
                //     coverLetter: '', additionalInfo: ''
                // });
                // setSelectedSkills([]);
                // setResumeFile(null);
            } else {
                throw new Error(`Server responded with status: ${response.status}`);
            }
        } catch (error) {
            setSubmitStatus('error');

            let errorMessage = 'Something went wrong. Please try again.';

            if (error.response) {
                // Server responded with an error status
                errorMessage = error.response.data?.error || error.response.data?.message || errorMessage;

                toast.error(errorMessage, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });

            } else if (error.request) {
                // No response received
                toast.error('Network error: No response received from server.', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });

            } else {
                // Something happened while setting up the request
                toast.error(`Request error: ${error.message}`, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            }
        }
        finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div>
            <ToastContainer/>
            <section className="mb-12">
                <div className="bg-white rounded-xl border border-gray-200 p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-8">
                        Submit Your Application
                    </h2>


                    <form onSubmit={handleSubmit} className="space-y-8" noValidate>
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
                                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm ${errors.firstName ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
                                            }`}
                                        placeholder="Enter your first name"
                                        required
                                    />
                                    {errors.firstName && (
                                        <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
                                    )}
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
                                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm ${errors.lastName ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
                                            }`}
                                        placeholder="Enter your last name"
                                        required
                                    />
                                    {errors.lastName && (
                                        <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                                    )}
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
                                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm ${errors.email ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
                                            }`}
                                        placeholder="Enter your email address"
                                        required
                                    />
                                    {errors.email && (
                                        <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                                    )}
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
                                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm ${errors.phone ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
                                            }`}
                                        placeholder="Enter your phone number"
                                    />
                                    {errors.phone && (
                                        <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                                    )}
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
                                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm ${errors.university ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
                                            }`}
                                        placeholder="Enter your university name"
                                        required
                                    />
                                    {errors.university && (
                                        <p className="mt-1 text-sm text-red-600">{errors.university}</p>
                                    )}
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
                                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm ${errors.major ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
                                            }`}
                                        placeholder="Enter your major"
                                        required
                                    />
                                    {errors.major && (
                                        <p className="mt-1 text-sm text-red-600">{errors.major}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Expected Graduation Year *
                                    </label>
                                    <select
                                        name="graduationYear"
                                        value={formData.graduationYear}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm cursor-pointer ${errors.graduationYear ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
                                            }`}
                                        required
                                    >
                                        <option value="">Select graduation year</option>
                                        <option value="2024">2024</option>
                                        <option value="2025">2025</option>
                                        <option value="2026">2026</option>
                                        <option value="2027">2027</option>
                                        <option value="2028">2028</option>
                                    </select>
                                    {errors.graduationYear && (
                                        <p className="mt-1 text-sm text-red-600">{errors.graduationYear}</p>
                                    )}
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
                                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm ${errors.gpa ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
                                            }`}
                                        placeholder="e.g., 3.8/4.0"
                                    />
                                    {errors.gpa && (
                                        <p className="mt-1 text-sm text-red-600">{errors.gpa}</p>
                                    )}
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
                                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm ${errors.portfolioUrl ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
                                            }`}
                                        placeholder="https://your-portfolio.com"
                                        required
                                    />
                                    {errors.portfolioUrl && (
                                        <p className="mt-1 text-sm text-red-600">{errors.portfolioUrl}</p>
                                    )}
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
                                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm ${errors.githubUrl ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
                                                }`}
                                            placeholder="https://github.com/username"
                                        />
                                        {errors.githubUrl && (
                                            <p className="mt-1 text-sm text-red-600">{errors.githubUrl}</p>
                                        )}
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
                                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm ${errors.linkedinUrl ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
                                                }`}
                                            placeholder="https://linkedin.com/in/username"
                                        />
                                        {errors.linkedinUrl && (
                                            <p className="mt-1 text-sm text-red-600">{errors.linkedinUrl}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Resume Upload */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-6">
                                Resume Upload
                            </h3>
                            <div className={`border-2 border-dashed rounded-lg p-8 text-center hover:border-blue-400 transition-colors duration-300 ${errors.resume ? 'border-red-300' : 'border-gray-300'
                                }`}>
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
                            {errors.resume && (
                                <p className="mt-2 text-sm text-red-600">{errors.resume}</p>
                            )}
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
                                disabled={isSubmitting}
                                className={`!rounded-button whitespace-nowrap px-12 py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-105 ${isSubmitting
                                    ? 'bg-gray-400 cursor-not-allowed text-white'
                                    : 'cursor-pointer bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
                                    }`}
                            >
                                {isSubmitting ? (
                                    <>
                                        <i className="fas fa-spinner fa-spin mr-3"></i>
                                        Submitting...
                                    </>
                                ) : (
                                    <>
                                        <i className="fas fa-paper-plane mr-3"></i>
                                        Submit Application
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                    
                    {/* Success/Error Messages */}
                    {submitStatus === 'success' && (
                        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                            <div className="flex items-center">
                                <i className="fas fa-check-circle text-green-500 mr-3"></i>
                                <span className="text-green-800 font-medium">
                                    Application submitted successfully! We'll be in touch soon.
                                </span>
                            </div>
                        </div>
                    )}

                    {submitStatus === 'error' && (
                        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                            <div className="flex items-center">
                                <i className="fas fa-exclamation-triangle text-red-500 mr-3"></i>
                                <span className="text-red-800 font-medium">
                                    There was an error submitting your application. Please try again.
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default ApplicationForm;