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
            const response = await api.get<ContentResponse<AnnouncementData>>("/announcement/in-order?pageNumber=0&pageSize=3");
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
            const response = await api.get<ContentResponse<AnnouncementData>>("/announcement/in-order");
            return response.data.content;
        } catch (err) {
            console.error('Error while fetching news', err)
        }

    }
)
export const deleteAnnouncement = createAsyncThunk(
    'announcement/del',
    async (id: number) => {
        await api.delete(`announcement/admin/del/${id}`)
        return id
    }
)
export const addAnnouncement = createAsyncThunk(
    "announcement/addAnnouncement",
    async (data: FormData) => {
        try {
            const response = await api.post<AnnouncementData>("/announcement/admin/add", data,{
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error adding Announcement', error)
            alert("Сталася помилка під час додавання ");
        }
    }
);

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
            .addCase(deleteAnnouncement.pending, (state) => {
                state.loading = true;
                clearError()
            })
            .addCase(deleteAnnouncement.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Error while adding news'
            })

            .addCase(deleteAnnouncement.fulfilled, (state, action) => {
                state.loading = false;
                state.announcement = state.announcement.filter((news) => news.id !== action.payload);
            })
        .addCase(addAnnouncement.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addAnnouncement.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(addAnnouncement.rejected, (state) => {
                state.loading = false;
               state.error =  "Failed to add collective";
            })

    }
})

export const {clearError} = announcementSlice.actions;
export const announcementReducer = announcementSlice.reducer;