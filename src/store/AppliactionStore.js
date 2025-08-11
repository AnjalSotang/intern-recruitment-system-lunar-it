import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import API from "../http/index"
import STATUSES from "../global/status/Statuses"

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


    // fetchPosition: async (id) => {
    //     set({ loading: true, error: null, status: null, message: null});
    //     console.log("From" + id)
    //     try {
    //         const res = await API.get(`api/position/${id}`);
    //         // console.log("Fr " + res.data.data)
    //         set({ position: res.data.data, loading: false }); // store separately
    //     } catch (err) {
    //         set({
    //             error: err.response?.data?.message || 'Error fetching position',
    //             loading: false,
    //     status: err.response?.status || null
    //         });
    //     }
    // },



    // createPosition: async (positionData) => {
    //     set({ loading: true, error: null, status: null, message: null });
    //     try {
    //         console.log(positionData)
    //         const res = await API.post('api/position', positionData);
    //         set((state) => ({
    //             positions: [...state.positions, res.data.data],
    //             loading: false,
    //             status: res.status,
    //             message: res.data.message
    //         }));
    //     } catch (err) {
    //         set({
    //             error: err.response?.data?.message || 'Error creating position',
    //             loading: false,
    //             status: err.response?.status || null,
    //             message: null
    //         });
    //     }
    // },

    updateApplication: async (id, status, sendNotification, notes) => {
        set({ loading: true, error: null, status: null, message: null });
        try {
            const res = await API.put(`api/application/${id}/status`, {status, sendNotification, notes});
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

    // deletePosition: async (id) => {
    //     set({ loading: true, error: null, status: null, message: null });
    //     try {
    //         const res = await API.delete(`api/position/${id}`);
    //         set((state) => ({
    //             positions: state.positions.filter((pos) => pos._id !== id),
    //             loading: false,
    //             status: res.status,
    //             message: res.data.message
    //         }))
    //     } catch (err) {
    //         set({
    //             error: err.response?.data?.message || 'Error deleting position',
    //             loading: false,
    //             status: err.response?.status || null,
    //             message: null
    //         });
    //         console.log(err.response.data.error)
    //     }
    // }
})

export const useApplicationStore = create(devtools(applicationStore))