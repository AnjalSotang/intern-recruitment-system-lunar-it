import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  MessageSquare,
  Search,
  MoreHorizontal,
  Eye,
  Reply,
  Archive,
  Trash2,
  AlertCircle,
  Clock,
  CheckCircle,
} from "lucide-react"
import { MessageDetailsModal } from "./components/MessageDetailsModal"
import { ReplyMessageModal } from "./components/ReplyMessageModal"
import { DeleteMessageModal } from "./components/DeleteMessageModal"
import { useContactStore } from "../../../store/MessagesStore"
import { toast } from "react-toastify"



// interface ContactMessage {
//   id: string
//   firstName: string
//   lastName: string
//   email: string
//   phone?: string
//   subject: string
//   message: string
//   status: "new" | "read" | "replied" | "archived"
//   priority: "high" | "medium" | "low"
//   createdAt: string
//   readAt?: string
//   repliedAt?: string
// }

// const mockMessages = [
//   {
//     id: "1",
//     firstName: "Sarah",
//     lastName: "Johnson",
//     email: "sarah.johnson@email.com",
//     phone: "+1 (555) 123-4567",
//     subject: "internship",
//     message:
//       "Hi, I'm interested in applying for the Frontend Developer internship position. Could you please provide more information about the application process and requirements?",
//     status: "new",
//     priority: "high",
//     createdAt: "2024-01-15T10:30:00Z",
//   },
//   {
//     id: "2",
//     firstName: "Michael",
//     lastName: "Chen",
//     email: "michael.chen@email.com",
//     phone: "+1 (555) 987-6543",
//     subject: "partnership",
//     message:
//       "Hello, I represent TechCorp and we're interested in exploring partnership opportunities with your internship program. We'd like to discuss potential collaboration.",
//     status: "read",
//     priority: "medium",
//     createdAt: "2024-01-14T14:20:00Z",
//     readAt: "2024-01-14T15:00:00Z",
//   },
//   {
//     id: "3",
//     firstName: "Emily",
//     lastName: "Davis",
//     email: "emily.davis@email.com",
//     subject: "services",
//     message:
//       "I'm a career counselor and would like to know more about your internship placement services for my students. What programs do you offer?",
//     status: "replied",
//     priority: "medium",
//     createdAt: "2024-01-13T09:15:00Z",
//     readAt: "2024-01-13T10:00:00Z",
//     repliedAt: "2024-01-13T11:30:00Z",
//   },
//   {
//     id: "4",
//     firstName: "David",
//     lastName: "Wilson",
//     email: "david.wilson@email.com",
//     phone: "+1 (555) 456-7890",
//     subject: "careers",
//     message:
//       "I'm looking for full-time career opportunities after completing my internship. Do you have any permanent positions available?",
//     status: "archived",
//     priority: "low",
//     createdAt: "2024-01-12T16:45:00Z",
//     readAt: "2024-01-12T17:00:00Z",
//     repliedAt: "2024-01-12T18:15:00Z",
//   },
//   {
//     id: "5",
//     firstName: "Lisa",
//     lastName: "Anderson",
//     email: "lisa.anderson@email.com",
//     subject: "general",
//     message:
//       "I have some questions about the internship program timeline and the application deadlines. When is the best time to apply?",
//     status: "new",
//     priority: "medium",
//     createdAt: "2024-01-11T11:20:00Z",
//   },
// ]

const subjectLabels = {
  internship: "Internship Inquiry",
  partnership: "Partnership Opportunity",
  services: "Service Information",
  careers: "Career Opportunities",
  general: "General Inquiry",
}

const statusColors = {
  new: "bg-blue-100 text-blue-800",
  read: "bg-yellow-100 text-yellow-800",
  replied: "bg-green-100 text-green-800",
  archived: "bg-gray-100 text-gray-800",
}

const priorityColors = {
  high: "text-red-600",
  medium: "text-yellow-600",
  low: "text-green-600",
}

export function MessagesPageContent() {
  const { messages: msg, fetchMessages, updateMessageStatus, error, loading, status, message} = useContactStore();
  const [messages, setMessages] = useState(msg)
  const [selectedTab, setSelectedTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [subjectFilter, setSubjectFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [selectedMessage, setSelectedMessage] = useState(null)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [showReplyModal, setShowReplyModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  // Filter messages based on tab, search, and subject
  const filteredMessages = messages.filter((message) => {
    const matchesTab = selectedTab === "all" || message.status === selectedTab
    const matchesSearch =
      message.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.message.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesSubject = subjectFilter === "all" || message.subject === subjectFilter

    return matchesTab && matchesSearch && matchesSubject
  })

  // Pagination
  const totalPages = Math.ceil(filteredMessages.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedMessages = filteredMessages.slice(startIndex, startIndex + itemsPerPage)

  // Count messages by status
  const statusCounts = {
    all: messages.length,
    new: messages.filter((m) => m.status === "new").length,
    read: messages.filter((m) => m.status === "read").length,
    replied: messages.filter((m) => m.status === "replied").length,
    archived: messages.filter((m) => m.status === "archived").length,
  }

  const handleViewMessage = (message) => {
    setSelectedMessage(message)
    setShowDetailsModal(true)

    // Mark as read if it's new
    if (message.status === "new") {
      setMessages((prev) =>
        prev.map((m) => (m._id === message._id ? { ...m, status: "read", readAt: new Date().toISOString() } : m)),
      )
      // Optionally, make an API call to update status on the server
      updateMessageStatus(message._id, "read")
    }
  }

  const handleReplyMessage = (message) => {
    setSelectedMessage(message)
    setShowReplyModal(true)
  }

  const handleDeleteMessage = (message) => {
    setSelectedMessage(message)
    setShowDeleteModal(true)
    
  }

  const handleArchiveMessage = (message) => {
    setMessages((prev) => prev.map((m) => (m._id === message._id ? { ...m, status: "archived"} : m)))
    updateMessageStatus(message._id, "archived")
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)

    if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`
    } else if (diffInHours < 168) {
      return `${Math.floor(diffInHours / 24)}d ago`
    } else {
      return date.toLocaleDateString()
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "new":
        return <AlertCircle className="h-4 w-4" />
      case "read":
        return <Clock className="h-4 w-4" />
      case "replied":
        return <CheckCircle className="h-4 w-4" />
      case "archived":
        return <Archive className="h-4 w-4" />
      default:
        return null
    }
  }

  useEffect(() => {
    fetchMessages();
  }, [])

  useEffect(() => {
  setMessages(msg || []);
}, [msg]);

useEffect(() => {
  if (error) {
    toast.error(error);
  } else if (status >= 200 && status < 300) {
    toast.success(message);
  }
}, [error, message, status]);


  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Contact Messages</h1>
          <p className="text-muted-foreground mt-2">Manage and respond to messages from users</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Messages
          </CardTitle>
          <CardDescription>View and manage all contact form submissions</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="all" className="flex items-center gap-2">
                All ({statusCounts.all})
              </TabsTrigger>
              <TabsTrigger value="new" className="flex items-center gap-2">
                New ({statusCounts.new})
              </TabsTrigger>
              <TabsTrigger value="read" className="flex items-center gap-2">
                Read ({statusCounts.read})
              </TabsTrigger>
              <TabsTrigger value="replied" className="flex items-center gap-2">
                Replied ({statusCounts.replied})
              </TabsTrigger>
              <TabsTrigger value="archived" className="flex items-center gap-2">
                Archived ({statusCounts.archived})
              </TabsTrigger>
            </TabsList>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search messages..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={subjectFilter} onValueChange={setSubjectFilter}>
                <SelectTrigger className="w-full sm:w-[200px]">
                  <SelectValue placeholder="Filter by subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subjects</SelectItem>
                  <SelectItem value="internship">Internship Inquiry</SelectItem>
                  <SelectItem value="partnership">Partnership</SelectItem>
                  <SelectItem value="services">Services</SelectItem>
                  <SelectItem value="careers">Careers</SelectItem>
                  <SelectItem value="general">General</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <TabsContent value={selectedTab} className="space-y-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Sender</TableHead>
                      <TableHead className="hidden md:table-cell">Subject</TableHead>
                      <TableHead className="hidden lg:table-cell">Message Preview</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="hidden sm:table-cell">Priority</TableHead>
                      <TableHead className="hidden md:table-cell">Date</TableHead>
                      <TableHead className="w-[50px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedMessages.map((message) => (
                      <TableRow
                        key={message._id}
                        className={`cursor-pointer hover:bg-muted/50 ${message.status === "new" ? "bg-blue-50" : ""}`}
                        onClick={() => handleViewMessage(message)}
                      >
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src="/placeholder.svg" />
                              <AvatarFallback className="text-xs">
                                {message.firstName[0]}
                                {message.lastName[0]}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">
                                {message.firstName} {message.lastName}
                              </div>
                              <div className="text-sm text-muted-foreground">{message.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <Badge variant="outline">
                            {subjectLabels[message.subject]}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          <div className="max-w-[300px] truncate text-sm text-muted-foreground">{message.message}</div>
                        </TableCell>
                        <TableCell>
                          <Badge className={statusColors[message.status]}>
                            <div className="flex items-center gap-1">
                              {getStatusIcon(message.status)}
                              {message.status.charAt(0).toUpperCase() + message.status.slice(1)}
                            </div>
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          <div className={`font-medium ${priorityColors[message.priority]}`}>
                            {message.priority.charAt(0).toUpperCase() + message.priority.slice(1)}
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <div className="text-sm text-muted-foreground">{formatDate(message.createdAt)}</div>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleViewMessage(message)
                                }}
                              >
                                <Eye className="h-4 w-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleReplyMessage(message)
                                }}
                              >
                                <Reply className="h-4 w-4 mr-2" />
                                Reply
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleArchiveMessage(message)
                                }}
                              >
                                <Archive className="h-4 w-4 mr-2" />
                                Archive
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleDeleteMessage(message)
                                }}
                                className="text-red-600"
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>Show</span>
                  <Select
                    value={itemsPerPage.toString()}
                    onValueChange={(value) => {
                      setItemsPerPage(Number(value))
                      setCurrentPage(1)
                    }}
                  >
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
                  <span>of {filteredMessages.length} messages</span>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNumber
                      if (totalPages <= 5) {
                        pageNumber = i + 1
                      } else if (currentPage <= 3) {
                        pageNumber = i + 1
                      } else if (currentPage >= totalPages - 2) {
                        pageNumber = totalPages - 4 + i
                      } else {
                        pageNumber = currentPage - 2 + i
                      }

                      return (
                        <Button
                          key={pageNumber}
                          variant={currentPage === pageNumber ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCurrentPage(pageNumber)}
                          className="w-8 h-8 p-0"
                        >
                          {pageNumber}
                        </Button>
                      )
                    })}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Modals */}
      {selectedMessage && (
        <>
          <MessageDetailsModal
            message={selectedMessage}
            open={showDetailsModal}
            onOpenChange={setShowDetailsModal}
            onReply={() => {
              setShowDetailsModal(false)
              setShowReplyModal(true)
            }}
            onArchive={() => {
              handleArchiveMessage(selectedMessage)
              setShowDetailsModal(false)
            }}
          />
          <ReplyMessageModal
            message={selectedMessage}
            open={showReplyModal}
            onOpenChange={setShowReplyModal}
            loading={loading}
            onSent={() => {
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === selectedMessage.id
                    ? { ...m, status: "replied", repliedAt: new Date().toISOString() }
                    : m,
                ),
              )
              setShowReplyModal(false)
            }}
          />
          <DeleteMessageModal
            message={selectedMessage}
            open={showDeleteModal}
            onOpenChange={setShowDeleteModal}

            onDeleted={() => {
              setMessages((prev) => prev.filter((m) => m.id !== selectedMessage.id))
              setShowDeleteModal(false)
              
            }}
          />
        </>
      )}
    </div>
  )
}
