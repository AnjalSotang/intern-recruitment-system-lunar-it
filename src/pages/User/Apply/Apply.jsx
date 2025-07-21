import { Link } from 'react-router-dom';
import Header from './components/Header';
import PageIntro from './components/PageIntro';
import PersonalInfo from './components/PersonalInfo';
import EducationSection from './components/EducationSection';
import ResumeUpload from './components/ResumeUpload';
import TermsAndSection from './components/TermsAndSection';
import InternshipPreferenceSection from './components/InternshipPreferenceSection';
import useApplicationForm from '../../../hooks/useApplicationForm';
import React from 'react';  


const Apply = () => {
    const {
    formData,
    errors,
    dragActive,
    uploadedFile,
    isSubmitting,
    handleInputChange,
    handleDrag,
    handleDrop,
    handleFileSelect,
    handleSubmit
} = useApplicationForm();

    return (
        <div className="min-h-screen bg-gray-50" style={{ fontFamily: 'Inter, sans-serif' }}>
            {/* Header */}
            <Header />
            {/* Main Content */}
            <main className="max-w-4xl mx-auto px-6 py-12">
                {/* Page Header */}
                <PageIntro />

                {/* Application Form */}
                <form onSubmit={handleSubmit} className="space-y-12">
                    {/* Personal Information */}
                    <PersonalInfo formData={formData} handleInputChange={handleInputChange} errors={errors}/>

                    {/* Educational Background */}
                    <EducationSection formData={formData} handleInputChange={handleInputChange} errors={errors} />
                   
                    {/* Resume Upload */}
                    <ResumeUpload dragActive={dragActive} errors={errors} handleDrag={handleDrag} handleDrop={handleDrop} handleFileSelect={handleFileSelect} uploadedFile={uploadedFile}/>

                    {/* Cover Letter */}
                    <div className="bg-white rounded-xl p-8 shadow-lg">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                            <i className="fas fa-edit mr-3 text-blue-600"></i>
                            Cover Letter
                        </h2>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Tell us why you're interested in this internship <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                name="coverLetter"
                                value={formData.coverLetter}
                                onChange={handleInputChange}
                                rows={8}
                                className={`w-full px-4 py-3 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-vertical ${errors.coverLetter ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                placeholder="Share your passion for technology, relevant experience, and what you hope to achieve during this internship. Highlight your skills and explain why you would be a great fit for our team."
                            />
                            <div className="flex justify-between items-center mt-2">
                                {errors.coverLetter && <p className="text-red-500 text-sm">{errors.coverLetter}</p>}
                                <p className="text-sm text-gray-500 ml-auto">{formData.coverLetter.length} characters</p>
                            </div>
                        </div>
                    </div>

                    {/* Internship Preferences */}
                   <InternshipPreferenceSection formData={formData} handleInputChange={handleInputChange} errors={errors} />

                    {/* Terms and Submit */}
                   <TermsAndSection formData={formData} handleInputChange = {handleInputChange} errors={errors} isSubmitting={isSubmitting}/>
                </form>
            </main>


        </div>
    );
};

export default Apply;
