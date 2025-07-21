// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useEffect, useState } from 'react';
import AdminLayout from '../../../layout/AdminLayout';
import { applications } from '../../../constants';
import Header from './components/Header';
import Search from './components/Search';
import ApplicationTable from './components/ApplicationTable';
import ApplicationDetail from './components/DetaailModal';

const Internship = () => {
    const [selectedApplication, setSelectedApplication] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const [statusFilter, setStatusFilter] = useState('all');
    const [positionFilter, setPositionFilter] = useState('all');
    const [showFilters, setShowFilters] = useState(false);
    const [selectedApplications, setSelectedApplications] = useState([]);
    const [activeTab, setActiveTab] = useState('personal');
    const [newNote, setNewNote] = useState('');

    const getStatusBadge = (status) => {
        const statusConfig = {
            new: 'bg-blue-100 text-blue-800',
            shortlisted: 'bg-green-100 text-green-800',
            rejected: 'bg-gray-100 text-gray-800'
        };
        return statusConfig[status] || 'bg-gray-100 text-gray-800';
    };

    const getStatusText = (status) => {
        return status.charAt(0).toUpperCase() + status.slice(1);
    };

    const filteredApplications = applications.filter(app => {
        const matchesSearch = app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            app.position.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
        const matchesPosition = positionFilter === 'all' || app.position === positionFilter;
        return matchesSearch && matchesStatus && matchesPosition;
    });


    const handleSelectAll = (checked) => {
        if (checked) {
            setSelectedApplications(filteredApplications.map(app => app.id));
            // console.log(selectedApplications)
        } else {
            setSelectedApplications([]);
        }
    };

    useEffect(() => {
        console.log('Selected Applications updated:', selectedApplications);
    }, [selectedApplications]);


    const handleSelectApplication = (id, checked) => {
        if (checked) {
            setSelectedApplications([...selectedApplications, id]);
        } else {
            setSelectedApplications(selectedApplications.filter(appId => appId !== id));
        }
    };


    return (
        <div className="min-h-screen bg-gray-50">


            <AdminLayout>
                <div className="min-h-screen bg-gray-50 px-4 py-6">
                    {/* Header */}
                    <Header filteredApplications={filteredApplications} />

                    {/* Search & Filters */}
                    <Search
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        positionFilter={positionFilter}
                        setPositionFilter={setPositionFilter}
                        statusFilter={statusFilter}
                        setStatusFilter={setStatusFilter}
                         type="Application"
                    />

                    {/* Applications Table */}
                    <ApplicationTable
                        handleSelectAll={handleSelectAll}
                        filteredApplications={filteredApplications}
                        selectedApplications={selectedApplications}
                        handleSelectApplication={handleSelectApplication}
                        setSelectedApplication={setSelectedApplication}
                        getStatusBadge={getStatusBadge}
                        getStatusText={getStatusText}
                        type="Application"

                    />

                    {/* Modal */}
                    {selectedApplication && (
                        <ApplicationDetail
                            selectedApplication={selectedApplication}
                            setSelectedApplication={setSelectedApplication}
                        />
                    )}
                </div>
            </AdminLayout>


        </div>
    );
};
export default Internship