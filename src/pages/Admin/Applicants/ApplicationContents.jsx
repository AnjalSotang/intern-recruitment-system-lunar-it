import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    FileText,
    Users,
    Clock,
    CheckCircle,
    XCircle,
    MoreHorizontal,
    Eye,
    Edit,
    Trash2,
    Download,
    Filter,
    ArrowUpDown,
    Calendar,
    Mail,
    Star,
    Plus,
} from "lucide-react"
import ApplicationDetailsModal from "./Components/ApplicationDetailModel"
import BulkActionsModal from "./Components/BulkActionsModal"
import { CreateApplicationModal } from "./Components/CreateApplicationModal"
import DeleteConfirmationModal from "./Components/DeleteConfirmationModal"
import ScheduleInterviewFromApplicationModal from "./Components/ScheduleInterviewFromApplicationModal"
import UpdateStatusModal from "./Components/UpdateStatusModal"
import SendMessageModal from "./Components/SendMessageModal"
import { useApplicationStore } from '../../../store/AppliactionStore'
import { useInterviewStore } from "../../../store/InterviewStore"
import { toast } from "react-toastify"
import { Skeleton } from "@/components/ui/skeleton"
import SkeletonTable from "./Components/SkeletonTable"

const applicationStats = [
    {
        title: "Total Applications",
        value: "1,234",
        change: "+12%",
        changeType: "positive",
        icon: FileText,
    },
    {
        title: "Under Review",
        value: "89",
        change: "+5%",
        changeType: "positive",
        icon: Clock,
    },
    {
        title: "Accepted",
        value: "156",
        change: "+8%",
        changeType: "positive",
        icon: CheckCircle,
    },
    {
        title: "Rejected",
        value: "234",
        change: "-3%",
        changeType: "negative",
        icon: XCircle,
    },
]

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
    const [showBulkModal, setShowBulkModal] = useState(false)
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
                // setScheduleOpenedFromDetails(false)
                break
            default:
                break
        }
    }

    const getStatusBadge = (status) => {
        const colors = {
            pending: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
            reviewing: "bg-blue-100 text-blue-800 hover:bg-blue-100",
            accepted: "bg-green-100 text-green-800 hover:bg-green-100",
            rejected: "bg-red-100 text-red-800 hover:bg-red-100",
            "interview-scheduled": "bg-purple-100 text-purple-800 hover:bg-purple-100",
        }

        const labels = {
            pending: "Pending",
            reviewing: "Reviewing",
            accepted: "Accepted",
            rejected: "Rejected",
            "interview-scheduled": "Interview Scheduled",
        }

        return <Badge className={colors[status]}>{labels[status]}</Badge>
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

    const handleDeleteApplication = (application) => {
        setDeletingApplication(application)
        setShowDeleteModal(true)
    }

    const confirmDeleteApplication = () => {
        if (deletingApplication) {
            deleteApplication(deletingApplication._id)
            setDeletingApplication(null)
        }
    }

    const handleBulkAction = (action) => {
        if (selectedApplications.length === 0) {
            toast({
                title: "No applications selected",
                description: "Please select applications to perform bulk actions.",
                variant: "destructive",
            })
            return
        }
        setShowBulkModal(true)
    }

    const handleSort = (field) => {
        if (sortField === field) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc")
        } else {
            setSortField(field)
            setSortDirection("asc")
        }
    }

    // const handleSelectApplication = (id) => {
    //     setSelectedApplications((prev) => (prev.includes(id) ? prev.filter((appId) => appId !== id) : [...prev, id]))
    // }

    // const handleSelectAll = () => {
    //     if (selectedApplications.length === filteredApplications.length) {
    //         setSelectedApplications([])
    //     } else {
    //         setSelectedApplications(filteredApplications.map((app) => app.id))
    //     }
    // }

    // const handleScheduleInterview = (application) => {
    //     setSelectedApplicationForAction(application)
    //     setShowScheduleInterviewModal(true)
    // }

    // const handleUpdateStatus = (application) => {
    //     setSelectedApplicationForAction(application)
    //     setShowUpdateStatusModal(true)
    // }

    // const handleSendMessage = (application) => {
    //     setSelectedApplicationForAction(application)
    //     setShowSendMessageModal(true)
    // }

    const handleStatusUpdated = (id, status, sendNotification) => {
        updateApplication(id, status, sendNotification)
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
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Applications</h1>
                    <p className="text-muted-foreground">Manage and review all candidate applications</p>
                </div>

                <div className="flex items-center gap-2">
                    {/* Add any header buttons here if needed */}
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {applicationStats.map((stat) => (
                    <Card key={stat.title}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                            <stat.icon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                            <p className="text-xs text-muted-foreground">
                                <span className={stat.changeType === "positive" ? "text-green-600" : "text-red-600"}>
                                    {stat.change}
                                </span>{" "}
                                from last month
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Applications Table */}
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>All Applications</CardTitle>
                    </div>

                    {/* Filters */}
                    <div className="flex flex-wrap gap-4 items-center">
                        <Input
                            placeholder="Search applications..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="max-w-sm"
                        />
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Filter by status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Statuses</SelectItem>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="reviewing">Reviewing</SelectItem>
                                <SelectItem value="accepted">Accepted</SelectItem>
                                <SelectItem value="rejected">Rejected</SelectItem>
                                <SelectItem value="interview-scheduled">Interview Scheduled</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Filter by department" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Departments</SelectItem>
                                <SelectItem value="Engineering">Engineering</SelectItem>
                                <SelectItem value="Design">Design</SelectItem>
                                <SelectItem value="Marketing">Marketing</SelectItem>
                                <SelectItem value="Analytics">Analytics</SelectItem>
                                <SelectItem value="Infrastructure">Infrastructure</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Filter by priority" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Priorities</SelectItem>
                                <SelectItem value="high">High</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="low">Low</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardHeader>

                <CardContent>
                    {/* Status Tabs */}
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-4">
                        <TabsList>
                            <TabsTrigger value="all">All ({getTabCount("all")})</TabsTrigger>
                            <TabsTrigger value="pending">Pending ({getTabCount("pending")})</TabsTrigger>
                            <TabsTrigger value="reviewing">Reviewing ({getTabCount("reviewing")})</TabsTrigger>
                            <TabsTrigger value="interview-scheduled">Interviews ({getTabCount("interview-scheduled")})</TabsTrigger>
                            <TabsTrigger value="accepted">Accepted ({getTabCount("accepted")})</TabsTrigger>
                            <TabsTrigger value="rejected">Rejected ({getTabCount("rejected")})</TabsTrigger>
                        </TabsList>
                    </Tabs>


                    {error ? (
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Error loading interviews</AlertTitle>
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    ) : applications.length === 0 ? (
                        <div className="py-16 flex flex-col text-center text-gray-600">
                            <div className="w-16 h-16 mx-auto flex items-center justify-center bg-gray-100 rounded-full text-gray-400">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-8 h-8"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M9 17v-2a4 4 0 014-4h4M9 9h.01M21 21H3a2 2 0 01-2-2V5a2 2 0 012-2h7l5 5v9a2 2 0 01-2 2z"
                                    />
                                </svg>
                            </div>
                            <h3 className="mt-4 text-lg font-medium">No interviews found</h3>
                            <p className="mt-2">Try adjusting your filters or schedule new interviews.</p>
                        </div>
                    ) : (<Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>
                                    <Button
                                        variant="ghost"
                                        onClick={() => handleSort("firstName")}
                                        className="h-auto p-0 font-semibold"
                                    >
                                        Candidate
                                        <ArrowUpDown className="ml-2 h-4 w-4" />
                                    </Button>
                                </TableHead>
                                <TableHead>Position</TableHead>
                                <TableHead>Department</TableHead>
                                <TableHead>
                                    <Button variant="ghost" onClick={() => handleSort("status")} className="h-auto p-0 font-semibold">
                                        Status
                                        <ArrowUpDown className="ml-2 h-4 w-4" />
                                    </Button>
                                </TableHead>
                                <TableHead>Priority</TableHead>
                                <TableHead>
                                    <Button
                                        variant="ghost"
                                        onClick={() => handleSort("appliedDate")}
                                        className="h-auto p-0 font-semibold"
                                    >
                                        Applied Date
                                        <ArrowUpDown className="ml-2 h-4 w-4" />
                                    </Button>
                                </TableHead>
                                <TableHead className="text-right text-red-600">Actions</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {loading ? (
                                <SkeletonTable rows={5} />
                            ) : (

                                filteredApplications.map((application) => (
                                    <TableRow
                                        key={application._id}
                                        className={selectedApplications.includes(application._id) ? "bg-muted/50" : ""}
                                    >
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-8 w-8">
                                                    <AvatarImage
                                                        src={'https://img.gamdb.com/character/large/63768c4111fd25a6e6d9987465cb9f4d-ns.png'}
                                                    />
                                                    <AvatarFallback>
                                                        {application.firstName?.charAt(0) || 'N/A'}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className="font-medium">{application.firstName}</p>
                                                    <p className="text-sm text-muted-foreground">{application.email}</p>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>{application.positionTitle}</TableCell>
                                        <TableCell>
                                            <Badge variant="outline">{application.department}</Badge>
                                        </TableCell>
                                        <TableCell>{getStatusBadge(application.status)}</TableCell>
                                        <TableCell>{getPriorityBadge(application.priority)}</TableCell>
                                        <TableCell>{new Date(application.appliedDate).toLocaleDateString()}</TableCell>
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem onClick={() => handleViewApplication(application)}>
                                                        <Eye className="mr-2 h-4 w-4" />
                                                        View Details
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => handleDropdownAction('schedule-interview', application)}>
                                                        <Calendar className="mr-2 h-4 w-4" />
                                                        Schedule Interview
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => handleDropdownAction('send-message', application)}>
                                                        <Mail className="mr-2 h-4 w-4" />
                                                        Send Message
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => handleDropdownAction('update-status', application)}>
                                                        <Edit className="mr-2 h-4 w-4" />
                                                        Update Status
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => handleDropdownAction('delete', application)} className="text-red-600">
                                                        <Trash2 className="mr-2 h-4 w-4" />
                                                        Delete
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>)

                    }
                </CardContent>
            </Card>

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

            {/* <BulkActionsModal
                open={showBulkModal}
                onOpenChange={setShowBulkModal}
                selectedCount={selectedApplications.length}
                onAction={(action) => {
                    console.log("Bulk action:", action, selectedApplications)
                    setSelectedApplications([])
                    setShowBulkModal(false)
                    toast({
                        title: "Bulk action completed",
                        description: `${action} applied to ${selectedApplications.length} applications.`,
                    })
                }}
            /> */}

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