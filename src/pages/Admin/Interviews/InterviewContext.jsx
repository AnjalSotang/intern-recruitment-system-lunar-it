import React, { useEffect, useState, useCallback } from 'react'
import { Button } from "@/components/ui/button"
import { Plus } from 'lucide-react'
import { toast } from "react-toastify"
import L_Card from './components/L_Card'
import InterviewTable from './components/InterviewTable'
import { InterviewDetailsModal } from './components/InterviewDetailModal'
import { EditInterviewModal } from "./models/EditInterviewModal"
import RescheduleInterviewModal from "./models/RescheduleInterviewModal"
import CandidateProfileModal from "./models/CandidareProfileModal"
import CancelInterviewModal from "./models/CancelInterviewModal"
import StartInterviewModal from "./models/StartInterviewModal"
import { useInterviewStore } from "../../../store/InterviewStore"
import DeleteConfirmationModal from './models/DeleteModel'

const Heading = ({ setShowModal, setSelectedApplication }) => {
    // Main modal states
    const [showScheduleModal, setShowScheduleModal] = useState(false)
    const [showDetailsModal, setShowDetailsModal] = useState(false)
    const [selectedInterview, setSelectedInterview] = useState(null)

    // Modal states moved from InterviewDetailsModal
    const [editModalOpen, setEditModalOpen] = useState(false)
    const [rescheduleModalOpen, setRescheduleModalOpen] = useState(false)
    const [candidateProfileOpen, setCandidateProfileOpen] = useState(false)
    const [cancelModalOpen, setCancelModalOpen] = useState(false)
    const [deleteModalOpen, setDeleteModalOpen] = useState(false)
    const [startModalOpen, setStartModalOpen] = useState(false)

    // Store hooks
    const fetchInterviews = useInterviewStore(state => state.fetchInterviews)
    const interviews = useInterviewStore(state => state.interviews)
    const updateInterview = useInterviewStore(state => state.updateInterview)
    const deleteInterview = useInterviewStore(state => state.deleteInterview)
    const permanentDeleteInterview = useInterviewStore(state => state.permanentDeleteInterview)
    const loading = useInterviewStore(state => state.loading)
    const error = useInterviewStore(state => state.error)
    const status = useInterviewStore(state => state.status)
    const message = useInterviewStore(state => state.message)
    const [detailsModal, setDetailsModal] = useState(false)

    // SOLUTION: Sync selectedInterview with store updates
    useEffect(() => {
        if (selectedInterview && interviews.length > 0) {
            const updatedInterview = interviews.find(interview => interview.id === selectedInterview.id)
            if (updatedInterview) {
                setSelectedInterview(updatedInterview)
            }
        }
    }, [interviews, selectedInterview?.id])

    // Handle view interview
    const handleViewInterview = useCallback((interview) => {
        setSelectedInterview(interview)
        setShowDetailsModal(true)
    }, [])

    // Handle setting selected interview without opening details modal
    const handleSetSelectedInterview = useCallback((interview) => {
        setSelectedInterview(interview)
    }, [])

    // Modal trigger functions to pass to InterviewDetailsModal
    const simpleModalTriggers = {
        openEditModal: () => { setDetailsModal(false); setEditModalOpen(true) },
        openRescheduleModal: () => { setDetailsModal(false); setRescheduleModalOpen(true) },
        openCandidateProfile: () => { setDetailsModal(false); setCandidateProfileOpen(true) },
        openCancelModal: () => { setDetailsModal(false); setDeleteModalOpen(true) },
        openStartModal: () => { setDetailsModal(false); setStartModalOpen(true) }
    }

    const modalTriggers = {
        openEditModal: () => {
            setShowDetailsModal(false)
            setDetailsModal(true);
            setEditModalOpen(true);
        },
        openRescheduleModal: () => {
            setShowDetailsModal(false)
            setDetailsModal(true);
            setRescheduleModalOpen(true);
        },
        openCandidateProfile: () => {
            setShowDetailsModal(false)
            setDetailsModal(true);
            setCandidateProfileOpen(true);
        },
        openCancelModal: () => {
            setShowDetailsModal(false)
            setDetailsModal(true);
            setCancelModalOpen(true);
        },
        openStartModal: () => {
            setShowDetailsModal(false)
            setDetailsModal(true);
            setStartModalOpen(true);
        }
    };

    // Modal handlers
    const handleEditInterview = useCallback((updatedInterview) => {
        updateInterview(updatedInterview, updatedInterview.id)
    }, [updateInterview])

    const handleRescheduleInterview = useCallback((interview, interviewId, newDate, newTime, reason) => {
        const updatedInterview = {
            ...interview,
            date: newDate,
            time: newTime,
            notes: reason || interview.notes,
        }
        updateInterview(updatedInterview, interviewId)
    }, [updateInterview])

    const handleCancelInterview = useCallback((interviewId, reason, notifyCandidate) => {
        console.log("Cancelled interview:", { interviewId, reason, notifyCandidate })
        deleteInterview(interviewId, reason, notifyCandidate)
    }, [deleteInterview])

    const handleStartInterview = useCallback((interviewId) => {
        console.log("Started interview:", interviewId)
    }, [])

    // FIXED: Use deleteInterview instead of deleteApplication
    const confirmDeleteInterview = useCallback((id) => {
        if (selectedInterview) {
            permanentDeleteInterview(id)
            console.log('bro')
        }
    }, [deleteInterview, selectedInterview])

    // Toast notifications
    useEffect(() => {
        if (status && message) {
            if (status >= 200 && status < 300) {
                toast.success(message)
            } else {
                toast.error(message)
            }
        }
    }, [status, message])

    useEffect(() => {
        if (error) {
            toast.error(error)
        }
    }, [error])

    useEffect(() => {
        fetchInterviews()
    }, [fetchInterviews])

    const handleEditModalClose = useCallback((open) => {
        if (!open) { // Modal is being closed
            setEditModalOpen(false)
            setShowDetailsModal(false);

            // If edit was opened from details, go back to details
            if (detailsModal) {
                setEditModalOpen(false)
                setShowDetailsModal(true);
            }
        } else {
            setEditModalOpen(open)
        }
    }, [detailsModal])

    const handleRescheduleModalClose = useCallback((open) => {
        if (!open) { // Modal is being closed
            setRescheduleModalOpen(false)
            setShowDetailsModal(false);

            // If edit was opened from details, go back to details
            if (detailsModal) {
                setRescheduleModalOpen(false)
                setShowDetailsModal(true);
            }
        } else {
            setRescheduleModalOpen(open)
        }
    }, [detailsModal])

    const handleCancelInterviewModalClose = useCallback((open) => {
        if (!open) { // Modal is being closed
            setCancelModalOpen(false)
            setShowDetailsModal(false);

            // If edit was opened from details, go back to details
            if (detailsModal) {
                setCancelModalOpen(false)
                setShowDetailsModal(true);
            }
        } else {
            setCancelModalOpen(open)
        }
    }, [detailsModal])

    const handleStartInterviewModalClose = useCallback((open) => {
        if (!open) { // Modal is being closed
            setStartModalOpen(false)
            setShowDetailsModal(false);

            // If edit was opened from details, go back to details
            if (detailsModal) {
                setStartModalOpen(false)
                setShowDetailsModal(true);
            }
        } else {
            setStartModalOpen(open)
        }
    }, [detailsModal])

    const handleDeleteModalClose = useCallback((open) => {
        setDeleteModalOpen(open)
    }, [])

    return (
        <>
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Interviews</h1>
                    <p className="text-muted-foreground">Manage and track all candidate interviews</p>
                </div>
                {/* <Button onClick={() => setShowScheduleModal(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Schedule Interview
                </Button> */}
            </div>
            <L_Card />

            <InterviewTable
                handleViewInterview={handleViewInterview}
                handleSetSelectedInterview={handleSetSelectedInterview}
                interviews={interviews}
                modalTriggers={simpleModalTriggers}
            />

            {/* Main Interview Details Modal */}
            <InterviewDetailsModal
                open={showDetailsModal}
                onOpenChange={setShowDetailsModal}
                interview={selectedInterview}
                fetchInterviews={fetchInterviews}
                modalTriggers={modalTriggers}
            />

            {/* All Modal Components - Only render when selectedInterview exists */}
            {selectedInterview && (
                <>
                    <EditInterviewModal
                        open={editModalOpen}
                        onOpenChange={handleEditModalClose}
                        interview={selectedInterview}
                        onSave={handleEditInterview}
                        loading={loading}
                    />

                    <RescheduleInterviewModal
                        open={rescheduleModalOpen}
                        onOpenChange={handleRescheduleModalClose}
                        interview={selectedInterview}
                        onReschedule={handleRescheduleInterview}
                        loading={loading}
                    />

                    <CandidateProfileModal
                        open={candidateProfileOpen}
                        onOpenChange={setCandidateProfileOpen}
                        candidateName={selectedInterview.candidateName}
                    />

                    <CancelInterviewModal
                        open={cancelModalOpen}
                        onOpenChange={handleCancelInterviewModalClose}
                        interview={selectedInterview}
                        onCancel={handleCancelInterview}
                        loading={loading}
                    />

                    <StartInterviewModal
                        open={startModalOpen}
                        onOpenChange={handleStartInterviewModalClose}
                        interview={selectedInterview}
                        onStart={handleStartInterview}
                    />

                    <DeleteConfirmationModal
                        open={deleteModalOpen}
                        onOpenChange={handleDeleteModalClose}
                        onConfirm={confirmDeleteInterview}
                        item={selectedInterview}
                    />
                </>
            )}
        </>
    )
}

export default Heading