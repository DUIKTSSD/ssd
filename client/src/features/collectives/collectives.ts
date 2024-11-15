import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { CollectivesData } from "../../components/adminPage/types/adminTypes.ts";
import api from "../../api/api.ts";

interface CollectivesState {
    collective: CollectivesData[];
    loading: boolean;
    error: string | null;
}

const initialState: CollectivesState = {
    collective: [],
    loading: false,
    error: null,
};

export const addCollective = createAsyncThunk(
    "collective/addCollective",
    async () => {
        const response = await api.post<CollectivesData[]>("/collective/admin/add");
        return response.data;
    }
);

export const fetchCollectives = createAsyncThunk(
    "collective/fetchCollectives",
    async () => {
        const response = await api.get<CollectivesData[]>("/collective");
        return response.data;
    }
);

export const deleteCollective = createAsyncThunk(
    "collective/deleteCollective",
    async (id: string) => {
        const response = await api.post<CollectivesData[]>(`/collective/admin/del/${id}`);
        return response.data;
    }
);

export const fetchCollectivesById = createAsyncThunk(
    "collective/fetchCollectivesById",
    async (id: string) => {
        const response = await api.get<CollectivesData>(`/collective/${id}`);
        return response.data;
    }
);

export const CollectiveSlice = createSlice({
    name: "collectives",
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null; // Clear the error message
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCollectives.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCollectives.fulfilled, (state, action) => {
                state.loading = false;
                state.collective = action.payload;
            })
            .addCase(fetchCollectives.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch collectives";
            })
            .addCase(addCollective.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addCollective.fulfilled, (state, action) => {
                state.loading = false;
                state.collective = action.payload;
            })
            .addCase(addCollective.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to add collective";
            })
            .addCase(deleteCollective.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteCollective.fulfilled, (state, action) => {
                state.loading = false;
                state.collective = action.payload;
            })
            .addCase(deleteCollective.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to delete collective";
            })
            .addCase(fetchCollectivesById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCollectivesById.fulfilled, (state, action) => {
                state.loading = false;
                state.collective = [action.payload]; // Assuming a single collective is returned
            })
            .addCase(fetchCollectivesById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch collective by ID";
            });
    },
});

export const { clearError } = CollectiveSlice.actions;
export const collectivesReducer = CollectiveSlice.reducer;
