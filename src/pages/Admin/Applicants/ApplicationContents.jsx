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
// import { ApplicationDetailsModal } from "@/components/application-details-modal"
// import { BulkActionsModal } from "@/components/bulk-actions-modal"
import { useToast } from "@/hooks/use-toast"
import ApplicationDetailsModal from "./Components/ApplicationDetailModel"
import BulkActionsModal from "./Components/BulkActionsModal"
import { CreateApplicationModal } from "./Components/CreateApplicationModal"
// import EditApplicationModal from "./Components/EditApplicationModal"
import DeleteConfirmationModal from "./Components/DeleteConfirmationModal"
import ScheduleInterviewFromApplicationModal from "./Components/ScheduleInterviewFromApplicationModal"
import UpdateStatusModal from "./Components/UpdateStatusModal"
import SendMessageModal from "./Components/SendMessageModal"
// import { CreateApplicationModal } from "@/components/create-application-modal"
// import { EditApplicationModal } from "@/components/edit-application-modal"
// import { DeleteConfirmationModal } from "@/components/delete-confirmation-modal"
// import { ScheduleInterviewFromApplicationModal } from "@/components/schedule-interview-from-application-modal"
// import { UpdateStatusModal } from "@/components/update-status-modal"
// import { SendMessageModal } from "@/components/send-message-modal"

// interface Application {
//   id: string
//   firstName: string
//   email: string
//   phone: string
//   position: string
//   department: string
//   status: "pending" | "reviewing" | "accepted" | "rejected" | "interview-scheduled"
//   priority: "high" | "medium" | "low"
//   appliedDate: string
//   experience: string
//   education: string
//   location: string
//   resumeUrl: string
//   coverLetterUrl?: string
//   portfolioUrl?: string
//   skills: string[]
//   rating?: number
//   notes?: string
//   lastActivity: string
//   source: "website" | "linkedin" | "referral" | "job-board"
// }
import { useApplicationStore } from '../../../store/AppliactionStore'
import { toast } from "react-toastify"
import { Skeleton } from "@/components/ui/skeleton" // ShadCN skeleton

const mockApplications = [
    {
        id: "1",
        firstName: "Alice Johnson",
        email: "alice@email.com",
        phone: "+1 (555) 123-4567",
        position: "Frontend Developer Intern",
        department: "Engineering",
        status: "reviewing",
        priority: "high",
        appliedDate: "2024-01-15",
        experience: "2 years",
        education: "Computer Science, Stanford University",
        location: "San Francisco, CA",
        resumeUrl: "resume_alice_johnson.pdf",
        coverLetterUrl: "cover_letter_alice.pdf",
        portfolioUrl: "https://alicejohnson.dev",
        skills: ["React", "TypeScript", "Node.js", "CSS"],
        rating: 4,
        notes: "Strong technical background, excellent portfolio",
        lastActivity: "2024-01-16"
    },
    {
        id: "2",
        firstName: "Bob Smith",
        email: "bob@email.com",
        phone: "+1 (555) 234-5678",
        position: "Backend Developer Intern",
        department: "Engineering",
        status: "pending",
        priority: "medium",
        appliedDate: "2024-01-14",
        experience: "1 year",
        education: "Software Engineering, UC Berkeley",
        location: "Oakland, CA",
        resumeUrl: "resume_bob_smith.pdf",
        skills: ["Python", "Django", "PostgreSQL", "AWS"],
        rating: 3,
        lastActivity: "2024-01-14"
    },
    {
        id: "3",
        firstName: "Carol Davis",
        email: "carol@email.com",
        phone: "+1 (555) 345-6789",
        position: "UI/UX Designer Intern",
        department: "Design",
        status: "accepted",
        priority: "high",
        appliedDate: "2024-01-13",
        experience: "3 years",
        education: "Design, Art Institute",
        location: "Los Angeles, CA",
        resumeUrl: "resume_carol_davis.pdf",
        portfolioUrl: "https://caroldesigns.com",
        skills: ["Figma", "Adobe Creative Suite", "Prototyping", "User Research"],
        rating: 5,
        notes: "Exceptional design skills, great cultural fit",
        lastActivity: "2024-01-17"
    },
    {
        id: "4",
        firstName: "David Wilson",
        email: "david@email.com",
        phone: "+1 (555) 456-7890",
        position: "Data Science Intern",
        department: "Analytics",
        status: "rejected",
        priority: "low",
        appliedDate: "2024-01-12",
        experience: "1.5 years",
        education: "Statistics, UCLA",
        location: "Santa Monica, CA",
        resumeUrl: "resume_david_wilson.pdf",
        skills: ["Python", "R", "Machine Learning", "SQL"],
        rating: 2,
        notes: "Limited practical experience",
        lastActivity: "2024-01-15",

    },
    {
        id: "5",
        firstName: "Eva Brown",
        email: "eva@email.com",
        phone: "+1 (555) 567-8901",
        position: "DevOps Intern",
        department: "Infrastructure",
        status: "interview-scheduled",
        priority: "high",
        appliedDate: "2024-01-11",
        experience: "2.5 years",
        education: "Computer Engineering, MIT",
        location: "Boston, MA",
        resumeUrl: "resume_eva_brown.pdf",
        skills: ["Docker", "Kubernetes", "AWS", "Terraform"],
        rating: 4,
        notes: "Strong infrastructure background",
        lastActivity: "2024-01-18",

    },
    {
        id: "6",
        firstName: "Frank Miller",
        email: "frank@email.com",
        phone: "+1 (555) 678-9012",
        position: "Marketing Intern",
        department: "Marketing",
        status: "reviewing",
        priority: "medium",
        appliedDate: "2024-01-10",
        experience: "1 year",
        education: "Marketing, NYU",
        location: "New York, NY",
        resumeUrl: "resume_frank_miller.pdf",
        skills: ["Digital Marketing", "Analytics", "Content Creation", "SEO"],
        rating: 3,
        lastActivity: "2024-01-16",
    },
]

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
    // const [applications, setApplications] = useState(mockApplications)
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
    const [showCreateModal, setShowCreateModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [editingApplication, setEditingApplication] = useState(null)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [deletingApplication, setDeletingApplication] = useState(null)
    const [showScheduleInterviewModal, setShowScheduleInterviewModal] = useState(false)
    const [showUpdateStatusModal, setShowUpdateStatusModal] = useState(false)
    const [showSendMessageModal, setShowSendMessageModal] = useState(false)
    const [selectedApplicationForAction, setSelectedApplicationForAction] = useState(null)


    const applications = useApplicationStore(state => state.applications);
    const fetchApplications = useApplicationStore(state => state.fetchApplications);
    const updateApplication = useApplicationStore(state => state.updateApplication)
    const loading = useApplicationStore(state => state.loading);
    const error = useApplicationStore(state => state.error);
    const status = useApplicationStore(state => state.status);
    const message = useApplicationStore(state => state.message)


    // Fetch on mount
    useEffect(() => {
        fetchApplications();
    }, []);

    // Watch backend store updates for toast messages
    useEffect(() => {
        if (status && message) {
            if (status >= 200 && status < 300) {
                toast.success(message);
            } else {
                toast.error(message);
            }
        }
    }, [status, message]);

    // Show toast if error from store
    useEffect(() => {
        if (error) {
            toast.error(error);
        }
    }, [error]);


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



    const handleViewApplication = (application) => {
        setSelectedApplication(application)
        setShowDetailsModal(true)
    }

    const handleDeleteApplication = (application) => {
        setDeletingApplication(application)
        setShowDeleteModal(true)
    }

    const confirmDeleteApplication = () => {
        if (deletingApplication) {
            setApplications(applications.filter((app) => app.id !== deletingApplication.id))
            toast({
                title: "Application deleted",
                description: "The application has been successfully deleted.",
            })
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

    const handleSelectApplication = (id) => {
        setSelectedApplications((prev) => (prev.includes(id) ? prev.filter((appId) => appId !== id) : [...prev, id]))
    }

    const handleSelectAll = () => {
        if (selectedApplications.length === filteredApplications.length) {
            setSelectedApplications([])
        } else {
            setSelectedApplications(filteredApplications.map((app) => app.id))
        }
    }

    // const handleCreateApplication = (applicationData) => {
    //     const newApplication = {
    //         id: Date.now().toString(),
    //         firstName: applicationData.firstName || "",
    //         email: applicationData.email || "",
    //         phone: applicationData.phone || "",
    //         position: applicationData.position || "",
    //         department: applicationData.department || "",
    //         status: "pending",
    //         priority: applicationData.priority || "medium",
    //         appliedDate: new Date().toISOString().split("T")[0],
    //         experience: applicationData.experience || "",
    //         education: applicationData.education || "",
    //         location: applicationData.location || "",
    //         resumeUrl: applicationData.resumeUrl || "",
    //         coverLetterUrl: applicationData.coverLetterUrl,
    //         portfolioUrl: applicationData.portfolioUrl,
    //         skills: applicationData.skills || [],
    //         rating: applicationData.rating,
    //         notes: applicationData.notes,
    //         lastActivity: new Date().toISOString().split("T")[0],
    //         source: applicationData.source || "website",
    //     }

    //     setApplications([newApplication, ...applications])
    //     toast({
    //         title: "Application created",
    //         description: "New application has been successfully created.",
    //     })
    // }

    // const handleEditApplication = (application) => {
    //     setEditingApplication(application)
    //     setShowEditModal(true)
    // }

    // const handleUpdateApplication = (updatedData) => {
    //     if (!editingApplication) return

    //     const updatedApplications = applications.map((app) =>
    //         app.id === editingApplication.id
    //             ? { ...app, ...updatedData, lastActivity: new Date().toISOString().split("T")[0] }
    //             : app,
    //     )

    //     setApplications(updatedApplications)
    //     setEditingApplication(null)
    //     toast({
    //         title: "Application updated",
    //         description: "Application has been successfully updated.",
    //     })
    // }

    const handleScheduleInterview = (application) => {
        setSelectedApplicationForAction(application)
        setShowScheduleInterviewModal(true)
    }

    const handleUpdateStatus = (application) => {
        setSelectedApplicationForAction(application)
        setShowUpdateStatusModal(true)
    }

    const handleSendMessage = (application) => {
        setSelectedApplicationForAction(application)
        setShowSendMessageModal(true)
    }

    const handleInterviewScheduled = (interviewData) => {
        // Update application status to interview-scheduled
        const updatedApplications = applications.map((app) =>
            app.id === interviewData.applicationId
                ? { ...app, status: "interview-scheduled", lastActivity: new Date().toISOString().split("T")[0] }
                : app,
        )
        // setApplications(updatedApplications)
    }

    const handleStatusUpdated = (id, status, sendNotification) => {
        updateApplication(id, status, sendNotification)
    }

    const handleMessageSent = (messageData) => {
        // In a real app, you would save this to your messages/communications log
        console.log("Message sent:", messageData)
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



    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Applications</h1>
                    <p className="text-muted-foreground">Manage and review all candidate applications</p>
                </div>

                <div className="flex items-center gap-2">
                    {/* <Button onClick={() => setShowCreateModal(true)}>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Application
                    </Button> */}


                    {selectedApplications.length > 0 && (
                        <Button onClick={() => handleBulkAction("bulk")}>
                            <Users className="mr-2 h-4 w-4" />
                            Bulk Actions ({selectedApplications.length})
                        </Button>
                    )}


                    <Button>
                        <Download className="mr-2 h-4 w-4" />
                        Export
                    </Button>


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

                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-12">
                                    <input
                                        type="checkbox"
                                        checked={
                                            selectedApplications.length === filteredApplications.length && filteredApplications.length > 0
                                        }
                                        onChange={handleSelectAll}
                                        className="rounded"
                                    />
                                </TableHead>
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
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>


                        <TableBody>
                            {filteredApplications.map((application) => (
                                <TableRow
                                    key={application._id}
                                    className={selectedApplications.includes(application._id) ? "bg-muted/50" : ""}
                                >
                                    <TableCell>
                                        <input
                                            type="checkbox"
                                            checked={selectedApplications.includes(application._id)}
                                            onChange={() => handleSelectApplication(application._id)}
                                            className="rounded"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-8 w-8">
                                                <AvatarImage
                                                    src={`/placeholder.svg?height=32&width=32&text=${application.firstName.charAt(0)}`}
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
                                                <DropdownMenuItem onClick={() => handleScheduleInterview(application)}>
                                                    <Calendar className="mr-2 h-4 w-4" />
                                                    Schedule Interview
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => handleSendMessage(application)}>
                                                    <Mail className="mr-2 h-4 w-4" />
                                                    Send Message
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => handleUpdateStatus(application)}>
                                                    <Edit className="mr-2 h-4 w-4" />
                                                    Update Status
                                                </DropdownMenuItem>
                                                {/* <DropdownMenuItem onClick={() => handleEditApplication(application)}>
                                                    <Edit className="mr-2 h-4 w-4" />
                                                    Edit Application
                                                </DropdownMenuItem> */}
                                                <DropdownMenuItem onClick={() => handleDeleteApplication(application)} className="text-red-600">
                                                    <Trash2 className="mr-2 h-4 w-4" />
                                                    Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <ApplicationDetailsModal
                open={showDetailsModal}
                onOpenChange={setShowDetailsModal}
                application={selectedApplication}
            />

            <BulkActionsModal
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
            />

            {/* <CreateApplicationModal
                open={showCreateModal}
                onOpenChange={setShowCreateModal}
                onSubmit={handleCreateApplication}
            /> */}

            {/* <EditApplicationModal
                open={showEditModal}
                onOpenChange={setShowEditModal}
                application={editingApplication}
                onSubmit={handleUpdateApplication}
            /> */}

            <DeleteConfirmationModal
                open={showDeleteModal}
                onOpenChange={setShowDeleteModal}
                onConfirm={confirmDeleteApplication}
                itemName={deletingApplication?.firstName}
            />

            <ScheduleInterviewFromApplicationModal
                open={showScheduleInterviewModal}
                onOpenChange={setShowScheduleInterviewModal}
                application={selectedApplicationForAction}
                onScheduled={handleInterviewScheduled}
            />

            <UpdateStatusModal
                open={showUpdateStatusModal}
                onOpenChange={setShowUpdateStatusModal}
                application={selectedApplicationForAction}
                onStatusUpdate={handleStatusUpdated}
            />

            <SendMessageModal
                open={showSendMessageModal}
                onOpenChange={setShowSendMessageModal}
                application={selectedApplicationForAction}
                onMessageSent={handleMessageSent}
            />
        </div>
    )
}

export default ApplicationContents;