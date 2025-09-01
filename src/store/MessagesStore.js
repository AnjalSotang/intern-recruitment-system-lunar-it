import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import API from "../http/index";

const contactStore = (set) => ({
    messages: [],
    loading: false,
    error: null,
    status: null,
    message: null,


        fetchMessages: async () => {
        set({ loading: true, error: null, status: null, message: null });
        try {
            const res = await API.get('api/messages');
            set({ loading: false, messages: res.data.data })
            // console.log("lets " + res.data.data)
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

        postMessages: async (messageData) => {
        set({ loading: true, error: null, status: null, message: null });
        try {
            console.log(messageData)
            const res = await API.post('api/contact', messageData);
            set((state) => ({
                messages: [...state.messages, res.data.data],
                loading: false,
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

    updateMessageStatus: async (id, status) => {
        set({ loading: true, error: null, status: null, message: null });
        try {
            const res = await API.put(`api/messages/${id}/status`, { status });
            set((state) => ({
                messages: state.messages.map((msg) =>
                    msg._id === id ? { ...msg, status: res.data.data.status } : msg
                ),
                loading: false,
                status: res.status,
                message: res.data.message
            }));
        } catch (err) {
            set({
                error: err.response?.data?.message || 'Error updating message status',
                loading: false,
                status: err.response?.status || null,
                message: null
            });
        }   
    },

    sendReplyMessage: async (id, replyText) => {
        set({ loading: true, error: null, status: null, message: null });
        try {
            const res = await API.patch(`api/messages/${id}/reply`, { replyText});
            set((state) => ({
                messages: state.messages.map((msg) =>
                    msg._id === id ? { ...msg, status: res.data.data.status } : msg
                ),
                loading: false,
                status: res.status,
                message: res.data.message
            }));
        } catch (err) {
            set({
                error: err.response?.data?.message || 'Error updating message status',
                loading: false,
                status: err.response?.status || null,
                message: null
            });
        }   
    },

    deleteMessage: async (id) => {
        set({ loading: true, error: null, status: null, message: null });
        try {
            const res = await API.delete(`api/messages/${id}`);
            set((state) => ({
                messages: state.messages.filter((msg) => msg._id !== id),
                loading: false,
                status: res.status,
                message: res.data.message
            }));
        }
        catch (err) {
            set({
                error: err.response?.data?.message || 'Error deleting message',
                loading: false, 
                status: err.response?.status || null,
                message: null
            });
        }
    }

   
});

export const useContactStore = create(devtools(contactStore))