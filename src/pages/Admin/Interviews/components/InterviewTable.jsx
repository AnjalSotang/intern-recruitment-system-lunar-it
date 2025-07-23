import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
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
} from "lucide-react"


const mockInterviews = [
    {
        id: "1",
        candidateName: "Alice Johnson",
        position: "Frontend Developer Intern",
        interviewer: "John Smith",
        date: "2024-01-20",
        time: "10:00 AM",
        type: "video",
        status: "scheduled",
        meetingLink: "https://meet.google.com/abc-defg-hij",
        notes: "Technical interview focusing on React and JavaScript",
    },
    {
        id: "2",
        candidateName: "Bob Wilson",
        position: "Backend Developer Intern",
        interviewer: "Sarah Davis",
        date: "2024-01-20",
        time: "2:00 PM",
        type: "in-person",
        status: "scheduled",
        location: "Conference Room A",
        notes: "System design and coding interview",
    },
    {
        id: "3",
        candidateName: "Carol Brown",
        position: "UI/UX Designer Intern",
        interviewer: "Mike Johnson",
        date: "2024-01-19",
        time: "11:00 AM",
        type: "video",
        status: "completed",
        meetingLink: "https://meet.google.com/xyz-uvwx-yz",
        notes: "Portfolio review and design thinking discussion",
    },
    {
        id: "4",
        candidateName: "David Lee",
        position: "Data Science Intern",
        interviewer: "Emily Chen",
        date: "2024-01-19",
        time: "3:30 PM",
        type: "phone",
        status: "no-show",
        notes: "Initial screening call",
    },
    {
        id: "5",
        candidateName: "Eva Martinez",
        position: "DevOps Intern",
        interviewer: "Tom Anderson",
        date: "2024-01-18",
        time: "1:00 PM",
        type: "video",
        status: "cancelled",
        meetingLink: "https://meet.google.com/def-ghij-klm",
        notes: "Cancelled due to candidate scheduling conflict",
    },
]


const InterviewTable = ({ handleViewInterview}) => {
    const [interviews, setInterviews] = useState(mockInterviews)
    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")
    const [typeFilter, setTypeFilter] = useState("all")

    // const { toast } = useToast()



    const getStatusBadge = (status) => {
        const colors = {
            scheduled: "bg-blue-100 text-blue-800 hover:bg-blue-100",
            completed: "bg-green-100 text-green-800 hover:bg-green-100",
            cancelled: "bg-red-100 text-red-800 hover:bg-red-100",
            "no-show": "bg-orange-100 text-orange-800 hover:bg-orange-100",
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



    // const handleDeleteInterview = (id) => {
    //     setInterviews(interviews.filter((interview) => interview.id !== id))
    //     toast({
    //         title: "Interview deleted",
    //         description: "The interview has been successfully deleted.",
    //     })
    // }

    const filteredInterviews = interviews.filter((interview) => {
        const matchesSearch =
            interview.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            interview.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
            interview.interviewer.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesStatus = statusFilter === "all" || interview.status === statusFilter
        const matchesType = typeFilter === "all" || interview.type === typeFilter
        return matchesSearch && matchesStatus && matchesType
    })

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    All Interviews
                </CardTitle>
                <div
                    className='flex gap-4 items-center'>

                    <Input
                        placeholder="Search interviews..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="max-w-sm" />

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
                        {filteredInterviews.map((interview) => (
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
                                            <DropdownMenuItem>
                                                <Edit className="mr-2 h-4 w-4" />
                                                Edit Interview
                                            </DropdownMenuItem>
                                            {/* <DropdownMenuItem onClick={() => handleDeleteInterview(interview.id)} className="text-red-600"> */}
                                            <DropdownMenuItem className="text-red-600">
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
    )
}

export default InterviewTable