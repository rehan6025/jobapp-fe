import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface AuthState {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    token: localStorage.getItem("token"),
    isLoading: false,
    error: null as string | null,
};

export interface User {
    _id: string;
    username: string;
    email: string;
    role: "poster" | "seeker";
}

export const register = createAsyncThunk(
    "auth/register",
    async (data: {
        username: string;
        email: string;
        password: string;
        role: "poster" | "seeker";
    }) => {
        const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/auth/register`,
            data
        );
        localStorage.setItem("token", response.data.token);
        return response.data;
    }
);

export const login = createAsyncThunk(
    "auth/login",
    async (data: { email: string; password: string }) => {
        const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/auth/login`,
            data
        );
        localStorage.setItem("token", response.data.token);
        return response.data;
    }
);

export const getProfile = createAsyncThunk(
    "auth/getProfile",
    async (_, { getState }) => {
        const state = getState() as { auth: AuthState };
        const token = state.auth.token || localStorage.getItem("token");
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/me`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem("token");
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || "Registration failed";
            })

            .addCase(login.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || "Login failed";
            })

            .addCase(getProfile.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getProfile.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
            })
            .addCase(getProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.user = null;
                state.error = action.error.message || "Failed to load profile";
            });
    },
});

export default authSlice.reducer;
export const { logout, clearError } = authSlice.actions;
