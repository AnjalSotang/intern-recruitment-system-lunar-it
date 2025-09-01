import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    ArrowUpDown,
    Calendar,
    ChevronLeft,
    ChevronRight,
    Edit,
    Eye,
    Mail,
    MoreHorizontal,
    Trash2,
} from "lucide-react"
import SkeletonTable from "./SkeletonTable"
import { useState } from "react"

const ApplicationTable = ({
    applications,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    departmentFilter,
    setDepartmentFilter,
    priorityFilter,
    setPriorityFilter,
    sortField,
    sortDirection,
    activeTab,
    setActiveTab,
    selectedApplications,
    filteredApplications,
    handleSort,
    handleViewApplication,
    handleDropdownAction,
    getTabCount
}) => {

      const [currentPage, setCurrentPage] = useState(1)
      const [itemsPerPage, setItemsPerPage] = useState(5)
    
      // Calculate pagination - FIXED: using 'applications' instead of 'allApplications'
      const totalItems = applications.length
      const totalPages = Math.ceil(totalItems / itemsPerPage)
      const startIndex = (currentPage - 1) * itemsPerPage
      const endIndex = startIndex + itemsPerPage
      const currentApplications = filteredApplications.slice(startIndex, endIndex)
    
      const handlePageChange = (page) => {
        setCurrentPage(page)
      }
    
      const handleItemsPerPageChange = (value) => {
        setItemsPerPage(Number.parseInt(value))
        setCurrentPage(1) // Reset to first page when changing items per page
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

    return (
        <div className="space-y-4">
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
                        <AlertTitle>Error loading applications</AlertTitle>
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
                        <h3 className="mt-4 text-lg font-medium">No applications found</h3>
                        <p className="mt-2">Try adjusting your filters or check back later for new applications.</p>
                    </div>
                ) : (
                    <Table>
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
                                currentApplications.map((application) => (
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

export default ApplicationTable