import React, { useEffect, useMemo, useState } from 'react'
import Header from './components/Header'
import CreatePositionModal from './components/dialog/CreatePositionModal'
import StatsCard from './components/StatsCard'
import PositionTable from './components/PositionTable'
import { Badge } from "@/components/ui/badge"
import PositionDetailsModal from './components/dialog/PositionDetailModal'
import EditPositionModal from './components/dialog/EditPositionModal'
import DeleteConfirmationModal from './components/dialog/DeleteConfirmationModal'
import { usePositionStore } from '../../../store/PositionStore'
import { de } from 'date-fns/locale/de'
import { ToastContainer, toast } from 'react-toastify';

const PositonContent = () => {
    const [showCreateModal, setShowCreateModal] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")
    const [departmentFilter, setDepartmentFilter] = useState("all")
    const [typeFilter, setTypeFilter] = useState("all")
    const [sortField, setSortField] = useState("createdDate")
    const [sortDirection, setSortDirection] = useState("desc")

    const [showEditModal, setShowEditModal] = useState(false)
    const [showDetailsModal, setShowDetailsModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [selectedPosition, setSelectedPosition] = useState(null)
    const [editingPosition, setEditingPosition] = useState(null)
    const [deletingPosition, setDeletingPosition] = useState(null)

    // NEW: Track where the edit modal was opened from
    const [editOpenedFromDetails, setEditOpenedFromDetails] = useState(false)

    const positions = usePositionStore(state => state.positions);
    const fetchPositions = usePositionStore(state => state.fetchPositions);
    const deletePosition = usePositionStore(state => state.deletePosition)
    const updatePosition = usePositionStore(state => state.updatePosition)
    const loading = usePositionStore(state => state.loading);
    const error = usePositionStore(state => state.error);
    const status = usePositionStore(state => state.status);
    const message = usePositionStore(state => state.message)

    const getStatusBadge = (status) => {
        const colors = {
            active: "bg-green-100 text-green-800 hover:bg-green-100",
            paused: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
            closed: "bg-red-100 text-red-800 hover:bg-red-100",
            draft: "bg-gray-100 text-gray-800 hover:bg-gray-100",
        }

        return <Badge className={colors[status]}>{status.charAt(0).toUpperCase() + status.slice(1)}</Badge>
    }

    const getTypeBadge = (type) => {
        const colors = {
            "Full-time": "bg-blue-100 text-blue-800 hover:bg-blue-100",
            "Part-time": "bg-purple-100 text-purple-800 hover:bg-purple-100",
            "Remote": "bg-green-100 text-green-800 hover:bg-green-100",
            "Hybrid": "bg-orange-100 text-orange-800 hover:bg-orange-100",
        }

        const labels = {
            "Full-time": "Full-time",
            "Part-time": "Part-time",
            "Remote": "Remote",
            "Hybrid": "Hybrid",
        }

        return (
            <Badge variant="outline" className={colors[type]}>
                {labels[type]}
            </Badge>
        )
    }

    const getPriorityBadge = (priority) => {
        const colors = {
            high: "bg-red-100 text-red-800 hover:bg-red-100",
            medium: "bg-orange-100 text-orange-800 hover:bg-orange-100",
            low: "bg-gray-100 text-gray-800 hover:bg-gray-100",
        }

        return (
            <Badge variant="outline" className={colors[priority]}>
                {priority.charAt(0).toUpperCase() + priority.slice(1)}
            </Badge>
        )
    }

    const handleViewPosition = (position) => {
        setSelectedPosition(position)
        setShowDetailsModal(true)
    }

    // Handle edit from table (direct edit)
    const handleEditPositionFromTable = (position) => {
        setEditingPosition(position)
        setShowEditModal(true)
        setEditOpenedFromDetails(false) // Opened from table
    }

    // Handle edit from details modal
    const handleEditPositionFromDetails = (position) => {
        setEditingPosition(position)
        setShowEditModal(true)
        setShowDetailsModal(false) // Close details modal
        setEditOpenedFromDetails(true) // Track that it was opened from details
    }

    const handleDeletePosition = (position) => {
        setDeletingPosition(position)
        setShowDeleteModal(true)
    }

    const confirmDeletePosition = () => {
        if (deletingPosition) {
            deletePosition(deletingPosition._id)
            setDeletingPosition(null)
        }
    }

    const handleUpdatePosition = (updatedData) => {
        if (!editingPosition) return

        updatePosition(updatedData)
        setEditingPosition(null)

        // NEW: If edit was opened from details, go back to details
        if (editOpenedFromDetails) {
            // Update the selectedPosition with the new data
            setSelectedPosition(prev => ({ ...prev, ...updatedData }))
            setShowDetailsModal(true)
            setEditOpenedFromDetails(false) // Reset the flag
        }
    }

    // NEW: Handle edit modal close (cancel/X button)
    const handleEditModalClose = (open) => {
        if (!open) { // Modal is being closed
            setShowEditModal(false)
            setEditingPosition(null)

            // If edit was opened from details, go back to details
            if (editOpenedFromDetails) {
                setShowDetailsModal(true)
                setEditOpenedFromDetails(false) // Reset the flag
            }
        } else {
            setShowEditModal(open)
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

    // Compute filteredPositions using useMemo so it's recalculated when dependencies change
    const filteredPositions = useMemo(() => {
        return positions
            .filter((pos) => {
                const matchesSearch =
                    pos.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    pos.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    pos.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    pos.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));

                const matchesStatus = statusFilter === "all" || pos.status === statusFilter;
                const matchesDepartment = departmentFilter === "all" || pos.department === departmentFilter;
                const matchesType = typeFilter === "all" || pos.type === typeFilter;

                return matchesSearch && matchesStatus && matchesDepartment && matchesType;
            })
            .sort((a, b) => {
                const aValue = a[sortField];
                const bValue = b[sortField];
                const direction = sortDirection === "asc" ? 1 : -1;

                if (aValue < bValue) return -1 * direction;
                if (aValue > bValue) return 1 * direction;
                return 0;
            });
    }, [positions, searchTerm, statusFilter, departmentFilter, typeFilter, sortField, sortDirection]);




    useEffect(() => {
        fetchPositions();
    }, [])



    useEffect(() => {
        // console.log("Jdsj " + message)
        if (status === 201 || status === 200) {
            toast.success(message, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        } else {
            toast.error(error, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }

    }, [status])

    return (
        <div className='space-y-6'>
            <ToastContainer />
            <Header setShowCreateModal={setShowCreateModal} />
            <StatsCard />
            <CreatePositionModal open={showCreateModal} onOpenChange={setShowCreateModal} />

            <PositionTable
                searchTerm={searchTerm} setSearchTerm={setSearchTerm}
                statusFilter={statusFilter} setStatusFilter={setStatusFilter}
                departmentFilter={departmentFilter} setDepartmentFilter={setDepartmentFilter}
                typeFilter={typeFilter} setTypeFilter={setTypeFilter}
                handleSort={handleSort} filteredPositions={filteredPositions}
                getTypeBadge={getTypeBadge} getStatusBadge={getStatusBadge}
                getPriorityBadge={getPriorityBadge}
                handleViewPosition={handleViewPosition}
                handleEditPosition={handleEditPositionFromTable} // Use specific handler for table
                handleDeletePosition={handleDeletePosition}
                loading={loading}
                error={error}
                positions={positions} />

            <PositionDetailsModal
                open={showDetailsModal}
                onOpenChange={setShowDetailsModal}
                position={selectedPosition}
                handleEditPosition={handleEditPositionFromDetails} // Use specific handler for details
            />

            <EditPositionModal
                open={showEditModal}
                onOpenChange={handleEditModalClose} // Use custom close handler
                position={editingPosition}
                onSubmit={handleUpdatePosition}
            />

            <DeleteConfirmationModal
                open={showDeleteModal}
                onOpenChange={setShowDeleteModal}
                onConfirm={confirmDeletePosition}
                title="Delete Position"
                itemName={deletingPosition?.title}
                description="Are you sure you want to delete this position? This will also remove all associated applications."
            />
        </div>
    )
}



export default PositonContent