import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, Edit, Trash2, MoreHorizontal, ArrowUpDown } from "lucide-react"
// import { useToast } from "@/hooks/use-toast"

import { applications } from '../../../../constants';
import ApplicationDetail from "../../Application/components/DetaailModal"



const ApplicationTable = ({applicationDetail}) => {
  const [application, setApplication] = useState(applications);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortField, setSortField] = useState("appliedDate")
  const [sortDirection, setSortDirection] = useState("desc")

  const getStatusBadge = (status) => {

    const variants = {
      pending: "secondary",
      reviewing: "default",
      accepted: "default",
      rejected: "destructive",
    }

    const colors = {
      pending: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
      reviewing: "bg-blue-100 text-blue-800 hover:bg-blue-100",
      accepted: "bg-green-100 text-green-800 hover:bg-green-100",
      rejected: "bg-red-100 text-red-800 hover:bg-red-100",
    }

    return (
      <Badge variant={variants[status]} className={colors[status]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const handleDelete = (id) => {
    setApplication(application.filter((app) => app.id !== id))
    // toast({
    //   title: "Application deleted",
    //   description: "The application has been successfully deleted.",
    // })       
  }

  const filteredAndSortedApplications = application
    .filter((app) => {
      const matchesSearch =
        app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.position.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === "all" || app.status === statusFilter
      return matchesSearch && matchesStatus
    })
    .sort((a, b) => {
      const aValue = a[sortField]
      const bValue = b[sortField]
      const direction = sortDirection === "asc" ? 1 : -1

      if (aValue < bValue) return -1 * direction
      if (aValue > bValue) return 1 * direction
      return 0
    })

  // const onViewApplication = (application) => {
  //   applicationDetail(application)
  // }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Applications</CardTitle>
        <div className="flex gap-4 items-center">

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
            </SelectContent>
          </Select>


        </div>
      </CardHeader>



      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("candidateName")}
                  className="h-auto p-0 font-semibold"
                >
                  Candidate Name
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>Email</TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort("position")} className="h-auto p-0 font-semibold">
                  Position
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort("status")} className="h-auto p-0 font-semibold">
                  Status
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort("appliedDate")} className="h-auto p-0 font-semibold">
                  Applied Date
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>Experience</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSortedApplications.map((application) => (
              <TableRow key={application.id}>
                <TableCell className="font-medium">{application.name}</TableCell>
                <TableCell>{application.email}</TableCell>
                <TableCell>{application.position}</TableCell>
                <TableCell>{getStatusBadge(application.status)}</TableCell>
                <TableCell>{new Date(application.appliedDate).toLocaleDateString()}</TableCell>
                <TableCell>{application.experience}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={()=> applicationDetail(application)}>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDelete(application.id)} className="text-red-600">
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

export default ApplicationTable
