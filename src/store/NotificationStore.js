import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import API from "../http/index"

const mockNotifications = [
  {
    id: "1",
    type: "application",
    title: "New Application Received",
    message:
      "Sarah Wilson applied for Frontend Developer Intern position. Her application includes a strong portfolio showcasing React and TypeScript projects.",
    time: "2 minutes ago",
    date: "Today",
    read: false,
    avatar: "/placeholder.svg?height=40&width=40",
    actionUrl: "/applications",
    priority: "high",
  },
  {
    id: "2",
    type: "interview",
    title: "Interview Scheduled",
    message:
      "Interview with John Doe scheduled for tomorrow at 2:00 PM. Please prepare technical questions for the Backend Developer position.",
    time: "15 minutes ago",
    date: "Today",
    read: false,
    avatar: "/placeholder.svg?height=40&width=40",
    actionUrl: "/interviews",
    priority: "high",
  },
  {
    id: "3",
    type: "message",
    title: "New Message from Candidate",
    message:
      "Alice Johnson sent you a message regarding the interview schedule. She's requesting to reschedule due to a conflict.",
    time: "1 hour ago",
    date: "Today",
    read: false,
    avatar: "/placeholder.svg?height=40&width=40",
    actionUrl: "/messages",
    priority: "medium",
  },
  {
    id: "4",
    type: "team",
    title: "Team Member Added",
    message:
      "Mike Chen has been added to the HR team with Recruiter role. He will have access to applications and interview scheduling.",
    time: "2 hours ago",
    date: "Today",
    read: true,
    avatar: "/placeholder.svg?height=40&width=40",
    actionUrl: "/settings",
    priority: "low",
  },
  {
    id: "5",
    type: "system",
    title: "Weekly Report Available",
    message:
      "Your weekly recruitment report is ready for review. This week: 15 new applications, 8 interviews scheduled, 3 offers made.",
    time: "3 hours ago",
    date: "Today",
    read: true,
    actionUrl: "/reports",
    priority: "medium",
  },
  {
    id: "6",
    type: "application",
    title: "Application Status Updated",
    message:
      'David Kim\'s application status changed to "Interview Scheduled". The technical interview is set for Friday at 10:00 AM.',
    time: "4 hours ago",
    date: "Today",
    read: true,
    avatar: "/placeholder.svg?height=40&width=40",
    actionUrl: "/applications",
    priority: "medium",
  },
  {
    id: "7",
    type: "interview",
    title: "Interview Completed",
    message: "Interview with Emma Davis has been completed. Please submit your feedback and rating within 24 hours.",
    time: "6 hours ago",
    date: "Today",
    read: true,
    avatar: "/placeholder.svg?height=40&width=40",
    actionUrl: "/interviews",
    priority: "high",
  },
  {
    id: "8",
    type: "application",
    title: "Application Deadline Reminder",
    message:
      "Frontend Developer Intern position application deadline is in 3 days. Currently 25 applications received.",
    time: "1 day ago",
    date: "Yesterday",
    read: true,
    actionUrl: "/positions",
    priority: "medium",
  },
  {
    id: "9",
    type: "system",
    title: "System Maintenance Scheduled",
    message:
      "Scheduled maintenance on Sunday 2:00 AM - 4:00 AM EST. The system will be temporarily unavailable during this time.",
    time: "2 days ago",
    date: "Dec 14",
    read: true,
    actionUrl: "/settings",
    priority: "low",
  },
  {
    id: "10",
    type: "team",
    title: "Role Permission Updated",
    message:
      "Jessica Brown's role has been updated to Senior Recruiter with additional permissions for position management.",
    time: "3 days ago",
    date: "Dec 13",
    read: true,
    avatar: "/placeholder.svg?height=40&width=40",
    actionUrl: "/settings",
    priority: "low",
  },
]


const notificationStore = (set, get) => ({
    notifications: [],
    notification: null,
    loading: false,
    error: null,
    status: null,
    message: null,
    unreadCount: 0,
    pagination: {
        current: 1,
        pages: 1,
        total: 0,
        limit: 20
    },
    stats: {
        overview: { total: 0, unread: 0, read: 0 },
        byType: {},
        byPriority: {}
    },

    // Fetch notifications with optional filters and pagination
    fetchNotifications: async (filters = {}) => {
        set({ loading: true, error: null, status: null, message: null });
        try {
            const params = new URLSearchParams();
            
            // Add pagination
            if (filters.page) params.append('page', filters.page);
            if (filters.limit) params.append('limit', filters.limit);
            
            // Add filters
            if (filters.read !== undefined) params.append('read', filters.read);
            if (filters.type) params.append('type', filters.type);
            if (filters.priority) params.append('priority', filters.priority);

            const queryString = params.toString();
            const url = queryString ? `api/notification?${queryString}` : 'api/notification';
            
            const res = await API.get(url);
            
            set({ 
                loading: false, 
                notifications: res.data.notifications,
                unreadCount: res.data.unreadCount,
                pagination: res.data.pagination
            });
            
            console.log("Notifications fetched:", res.data.notifications);
        } catch (err) {
            set({
                error: err.response?.data?.error || 'Error fetching notifications',
                loading: false,
                status: err.response?.status || null,
                message: null
            });
        }
    },

    // Mark single notification as read
    markAsRead: async (id) => {
        set({ loading: true, error: null, status: null, message: null });
        try {
            const res = await API.put(`api/notification/${id}/read`);
            
            set((state) => ({
                notifications: state.notifications.map((notification) =>
                    notification._id === id 
                        ? { ...notification, read: true }
                        : notification
                ),
                unreadCount: Math.max(0, state.unreadCount - 1),
                loading: false,
                status: res.status,
                message: res.data.message
            }));
        } catch (err) {
            set({
                error: err.response?.data?.error || 'Error marking notification as read',
                loading: false,
                status: err.response?.status || null,
                message: null
            });
        }
    },

    // Mark all notifications as read
    markAllAsRead: async () => {
        set({ loading: true, error: null, status: null, message: null });
        try {
            const res = await API.put('api/notification/mark-all-read');
            
            set((state) => ({
                notifications: state.notifications.map((notification) => ({
                    ...notification,
                    read: true
                })),
                unreadCount: 0,
                loading: false,
                status: res.status,
                message: res.data.message
            }));
        } catch (err) {
            set({
                error: err.response?.data?.error || 'Error marking all notifications as read',
                loading: false,
                status: err.response?.status || null,
                message: null
            });
        }
    },

    // Delete notification
    deleteNotification: async (id) => {
        set({ loading: true, error: null, status: null, message: null });
        try {
            const res = await API.delete(`api/notification/${id}`);
            
            set((state) => {
                const deletedNotification = state.notifications.find(n => n._id === id);
                const newUnreadCount = deletedNotification && !deletedNotification.read 
                    ? Math.max(0, state.unreadCount - 1)
                    : state.unreadCount;
                
                return {
                    notifications: state.notifications.filter((notification) => notification._id !== id),
                    unreadCount: newUnreadCount,
                    loading: false,
                    status: res.status,
                    message: res.data.message
                };
            });
        } catch (err) {
            set({
                error: err.response?.data?.error || 'Error deleting notification',
                loading: false,
                status: err.response?.status || null,
                message: null
            });
        }
    },

    // Fetch notification statistics
    fetchNotificationStats: async () => {
        set({ loading: true, error: null, status: null, message: null });
        try {
            const res = await API.get('api/notification/stats');
            
            set({ 
                loading: false,
                stats: res.data,
                status: res.status
            });
            
            console.log("Notification stats fetched:", res.data);
        } catch (err) {
            set({
                error: err.response?.data?.error || 'Error fetching notification stats',
                loading: false,
                status: err.response?.status || null,
                message: null
            });
        }
    },

    // Create new notification (for admin use)
    createNotification: async (notificationData) => {
        set({ loading: true, error: null, status: null, message: null });
        try {
            const res = await API.post('api/notification', notificationData);
            
            set((state) => ({
                notifications: [res.data.data, ...state.notifications],
                unreadCount: res.data.data.read ? state.unreadCount : state.unreadCount + 1,
                loading: false,
                status: res.status,
                message: res.data.message
            }));
        } catch (err) {
            set({
                error: err.response?.data?.error || 'Error creating notification',
                loading: false,
                status: err.response?.status || null,
                message: null
            });
        }
    },

    // Get unread notifications count
    fetchUnreadCount: async () => {
        try {
            const res = await API.get('api/notification?limit=1'); // Minimal request just for count
            set({ unreadCount: res.data.unreadCount });
        } catch (err) {
            console.error('Error fetching unread count:', err);
        }
    },

    // Filter notifications locally (for quick filtering without API call)
    filterNotifications: (filterType) => {
        const { notifications } = get();
        
        switch (filterType) {
            case 'unread':
                return notifications.filter(n => !n.read);
            case 'read':
                return notifications.filter(n => n.read);
            case 'high-priority':
                return notifications.filter(n => n.priority === 'high');
            case 'application':
                return notifications.filter(n => n.type === 'application');
            default:
                return notifications;
        }
    },

    // Clear all state (useful for logout)
    clearNotifications: () => {
        set({
            notifications: [],
            notification: null,
            loading: false,
            error: null,
            status: null,
            message: null,
            unreadCount: 0,
            pagination: {
                current: 1,
                pages: 1,
                total: 0,
                limit: 20
            },
            stats: {
                overview: { total: 0, unread: 0, read: 0 },
                byType: {},
                byPriority: {}
            }
        });
    },

    // Reset error state
    clearError: () => {
        set({ error: null, status: null });
    },

    // Reset message state
    clearMessage: () => {
        set({ message: null });
    },

    // Optimistic update for read status (immediate UI feedback)
    optimisticMarkAsRead: (id) => {
        set((state) => ({
            notifications: state.notifications.map((notification) =>
                notification._id === id 
                    ? { ...notification, read: true }
                    : notification
            ),
            unreadCount: Math.max(0, state.unreadCount - 1)
        }));
    },

    // Optimistic delete (immediate UI feedback)
    optimisticDelete: (id) => {
        set((state) => {
            const deletedNotification = state.notifications.find(n => n._id === id);
            const newUnreadCount = deletedNotification && !deletedNotification.read 
                ? Math.max(0, state.unreadCount - 1)
                : state.unreadCount;
            
            return {
                notifications: state.notifications.filter((notification) => notification._id !== id),
                unreadCount: newUnreadCount
            };
        });
    }
});

export const useNotificationStore = create(devtools(notificationStore, {
    name: 'notification-store'
}));