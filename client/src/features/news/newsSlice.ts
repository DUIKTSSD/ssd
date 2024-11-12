import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import "../../api/api";
import {NewsData} from "../../components/adminPage/types/adminTypes.ts";
import api from "../../api/api.ts";


interface NewsState {
    news: NewsData[]
    loading: boolean
    error: string | null
}

interface AddNewsCredentials {
    title: string,
    content: string,
    images: string[],
}

const initialState: NewsState = {
    news: [],
    loading: false,
    error: null
}

export const fetchNewsToView = createAsyncThunk(
    'news/fetchToView',
    async() => {
        try {
            const response = await api.get('/news')
            return response.data
        } catch(err) {
            console.error('Error while fetching news', err)
        }

    }
)

export const addNews = createAsyncThunk(
    'news/add',
    async(credentials: AddNewsCredentials) => {
        const response = await api.post<NewsData>('news/admin/add', credentials)
        console.log('news added =)')
        return response.data
    }
)

export const deleteNews = createAsyncThunk(
    'news/del',
    async(id: number) => {
        const response = await api.delete(`news/admin/del${id}`)
        return response.data
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
                state.news = action.payload
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
    }
})

export const {clearError} = newsSlice.actions;
export default newsSlice.reducer;