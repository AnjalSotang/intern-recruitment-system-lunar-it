import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { KPICards } from "./components/kpi-cards"
import { ApplicationsTable } from "./components/ApplicationsTable"
import { AddInternshipModal } from "./components/AddInternshipModal"
import { DashboardCharts } from "./components/DashboardCharts"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useDashboardStore } from "../../../store/Dashboard"
import { useApplicationStore } from "../../../store/AppliactionStore"
import { useInterviewStore } from "../../../store/InterviewStore"
import ApplicationDetailsModal from "../Applicants/Components/ApplicationDetailModel"
import ScheduleInterviewFromApplicationModal from "../Applicants/Components/ScheduleInterviewFromApplicationModal"
import UpdateStatusModal from "../Applicants/Components/UpdateStatusModal"
import SendMessageModal from "../Applicants/Components/SendMessageModal"
import DeleteConfirmationModal from "../Applicants/Components/DeleteConfirmationModal"
import { Link } from "react-router-dom"

export function DashboardContent() {
  // Basic modal states
  const [showAddModal, setShowAddModal] = useState(false)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [selectedApplication, setSelectedApplication] = useState(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deletingApplication, setDeletingApplication] = useState(null)

  // Modal states from ApplicationDetailsModal
  const [showScheduleInterviewModal, setShowScheduleInterviewModal] = useState(false)
  const [showUpdateStatusModal, setShowUpdateStatusModal] = useState(false)
  const [showSendMessageModal, setShowSendMessageModal] = useState(false)
  const [selectedApplicationForAction, setSelectedApplicationForAction] = useState(null)
  const [scheduleOpenedFromDetails, setScheduleOpenedFromDetails] = useState(false)

  // Store hooks
  const { fetchDashboardSummary, fetchStatusSummary, statusSummary, summary, fetchMessagesChart, messagesChart } = useDashboardStore()
  const {
    fetchApplications,
    applications,
    updateApplication,
    deleteApplication,
    sendMessage,
    // loading,
    error,
    status,
    message,
    fetchApplicationSummary
  } = useApplicationStore()
  const fetchInterviews = useInterviewStore(state => state.fetchInterviews)

  // Sync selectedApplication and selectedApplicationForAction with store updates
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

  // Fetch data on mount
  useEffect(() => {
    fetchDashboardSummary()
    fetchApplications()
    fetchStatusSummary()
    fetchInterviews()
    fetchApplicationSummary()
    fetchMessagesChart()
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

  const handleStatusUpdated = (id, status, sendNotification) => {
    updateApplication(id, status, sendNotification)
    fetchApplicationSummary(false)
  }

  const handleMessageSent = (messageData) => {
    sendMessage(messageData)
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
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Welcome back! Here's what's happening with your internship program.
          </p>
        </div>
        <Button onClick={() => setShowAddModal(true)} className="shadow-lg hover:shadow-xl transition-shadow">
          <Plus className="mr-2 h-4 w-4" />
          Add Internship
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="mb-8">
        <KPICards summary={summary} />
      </div>

      {/* Charts Section */}
      <div className="mb-8">
        <DashboardCharts statusSummary={statusSummary} messagesChart={messagesChart} />
      </div>

      {/* Recent Applications Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold tracking-tight">Recent Applications</h2>
          <Button variant="outline" size="sm">
            <Link to={'/admin/applications'}>
              View More
            </Link>
          </Button>
        </div>
<div className="rounded-lg shadow-sm border bg-card text-card-foreground">
          <ApplicationsTable 
            onViewApplication={handleViewApplication}
            applications={applications}
            handleDropdownAction={handleDropdownAction}
          />
        </div>
      </div>

      {/* Modals */}
      <AddInternshipModal open={showAddModal} onOpenChange={setShowAddModal} />

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