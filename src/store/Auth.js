import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import API from "../http/index";

const authStore = (set) => ({
    user: null,
    token: '',
    loading: false,
    error: null,
    status: null,
    message: null,

    login: async ({ email, password }) => {
        const userData = { email, password };
        set({ loading: true, error: null, status: null, message: null });
        try {
            const res = await API.post('auth/login', userData);

            // Save token only if success
            if (res.status === 200 && res.data?.token) {
                set({
                    token: res.data.token,
                    loading: false,
                    status: res.status,
                    message: res.data.message
                });
            }
        } catch (err) {
            set({
                error: err.response?.data?.message || 'Error logging in',
                loading: false,
                status: err.response?.status || null,
                message: null
            });
        }
    },

    logout: () => {
        set({
            token: '',
            status: null,
            message: null,
            error: null
        });
        localStorage.removeItem("auth_storage");
    }
});

export const useAuthStore = create(
    devtools(
        persist(authStore, {
            name: 'auth_storage', // storage key
            getStorage: () => localStorage,
            partialize: (state) => ({ token: state.token }) // only save token
        })
    )
);
