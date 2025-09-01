import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
    Calendar,
    Clock,
    Video,
    MapPin,
    Plus,
    MoreHorizontal,
    Edit,
    Trash2,
    Eye,
    Users,
    CheckCircle,
    XCircle,
    AlertCircle,
    Camera,
    ChevronRight,
    ChevronLeft,
} from "lucide-react"
import { useInterviewStore } from "../../../../store/InterviewStore"
// import { toast, ToastContainer } from "react-toastify"
import SkeletonRows from "./SkeletonRows"

// const mockInterviews = [
//     {
//         id: "1",
//         candidateName: "Alice Johnson",
//         position: "Frontend Developer Intern",
//         interviewer: "John Smith",
//         date: "2024-01-20",
//         time: "10:00 AM",
//         type: "video",
//         status: "scheduled",
//         meetingLink: "https://meet.google.com/abc-defg-hij",
//         notes: "Technical interview focusing on React and JavaScript",
//     },
//     {
//         id: "2",
//         candidateName: "Bob Wilson",
//         position: "Backend Developer Intern",
//         interviewer: "Sarah Davis",
//         date: "2024-01-20",
//         time: "2:00 PM",
//         type: "in-person",
//         status: "scheduled",
//         location: "Conference Room A",
//         notes: "System design and coding interview",
//     },
//     {
//         id: "3",
//         candidateName: "Carol Brown",
//         position: "UI/UX Designer Intern",
//         interviewer: "Mike Johnson",
//         date: "2024-01-19",
//         time: "11:00 AM",
//         type: "video",
//         status: "completed",
//         meetingLink: "https://meet.google.com/xyz-uvwx-yz",
//         notes: "Portfolio review and design thinking discussion",
//     },
//     {
//         id: "4",
//         candidateName: "David Lee",
//         position: "Data Science Intern",
//         interviewer: "Emily Chen",
//         date: "2024-01-19",
//         time: "3:30 PM",
//         type: "phone",
//         status: "no-show",
//         notes: "Initial screening call",
//     },
//     {
//         id: "5",
//         candidateName: "Eva Martinez",
//         position: "DevOps Intern",
//         interviewer: "Tom Anderson",
//         date: "2024-01-18",
//         time: "1:00 PM",
//         type: "video",
//         status: "cancelled",
//         meetingLink: "https://meet.google.com/def-ghij-klm",
//         notes: "Cancelled due to candidate scheduling conflict",
//     },
// ]

const InterviewTable = ({ handleViewInterview, handleSetSelectedInterview, interviews, modalTriggers }) => {
    // const [interviews, setInterviews] = useState(mockInterviews)
    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")
    const [typeFilter, setTypeFilter] = useState("all")

    
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(5)

//    const scheduleInterview = useInterviewStore(state => state.scheduleInterview)
    const loading = useInterviewStore(state => state.loading)
    const error = useInterviewStore(state => state.error)
    // const status = useInterviewStore(state => state.status)
    // const message = useInterviewStore(state => state.message)

    const getStatusBadge = (status) => {
        const colors = {
            scheduled: "bg-blue-100 text-blue-800 hover:bg-blue-100",
            completed: "bg-green-100 text-green-800 hover:bg-green-100",
            cancelled: "bg-red-100 text-red-800 hover:bg-red-100",
            no_show: "bg-orange-100 text-orange-800 hover:bg-orange-100",
        }

        return (
            <Badge className={colors[status]}>
                {status === "no-show" ? "No Show" : status.charAt(0).toUpperCase() + status.slice(1)}
            </Badge>
        )
    }

    const getTypeIcon = (type) => {
        switch (type) {
            case "video":
                return <Video className="h-4 w-4" />
            case "phone":
                return <Clock className="h-4 w-4" />
            case "in-person":
                return <MapPin className="h-4 w-4" />
            default:
                return null
        }
    }

    const handleDropdownAction = (action, interview) => {
        // Set the selected interview without opening details modal
        handleSetSelectedInterview(interview)
        
        // Then trigger the appropriate modal
        switch (action) {
            case 'edit':
                modalTriggers?.openEditModal()
                break
            case 'reschedule':
                modalTriggers?.openRescheduleModal()
                break
            case 'start':
                modalTriggers?.openStartModal()
                break
            case 'cancel':
                modalTriggers?.openCancelModal()
                break
            default:
                break
        }
    }

    const filteredInterviews = interviews.filter((interview) => {
        const matchesSearch =
            interview.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            interview.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
            interview.interviewer.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesStatus = statusFilter === "all" || interview.status === statusFilter
        const matchesType = typeFilter === "all" || interview.type === typeFilter
        return matchesSearch && matchesStatus && matchesType
    })


  // Calculate pagination - FIXED: using 'applications' instead of 'allApplications'
  const totalItems = interviews.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentApplications = filteredInterviews.slice(startIndex, endIndex)

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const handleItemsPerPageChange = (value) => {
    setItemsPerPage(Number.parseInt(value))
    setCurrentPage(1) // Reset to first page when changing items per page
  }


   



    return (
    <div className="space-y-4">
         <Card>
            <CardHeader>
                <CardTitle>
                    All Interviews
                </CardTitle>
                <div className='flex gap-4 items-center'>
                    <Input
                        placeholder="Search interviews..."
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
                            <SelectItem value="scheduled">Scheduled</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                            <SelectItem value="no-show">No Show</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select value={typeFilter} onValueChange={setTypeFilter}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Filter by type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Types</SelectItem>
                            <SelectItem value="video">Video</SelectItem>
                            <SelectItem value="phone">Phone</SelectItem>
                            <SelectItem value="in-person">In-Person</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </CardHeader>

            <CardContent>
                {error ? (
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Error loading interviews</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                ) : interviews.length === 0 ? (
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
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Candidate</TableHead>
                                <TableHead>Position</TableHead>
                                <TableHead>Interviewer</TableHead>
                                <TableHead>Date & Time</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <SkeletonRows rows={5} />
                            ) : (
                                currentApplications.map((interview) => (
                                    <TableRow key={interview.id}>
                                        <TableCell className="font-medium">{interview.candidateName}</TableCell>
                                        <TableCell>{interview.position}</TableCell>
                                        <TableCell>{interview.interviewer}</TableCell>
                                        <TableCell>
                                            <div className="flex flex-col">
                                                <span>{new Date(interview.date).toLocaleDateString()}</span>
                                                <span className="text-sm text-muted-foreground">{interview.time}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                {getTypeIcon(interview.type)}
                                                <span className="capitalize">{interview.type}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>{getStatusBadge(interview.status)}</TableCell>
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem onClick={() => handleViewInterview(interview)}>
                                                        <Eye className="mr-2 h-4 w-4" />
                                                        View Details
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => handleDropdownAction('edit', interview)}>
                                                        <Edit className="mr-2 h-4 w-4" />
                                                        Edit Types and Status
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => handleDropdownAction('reschedule', interview)}>
                                                        <Calendar className="mr-2 h-4 w-4" />
                                                        Reschedule Interview
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem 
                                                        onClick={() => handleDropdownAction('start', interview)}
                                                        disabled={interview.status !== "scheduled"}
                                                    >
                                                        <Camera className="mr-2 h-4 w-4" />
                                                        Start Interview
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem 
                                                        className="text-red-600"
                                                        onClick={() => handleDropdownAction('cancel', interview)}
                                                    >
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
                    </Table>
                )}
            </CardContent>
            <CardContent>
                  {/* Pagination Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
        <div className="flex items-center space-x-2">
          <p className="text-sm text-muted-foreground">Show</p>
          <Select value={itemsPerPage.toString()} onValueChange={handleItemsPerPageChange}>
            <SelectTrigger className="w-[70px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-sm text-muted-foreground">of {totalItems} entries</p>
        </div>

        <div className="flex items-center space-x-2">
          <p className="text-sm text-muted-foreground">
            Showing {startIndex + 1} to {Math.min(endIndex, totalItems)} of {totalItems} entries
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="h-8 w-8 p-0"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <div className="flex items-center space-x-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
              // Show first page, last page, current page, and pages around current page
              if (page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
                return (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => handlePageChange(page)}
                    className="h-8 w-8 p-0"
                  >
                    {page}
                  </Button>
                )
              } else if (page === currentPage - 2 || page === currentPage + 2) {
                return (
                  <span key={page} className="px-2 text-sm text-muted-foreground">
                    ...
                  </span>
                )
              }
              return null
            })}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="h-8 w-8 p-0"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
            </CardContent>
        </Card>

      
    </div>
       
    )
}

export default InterviewTable