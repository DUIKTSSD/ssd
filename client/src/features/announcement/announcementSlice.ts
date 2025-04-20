import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import "../../api/api";
import {AnnouncementData, ContentResponse,} from "../../components/adminPage/types/adminTypes.ts";
import api from "../../api/api.ts";


interface AnnouncementState {
    announcement: AnnouncementData[];
    loading: boolean
    error: string | null
}


const initialState: AnnouncementState = {
    announcement: [],
    loading: false,
    error: null
}

export const fetchAnnouncementToView = createAsyncThunk(
    'announcement/fetchToView',
    async () => {
        try {
            const response = await api.get<ContentResponse<AnnouncementData>>("/announcement/all?pageNumber=0&pageSize=3");
            return response.data.content;
        } catch (err) {
            console.error('Error while fetching news', err)
        }

    }
)
export const fetchAnnouncementToViewAll = createAsyncThunk(
    'announcement/fetchAllToView',
    async () => {
        try {
            const response = await api.get<ContentResponse<AnnouncementData>>("/announcement/all");
            return response.data.content;
        } catch (err) {
            console.error('Error while fetching news', err)
        }

    }
)
export const announcementSlice = createSlice({
    name: 'announcement',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAnnouncementToView.pending, (state) => {
                state.loading = true
                clearError()
            })
            .addCase(fetchAnnouncementToView.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Error while fetching projects'
            })

            .addCase(fetchAnnouncementToView.fulfilled, (state, action) => {
                state.loading = false;
                state.announcement = action.payload || [];
            })
        .addCase(fetchAnnouncementToViewAll.pending, (state) => {
                state.loading = true
                clearError()
            })
            .addCase(fetchAnnouncementToViewAll.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Error while fetching projects'
            })

            .addCase(fetchAnnouncementToViewAll.fulfilled, (state, action) => {
                state.loading = false;
                state.announcement = action.payload || [];
            })

    }
})

export const {clearError} = announcementSlice.actions;
export const announcementReducer = announcementSlice.reducer;