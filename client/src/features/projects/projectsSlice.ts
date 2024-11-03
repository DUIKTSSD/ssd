import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import {ProjectsData} from "../../components/adminPage/types/adminTypes.ts";
import api from "../../api.ts";


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

export const fetchProjects = createAsyncThunk(
    'projects/fetchProjects',
    async() => {
        const response = await api.get<ProjectsData[]>('/projects/admin/toinspection')
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
    async({id, isLegal}: setProjectApprovementArgs) => {
        const response = await api.post(`/projects/admin/setislegal/${id}?isLegal=${isLegal}`)
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
            .addCase(fetchProjects.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(fetchProjects.fulfilled, (state, action) => {
                state.loading = false;
                state.projects = action.payload
            })
            .addCase(fetchProjects.rejected, (state, action) => {
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