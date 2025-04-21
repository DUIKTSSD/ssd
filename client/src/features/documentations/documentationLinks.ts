import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {
    ContentResponse, DocumentationLinksData,
} from "../../components/adminPage/types/adminTypes.ts";
import api from "../../api/api.ts";

interface DocumentationLinksState {
    documentationsLinks: DocumentationLinksData[];
    totalPages:number,
    number: number,
    loading: boolean;
    error: string | null;
}

const initialState: DocumentationLinksState = {
    documentationsLinks: [],
     totalPages:0,
    number: 0,
    loading: false,
    error: null,
};
interface LinkData {
    url: string;
    description: string;
}


export const fetchUsefulLinks = createAsyncThunk(
    "documentations/fetchUsefulLinks",
    async (page: number = 1,{rejectWithValue }) => {
        try {
            const response = await api.get<ContentResponse<DocumentationLinksData>>(`/useful-link?pageNumber=${page}&pageSize=12`);
            return response.data;
        } catch (err) {
            console.error('Error while fetching documentations', err)
            return rejectWithValue('Failed to fetch Documentations');
        }
    }
);
export const fetchCourseLinks = createAsyncThunk(
    "documentations/fetchCourseLinks",
    async (page: number = 1,{rejectWithValue }) => {
        try {
            const response = await api.get<ContentResponse<DocumentationLinksData>>(`/course-link?pageNumber=${page}&pageSize=12`);
            return response.data;
        } catch (err) {
            console.error('Error while fetching documentations', err)
            return rejectWithValue('Failed to fetch Documentations');
        }
    }
);
export const deleteUsefulLinks = createAsyncThunk(
    "documentations/deleteUsefulLinks",
    async (id: number) => {
        try {
            const response = await api.delete(`/useful-link/admin/del/${id}`);
            return response.data;
        } catch (err) {
            console.error('Error while deleting documentation', err)
        }

    }
);
export const deleteCourseLinks = createAsyncThunk(
    "documentations/deleteCourseLinks",
    async (id: number) => {
        try {
            const response = await api.delete(`/course-link/admin/del/${id}`);
            return response.data;
        } catch (err) {
            console.error('Error while deleting documentation', err)
        }

    }
);
export const addUsefulLinks = createAsyncThunk(
    "memes/addUsefulLinks",
    async (formData: LinkData) => {
        const response = await api.post("useful-link/admin/add", formData)
        return response.data;
    }
);
export const addCourseLinks = createAsyncThunk(
    "memes/addCourseLinks",
    async (formData: LinkData) => {
        const response = await api.post("course-link/admin/add", formData)
        return response.data;
    }
);


export const documentationLinksSlice = createSlice({
    name: "documentationLinks",
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsefulLinks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsefulLinks.fulfilled, (state, action) => {
                state.loading = false;
                state.documentationsLinks = action.payload.content || [];
                state.totalPages = action.payload.totalPages;
                state.number = action.payload.number;
            })
            .addCase(fetchUsefulLinks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Error while fetching useful links';
            })

            .addCase(fetchCourseLinks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCourseLinks.fulfilled, (state, action) => {
                state.loading = false;
                state.documentationsLinks = action.payload.content || [];
                state.totalPages = action.payload.totalPages;
                state.number = action.payload.number;
            })
            .addCase(fetchCourseLinks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Error while fetching course links';
            })
            .addCase(deleteUsefulLinks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteUsefulLinks.fulfilled, (state, action) => {
                state.loading = false;
                 state.documentationsLinks = state.documentationsLinks.filter(doc => doc.id !== action.meta.arg);
            })
            .addCase(deleteUsefulLinks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Error while deleting documentation';
            })
            .addCase(deleteCourseLinks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteCourseLinks.fulfilled, (state, action) => {
                state.loading = false;
                 state.documentationsLinks = state.documentationsLinks.filter(doc => doc.id !== action.meta.arg);
            })
            .addCase(deleteCourseLinks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Error while deleting documentation';
            })
           .addCase(addUsefulLinks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addUsefulLinks.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(addUsefulLinks.rejected, (state, action) => {
                state.loading = false;
               state.error = action.error.message || 'Error while adding documentations'
            })
        .addCase(addCourseLinks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addCourseLinks.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(addCourseLinks.rejected, (state, action) => {
                state.loading = false;
               state.error = action.error.message || 'Error while adding documentations'
            })

    },
});
export const { clearError } = documentationLinksSlice.actions;
export const LinksReducer = documentationLinksSlice.reducer
