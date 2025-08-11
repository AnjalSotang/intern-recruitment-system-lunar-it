import React, { useState } from 'react'

const viewDetailsForm = () => {
       const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        university: "",
        major: "",
        graduationYear: "",
        gpa: "",
        portfolioUrl: "",
        githubUrl: "",
        linkedinUrl: "",
        coverLetter: "",
        additionalInfo: "",
        selectedSkills: [],
        resume:""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSkillToggle = (skill) => {
        setSelectedSkills((prev) =>
            prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill],
        );
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setResumeFile(e.target.files[0]);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Application submitted:", {
            formData,
            selectedSkills,
            resumeFile,
        });
    };


  return {
    formData,
    selectedSkills,
    resumeFile,
    handleInputChange,
    handleSkillToggle,
    handleFileChange,
    handleSubmit    
  }
}

export default viewDetailsForm
