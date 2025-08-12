import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import API from "../http/index"
import STATUSES from "../global/status/Statuses"

const memberStore = (set) => ({
    members: [],
    member: null,
    loading: false,
    error: null,
    status: null,
    message: null,

    fetchMembers: async () => {
        set({ loading: true, error: null, status: null, message: null });
        try {
            const res = await API.get('api/member');
            set({ loading: false, members: res.data.data, })
            // console.log(res.data.data)
            // console.log("lets " + res.data.data)
        }
        catch (err) {
            set({
                error: err.response?.data?.message || 'Error fetching members',
                loading: false,
                status: err.response?.status || null,
                message: null
            });
        }
    },


    fetchmember: async (id) => {
        set({ loading: true, error: null, status: null, message: null });
        console.log("From" + id)
        try {
            const res = await API.get(`api/member/${id}`);
            // console.log("Fr " + res.data.data)
            set({ member: res.data.data, loading: false }); // store separately
        } catch (err) {
            set({
                error: err.response?.data?.message || 'Error fetching member',
                loading: false,
                status: err.response?.status || null
            });
        }
    },



    createMember: async (memberData) => {
        set({ loading: true, error: null, status: null, message: null });
        try {
            // console.log(memberData)
            const res = await API.post('api/member', memberData);
            set((state) => ({
                members: [...state.members, res.data.data],
                loading: false,
                status: res.status,
                message: res.data.message
            }));
        } catch (err) {
            set({
                error: err.response?.data?.message || 'Error creating member',
                loading: false,
                status: err.response?.status || null,
                message: null
            });
        }
    },
    updateMember: async (updatedData, id) => {
        set({ loading: true, error: null, status: null, message: null });
        try {
            const res = await API.put(`api/member/${id}`, updatedData);
            // console.log(res.data.data);
            set((state) => ({
                members: state.members.map((member) =>
                    member._id === id ? res.data.data : member  // Compare with 'id' parameter
                ),
                loading: false,
                status: res.status,
                message: res.data.message
            }));
        } catch (err) {
            set({
                error: err.response?.data?.message || 'Error updating member',
                loading: false,
                status: err.response?.status || null,
                message: null
            });
            console.error(err);
        }
    },

    deleteMember: async (id) => {
        set({ loading: true, error: null, status: null, message: null });
        try {
            console.log(id)
            const res = await API.delete(`api/member/${id}`);
            set((state) => ({
                members: state.members.filter((pos) => pos._id !== id),
                loading: false,
                status: res.status,
                message: res.data.message
            }))
        } catch (err) {
            set({
                error: err.response?.data?.message || 'Error deleting member',
                loading: false,
                status: err.response?.status || null,
                message: null
            });
            console.log(err.response.data.error)
        }
    }
})

export const useMemberStore = create(devtools(memberStore))