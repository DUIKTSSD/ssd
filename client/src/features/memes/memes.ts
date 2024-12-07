import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import {ContentResponse, MemesData} from "../../components/adminPage/types/adminTypes.ts";
import api from "../../api/api.ts";


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
        const response = await api.get<ContentResponse<MemesData>>('/memes/admin/memetoinspection')
        return response.data.content;
    }
)
export const addMemesToInspection = createAsyncThunk(
    "memes/addMemesToInspection",
    async (formData: FormData) => {
        const response = await api.post<MemesData[]>("/memes/add", formData, {
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
        const response = await api.get<ContentResponse<MemesData>>('/memes');
        return response.data.content;
    }
);

export const rejectMeme = createAsyncThunk(
    'memes/rejectApproveMeme',
    async (id: number) => {
        await api.delete<MemesData[]>(`/memes/admin/del/${id}`);
        return id
    }
);
export const approveMeme = createAsyncThunk(
    'memes/approveMeme',
    async (id: number) => {
        await api.post<MemesData[]>(`/memes/admin/setislegal/${id}?isLegal=true`);
        return id;
    }
);
export const memesSlice = createSlice({
    name: 'memes',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
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
            .addCase(addMemesToInspection.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addMemesToInspection.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to add memes to inspection";
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
               state.memes = state.memes.filter((meme) => meme.id !== action.payload);
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
                state.memes = state.memes.filter((meme) => meme.id !== action.payload);
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