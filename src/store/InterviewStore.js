import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import API from "../http/index"
import STATUSES from "../global/status/Statuses"

const interviewStore = (set) => ({
    interviews: [],
    interview: null,
    loading: false,
    error: null,
    status: null,
    message: null,

    interviewSummary:{},
    summaryLoading: false,
    summaryError: null,
    summaryStatus: null,
    summaryMessage: null,

    fetchInterviews: async () => {
        set({ loading: true, error: null, status: null, message: null });
        try {
            const res = await API.get('api/interview');
            set({ loading: false, interviews: res.data.data, })
            // console.log(res.data.data)   
            // console.log("lets " + res.data.data)
        }
        catch (err) {
            set({
                error: err.response?.data?.message || 'Error fetching interviews',
                loading: false,
                status: err.response?.status || null,
                message: null
            });
        }
    },


    fetchinterview: async (id) => {
        set({ loading: true, error: null, status: null, message: null });
        console.log("From" + id)
        try {
            const res = await API.get(`api/interview/${id}`);
            // console.log("Fr " + res.data.data)
            set({ interview: res.data.data, loading: false }); // store separately
        } catch (err) {
            set({
                error: err.response?.data?.message || 'Error fetching interview',
                loading: false,
                status: err.response?.status || null
            });
        }
    },



    scheduleInterview: async (interviewData) => {
        set({ loading: true, error: null, status: null, message: null });
        try {
            // console.log(interviewData)
            const res = await API.post('api/interview', interviewData);
            set((state) => ({
                interviews: [...state.interviews, res.data.data],
                loading: false,
                status: res.status,
                message: res.data.message
            }));
        } catch (err) {
            set({
                error: err.response?.data?.message || 'Error creating interview',
                loading: false,
                status: err.response?.status || null,
                message: null
            });
        }
    },


    updateInterview: async (updatedData, id) => {
        set({ loading: true, error: null, status: null, message: null });
        try {
            console.log("PUT Payload:", updatedData, "ID:", id);
            const res = await API.put(`/api/interview/${id}`, updatedData);

            set((state) => ({
                interviews: state.interviews.map((interview) =>
                    interview.id === id ? res.data.data : interview
                ),
                loading: false,
                status: res.status,
                message: res.data.message
            }));
        } catch (err) {
            console.error("Update Error:", err.response?.data || err.message);
            set({
                error: err.response?.data?.message || 'Error updating interview',
                loading: false,
                status: err.response?.status || null,
                message: null
            });
        }
    },

    deleteInterview: async (interviewId, reason, notifyCandidate) => {
        set({ loading: true, error: null, status: null, message: null });
        console.log(reason, notifyCandidate);

        try {
            const res = await API.delete(`api/interview/${interviewId}`, {
                data: { reason, notifyCandidate }
            });

            set((state) => ({
                interviews: state.interviews.map((interview) =>
                    interview.id === interviewId ? res.data.data : interview
                ),
                loading: false,
                status: res.status,
                message: res.data.message
            }));
        } catch (err) {
            set({
                error: err.response?.data?.message || 'Error deleting interview',
                loading: false,
                status: err.response?.status || null,
                message: null
            });
            console.log(err.response?.data?.error);
        }
    },

    permanentDeleteInterview: async (id) => {
        set({ loading: true, error: null, status: null, message: null });
        console.log(id)
        try {
            const res = await API.delete(`api/interview/${id}/permanent`);
            set((state) => ({
                interviews: state.interviews.filter((app) => app.id !== id),
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
    },

      fetchInterviewSummary: async (cache=true) => {
        set({ summaryLoading: true, summaryError: null, summaryStatus: null, summaryMessage: null });
        try {
            const res = await API.get("api/interview-summary" + "?cache=" +cache);
            console.log(res.data.data)
            set({
                interviewSummary: res.data.data, // merge new summary data
                summaryLoading: false,
                summaryStatus: res.status,
                summaryMessage: res.data.message
            });
        } catch (err) {
            set({
                summaryError: err.response?.data?.message || 'Error fetching summary',
                summaryLoading: false,
                summaryStatus: err.response?.status || null,
                summaryMessage: null
            });
        }
    }

})

export const useInterviewStore = create(devtools(interviewStore))