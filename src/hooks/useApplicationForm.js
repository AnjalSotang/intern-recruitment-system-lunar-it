import React, { useState } from 'react'

const useApplicationForm = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        educationLevel: '',
        institution: '',
        fieldOfStudy: '',
        graduationYear: '',
        gpa: '',
        coverLetter: '',
        preferredRole: '',
        workArrangement: [],
        availabilityDate: '',
        duration: '',
        termsAccepted: false
    });

    const [errors, setErrors] = useState({});
    const [dragActive, setDragActive] = useState(false);
    const [uploadedFile, setUploadedFile] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e) => {
        const { name, value, type } = e.target;
        if (type === 'checkbox') {
            const checked = (e.target).checked;
            if (name === 'workArrangement') {
                const currentArrangements = formData.workArrangement;
                if (checked) {
                    setFormData(prev => ({
                        ...prev,
                        workArrangement: [...currentArrangements, value]
                    }));
                } else {
                    setFormData(prev => ({
                        ...prev,
                        workArrangement: currentArrangements.filter(item => item !== value)
                    }));
                }
            } else {
                setFormData(prev => ({ ...prev, [name]: checked }));
            }
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
            console.log(value)
        }

        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            if (file.type === 'application/pdf' || file.type === 'application/msword' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
                setUploadedFile(file);
            }
        }
    };

    const handleFileSelect = (e) => {
        if (e.target.files && e.target.files[0]) {
            setUploadedFile(e.target.files[0]);
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
        if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
        if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
        if (!formData.address.trim()) newErrors.address = 'Address is required';
        if (!formData.city.trim()) newErrors.city = 'City is required';
        if (!formData.state.trim()) newErrors.state = 'State is required';
        if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';
        if (!formData.educationLevel) newErrors.educationLevel = 'Education level is required';
        if (!formData.institution.trim()) newErrors.institution = 'Institution name is required';
        if (!formData.fieldOfStudy.trim()) newErrors.fieldOfStudy = 'Field of study is required';
        if (!formData.graduationYear.trim()) newErrors.graduationYear = 'Graduation year is required';
        if (!uploadedFile) newErrors.resume = 'Resume upload is required';
        if (!formData.coverLetter.trim()) newErrors.coverLetter = 'Cover letter is required';
        if (!formData.preferredRole) newErrors.preferredRole = 'Preferred role is required';
        if (formData.workArrangement.length === 0) newErrors.workArrangement = 'Please select at least one work arrangement';
        if (!formData.availabilityDate) newErrors.availabilityDate = 'Availability date is required';
        if (!formData.duration) newErrors.duration = 'Duration preference is required';
        if (!formData.termsAccepted) newErrors.termsAccepted = 'You must accept the terms and conditions';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        console.log('Form Data:', formData);
        console.log('Uploaded File:', uploadedFile);  

        
        // Simulate form submission
        setTimeout(() => {
            setIsSubmitting(false);
            alert('Application submitted successfully!');
        }, 2000);
    };

  return {
    formData,
    setFormData,
    errors,
    setErrors,
    dragActive,
    uploadedFile,
    isSubmitting,
    handleInputChange,
    handleDrag,
    handleDrop,
    handleFileSelect,
    handleSubmit
  }
}

export default useApplicationForm
