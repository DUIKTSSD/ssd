import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import "../../api/api";
import {ContentResponse, VacanciesData,} from "../../components/adminPage/types/adminTypes.ts";
import api from "../../api/api.ts";


interface VacanciesState {
    vacancies: VacanciesData[];
    loading: boolean
    error: string | null
}


const initialState: VacanciesState = {
    vacancies: [],
    loading: false,
    error: null
}

export const fetchVacanciesToView = createAsyncThunk(
    'vacancies/fetchToView',
    async () => {
        try {
            const response = await api.get<ContentResponse<VacanciesData>>("/vacancy");
            return response.data.content;
        } catch (err) {
            console.error('Error while fetching news', err)
        }

    }
)
export const vacanciesSlice = createSlice({
    name: 'announcement',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchVacanciesToView.pending, (state) => {
                state.loading = true
                clearError()
            })
            .addCase(fetchVacanciesToView.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Error while fetching projects'
            })

            .addCase(fetchVacanciesToView.fulfilled, (state, action) => {
                state.loading = false;
                state.vacancies = action.payload || [];
            })

    }
})

export const {clearError} = vacanciesSlice.actions;
export const vacanciesReducer = vacanciesSlice.reducer;