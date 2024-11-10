import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {DocumentationsData, ProjectsData} from "../../components/adminPage/types/adminTypes.ts";
import api from "../../api/api.ts";


interface DocumentationsState {
    documentations: DocumentationsData[];
    loading: boolean;
    error: string | null;
}

const initialState: DocumentationsState = {
    documentations: [],
    loading: false,
    error: null,
};


export const fetchDocumentations = createAsyncThunk(
    "documentations/fetchProjectsToInspection",
    async () => {
        const response = await api.get<DocumentationsData[]>("/document");
       return response.data;
    }
);

export const deleteDocumentations = createAsyncThunk(
    "documentations/deleteProject",
    async (id: number) => {
        const response = await api.delete(`document/admin/del/${id}`);
        return response.data;
    }
);

export const documentationsSlice = createSlice({
    name: "documentations",
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDocumentations.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDocumentations.fulfilled, (state, action) => {
                state.loading = false;
                state.documentations = action.payload; // Change to 'documentations'
            })
            .addCase(fetchDocumentations.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch documents";
            })

    },
});

export const { clearError } = documentationsSlice.actions;
export default documentationsSlice.reducer;
