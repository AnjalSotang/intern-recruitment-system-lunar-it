import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import API from "../http/index"


const dashboardStore = (set) => ({
    applications: [],
    application: null,
    loading: false,
    error: null,
    status: null,
    message: null,


    summary: {},
    statusSummary: {},
    departmentChart: {},
    messagesChart: {},
    summaryLoading: false,
    summaryError: null,
    summaryStatus: null,
    summaryMessage: null,


    
    fetchDashboardSummary: async (cache=true) => {
        set({ summaryLoading: true, summaryError: null, summaryStatus: null, summaryMessage: null });
        try {
            const res = await API.get("api/dashboard-summary"+"?cache="+cache);
            set({
                summary: res.data.data, // merge new summary data
                summaryLoading: false,
                summaryStatus: res.status,
                summaryMessage: res.data.message
            });
            return res
        } catch (err) {
            set({
                summaryError: err.response?.data?.message || 'Error fetching summary',
                summaryLoading: false,
                summaryStatus: err.response?.status || null,
                summaryMessage: null
            });
        }
    },

       
    fetchStatusSummary: async (cache=true) => {
        set({ summaryLoading: true, summaryError: null, summaryStatus: null, summaryMessage: null });
        try {
            const res = await API.get("api/dashboard-status"+"?cache="+cache);
            set({
                statusSummary: res.data.data, // merge new summary data
                summaryLoading: false,
                summaryStatus: res.status,  
                summaryMessage: res.data.message
            });
            return res
        } catch (err) {
            set({
                summaryError: err.response?.data?.message || 'Error fetching summary',
                summaryLoading: false,
                summaryStatus: err.response?.status || null,
                summaryMessage: null
            });
        }
    },

        fetchMessagesChart: async () => {
        set({ summaryLoading: true, summaryError: null, summaryStatus: null, summaryMessage: null });
        try {
            const res = await API.get("api/messagesSummary");
            set({
                messagesChart: res.data.data, // merge new summary data
                summaryLoading: false,
                summaryStatus: res.status,  
                summaryMessage: res.data.message
            });
            return res
        } catch (err) {
            set({
                summaryError: err.response?.data?.message || 'Error fetching summary',
                summaryLoading: false,
                summaryStatus: err.response?.status || null,
                summaryMessage: null
            });
        }
    },


    fetchDepartmentChart: async () => {
        set({ summaryLoading: true, summaryError: null, summaryStatus: null, summaryMessage: null });
        try {
            const res = await API.get("api/departmentChart");
            set({
                departmentChart: res.data.data, // merge new summary data
                summaryLoading: false,
                summaryStatus: res.status,  
                summaryMessage: res.data.message
            });
            return res
        } catch (err) {
            set({
                summaryError: err.response?.data?.message || 'Error fetching summary',
                summaryLoading: false,
                summaryStatus: err.response?.status || null,
                summaryMessage: null
            });
        }
    },
    




    fetchApplications: async () => {
        set({ loading: true, error: null, status: null, message: null });
        try {
            const res = await API.get('api/application');
            set({ loading: false, applications: res.data.data, })
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

   

})

export const useDashboardStore = create(devtools(dashboardStore))