import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import "../../api/api";
import { ContentResponse, VacanciesData,} from "../../components/adminPage/types/adminTypes.ts";
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
            console.error('Error while fetching vacancies', err)
        }

    }
)
export const deleteVacancy = createAsyncThunk(
    'vacancies/del',
    async (id: number) => {
        await api.delete(`vacancy/admin/del/${id}`)
        return id
    }
)
export const addVacancy = createAsyncThunk(
    "vacancies/addVacancy",
    async (data: FormData) => {
        try {
            const response = await api.post<VacanciesData>("/vacancy/admin/add", data)
            return response.data;
        } catch (error) {
            console.error('Error adding vacancy', error)
            alert("Сталася помилка під час додавання ");
        }
    }
);
export const vacanciesSlice = createSlice({
    name: 'vacancies',
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
                state.error = action.error.message || 'Error while fetching Vacancies'
            })

            .addCase(fetchVacanciesToView.fulfilled, (state, action) => {
                state.loading = false;
                state.vacancies = action.payload || [];
            })
            .addCase(deleteVacancy.pending, (state) => {
                state.loading = true;
                clearError()
            })
            .addCase(deleteVacancy.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Error '
            })

            .addCase(deleteVacancy.fulfilled, (state, action) => {
                state.loading = false;
                state.vacancies = state.vacancies.filter((vacancies) => vacancies.id !== action.payload);
            })
        .addCase(addVacancy.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addVacancy.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(addVacancy.rejected, (state) => {
                state.loading = false;
               state.error =  "Failed to add collective";
            })

    }
})

export const {clearError} = vacanciesSlice.actions;
export const vacanciesReducer = vacanciesSlice.reducer;