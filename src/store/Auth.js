import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import API from "../http/index";

const authStore = (set, get) => ({
    user: {},
    token: '',
    loading: false,
    error: null,
    status: null,
    message: null,
    
    // NEW: 2FA related state
    requires2FA: false,
    tempUserId: null,
    twoFAStatus: false,
    qrCode: null,
    twoFASecret: null,

    login: async ({ email, password }) => {
        const userData = { email, password };
        set({ loading: true, error: null, status: null, message: null, requires2FA: false });
        try {
            const res = await API.post('auth/login', userData);

            // Check if 2FA is required
            if (res.status === 200 && res.data?.requires2FA) {
                set({
                    requires2FA: true,
                    tempUserId: res.data.userId,
                    loading: false,
                    status: res.status,
                    message: res.data.message || 'Please enter your 2FA code'
                });
                return; // Don't set token yet
            }

            // Normal login (no 2FA)
            if (res.status === 200 && res.data?.token) {
                set({
                    token: res.data.token,
                    user: res.data.user || {},
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

    // NEW: Verify 2FA during login
    verify2FALogin: async (otpCode) => {
        const { tempUserId } = get();
        if (!tempUserId || !otpCode) {
            set({ error: 'Invalid login session or OTP code' });
            return;
        }

        set({ loading: true, error: null });
        try {
            const res = await API.post('auth/verify-2fa-login', {
                userId: tempUserId,
                token: otpCode
            });

            if (res.status === 200 && res.data?.token) {
                set({
                    token: res.data.token,
                    user: res.data.user || {},
                    loading: false,
                    status: res.status,
                    message: res.data.message,
                    requires2FA: false,
                    tempUserId: null
                });
            }
        } catch (err) {
            set({
                error: err.response?.data?.message || 'Invalid 2FA code',
                loading: false,
                status: err.response?.status || null
            });
        }
    },

    // NEW: Get 2FA status
    get2FAStatus: async () => {
        set({ loading: true, error: null });
        try {
            const res = await API.get('auth/2fa/status');
            if (res.status === 200) {
                set({
                    twoFAStatus: res.data.is2FAEnabled,
                    loading: false,
                    status: res.status
                });
            }
        } catch (err) {
            set({
                error: err.response?.data?.message || 'Error getting 2FA status',
                loading: false,
                status: err.response?.status || null
            });
        }
    },

    // NEW: Enable 2FA (get QR code)
    enable2FA: async () => {
        set({ loading: true, error: null, qrCode: null });
        try {
            const res = await API.post('auth/2fa/enable');
            if (res.status === 200) {
                set({
                    qrCode: res.data.qrCode,
                    twoFASecret: res.data.secret,
                    loading: false,
                    status: res.status,
                    message: res.data.message
                });
            }
        } catch (err) {
            set({
                error: err.response?.data?.message || 'Error enabling 2FA',
                loading: false,
                status: err.response?.status || null
            });
        }
    },

    // NEW: Verify 2FA setup
    verify2FASetup: async (otpCode) => {
        if (!otpCode) {
            set({ error: 'OTP code is required' });
            return;
        }

        set({ loading: true, error: null });
        try {
            const res = await API.post('auth/2fa/verify-setup', {
                token: otpCode
            });

            if (res.status === 200) {
                set({
                    twoFAStatus: true,
                    qrCode: null,
                    twoFASecret: null,
                    loading: false,
                    status: res.status,
                    message: res.data.message
                });
            }
        } catch (err) {
            set({
                error: err.response?.data?.message || 'Invalid OTP code',
                loading: false,
                status: err.response?.status || null
            });
        }
    },

    // NEW: Disable 2FA
    disable2FA: async ({ password, token }) => {
        if (!password || !token) {
            set({ error: 'Password and current OTP are required' });
            return;
        }

        set({ loading: true, error: null });
        try {
            const res = await API.post('auth/2fa/disable', {
                password,
                token
            });

            if (res.status === 200) {
                set({
                    twoFAStatus: false,
                    loading: false,
                    status: res.status,
                    message: res.data.message
                });
            }
        } catch (err) {
            set({
                error: err.response?.data?.message || 'Error disabling 2FA',
                loading: false,
                status: err.response?.status || null
            });
        }
    },

    fetchAdmin: async () => {
        set({ loading: true, error: null, status: null, message: null });
        try {
            const res = await API.get('auth/admin');

            // Save token only if success
            if (res.status === 200) {
                set({
                    user: res.data.data,
                    loading: false,
                    status: res.status,
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

    updateAdmin: async (formData, id) => {
        set({ loading: true, error: null, status: null, message: null });
        try {
            const res = await API.put(`auth/admin/${id}`, formData);

            // Save token only if success
            if (res.status === 200) {
                set({
                    user: res.data.user,
                    loading: false,
                    status: res.status,
                    message: res.data.message
                });
            }
        } catch (err) {
            set({
                error: err.response?.data?.message || 'Error updating profile',
                loading: false,
                status: err.response?.status || null,
                message: null
            });
        }
    },

    changePassword: async (formData) => {
        set({ loading: true, error: null, status: null, message: null });
        try {
            console.log('AJN', formData)
            const res = await API.put('auth/admin/change-password', formData);

            // Save token only if success
            if (res.status === 200) {
                set({
                    loading: false,
                    status: res.status,
                    message: res.data.message
                });
            }
        } catch (err) {
            set({
                error: err.response?.data?.message || 'Error updating profile',
                loading: false,
                status: err.response?.status || null,
                message: null
            });
        }
    },

    forgotPassword: async (email) => {
        set({ loading: true, error: null, status: null, message: null });
        try {
            const res = await API.post('auth/forgot-password', {email});

            // Save token only if success
            if (res.status === 200) {
                set({
                    loading: false,
                    status: res.status,
                    message: res.data.message
                });
            }
        } catch (err) {
            set({
                error: err.response?.data?.message || 'Error updating profile',
                loading: false,
                status: err.response?.status || null,
                message: null
            });
        }
    },

    resetPassword: async (resetData) => {
        set({ loading: true, error: null, status: null, message: null });
        try {
            console.log(resetData);
            // Extract the token for URL and send only password data in body
            const res = await API.post(`auth/reset-password/${resetData.token}`, {
                newPassword: resetData.newPassword,
                confirmPassword: resetData.confirmPassword
            });

            if (res.status === 200) {
                set({
                    loading: false,
                    status: res.status,
                    message: res.data.message
                });
            }
        } catch (err) {
            set({
                error: err.response?.data?.message || 'Error resetting password',
                loading: false,
                status: err.response?.status || null,
                message: null
            });
        }
    },

    // Add these new functions to clear messages and errors
    clearMessage: () => set({ message: null }),
    clearError: () => set({ error: null }),
    clearNotifications: () => set({ message: null, error: null }),
    // NEW: Clear 2FA related state
    clear2FAState: () => set({ 
        requires2FA: false, 
        tempUserId: null, 
        qrCode: null, 
        twoFASecret: null 
    }),

    logout: () => {
        set({
            token: '',
            status: null,
            message: null,
            error: null,
            // Clear 2FA state on logout
            requires2FA: false,
            tempUserId: null,
            twoFAStatus: false,
            qrCode: null,
            twoFASecret: null
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