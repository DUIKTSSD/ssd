import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import {MemesData} from "../../components/adminPage/types/adminTypes.ts";
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
    async () => {
        try {
            const response = await api.get<MemesData[]>('/memes/admin/memetoinspection')
            return response.data;
        } catch (err) {
            console.error('Error while fetch Memes', err)
        }
    }
)
export const addMemesToInspection = createAsyncThunk(
  "memes/addMemesToInspection",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const response = await api.post("/memes/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (err) {
      console.error("Error while adding Meme to Inspection", err);
      return rejectWithValue(err.response?.data?.message || "Failed to upload meme");
    }
  }
);

export const fetchMemesToApprove = createAsyncThunk(
    'memes/fetchMemesToApprove',
    async () => {
        try {
            const response = await api.get<MemesData[]>('/memes');
            return response.data;
        } catch (err) {
            console.error('Error while fetch Approve Memes', err)
            return Promise.reject(err?.message || "Немає доступних мемів");
        }
    }
);
export const rejectMeme = createAsyncThunk(
    'memes/rejectMeme',
    async (id: string) => {
        try {
            const response = await api.post<MemesData[]>(`/memes/admin/setislegal/${id}?isLegal=false`);
            return response.data;
        } catch (err) {
            console.error('Error while reject Meme', err)
        }
    }
);
export const rejectApproveMeme = createAsyncThunk(
    'memes/rejectApproveMeme',
    async (id: string) => {
        try {

            const response = await api.delete<MemesData[]>(`/memes/admin/del/${id}`);
            return response.data;
        } catch (err) {
            console.error('Error while reject Approve Meme', err)
        }
    }
);
export const approveMeme = createAsyncThunk(
    'memes/approveMeme',
    async (id: string) => {
        try {
            const response = await api.post<MemesData[]>(`/memes/admin/setislegal/${id}?isLegal=true`);
            return response.data;
        } catch (err) {
            console.error('Error while approve Meme', err)
        }
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
                state.error = action.error.message || action.payload || "Failed to fetch memes for approval";
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