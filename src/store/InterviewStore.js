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
            const res = await API.put(`api/interview/${id}`, updatedData);
            // console.log(res.data.data);
            set((state) => ({
                interviews: state.interviews.map((interview) =>
                    interview.id === id ? res.data.data : interview  // Compare with 'id' parameter
                ),
                loading: false,
                status: res.status,
                message: res.data.message
            }));
        } catch (err) {
            set({
                error: err.response?.data?.message || 'Error updating interview',
                loading: false,
                status: err.response?.status || null,
                message: null
            });
            console.error(err);
        }
    },

    deleteInterview: async (interviewId, reason, notifyCandidate) => {
        set({ loading: true, error: null, status: null, message: null });
        console.log(reason, notifyCandidate)

        try {
            // console.log(id)
            const res = await API.delete(`api/interview/${interviewId}`, { data: { reason, notifyCandidate } });
            set((state) => ({
                interviews: state.interviews.filter((pos) => pos.id !== interviewId),
                loading: false,
                status: res.status,
                message: res.data.message
            }))
        } catch (err) {
            set({
                error: err.response?.data?.message || 'Error deleting interview',
                loading: false,
                status: err.response?.status || null,
                message: null
            });
            console.log(err.response.data.error)
        }
    }
})

export const useInterviewStore = create(devtools(interviewStore))