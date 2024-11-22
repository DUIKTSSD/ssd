import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import {MemesData} from "../../components/adminPage/types/adminTypes.ts";
import api from "../../api/api.ts";
import axios from "axios";

//?TODO Бля тут такая залупа с этим api, вот честно мы это перепишем нахуй я тебе клянусь своим очком
interface MemeState {
    memes: MemesData[]
    loading: boolean
    error: string | null;
}


const initialState: MemeState = {
    memes: [],
    loading: false,
    error: null
}

export const fetchMemesToInspection = createAsyncThunk(
    'memes/memesToInspection',
    async() => {
        const response = await api.get<MemesData[]>('/memes/admin/memetoinspection')
        return response.data;
    }
)
export const addMemesToInspection = createAsyncThunk(
    "memes/addMemesToInspection",
    async (formData: FormData, { rejectWithValue }) => {
        const response = await api.post("/memes/add", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    }
);

export const fetchMemesToApprove = createAsyncThunk(
    'memes/fetchMemesToApprove',
    async () => {
        const response = await axios.get<MemesData[]>('http://localhost:8080/api/memes');
        return response.data;
    }
);
export const rejectMeme = createAsyncThunk(
    'memes/rejectMeme',
    async (id: string) => {
        const response = await api.post<MemesData[]>(`/memes/admin/setislegal/${id}?isLegal=false`);
        return response.data;
    }
);
export const rejectApproveMeme = createAsyncThunk(
    'memes/rejectApproveMeme',
    async (id: string) => {
        const response = await api.delete<MemesData[]>(`/memes/admin/del/${id}`);
        return response.data;
    }
);
export const approveMeme = createAsyncThunk(
    'memes/approveMeme',
    async (id: string) => {
        const response = await api.post<MemesData[]>(`/memes/admin/setislegal/${id}?isLegal=true`);
        return response.data;
    }
);
export const memesSlice = createSlice({
    name: 'memes',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null; // Clear the error message
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchMemesToInspection.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMemesToInspection.fulfilled, (state, action) => {
                state.loading = false;
                state.memes = action.payload;
            })
            .addCase(fetchMemesToInspection.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch memes to inspection";
            })
            .addCase(fetchMemesToApprove.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMemesToApprove.fulfilled, (state, action) => {
                state.loading = false;
                state.memes = action.payload;
            })
            .addCase(fetchMemesToApprove.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch memes to approve";
            })
            .addCase(rejectMeme.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(rejectMeme.fulfilled, (state, action) => {
                state.loading = false;
                console.log("Meme rejected:", action.payload);
            })
            .addCase(rejectMeme.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to reject meme";
            })
            .addCase(approveMeme.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(approveMeme.fulfilled, (state, action) => {
                state.loading = false;
                console.log("Meme approve:", action.payload);
            })
            .addCase(approveMeme.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to reject meme";
            });
    }

})

export const {clearError} = memesSlice.actions
export const memesReducer = memesSlice.reducer;