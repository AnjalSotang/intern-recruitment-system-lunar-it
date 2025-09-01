import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import { useApplicationStore } from '../../../store/AppliactionStore'
import { useInterviewStore } from "../../../store/InterviewStore"
import ApplicationDetailsModal from "./Components/ApplicationDetailModel"
import DeleteConfirmationModal from "./Components/DeleteConfirmationModal"
import ScheduleInterviewFromApplicationModal from "./Components/ScheduleInterviewFromApplicationModal"
import SendMessageModal from "./Components/SendMessageModal"
import StatsCard from "./Components/StatsCard"
import UpdateStatusModal from "./Components/UpdateStatusModal"
import ApplicationTable from "./Components/ApplicationTable"

const ApplicationContents = () => {
    // Main modal states
    const [selectedApplications, setSelectedApplications] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")
    const [departmentFilter, setDepartmentFilter] = useState("all")
    const [priorityFilter, setPriorityFilter] = useState("all")
    const [sortField, setSortField] = useState("appliedDate")
    const [sortDirection, setSortDirection] = useState("desc")
    const [showDetailsModal, setShowDetailsModal] = useState(false)
    const [selectedApplication, setSelectedApplication] = useState(null)
    const [activeTab, setActiveTab] = useState("all")
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [deletingApplication, setDeletingApplication] = useState(null)

    // Modal states moved from ApplicationDetailsModal
    const [showScheduleInterviewModal, setShowScheduleInterviewModal] = useState(false)
    const [showUpdateStatusModal, setShowUpdateStatusModal] = useState(false)
    const [showSendMessageModal, setShowSendMessageModal] = useState(false)
    const [selectedApplicationForAction, setSelectedApplicationForAction] = useState(null)
    const [scheduleOpenedFromDetails, setScheduleOpenedFromDetails] = useState(false)

    // Store hooks
    const applications = useApplicationStore(state => state.applications)
    const fetchApplications = useApplicationStore(state => state.fetchApplications)
    const fetchInterviews = useInterviewStore(state => state.fetchInterviews)
    const updateApplication = useApplicationStore(state => state.updateApplication)
    const deleteApplication = useApplicationStore(state => state.deleteApplication)
    const sendMessage = useApplicationStore(state => state.sendMessage)
    const loading = useApplicationStore(state => state.loading)
    const error = useApplicationStore(state => state.error)
    const status = useApplicationStore(state => state.status)
    const message = useApplicationStore(state => state.message)
    const fetchApplicationSummary = useApplicationStore(state => state.fetchApplicationSummary)

    // SOLUTION: Sync selectedApplication and selectedApplicationForAction with store updates
    useEffect(() => {
        if (selectedApplication && applications.length > 0) {
            const updatedApplication = applications.find(app => app._id === selectedApplication._id)
            if (updatedApplication) {
                setSelectedApplication(updatedApplication)
            }
        }
    }, [applications, selectedApplication?._id])

    useEffect(() => {
        if (selectedApplicationForAction && applications.length > 0) {
            const updatedApplication = applications.find(app => app._id === selectedApplicationForAction._id)
            if (updatedApplication) {
                setSelectedApplicationForAction(updatedApplication)
            }
        }
    }, [applications, selectedApplicationForAction?._id])

    // Fetch on mount
    useEffect(() => {
        fetchApplications()
        fetchInterviews()
        fetchApplicationSummary()
    }, [])

    // Watch backend store updates for toast messages
    useEffect(() => {
        if (status && message) {
            if (status >= 200 && status < 300) {
                toast.success(message)
            } else {
                toast.error(message)
            }
        }
    }, [status, message])

    // Show toast if error from store
    useEffect(() => {
        if (error) {
            toast.error(error)
        }
    }, [error])

    // Modal trigger functions to pass to ApplicationDetailsModal
    const modalTriggers = {
        openScheduleInterviewModal: () => {
            setShowDetailsModal(false)
            setShowScheduleInterviewModal(true);
            setScheduleOpenedFromDetails(true)
        },
        openUpdateStatusModal: () => {
            setShowDetailsModal(false)
            setShowUpdateStatusModal(true)
            setScheduleOpenedFromDetails(true)
        },
        openSendMessageModal: () => {
            setShowDetailsModal(false)
            setShowSendMessageModal(true)
            setScheduleOpenedFromDetails(true)
        }
    }

    // Handle view application (opens details modal)
    const handleViewApplication = (application) => {
        setSelectedApplication(application)
        setSelectedApplicationForAction(application)
        setShowDetailsModal(true)
    }

    // Handle setting selected application without opening details modal
    const handleSetSelectedApplication = (application) => {
        setSelectedApplication(application)
        setSelectedApplicationForAction(application)
    }

    // Handle dropdown actions from table
    const handleDropdownAction = (action, application) => {
        // Set the selected application without opening details modal
        handleSetSelectedApplication(application)

        // Then trigger the appropriate modal
        switch (action) {
            case 'schedule-interview':
                setShowScheduleInterviewModal(true)
                setScheduleOpenedFromDetails(false)
                break
            case 'send-message':
                setShowSendMessageModal(true)
                setScheduleOpenedFromDetails(false)
                break
            case 'update-status':
                setShowUpdateStatusModal(true)
                setScheduleOpenedFromDetails(false)
                break
            case 'delete':
                setDeletingApplication(application)
                setShowDeleteModal(true)
                break
            default:
                break
        }
    }

    const confirmDeleteApplication = () => {
        if (deletingApplication) {
            deleteApplication(deletingApplication._id)
            fetchApplicationSummary(false)
            setDeletingApplication(null)
        }
    }

    const handleSort = (field) => {
        if (sortField === field) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc")
        } else {
            setSortField(field)
            setSortDirection("asc")
        }
    }

    const handleStatusUpdated = (id, status, sendNotification) => {
        updateApplication(id, status, sendNotification)
        fetchApplicationSummary(false)
    }

    const handleMessageSent = (messageData) => {
        sendMessage(messageData)
    }

    const filteredApplications = applications
        .filter((app) => {
            const matchesSearch =
                app.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                app.positionTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                app.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase()))

            const matchesStatus = statusFilter === "all" || app.status === statusFilter
            const matchesDepartment = departmentFilter === "all" || app.department === departmentFilter
            const matchesPriority = priorityFilter === "all" || app.priority === priorityFilter
            const matchesTab = activeTab === "all" || app.status === activeTab

            return matchesSearch && matchesStatus && matchesDepartment && matchesPriority && matchesTab
        })
        .sort((a, b) => {
            const aValue = a[sortField]
            const bValue = b[sortField]
            const direction = sortDirection === "asc" ? 1 : -1

            if (aValue < bValue) return -1 * direction
            if (aValue > bValue) return 1 * direction
            return 0
        })

    const getTabCount = (status) => {
        if (status === "all") return applications.length
        return applications.filter((app) => app.status === status).length
    }

    // Handle modal close functions
    const handleScheduleModalClose = (open) => {
        if (!open) { // Modal is being closed
            setShowDetailsModal(false)
            setShowScheduleInterviewModal(false);

            // If edit was opened from details, go back to details
            if (scheduleOpenedFromDetails) {
                setShowDetailsModal(true)
                setShowScheduleInterviewModal(false);
            }
        } else {
            setShowScheduleInterviewModal(open)
        }
    }

    const handleUpdateModalClose = (open) => {
        if (!open) { // Modal is being closed
            setShowDetailsModal(false)
            setShowUpdateStatusModal(false);

            // If edit was opened from details, go back to details
            if (scheduleOpenedFromDetails) {
                setShowDetailsModal(true)
                setShowUpdateStatusModal(false);
            }
        } else {
            setShowUpdateStatusModal(open);
        }
    }

    const handleMessageModalClose = (open) => {
        if (!open) { // Modal is being closed
            setShowDetailsModal(false)
            setShowSendMessageModal(false);

            // If edit was opened from details, go back to details
            if (scheduleOpenedFromDetails) {
                setShowDetailsModal(true)
                setShowSendMessageModal(false);
            }
        } else {
            setShowSendMessageModal(open);
        }
    }

    return (
        <div className="space-y-8 p-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Applications</h1>
                    <p className="text-muted-foreground mt-2">Manage and review all candidate applications</p>
                </div>
                <div className="flex items-center gap-2">
                    {/* Add any header buttons here if needed */}
                </div>
            </div>

            {/* Stats Cards */}
            <StatsCard />

            {/* Applications Table */}
            <ApplicationTable
                applications={applications}
                loading={loading}
                error={error}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
                departmentFilter={departmentFilter}
                setDepartmentFilter={setDepartmentFilter}
                priorityFilter={priorityFilter}
                setPriorityFilter={setPriorityFilter}
                sortField={sortField}
                sortDirection={sortDirection}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                selectedApplications={selectedApplications}
                filteredApplications={filteredApplications}
                handleSort={handleSort}
                handleViewApplication={handleViewApplication}
                handleDropdownAction={handleDropdownAction}
                getTabCount={getTabCount}
            />

            {/* Main Application Details Modal */}
            <ApplicationDetailsModal
                open={showDetailsModal}
                onOpenChange={setShowDetailsModal}
                application={selectedApplication}
                modalTriggers={modalTriggers}
            />

            {/* All Modal Components - Only render when selectedApplicationForAction exists */}
            {selectedApplicationForAction && (
                <>
                    <ScheduleInterviewFromApplicationModal
                        open={showScheduleInterviewModal}
                        onOpenChange={handleScheduleModalClose}
                        application={selectedApplicationForAction}
                    />

                    <UpdateStatusModal
                        open={showUpdateStatusModal}
                        onOpenChange={handleUpdateModalClose}
                        application={selectedApplicationForAction}
                        onStatusUpdate={handleStatusUpdated}
                    />

                    <SendMessageModal
                        open={showSendMessageModal}
                        onOpenChange={handleMessageModalClose}
                        application={selectedApplicationForAction}
                        onMessageSent={handleMessageSent}
                    />
                </>
            )}

            <DeleteConfirmationModal
                open={showDeleteModal}
                onOpenChange={setShowDeleteModal}
                onConfirm={confirmDeleteApplication}
                itemName={deletingApplication?.firstName}
            />
        </div>
    )
}

export default ApplicationContents