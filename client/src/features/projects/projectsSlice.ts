import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import {ContentResponse, ProjectsData} from "../../components/adminPage/types/adminTypes.ts";
import api from "../../api/api.ts";


interface ProjectsState {
    projects: ProjectsData[]
    totalPages:number,
    number: number,
    loading: boolean
    error: string | null;
}

interface setProjectApprovementArgs {
    id: number,
    isLegal: boolean
}

const initialState: ProjectsState = {
    projects: [],
    totalPages:0,
    number: 0,
    loading: false,
    error: null
}

export const fetchProjectsToInspection = createAsyncThunk(
    'projects/fetchProjectsToInspection',
    async () => {
        const response = await api.get<ContentResponse<ProjectsData>>('/projects/admin/toinspection')
        return response.data.content;
    }
)

export const fetchProjectsToView = createAsyncThunk(
    'projects/fetchProjectsToView',
    async (page: number = 1,) => {
        const response = await api.get<ContentResponse<ProjectsData>>(`/projects?pageNumber=${page}&pageSize=8`)
        return response.data;
    }
)

export const addProject = createAsyncThunk(
    'projects/addProject',
    async (formData: FormData, {rejectWithValue}) => {
        try {
            const response = await api.post('/projects/add', formData);
            return response.data;
        } catch (error:any) {
            return rejectWithValue(error.response?.data || 'Неможливо зараз відправити проект');
        }
    }
);

export const setProjectApprovement = createAsyncThunk(
    'projects/setProjectApprovement',
    async ({id, isLegal}: setProjectApprovementArgs, {dispatch}) => {
        const response = await api.post(`/projects/admin/setislegal/${id}?isLegal=${isLegal}`)
        dispatch(fetchProjectsToInspection())
        return response.data
    }
)

export const deleteProject = createAsyncThunk(
    'projects/deleteProject',
    async (id: number) => {
        await api.delete(`/projects/admin/del/${id}`)
        return id
    }
)

export const projectsSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchProjectsToInspection.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(fetchProjectsToInspection.fulfilled, (state, action) => {
                state.loading = false;
                state.projects = action.payload
            })
            .addCase(fetchProjectsToView.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(fetchProjectsToView.fulfilled, (state, action) => {
                state.loading = false;
                state.projects = action.payload.content||[]
                state.totalPages = action.payload.totalPages;
                state.number = action.payload.number;
            })
            .addCase(fetchProjectsToView.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch projects"
            })
            .addCase(fetchProjectsToInspection.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch projects"
            })
            .addCase(addProject.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addProject.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(addProject.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
           .addCase(deleteProject.pending, (state) => {
                state.loading = true;
                clearError()
            })
            .addCase(deleteProject.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Error '
            })

            .addCase(deleteProject.fulfilled, (state,action) => {
                state.loading = false;
                state.projects = state.projects.filter((projects) => projects.id !== action.payload);
            })
    }

})

export const {clearError} = projectsSlice.actions
export default projectsSlice.reducer;