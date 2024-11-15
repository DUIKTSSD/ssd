import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DocumentationsData } from "../../components/adminPage/types/adminTypes.ts";
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
    async (formData: FormData, { rejectWithValue }) => {
        try {
            const response = await api.post("/document/admin/add", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Ошибка");
        }
    }
);

// Получение списка документаций
export const fetchDocumentations = createAsyncThunk(
    "documentations/fetchDocumentations",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get<DocumentationsData[]>("/document");
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Ошибка");
        }
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
                state.documentations = action.payload;
            })
            .addCase(fetchDocumentations.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Обработка addDocumentation
            .addCase(addDocumentation.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addDocumentation.fulfilled, (state, action) => {
                state.loading = false;
                state.documentations.push(action.payload); // Добавляем новый документ в список
            })
            .addCase(addDocumentation.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Обработка deleteDocumentations
            .addCase(deleteDocumentations.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteDocumentations.fulfilled, (state, action) => {
                state.loading = false;
                state.documentations = state.documentations.filter(
                    (doc) => doc.id !== action.payload
                );
            })
            .addCase(deleteDocumentations.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { clearError } = documentationsSlice.actions;
export default documentationsSlice.reducer;
