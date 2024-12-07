import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {CollectivesData} from "../../components/adminPage/types/adminTypes";
import api from "../../api/api";

interface CollectivesState {
    collective: {
        withCommand: CollectivesData[];
        withoutCommand: CollectivesData[];
    };
    loading: boolean;
    error: string | null;
}

const initialState: CollectivesState = {
    collective: {
        withCommand: [],
        withoutCommand: []
    },
    loading: false,
    error: null,
};

export const addCollective = createAsyncThunk(
    "collective/addCollective",
    async (data:FormData,  {dispatch}) => {
        try {
            const response = await api.post<CollectivesData>("/collective/admin/add", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
             dispatch(fetchCollectives());// Не знаю как сделать так чтобы без диспача обновлялся
            return response.data;
        } catch (error) {
            console.error('Error adding collective', error)
            alert("Сталася помилка під час додавання колектива");
        }
    }
);

export const fetchCollectives = createAsyncThunk<CollectivesData[]>(
    "collective/fetchCollectives",
    async () => {
        const response = await api.get<CollectivesData[]>("/collective");
        return response.data;
    }
);

export const deleteCollective = createAsyncThunk<void, number>(
    "collective/deleteCollective",
    async (id: number) => {
        await api.delete(`/collective/admin/del/${id}`);
    }
);

export const fetchCollectivesById = createAsyncThunk<CollectivesData, number>(
    "collective/fetchCollectivesById",
    async (id) => {
        const response = await api.get<CollectivesData>(`/collective/${id}`);
        return response.data;
    }
);

export const CollectiveSlice = createSlice({
    name: "collectives",
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch Collectives
            .addCase(fetchCollectives.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCollectives.fulfilled, (state, action) => {
                state.loading = false;
                state.collective.withCommand = action.payload.filter(item => item.team !== null && item.team !== "");
                state.collective.withoutCommand = action.payload.filter(item => !item.team || item.team === "");
            })
            .addCase(fetchCollectives.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? "Failed to fetch collectives";
            })
            // Add Collective
            .addCase(addCollective.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addCollective.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(addCollective.rejected, (state) => {
                state.loading = false;
               state.error =  "Failed to add collective";
            })
            // Delete Collective
            .addCase(deleteCollective.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteCollective.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(deleteCollective.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? "Failed to delete collective";
            })
            // Fetch Collective by ID
            .addCase(fetchCollectivesById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCollectivesById.fulfilled, (state, action) => {
                state.loading = false;
                state.collective = {
                    withCommand: action.payload.team ? [action.payload] : [],
                    withoutCommand: !action.payload.team ? [action.payload] : []
                };
            })
            .addCase(fetchCollectivesById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? "Failed to fetch collective by ID";
            });
    },
});

export const { clearError } = CollectiveSlice.actions;
export const collectivesReducer = CollectiveSlice.reducer;
