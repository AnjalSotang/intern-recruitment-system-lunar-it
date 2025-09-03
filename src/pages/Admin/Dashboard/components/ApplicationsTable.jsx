import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Eye, MoreHorizontal, ChevronLeft, ChevronRight } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"


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

export function ApplicationsTable({ onViewApplication, applications }) {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(5)

  // Calculate pagination - FIXED: using 'applications' instead of 'allApplications'
  const totalItems = applications.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentApplications = applications.slice(startIndex, endIndex)

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const handleItemsPerPageChange = (value) => {
    setItemsPerPage(Number.parseInt(value))
    setCurrentPage(1) // Reset to first page when changing items per page
  }

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px] sm:w-[300px]">Candidate</TableHead>
              <TableHead className="hidden sm:table-cell">Position</TableHead>
              <TableHead className="hidden md:table-cell">Department</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden lg:table-cell">Applied Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* FIXED: using 'currentApplications' instead of 'applications' */}
            {currentApplications.map((application) => {
              // Combine firstName and lastName safely
              const fullName =
                [application.firstName, application.lastName].filter(Boolean).join(" ") ||
                application.name ||
                "Unknown";

              return (
                <TableRow key={application._id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
                        <AvatarImage
                          src={application.avatar || "/placeholder.svg"}
                          alt={fullName}
                        />
                        <AvatarFallback>
                          {[application.firstName, application.lastName]
                            .filter(Boolean)
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase() || "?"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-medium truncate">
                          {fullName}
                        </div>
                        <div className="text-sm text-gray-500 truncate">{application.email}</div>
                        <div className="sm:hidden text-xs text-gray-400 mt-1 truncate">
                          {application.positionTitle}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <div className="text-sm max-w-[200px] truncate">
                      {application.positionTitle}
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge variant="outline" className="text-xs">
                      {application.department}
                    </Badge>
                  </TableCell>
                  <TableCell>{getStatusBadge(application.status)}</TableCell>

                  <TableCell className="hidden lg:table-cell text-sm text-gray-500">
                    {new Date(application.appliedDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onViewApplication(application)}
                        className="h-8 w-8 p-0 hover:bg-blue-50 hover:text-blue-600"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

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
    </div>
  )
} 
