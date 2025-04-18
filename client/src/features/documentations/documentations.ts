import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {ContentResponse, DocumentationsData} from "../../components/adminPage/types/adminTypes.ts";
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

export const addDocumentation = createAsyncThunk(
    "documentations/addDocumentation",
    async (formData: FormData) => {
        try {
            const response = await api.post("/document/admin/add", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            return response.data;
        } catch (err) {
            console.error('Error while add Documentation', err)
            alert("Сталася помилка під час надсилання документації");
        }
    }
);

export const fetchDocumentations = createAsyncThunk(
    "documentations/fetchDocumentations",
    async () => {
        try {
            const response = await api.get<ContentResponse<DocumentationsData>>("/document");
            return response.data.content;
        } catch (err) {
            console.error('Error while fetching documentations', err)
        }
    }
);

export const deleteDocumentation = createAsyncThunk(
    "documentations/deleteDocumentation",
    async (id: number) => {
        try {
            const response = await api.delete(`/document/admin/del/${id}`);

            return response.data;
        } catch (err) {
            console.error('Error while deleting documentation', err)
        }

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
                state.documentations = action.payload ||[];
            })
            .addCase(fetchDocumentations.rejected, (state, action) => {
                state.loading = false;
               state.error = action.error.message || 'Error while fetching documentations'
            })

            .addCase(addDocumentation.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addDocumentation.fulfilled, (state,action) => {
                state.loading = false;
                state.documentations.push(action.payload);
            })
            .addCase(addDocumentation.rejected, (state, action) => {
                state.loading = false;
               state.error = action.error.message || 'Error while adding documentations'
            })

            .addCase(deleteDocumentation.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteDocumentation.fulfilled, (state,action) => {
                state.loading = false;
                 state.documentations = state.documentations.filter(doc => doc.id !== action.meta.arg);
            })
            .addCase(deleteDocumentation.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Error while deleting documentation'
            });
    },
});

export const {clearError} = documentationsSlice.actions;
export default documentationsSlice.reducer;
