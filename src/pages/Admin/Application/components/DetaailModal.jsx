import React, { useState } from 'react';

const ApplicationDetail = ({
    selectedApplication,
    setSelectedApplication,
}) => {
    const [activeTab, setActiveTab] = useState('personal');
    const [newNote, setNewNote] = useState('');

    const handleAddNote = () => {
        if (newNote.trim() && selectedApplication) {
            const updatedNote = {
                admin: 'Current Admin',
                date: new Date().toISOString().split('T')[0],
                content: newNote.trim()
            };
            selectedApplication.notes.unshift(updatedNote);
            setNewNote('');
        }
    };

    if (!selectedApplication) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animation-fade-in">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">

                {/* Modal Header */}
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <img
                            src={selectedApplication.avatar}
                            alt={selectedApplication.name}
                            className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900">{selectedApplication.name}</h2>
                            <p className="text-sm text-gray-500">{selectedApplication.position}</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3">
                        <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 cursor-pointer">
                            <i className="fas fa-check mr-2"></i>
                            Shortlist
                        </button>
                        <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 cursor-pointer">
                            <i className="fas fa-times mr-2"></i>
                            Reject
                        </button>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 cursor-pointer">
                            <i className="fas fa-download mr-2"></i>
                            Download
                        </button>
                        <button
                            onClick={() => setSelectedApplication(null)}
                            className="text-gray-400 hover:text-gray-600 cursor-pointer"
                        >
                            <i className="fas fa-times text-xl"></i>
                        </button>
                    </div>
                </div>

                {/* Modal Content */}
                <div className="flex h-[calc(90vh-80px)]">
                    {/* Sidebar Navigation */}
                    <div className="w-64 bg-gray-50 border-r border-gray-200 p-4">
                        <nav className="space-y-2">
                            {[
                                { id: 'personal', label: 'Personal Info', icon: 'fas fa-user' },
                                { id: 'education', label: 'Education', icon: 'fas fa-graduation-cap' },
                                { id: 'documents', label: 'Documents', icon: 'fas fa-file-alt' },
                                { id: 'notes', label: 'Internal Notes', icon: 'fas fa-sticky-note' }
                            ].map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`w-full flex items-center px-4 py-3 text-left rounded-lg cursor-pointer ${
                                        activeTab === tab.id
                                            ? 'bg-blue-100 text-blue-700 border-blue-200'
                                            : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                                >
                                    <i className={`${tab.icon} w-5 h-5 mr-3`}></i>
                                    {tab.label}
                                </button>
                            ))}
                        </nav>
                    </div>

                    {/* Tab Content */}
                    <div className="flex-1 p-6 overflow-y-auto">
                        {activeTab === 'personal' && (
                            <div className="space-y-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
                                <div className="grid grid-cols-2 gap-6">
                                    <div><label className="text-sm text-gray-700">Full Name</label><p>{selectedApplication.name}</p></div>
                                    <div><label className="text-sm text-gray-700">Email</label><p>{selectedApplication.email}</p></div>
                                    <div><label className="text-sm text-gray-700">Phone</label><p>{selectedApplication.phone}</p></div>
                                    <div><label className="text-sm text-gray-700">University</label><p>{selectedApplication.university}</p></div>
                                </div>
                                <div>
                                    <label className="text-sm text-gray-700 mb-2">Skills</label>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedApplication.skills.map((skill, i) => (
                                            <span key={i} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">{skill}</span>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <label className="text-sm text-gray-700 mb-2">Cover Letter</label>
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <p className="text-gray-700">{selectedApplication.coverLetter}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'education' && (
                            <div className="space-y-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Education Details</h3>
                                <div className="grid grid-cols-2 gap-6">
                                    <div><label className="text-sm text-gray-700">Major</label><p>{selectedApplication.major}</p></div>
                                    <div><label className="text-sm text-gray-700">Year</label><p>{selectedApplication.year}</p></div>
                                    <div><label className="text-sm text-gray-700">GPA</label><p>{selectedApplication.gpa}/4.0</p></div>
                                    <div><label className="text-sm text-gray-700">University</label><p>{selectedApplication.university}</p></div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'documents' && (
                            <div className="space-y-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Documents & Portfolio</h3>
                                <div className="space-y-4">
                                    {/* Resume */}
                                    <div className="border p-4 rounded-lg flex justify-between items-center">
                                        <div className="flex items-center">
                                            <i className="fas fa-file-pdf text-red-500 text-xl mr-3"></i>
                                            <div>
                                                <p className="font-medium text-gray-900">Resume</p>
                                                <p className="text-sm text-gray-500">{selectedApplication.resume}</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={async () => {
                                                const icon = document.querySelector('#resume-download i');
                                                if (icon) icon.className = 'fas fa-spinner fa-spin';
                                                await new Promise(res => setTimeout(res, 1500));
                                                const toast = document.createElement('div');
                                                toast.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in-up';
                                                toast.textContent = 'Resume download started successfully!';
                                                document.body.appendChild(toast);
                                                setTimeout(() => toast.remove(), 3000);
                                                if (icon) icon.className = 'fas fa-download';
                                            }}
                                            id="resume-download"
                                            className="text-blue-600 hover:text-blue-800"
                                        >
                                            <i className="fas fa-download"></i>
                                        </button>
                                    </div>

                                    {/* Portfolio */}
                                    <div className="border p-4 rounded-lg flex justify-between items-center">
                                        <div className="flex items-center">
                                            <i className="fas fa-link text-blue-500 text-xl mr-3"></i>
                                            <div>
                                                <p className="font-medium text-gray-900">Portfolio</p>
                                                <p className="text-sm text-gray-500">{selectedApplication.portfolio}</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => window.open(selectedApplication.portfolio, '_blank')}
                                            className="text-blue-600 hover:text-blue-800"
                                        >
                                            <i className="fas fa-external-link-alt"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'notes' && (
                            <div className="space-y-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Internal Notes</h3>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Add New Note</label>
                                    <textarea
                                        rows={3}
                                        value={newNote}
                                        onChange={(e) => setNewNote(e.target.value)}
                                        className="w-full p-3 border rounded-lg resize-none"
                                        placeholder="Add your internal note here..."
                                    ></textarea>
                                    <div className="mt-3 text-right">
                                        <button
                                            onClick={handleAddNote}
                                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                                        >
                                            Add Note
                                        </button>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    {selectedApplication.notes.map((note, i) => (
                                        <div key={i} className="border p-4 rounded-lg">
                                            <div className="flex justify-between mb-2">
                                                <span className="font-medium">{note.admin}</span>
                                                <span className="text-sm text-gray-500">{note.date}</span>
                                            </div>
                                            <p>{note.content}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ApplicationDetail;
