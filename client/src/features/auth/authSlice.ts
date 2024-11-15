import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {UserState} from "../../types/userStateTypes";
import api from "../../api/api.ts";

interface AuthState extends UserState {
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: AuthState = {
    username: '',
    email: '',
    password: '',
    status: 'idle',
    error: null
};

// Асинхронна дія для реєстрації користувача
export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (userData: UserState, { rejectWithValue }) => {
        try {
            return await api.auth.register(userData);
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Registration failed');
        }
    }
);

// Асинхронна дія для входу користувача
export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (userData: UserState, { rejectWithValue }) => {
        try {
            return await api.auth.login(userData);
        } catch (error: any) {
            return rejectWithValue(error.response.data || 'Login failed');
        }
    }
);

// Слайс для керування станом авторизації
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // Очищення даних користувача
        clearUser: (state) => {
            state.username = '';
            state.email = '';
            state.password = '';
            state.status = 'idle';
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        // Обробники для registerUser
        builder
            .addCase(registerUser.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.username = action.payload.username;
                state.email = action.payload.email;
                state.password = '';
                state.error = null;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            });

        // Обробники для loginUser
        builder
            .addCase(loginUser.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.username = action.payload.username;
                state.email = action.payload.email;
                state.password = '';
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            });
    }
});

// Експортуємо екшени та редюсер
export const { clearUser } = authSlice.actions;
export const authReducer = authSlice.reducer;
