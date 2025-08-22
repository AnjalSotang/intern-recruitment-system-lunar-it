import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Bell,
  Calendar,
  MessageSquare,
  FileText,
  Users,
  Settings,
  Clock,
  CheckCircle,
  Search,
  Filter,
  MoreHorizontal,
  Trash2,
  Archive,
  Loader2,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { toast } from 'react-toastify'
import AdminLayout from "../../../layout/AdminLayout"
import { useNotificationStore } from "../../../store/NotificationStore"

const getNotificationIcon = (type) => {
  switch (type) {
    case "application":
      return <FileText className="h-5 w-5 text-blue-500" />
    case "interview":
      return <Calendar className="h-5 w-5 text-green-500" />
    case "message":
      return <MessageSquare className="h-5 w-5 text-purple-500" />
    case "team":
      return <Users className="h-5 w-5 text-orange-500" />
    case "system":
      return <Settings className="h-5 w-5 text-gray-500" />
    default:
      return <Bell className="h-5 w-5" />
  }
}

const getPriorityColor = (priority) => {
  switch (priority) {
    case "high":
      return "bg-red-100 text-red-800 border-red-200"
    case "medium":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    case "low":
      return "bg-green-100 text-green-800 border-green-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

// Skeleton component for loading notifications
const NotificationSkeleton = () => (
  <Card className="transition-all">
    <CardContent className="p-4">
      <div className="flex items-start gap-4">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="flex-1 min-w-0 space-y-2">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-2 w-2 rounded-full" />
              <Skeleton className="h-5 w-16 rounded" />
            </div>
            <Skeleton className="h-8 w-8" />
          </div>
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-20" />
        </div>
      </div>
    </CardContent>
  </Card>
)

const NotificationsPageContent = () => {
  const {
    notifications,
    loading,
    error,
    message,
    unreadCount,
    pagination,
    fetchNotifications,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    optimisticMarkAsRead,
    optimisticDelete,
    clearError,
    clearMessage
  } = useNotificationStore()

  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [actionLoading, setActionLoading] = useState({})
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  // Fetch notifications on component mount and when filters change
  useEffect(() => {
    const filters = {
      page: currentPage,
      limit: itemsPerPage
    }

    if (activeTab !== "all") {
      filters.type = activeTab
    }

    if (searchQuery.trim()) {
      // Reset to first page when searching
      setCurrentPage(1)
      filters.page = 1
    }

    fetchNotifications(filters)
  }, [activeTab, currentPage, itemsPerPage, fetchNotifications])

  // Separate useEffect for search with debouncing
  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentPage !== 1) {
        setCurrentPage(1) // Reset to first page when searching
      } else {
        // Only fetch if we're already on page 1
        const filters = {
          page: 1,
          limit: itemsPerPage
        }

        if (activeTab !== "all") {
          filters.type = activeTab
        }

        fetchNotifications(filters)
      }
    }, 500) // 500ms debounce

    return () => clearTimeout(timer)
  }, [searchQuery, activeTab, itemsPerPage, fetchNotifications])

  // Handle toast notifications for success/error messages
  useEffect(() => {
    if (message) {
      toast.success(message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
      clearMessage()
    }
  }, [message, clearMessage])

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
      clearError()
    }
  }, [error, clearError])

  const handleMarkAsRead = async (id) => {
    if (actionLoading[id]) return

    setActionLoading(prev => ({ ...prev, [id]: true }))
    optimisticMarkAsRead(id) // Immediate UI update

    try {
      await markAsRead(id)
    } catch (error) {
      console.error('Failed to mark as read:', error)
    } finally {
      setActionLoading(prev => ({ ...prev, [id]: false }))
    }
  }

  const handleMarkAllAsRead = async () => {
    if (actionLoading.markAll) return

    setActionLoading(prev => ({ ...prev, markAll: true }))

    try {
      await markAllAsRead()
    } catch (error) {
      console.error('Failed to mark all as read:', error)
    } finally {
      setActionLoading(prev => ({ ...prev, markAll: false }))
    }
  }

  const handleDeleteNotification = async (id) => {
    if (actionLoading[id]) return

    setActionLoading(prev => ({ ...prev, [id]: true }))
    optimisticDelete(id) // Immediate UI update

    try {
      await deleteNotification(id)
    } catch (error) {
      console.error('Failed to delete notification:', error)
    } finally {
      setActionLoading(prev => ({ ...prev, [id]: false }))
    }
  }

  const handleTabChange = (newTab) => {
    setActiveTab(newTab)
    setCurrentPage(1) // Reset to first page when changing tabs
  }

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.pages) {
      setCurrentPage(newPage)
    }
  }

  const handleItemsPerPageChange = (newLimit) => {
    setItemsPerPage(newLimit)
    setCurrentPage(1) // Reset to first page when changing items per page
  }

  // Group notifications by date (server already handles filtering)
  const groupedNotifications = notifications.reduce((groups, notification) => {
    // Format date for grouping
    const notificationDate = new Date(notification.date)
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    let dateKey
    if (notificationDate.toDateString() === today.toDateString()) {
      dateKey = "Today"
    } else if (notificationDate.toDateString() === yesterday.toDateString()) {
      dateKey = "Yesterday"
    } else {
      dateKey = notificationDate.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }

    if (!groups[dateKey]) {
      groups[dateKey] = []
    }

    groups[dateKey].push(notification)
    return groups
  }, {})

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
            <p className="text-muted-foreground">Stay updated with all your recruitment activities</p>
          </div>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <Button
                onClick={handleMarkAllAsRead}
                variant="outline"
                disabled={actionLoading.markAll}
              >
                {actionLoading.markAll ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <CheckCircle className="h-4 w-4 mr-2" />
                )}
                Mark all as read ({unreadCount})
              </Button>
            )}
          </div>
        </div>

        {/* Search and Filter */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search notifications..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={handleTabChange}>
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="all" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              All
            </TabsTrigger>
            <TabsTrigger value="application" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Applications
            </TabsTrigger>
            <TabsTrigger value="interview" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Interviews
            </TabsTrigger>
            <TabsTrigger value="message" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Messages
            </TabsTrigger>
            <TabsTrigger value="team" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Team
            </TabsTrigger>
            <TabsTrigger value="system" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              System
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-4">
            {/* Loading State */}
            {loading && (
              <div className="space-y-4">
                {[...Array(5)].map((_, index) => (
                  <NotificationSkeleton key={index} />
                ))}
              </div>
            )}

            {/* Error State */}
            {error && !loading && (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
                    <Bell className="h-6 w-6 text-red-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Failed to load notifications</h3>
                  <p className="text-gray-500 text-center mb-4">{error}</p>
                  <Button onClick={() => fetchNotifications()} variant="outline">
                    Try Again
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Empty State */}
            {!loading && !error && notifications.length === 0 && (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Bell className="h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No notifications found</h3>
                  <p className="text-gray-500 text-center">
                    {searchQuery ? "Try adjusting your search terms" : "You're all caught up!"}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Notifications List */}
            {!loading && !error && notifications.length > 0 && (
              <>
                {Object.entries(groupedNotifications).map(([date, dateNotifications]) => (
                  <div key={date} className="space-y-3">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-sm text-gray-600">{date}</h3>
                      <Separator className="flex-1" />
                    </div>

                    <div className="space-y-2">
                      {dateNotifications.map((notification) => (
                        <Card
                          key={notification._id}
                          className={`transition-all hover:shadow-md cursor-pointer ${!notification.read ? "border-l-4 border-l-blue-500 bg-blue-50/30" : ""
                            }`}
                          onClick={() => {
                            handleMarkAsRead(notification._id)
                            // if (notification.actionUrl) {
                            //   window.location.href = notification.actionUrl
                            // }
                          }}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-start gap-4">
                              <div className="flex-shrink-0">
                                {notification.avatar ? (
                                  <Avatar className="h-10 w-10">
                                    <AvatarImage src={notification.avatar || "/placeholder.svg"} />
                                    <AvatarFallback>{notification.title.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                ) : (
                                  <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                                    {getNotificationIcon(notification.type)}
                                  </div>
                                )}
                              </div>

                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-2">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <h4 className="font-semibold text-gray-900">{notification.title}</h4>
                                    {!notification.read && (
                                      <div className="h-2 w-2 bg-blue-500 rounded-full flex-shrink-0" />
                                    )}
                                    <Badge
                                      variant="outline"
                                      className={`text-xs ${getPriorityColor(notification.priority)}`}
                                    >
                                      {notification.priority}
                                    </Badge>
                                  </div>

                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 flex-shrink-0"
                                        onClick={(e) => e.stopPropagation()}
                                        disabled={actionLoading[notification._id]}
                                      >
                                        {actionLoading[notification._id] ? (
                                          <Loader2 className="h-4 w-4 animate-spin" />
                                        ) : (
                                          <MoreHorizontal className="h-4 w-4" />
                                        )}
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      {!notification.read && (
                                        <DropdownMenuItem
                                          onClick={(e) => {
                                            e.stopPropagation()
                                            handleMarkAsRead(notification._id)
                                          }}
                                          disabled={actionLoading[notification._id]}
                                        >
                                          <CheckCircle className="h-4 w-4 mr-2" />
                                          Mark as read
                                        </DropdownMenuItem>
                                      )}
                                      <DropdownMenuItem>
                                        <Archive className="h-4 w-4 mr-2" />
                                        Archive
                                      </DropdownMenuItem>
                                      <DropdownMenuItem
                                        className="text-red-600"
                                        onClick={(e) => {
                                          e.stopPropagation()
                                          handleDeleteNotification(notification._id)
                                        }}
                                        disabled={actionLoading[notification._id]}
                                      >
                                        <Trash2 className="h-4 w-4 mr-2" />
                                        Delete
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </div>

                                <p className="text-sm text-gray-600 mt-1 leading-relaxed">{notification.message}</p>

                                <div className="flex items-center gap-1 mt-2">
                                  <Clock className="h-3 w-3 text-gray-400" />
                                  <span className="text-xs text-gray-400">{notification.time}</span>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                ))}

                {/* Pagination Controls */}
                {pagination && pagination.pages > 1 && (
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <p className="text-sm text-gray-600">
                            Showing {((pagination.current - 1) * pagination.limit) + 1} to{' '}
                            {Math.min(pagination.current * pagination.limit, pagination.total)} of{' '}
                            {pagination.total} notifications
                          </p>

                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">Show:</span>
                            <select
                              value={itemsPerPage}
                              onChange={(e) => handleItemsPerPageChange(parseInt(e.target.value))}
                              className="border rounded px-2 py-1 text-sm"
                            >
                              <option value={5}>5</option>
                              <option value={10}>10</option>
                              <option value={20}>20</option>
                              <option value={50}>50</option>
                            </select>
                            <span className="text-sm text-gray-600">per page</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          {/* First Page */}
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handlePageChange(1)}
                            disabled={pagination.current === 1}
                          >
                            <ChevronsLeft className="h-4 w-4" />
                          </Button>

                          {/* Previous Page */}
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handlePageChange(pagination.current - 1)}
                            disabled={pagination.current === 1}
                          >
                            <ChevronLeft className="h-4 w-4" />
                          </Button>

                          {/* Page Numbers */}
                          <div className="flex items-center gap-1">
                            {(() => {
                              const pages = [];
                              const current = pagination.current;
                              const total = pagination.pages;

                              // Show first page
                              if (current > 3) {
                                pages.push(
                                  <Button
                                    key={1}
                                    variant={1 === current ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => handlePageChange(1)}
                                  >
                                    1
                                  </Button>
                                );
                                if (current > 4) {
                                  pages.push(<span key="ellipsis1" className="px-2">...</span>);
                                }
                              }

                              // Show current page and neighbors
                              const start = Math.max(1, current - 1);
                              const end = Math.min(total, current + 1);

                              for (let i = start; i <= end; i++) {
                                pages.push(
                                  <Button
                                    key={i}
                                    variant={i === current ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => handlePageChange(i)}
                                  >
                                    {i}
                                  </Button>
                                );
                              }

                              // Show last page
                              if (current < total - 2) {
                                if (current < total - 3) {
                                  pages.push(<span key="ellipsis2" className="px-2">...</span>);
                                }
                                pages.push(
                                  <Button
                                    key={total}
                                    variant={total === current ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => handlePageChange(total)}
                                  >
                                    {total}
                                  </Button>
                                );
                              }

                              return pages;
                            })()}
                          </div>

                          {/* Next Page */}
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handlePageChange(pagination.current + 1)}
                            disabled={pagination.current === pagination.pages}
                          >
                            <ChevronRight className="h-4 w-4" />
                          </Button>

                          {/* Last Page */}
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handlePageChange(pagination.pages)}
                            disabled={pagination.current === pagination.pages}
                          >
                            <ChevronsRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}

export default NotificationsPageContent