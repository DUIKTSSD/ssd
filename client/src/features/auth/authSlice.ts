import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {UserState} from "../../types/userStateTypes";
import api from "../../api/api.ts";
import {NavigateFunction} from "react-router-dom";

interface AuthState extends UserState {
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    code: string | null
    error: string | null;
}

const initialState: AuthState = {
    username: '',
    email: '',
    password: '',
    status: 'idle',
    error: null,
    code: null

};

// Асинхронна дія для реєстрації користувача
export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async ({userData, navigate}: { userData: UserState, navigate: NavigateFunction }, {rejectWithValue}) => {
        try {
            const user = await api.auth.register(userData)
            localStorage.setItem("email", userData.email);
            navigate('/verification')
            return user
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Registration failed');
        }
    }
);

// Асинхронна дія для входу користувача
export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async ({userData, navigate}: { userData: UserState, navigate: NavigateFunction }, {rejectWithValue}) => {
        try {
            const user = await api.auth.login(userData)
            navigate('/')
            return user
        } catch (error: any) {
            return rejectWithValue(error.response.data || 'Login failed');
        }
    }
);
export const verifiUser = createAsyncThunk(
    'auth/verificationUser',
    async ({userData, navigate}: { userData: UserState, navigate: NavigateFunction }, {rejectWithValue}) => {
        try {
            const user = await api.auth.verifi(userData)
            localStorage.clear()
            navigate('/')
            return user
        } catch (error: any) {
            return rejectWithValue(error.response.data || 'Login failed');
        }
    }
);
export const logoutUser = createAsyncThunk(
    'logout',
    async () => {
        try {
            await api.auth.logout()
        } catch (error: any) {
            return rejectWithValue(error.response.data || 'logout failed');
        }
    }
);


// Слайс для керування станом авторизації
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
        // Обробники для registerUser
        builder
            .addCase(registerUser.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state) => {
                state.status = 'succeeded';
                // state.username = action.payload.username;
                // state.email = action.payload.email;
                // state.password = '';
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
        builder
            .addCase(verifiUser.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(verifiUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.username = action.payload.username;
                state.email = action.payload.email;
                state.password = '';
                state.error = null;
            })
            .addCase(verifiUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            });
    }
});

// Експортуємо екшени та редюсер
export const {clearUser} = authSlice.actions;
export const authReducer = authSlice.reducer;