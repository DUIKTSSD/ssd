import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import {ProjectsData} from "../../components/adminPage/types/adminTypes.ts";
import api from "../../api/api.ts";


interface ProjectsState {
    projects: ProjectsData[]
    loading: boolean
    error: string | null;
}

interface setProjectApprovementArgs {
    id: number,
    isLegal: boolean
}

const initialState: ProjectsState = {
    projects: [],
    loading: false,
    error: null
}

export const fetchProjectsToInspection = createAsyncThunk(
    'projects/fetchProjectsToInspection',
    async() => {
        const response = await api.get<ProjectsData[]>('/projects/admin/toinspection')
        return response.data;
    }
)

export const fetchProjectsToView = createAsyncThunk(
    'projects/fetchProjectsToView',
    async() => {
        const response = await api.get<ProjectsData[]>('/projects')
        return response.data;
    }
)

export const addProject = createAsyncThunk(
    'projects/addProject',
    async(project: Omit<ProjectsData, 'id'>) => {
        const response = await api.post<ProjectsData>(`/projects`, project)
        return response.data
    }
)

export const setProjectApprovement = createAsyncThunk(
    'projects/setProjectApprovement',
    async({id, isLegal}: setProjectApprovementArgs,{dispatch}) => {
        const response = await api.post(`/projects/admin/setislegal/${id}?isLegal=${isLegal}`)
        dispatch(fetchProjectsToInspection())
        return response.data
    }
)

export const deleteProject = createAsyncThunk(
    'projects/deleteProject',
    async(id: number) => {
        const response = await api.delete(`/projects/del/${id}`)
        return response.data
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
                state.projects = action.payload
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
                state.error = null
            })
            .addCase(addProject.fulfilled, (state, action) => {
                state.loading = false;
                state.projects.push(action.payload)
            })
            .addCase(addProject.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to add project"
            })
    }

})

export const {clearError} = projectsSlice.actions
export default projectsSlice.reducer;