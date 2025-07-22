// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState } from 'react';

const UI = () => {
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
    const [positions, setPositions] = useState([
        {
            id: 1,
            position: 'Frontend Developer Intern',
            department: 'Engineering',
            location: 'San Francisco, CA',
            duration: '3 months',
            salary: '$4,000/month',
            jobOverview: 'Join our dynamic engineering team to build cutting-edge web applications.',
            keyResponsibilities: ['Develop responsive web applications', 'Collaborate with design team'],
            requiredQualifications: ['Strong foundation in HTML, CSS, JavaScript', 'Understanding of responsive design'],
            requiredSkills: ['HTML/CSS', 'JavaScript', 'React'],
            niceToHaveSkills: ['TypeScript', 'Node.js']
        },
        {
            id: 2,
            position: 'Data Science Intern',
            department: 'Analytics',
            location: 'New York, NY',
            duration: '6 months',
            salary: '$4,500/month',
            jobOverview: 'Work with our data team to analyze user behavior and business metrics.',
            keyResponsibilities: ['Analyze large datasets', 'Create data visualizations'],
            requiredQualifications: ['Knowledge of statistics', 'Experience with Python'],
            requiredSkills: ['Python', 'SQL', 'Pandas'],
            niceToHaveSkills: ['Machine Learning', 'R', 'Tableau']
        },
        {
            id: 3,
            position: 'UX Design Intern',
            department: 'Design',
            location: 'Remote',
            duration: '4 months',
            salary: '$3,500/month',
            jobOverview: 'Create intuitive user experiences for our digital products.',
            keyResponsibilities: ['Design user interfaces', 'Conduct user research'],
            requiredQualifications: ['Portfolio of design work', 'Understanding of design principles'],
            requiredSkills: ['Figma', 'Sketch', 'Prototyping'],
            niceToHaveSkills: ['Adobe Creative Suite', 'HTML/CSS', 'User Research']
        }
    ]);



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
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <div className="w-64 bg-gray-900 text-white flex-shrink-0">
                <div className="p-6">
                    <div className="flex items-center space-x-3 mb-8">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                            <i className="fas fa-briefcase text-sm"></i>
                        </div>
                        <span className="text-xl font-semibold">Admin Panel</span>
                    </div>
                    <nav className="space-y-2">
                        <a href="#" className="flex items-center space-x-3 px-4 py-3 rounded-lg bg-gray-800 text-blue-400 cursor-pointer">
                            <i className="fas fa-users w-5"></i>
                            <span>Internship Positions</span>
                        </a>
                        <a href="#" className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-800 text-gray-300 cursor-pointer">
                            <i className="fas fa-user-graduate w-5"></i>
                            <span>Applications</span>
                        </a>
                        <a href="#" className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-800 text-gray-300 cursor-pointer">
                            <i className="fas fa-chart-bar w-5"></i>
                            <span>Analytics</span>
                        </a>
                        <a href="#" className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-800 text-gray-300 cursor-pointer">
                            <i className="fas fa-cog w-5"></i>
                            <span>Settings</span>
                        </a>
                    </nav>
                </div>
            </div>
            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <div className="bg-white border-b border-gray-200 px-8 py-6">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-semibold text-gray-900">Internship Positions</h1>
                        <button
                            onClick={() => handleOpenModal()}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 !rounded-button whitespace-nowrap cursor-pointer"
                        >
                            <i className="fas fa-plus text-sm"></i>
                            <span>Add New Position</span>
                        </button>
                    </div>
                </div>
                {/* Content */}
                <div className="flex-1 p-8">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                        {/* Table Header */}
                        <div className="px-6 py-4 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-medium text-gray-900">All Positions</h2>
                                <div className="flex items-center space-x-4">
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="Search positions..."
                                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                        />
                                        <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Salary</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {positions.map((position) => (
                                        <tr key={position.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">{position.position}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-500">{position.department}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-500">{position.location}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-500">{position.duration}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">{position.salary}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <div className="flex items-center space-x-3">
                                                    <button
                                                        onClick={() => handleOpenModal(position)}
                                                        className="text-blue-600 hover:text-blue-900 cursor-pointer"
                                                    >
                                                        <i className="fas fa-edit"></i>
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setPositionToDelete(position);
                                                            setShowDeleteModal(true);
                                                        }}
                                                        className="text-red-600 hover:text-red-900 cursor-pointer"
                                                    >
                                                        <i className="fas fa-trash"></i>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {/* Pagination */}
                        <div className="px-6 py-4 border-t border-gray-200">
                            <div className="flex items-center justify-between">
                                <div className="text-sm text-gray-500">
                                    Showing 1 to 3 of 3 results
                                </div>
                                <div className="flex items-center space-x-2">
                                    <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 cursor-pointer">
                                        Previous
                                    </button>
                                    <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm cursor-pointer">
                                        1
                                    </button>
                                    <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 cursor-pointer">
                                        Next
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-screen overflow-y-auto">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-semibold text-gray-900">
                                    {editingPosition ? 'Edit Internship Position' : 'Add New Internship Position'}
                                </h2>
                                <button
                                    onClick={handleCloseModal}
                                    className="text-gray-400 hover:text-gray-600 cursor-pointer"
                                >
                                    <i className="fas fa-times text-xl"></i>
                                </button>
                            </div>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-8">
                            {/* Basic Info Section */}
                            <div>
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Position Title</label>
                                        <input
                                            type="text"
                                            value={formData.position}
                                            onChange={(e) => handleInputChange('position', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                            placeholder="e.g., Frontend Developer Intern"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                                        <input
                                            type="text"
                                            value={formData.department}
                                            onChange={(e) => handleInputChange('department', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                            placeholder="e.g., Engineering"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                                        <input
                                            type="text"
                                            value={formData.location}
                                            onChange={(e) => handleInputChange('location', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                            placeholder="e.g., San Francisco, CA or Remote"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                                        <input
                                            type="text"
                                            value={formData.duration}
                                            onChange={(e) => handleInputChange('duration', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                            placeholder="e.g., 3 months"
                                            required
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Salary</label>
                                        <input
                                            type="text"
                                            value={formData.salary}
                                            onChange={(e) => handleInputChange('salary', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                            placeholder="e.g., $4,000/month"
                                            required
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Job Overview</label>
                                        <textarea
                                            value={formData.jobOverview}
                                            onChange={(e) => handleInputChange('jobOverview', e.target.value)}
                                            rows={4}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                            placeholder="Provide a brief overview of the internship role..."
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            {/* Key Responsibilities Section */}
                            <div>
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Key Responsibilities</h3>
                                <div className="space-y-3">
                                    {formData.keyResponsibilities.map((responsibility, index) => (
                                        <div key={index} className="flex items-center space-x-3">
                                            <div className="flex-1">
                                                <textarea
                                                    value={responsibility}
                                                    onChange={(e) => handleArrayChange('keyResponsibilities', index, e.target.value)}
                                                    rows={2}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                                    placeholder="e.g., Develop and maintain responsive web applications using React and TypeScript"
                                                />
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => removeArrayItem('keyResponsibilities', index)}
                                                className="text-red-600 hover:text-red-800 cursor-pointer"
                                                disabled={formData.keyResponsibilities.length === 1}
                                            >
                                                <i className="fas fa-trash"></i>
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={() => addArrayItem('keyResponsibilities')}
                                        className="text-blue-600 hover:text-blue-800 text-sm flex items-center space-x-2 cursor-pointer"
                                    >
                                        <i className="fas fa-plus"></i>
                                        <span>Add Responsibility</span>
                                    </button>
                                </div>
                            </div>
                            {/* Required Qualifications Section */}
                            <div>
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Required Qualifications</h3>
                                <div className="space-y-3">
                                    {formData.requiredQualifications.map((qualification, index) => (
                                        <div key={index} className="flex items-center space-x-3">
                                            <div className="flex-1">
                                                <textarea
                                                    value={qualification}
                                                    onChange={(e) => handleArrayChange('requiredQualifications', index, e.target.value)}
                                                    rows={2}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                                    placeholder="e.g., Strong foundation in HTML, CSS, JavaScript"
                                                />
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => removeArrayItem('requiredQualifications', index)}
                                                className="text-red-600 hover:text-red-800 cursor-pointer"
                                                disabled={formData.requiredQualifications.length === 1}
                                            >
                                                <i className="fas fa-trash"></i>
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={() => addArrayItem('requiredQualifications')}
                                        className="text-blue-600 hover:text-blue-800 text-sm flex items-center space-x-2 cursor-pointer"
                                    >
                                        <i className="fas fa-plus"></i>
                                        <span>Add Qualification</span>
                                    </button>
                                </div>
                            </div>
                            {/* Technical Skills Section */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Required Skills */}
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">Required Technical Skills</h3>
                                    <div className="space-y-3">
                                        <div className="flex items-center space-x-2">
                                            <input
                                                type="text"
                                                value={newSkill}
                                                onChange={(e) => setNewSkill(e.target.value)}
                                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                                placeholder="e.g., React"
                                                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill('requiredSkills'))}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => addSkill('requiredSkills')}
                                                className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 !rounded-button whitespace-nowrap cursor-pointer"
                                            >
                                                <i className="fas fa-plus"></i>
                                            </button>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {formData.requiredSkills.map((skill, index) => (
                                                <span
                                                    key={index}
                                                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                                                >
                                                    {skill}
                                                    <button
                                                        type="button"
                                                        onClick={() => removeSkill('requiredSkills', skill)}
                                                        className="ml-2 text-blue-600 hover:text-blue-800 cursor-pointer"
                                                    >
                                                        <i className="fas fa-times text-xs"></i>
                                                    </button>
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                {/* Nice-to-Have Skills */}
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">Nice-to-Have Skills</h3>
                                    <div className="space-y-3">
                                        <div className="flex items-center space-x-2">
                                            <input
                                                type="text"
                                                value={newNiceToHaveSkill}
                                                onChange={(e) => setNewNiceToHaveSkill(e.target.value)}
                                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                                placeholder="e.g., Node.js"
                                                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill('niceToHaveSkills'))}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => addSkill('niceToHaveSkills')}
                                                className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 !rounded-button whitespace-nowrap cursor-pointer"
                                            >
                                                <i className="fas fa-plus"></i>
                                            </button>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {formData.niceToHaveSkills.map((skill, index) => (
                                                <span
                                                    key={index}
                                                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800"
                                                >
                                                    {skill}
                                                    <button
                                                        type="button"
                                                        onClick={() => removeSkill('niceToHaveSkills', skill)}
                                                        className="ml-2 text-green-600 hover:text-green-800 cursor-pointer"
                                                    >
                                                        <i className="fas fa-times text-xs"></i>
                                                    </button>
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Form Actions */}
                            <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
                                <button
                                    type="button"
                                    onClick={handleCloseModal}
                                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 !rounded-button whitespace-nowrap cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 !rounded-button whitespace-nowrap cursor-pointer"
                                >
                                    {editingPosition ? 'Update Position' : 'Save Position'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            




            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
                        <div className="p-6">
                            <div className="flex items-center justify-center mb-6">
                                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                                    <i className="fas fa-exclamation-triangle text-red-600 text-xl"></i>
                                </div>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 text-center mb-4">
                                Delete Position
                            </h3>
                            <p className="text-gray-500 text-center mb-6">
                                Are you sure you want to delete this position? This action cannot be undone.
                            </p>
                            <div className="flex items-center justify-center space-x-4">
                                <button
                                    onClick={() => {
                                        setShowDeleteModal(false);
                                        setPositionToDelete(null);
                                    }}
                                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 !rounded-button whitespace-nowrap cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => {
                                        if (positionToDelete) {
                                            setPositions(positions.filter(p => p.id !== positionToDelete.id));
                                            setShowDeleteModal(false);
                                            setPositionToDelete(null);
                                        }
                                    }}
                                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 !rounded-button whitespace-nowrap cursor-pointer"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
export default UI;