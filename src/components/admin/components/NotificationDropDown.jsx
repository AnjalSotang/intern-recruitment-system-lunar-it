import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
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
  Loader2,
  AlertCircle,
  RefreshCw
} from "lucide-react"
import { Link } from "react-router-dom"
import { toast } from 'react-toastify'
import { useNotificationStore } from "../../../store/NotificationStore"

const getNotificationIcon = (type) => {
  switch (type) {
    case "application":
      return <FileText className="h-4 w-4 text-blue-500" />
    case "interview":
      return <Calendar className="h-4 w-4 text-green-500" />
    case "message":
      return <MessageSquare className="h-4 w-4 text-purple-500" />
    case "team":
      return <Users className="h-4 w-4 text-orange-500" />
    case "system":
      return <Settings className="h-4 w-4 text-gray-500" />
    default:
      return <Bell className="h-4 w-4" />
  }
}

// Skeleton component for loading notifications in dropdown
const NotificationItemSkeleton = () => (
  <div className="flex items-start gap-3 p-3 rounded-lg">
    <Skeleton className="h-8 w-8 rounded-full" />
    <div className="flex-1 min-w-0 space-y-1">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-1/2" />
    </div>
  </div>
)

export default function NotificationsDropdown() {
  const {
    notifications,
    loading,
    error,
    message,
    unreadCount,
    fetchNotifications,
    markAsRead,
    markAllAsRead,
    optimisticMarkAsRead,
    clearError,
    clearMessage,
    fetchUnreadCount
  } = useNotificationStore()

  const [isOpen, setIsOpen] = useState(false)
  const [actionLoading, setActionLoading] = useState({})
  const [lastFetch, setLastFetch] = useState(null)



  // Fetch notifications when dropdown opens or periodically
  useEffect(() => {
    if (isOpen) {
      // Fetch latest notifications when dropdown opens
      fetchNotifications({ limit: 10 }) // Only get first 10 for dropdown
      setLastFetch(new Date())
    }
  }, [isOpen, fetchNotifications])


useEffect(() => {
 const timeoutId = setTimeout(() => {
    if (!isOpen) {
      fetchUnreadCount();
    }
  }, 2000);

  // Cleanup function: clears the timeout if dependencies change or component unmounts
  return () => clearTimeout(timeoutId);
  
}, [isOpen, fetchUnreadCount]) 



  // Separate effect for isOpen-dependent logic if needed

  // Initial fetch on component mount
  useEffect(() => {
    fetchUnreadCount()
  }, [fetchUnreadCount])

  // Handle toast notifications for success/error messages
  useEffect(() => {
    if (message) {
      toast.success(message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
      clearMessage()
    }
  }, [message, clearMessage])

  useEffect(() => {
    if (error && isOpen) {
      toast.error(error, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
      clearError()
    }
  }, [error, clearError, isOpen])

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
    if (actionLoading.markAll || unreadCount === 0) return

    setActionLoading(prev => ({ ...prev, markAll: true }))

    try {
      await markAllAsRead()
    } catch (error) {
      console.error('Failed to mark all as read:', error)
    } finally {
      setActionLoading(prev => ({ ...prev, markAll: false }))
    }
  }

  const handleRefresh = async () => {
    if (actionLoading.refresh) return

    setActionLoading(prev => ({ ...prev, refresh: true }))

    try {
      await fetchNotifications({ limit: 10 })
      setLastFetch(new Date())
    } catch (error) {
      console.error('Failed to refresh notifications:', error)
    } finally {
      setActionLoading(prev => ({ ...prev, refresh: false }))
    }
  }

  // Show only first 5 notifications in dropdown
  const displayNotifications = notifications.slice(0, 5)

  const getLastFetchTime = () => {
    if (!lastFetch) return ""
    const now = new Date()
    const diffInMinutes = Math.floor((now - lastFetch) / (1000 * 60))

    if (diffInMinutes < 1) return "Just now"
    if (diffInMinutes === 1) return "1 minute ago"
    return `${diffInMinutes} minutes ago`
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
              {unreadCount > 9 ? "9+" : unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80 p-0" align="end" forceMount>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-lg">Notifications</h3>
            {lastFetch && (
              <span className="text-xs text-gray-500">
                Updated {getLastFetchTime()}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleRefresh}
              disabled={actionLoading.refresh}
              className="h-7 w-7"
            >
              {actionLoading.refresh ? (
                <Loader2 className="h-3 w-3 animate-spin" />
              ) : (
                <RefreshCw className="h-3 w-3" />
              )}
            </Button>
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleMarkAllAsRead}
                disabled={actionLoading.markAll}
                className="text-xs text-blue-600 hover:text-blue-700"
              >
                {actionLoading.markAll ? (
                  <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                ) : null}
                Mark all as read
              </Button>
            )}
          </div>
        </div>

        <ScrollArea className="h-96">
          <div className="p-2">
            {/* Loading State */}
            {loading && displayNotifications.length === 0 && (
              <div className="space-y-2">
                {[...Array(3)].map((_, index) => (
                  <NotificationItemSkeleton key={index} />
                ))}
              </div>
            )}

            {/* Error State */}
            {error && !loading && displayNotifications.length === 0 && (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <AlertCircle className="h-8 w-8 text-red-500 mb-2" />
                <p className="text-sm text-red-600 mb-2">Failed to load notifications</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRefresh}
                  disabled={actionLoading.refresh}
                >
                  {actionLoading.refresh ? (
                    <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                  ) : (
                    <RefreshCw className="h-3 w-3 mr-1" />
                  )}
                  Retry
                </Button>
              </div>
            )}

            {/* Empty State */}
            {!loading && !error && displayNotifications.length === 0 && (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <Bell className="h-8 w-8 text-gray-400 mb-2" />
                <p className="text-sm text-gray-500">No notifications yet</p>
              </div>
            )}

            {/* Notifications List */}
            {displayNotifications.length > 0 && (
              displayNotifications.map((notification, index) => (
                <div key={notification._id}>
                  <div
                    className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors hover:bg-gray-50 ${!notification.read ? "bg-blue-50 border-l-2 border-l-blue-500" : ""
                      } ${actionLoading[notification._id] ? "opacity-60" : ""}`}
                    onClick={() => {
                      handleMarkAsRead(notification._id)
                      // if (notification.actionUrl) {
                      //   setIsOpen(false)
                      //   // Navigate to the action URL
                      //   window.location.href = notification.actionUrl
                      // }
                    }}
                  >
                    <div className="flex-shrink-0 relative">
                      {notification.avatar ? (
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={notification.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{notification.title.charAt(0)}</AvatarFallback>
                        </Avatar>
                      ) : (
                        <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                          {getNotificationIcon(notification.type)}
                        </div>
                      )}
                      {actionLoading[notification._id] && (
                        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 rounded-full">
                          <Loader2 className="h-3 w-3 animate-spin text-blue-500" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-gray-900 truncate">{notification.title}</p>
                        {!notification.read && <div className="h-2 w-2 bg-blue-500 rounded-full flex-shrink-0" />}
                      </div>
                      <p className="text-xs text-gray-600 mt-1 line-clamp-2">{notification.message}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Clock className="h-3 w-3 text-gray-400" />
                        <span className="text-xs text-gray-400">{notification.time}</span>
                      </div>
                    </div>
                  </div>
                  {index < displayNotifications.length - 1 && <Separator className="my-1" />}
                </div>
              ))
            )}

            {/* Show more indicator */}
            {!loading && notifications.length > 5 && (
              <div className="p-2 text-center">
                <p className="text-xs text-gray-500">
                  Showing 5 of {notifications.length} notifications
                </p>
              </div>
            )}
          </div>
        </ScrollArea>

        <Separator />
        <div className="p-3">
          <Link to="/notifications">
            <Button
              variant="ghost"
              className="w-full text-blue-600 hover:text-blue-700 hover:bg-blue-50"
              onClick={() => setIsOpen(false)}
            >
              See all notifications
            </Button>
          </Link>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}