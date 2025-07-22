// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useEffect, useState } from 'react';
import AdminLayout from '../../../layout/AdminLayout';
import { internPositions } from '../../../constants';
import Header from '../Application/components/Header';
import Search from '../Application/components/Search';
import ApplicationTable from '../Application/components/ApplicationTable';
import ApplicationDetail from '../Application/components/DetaailModal';
import InternshipModal from './components/InternshipModal';
import DeleteModal from './components/DeleteModal';


const Internship = () => {
    const [showModal, setShowModal] = useState(false);


    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [positionToDelete, setPositionToDelete] = useState(null);


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



    // const [selectedApplication, setSelectedApplication] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    // const [statusFilter, setStatusFilter] = useState('all');
    // const [positionFilter, setPositionFilter] = useState('all');
    // const [showFilters, setShowFilters] = useState(false);
    // const [selectedApplications, setSelectedApplications] = useState([]);
    // const [activeTab, setActiveTab] = useState('personal');
    // const [newNote, setNewNote] = useState('')

    const filteredApplications = internPositions.filter(app => {
        const matchesSearch = app.position.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesSearch;
    });


    const handleOpenModal = (position) => {

        if (position) {
            setEditingPosition(position);
            setFormData({
                position: position.position,
                department: position.department,
                location: position.location,
                duration: position.duration,
                salary: position.salary,
                jobOverview: position.jobOverview,
                keyResponsibilities: position.keyResponsibilities,
                requiredQualifications: position.requiredQualifications,
                requiredSkills: position.requiredSkills,
                niceToHaveSkills: position.niceToHaveSkills
            });
        } else {
            console.log("Creating new position");
            setEditingPosition(null);
            setFormData({
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

        }
        setShowModal(true);
    };

    // useEffect(() => {
    //     console.log('Halka', showModal)
    // }, [showModal]);


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
        <div className="min-h-screen bg-gray-50">


            <AdminLayout>
                <div className="min-h-screen bg-gray-50 px-4 py-6">
                    {/* Header */}
                    <Header type="Intern" filteredApplications={filteredApplications} handleOpenModal={handleOpenModal} />

                    {/* Search & Filters */}
                    <Search
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        type="Intern"
                    />

                    {/* Applications Table */}
                    <ApplicationTable
                        filteredApplications={filteredApplications}
                        handleOpenModal={handleOpenModal}
                        setPositionToDelete={setPositionToDelete}
                        setShowDeleteModal={setShowDeleteModal}
                        type="Intern"
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


            {/* Delete Modal */}
            <DeleteModal
                showDeleteModal={showDeleteModal}
                setShowDeleteModal={setShowDeleteModal}
                positionToDelete={positionToDelete}
                setPositionToDelete={setPositionToDelete}
            />

        </div>
    );
};
export default Internship