import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import "../../api/api";
import {ContentResponse, NewsData} from "../../components/adminPage/types/adminTypes.ts";
import api from "../../api/api.ts";


interface NewsState {
    news: NewsData[]
    loading: boolean
    error: string | null
}


const initialState: NewsState = {
    news: [],
    loading: false,
    error: null
}

export const fetchNewsToView = createAsyncThunk(
    'news/fetchToView',
    async () => {
        try {
            const response = await api.get<ContentResponse<NewsData>>("/news");
            return response.data.content;
        } catch (err) {
            console.error('Error while fetching news', err)
        }

    }
)

export const addNews = createAsyncThunk(
    'news/add',
    async (credentials: FormData) => {
        try {
            const response = await api.post<NewsData>('news/admin/add', credentials, {
                headers: {
                    'Content-Type': "multipart/form-data"
                }
            })
            console.log('News added');
            return response.data;
        } catch (err) {
            console.error('Error: ' + err);
        }

    }
);
export const deleteNews = createAsyncThunk(
    'news/del',
    async (id: number) => {
        await api.delete(`news/admin/del/${id}`)
        return id
    }
)


export const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchNewsToView.pending, (state) => {
                state.loading = true
                clearError()
            })
            .addCase(fetchNewsToView.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Error while fetching projects'
            })

            .addCase(fetchNewsToView.fulfilled, (state, action) => {
                state.loading = false;
                state.news = action.payload || [];
            })


            .addCase(addNews.pending, (state) => {
                state.loading = true;
                clearError()
            })

            .addCase(addNews.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Error while adding news'
            })

            .addCase(addNews.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(deleteNews.pending, (state) => {
                state.loading = true;
                clearError()
            })
            .addCase(deleteNews.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Error while adding news'
            })

            .addCase(deleteNews.fulfilled, (state,action) => {
                state.loading = false;
                state.news = state.news.filter((news) => news.id !== action.payload);
            })
    }
})

export const {clearError} = newsSlice.actions;
export const newsReducer = newsSlice.reducer;