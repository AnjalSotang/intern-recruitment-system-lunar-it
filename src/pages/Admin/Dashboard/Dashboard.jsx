import React, { useState } from 'react'
import AdminLayout from '../../../layout/AdminLayout'
import Intro from './components/Intro'
import InternshipModal from '../Internship/components/InternshipModal'
import ApplicationDetail from '../Application/components/DetaailModal'

const Dashboard = () => {
  const [showModal, setShowModal] = useState(false)
  const [selectedApplication, setSelectedApplication] = useState(null)
  const [editingPosition, setEditingPosition] = useState(null);
  const [formData, setFormData] = useState({
    position: '',
    department: '',
    location: '',
    duration: '',
    salary: '',
    jobOverview: '',
    keyResponsibilities: [''],
    requiredQualifications: [''],
    requiredSkills: [],
    niceToHaveSkills: []
  });
  const [newSkill, setNewSkill] = useState('');
  const [newNiceToHaveSkill, setNewNiceToHaveSkill] = useState('');

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingPosition(null);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleArrayChange = (field, index, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayItem = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayItem = (field, index) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const addSkill = (field) => {
    const skillValue = field === 'requiredSkills' ? newSkill : newNiceToHaveSkill;
    if (skillValue.trim() && !formData[field].includes(skillValue.trim())) {
      setFormData(prev => ({
        ...prev,
        [field]: [...prev[field], skillValue.trim()]
      }));
      if (field === 'requiredSkills') {
        setNewSkill('');
      } else {
        setNewNiceToHaveSkill('');
      }
    }
  };

  const removeSkill = (field, skill) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter(s => s !== skill)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    handleCloseModal();
  };

  return (
    <>

      <AdminLayout>
        <div className='space-y-6'>
             <Intro
          setShowModal={setShowModal}
          setSelectedApplication={setSelectedApplication}
        />
        </div>
     

      </AdminLayout>

      {/* Internship Modal */}
      <InternshipModal
        show={showModal}
        onClose={handleCloseModal}
        type={editingPosition}
        handleInputChange={handleInputChange}
        handleArrayChange={handleArrayChange}
        addArrayItem={addArrayItem}
        removeArrayItem={removeArrayItem}
        addSkill={addSkill}
        removeSkill={removeSkill}
        formData={formData}
        newSkill={newSkill}
        setNewSkill={setNewSkill}
        newNiceToHaveSkill={newNiceToHaveSkill}
        setNewNiceToHaveSkill={setNewNiceToHaveSkill}
        handleSubmit={handleSubmit}
      />

      {selectedApplication && (
        <ApplicationDetail
          selectedApplication={selectedApplication}
          setSelectedApplication={setSelectedApplication}
        />
      )}
    </>



  )
}

export default Dashboard