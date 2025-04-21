import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {ContentResponse, DocumentationsData} from "../../components/adminPage/types/adminTypes.ts";
import api from "../../api/api.ts";

interface DocumentationsState {
    documentations: DocumentationsData[];
    totalPages:number,
    number: number,
    loading: boolean;
    error: string | null;
}

const initialState: DocumentationsState = {
    documentations: [],
    totalPages:0,
    number: 0,
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
    async (page: number = 1,{rejectWithValue }) => {
        try {
            const response = await api.get<ContentResponse<DocumentationsData>>(`/document?pageNumber=${page}&pageSize=12`);
            return response.data;
        } catch (err) {
            console.error('Error while fetching documentations', err)
            return rejectWithValue('Failed to fetch Documentations');
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
                state.documentations = action.payload.content ||[];
                state.totalPages = action.payload.totalPages;
                state.number = action.payload.number;
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
