import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import API from "../http/index"
import STATUSES from "../global/status/Statuses"
import { useNotificationStore } from './NotificationStore'


const applicationStore = (set) => ({
    applications: [],
    application: null,
    loading: false,
    error: null,
    status: null,
    message: null,

    fetchApplications: async () => {
        set({ loading: true, error: null, status: null, message: null });
        try {
            const res = await API.get('api/application');
            set({ loading: false, applications: res.data.data, })
            console.log("Applications fetched:", res.data.data);
        }
        catch (err) {
            set({
                error: err.response?.data?.message || 'Error fetching positions',
                loading: false,
                status: err.response?.status || null,
                message: null
            });
        }
    },


    postApplication: async (id, applicantData) => {
        const { fetchNotifcations,fetchUnreadCount } = useNotificationStore.getState();
        set({ loading: true, error: null, status: null, message: null });
        try {
            // console.log(interviewData)
            const res = await API.post(`api/application/${id}`, applicantData);
            set((state) => ({
                applications: [...state.applications, res.data.data],
                loading: false,
                status: res.status,
                message: res.data.message
            }));
            
        } catch (err) {
            set({
                error: err.response?.data?.message || 'Error during application',
                loading: false,
                status: err.response?.status || null,
                message: null
            });
        }
    },

    sendMessage: async (messageData) => {
        set({ loading: true, error: null, status: null, message: null });
        try {
            console.log(messageData)
            const res = await API.post(`api/application/${messageData.applicationId}/message`, messageData);
            set((state) => ({
                applications: state.applications.map((app) =>
                    app._id === messageData.applicationId
                        ? { ...app, priority: res.data.data.priority } // only update priority
                        : app
                ), loading: false,
                status: res.status,
                message: res.data.message
            }));
        } catch (err) {
            set({
                error: err.response?.data?.message || 'Error creating position',
                loading: false,
                status: err.response?.status || null,
                message: null
            });
        }
    },

    updateApplication: async (id, status, sendNotification, notes) => {
        set({ loading: true, error: null, status: null, message: null });
        try {
            const res = await API.put(`api/application/${id}/status`, { status, sendNotification, notes });
            set((state) => ({
                applications: state.applications.map((pos) =>
                    pos._id === res.data.data._id ? res.data.data : pos
                ),
                loading: false,
                status: res.status,
                message: res.data.message  // Fixed: was 'response.data.message'
            }));
        } catch (err) {
            set({
                error: err.response?.data?.message || 'Error updating position',
                loading: false,
                status: err.response?.status || null,
                message: null
            });
            console.error(err);
        }
    },

    deleteApplication: async (id) => {
        set({ loading: true, error: null, status: null, message: null });
        console.log(id)
        try {
            const res = await API.delete(`api/application/${id}`);
            set((state) => ({
                applications: state.applications.filter((app) => app._id !== id),
                loading: false,
                status: res.status,
                message: res.data.message
            }))
        } catch (err) {
            set({
                error: err.response?.data?.message || 'Error deleting position',
                loading: false,
                status: err.response?.status || null,
                message: null
            });
            console.log(err.response.data.error)
        }
    }
})

export const useApplicationStore = create(devtools(applicationStore))