import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {UserState} from "../../types/userStateTypes";
import {loginUserAPI, registerUserAPI} from "../../api/authService.ts";

interface AuthState extends UserState {
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    token: string | null;
}

const initialState: AuthState = {
    token: null,
    username: '',
    email: '',
    password: '',
    status: 'idle',
    error: null
};

export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (userData: UserState, { rejectWithValue }) => {
        try {
            return await registerUserAPI(userData)
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Registration failed');
        }
    }
);

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (userData: UserState, { rejectWithValue }) => {
        try {
            return await loginUserAPI(userData)
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Login failed');
        }
    }
);

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearUser: (state) => {
            state.username = '';
            state.email = '';
            state.password = '';
            state.status = 'idle';
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // Додаємо захисний доступ до властивостей
                state.username = action.payload?.username || '';
                state.email = action.payload?.email || '';
                state.password = '';
                state.error = null;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            })
            .addCase(loginUser.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // Додаємо захисний доступ до властивостей
                state.username = action.payload?.username || '';
                state.email = action.payload?.email || '';
                state.password = '';
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            });
    }
});

export const { clearUser } = authSlice.actions;
export const authReducer = authSlice.reducer;

