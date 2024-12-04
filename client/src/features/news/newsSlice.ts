import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api.ts";
import { NewsData } from "../../components/adminPage/types/adminTypes.ts";

interface NewsState {
    news: NewsData[];
    loading: boolean;
    error: string | null;
}

const initialState: NewsState = {
    news: [],
    loading: false,
    error: null,
};

// Fetch news for viewing
export const fetchNewsToView = createAsyncThunk<NewsData[]>(
    'news/fetchToView',
    async () => {
        try {
            const response = await api.get<NewsData[]>("/news");
            return response.data;
        } catch (err) {
            console.error('Error while fetching news', err);
            throw err; // Propagate error for the rejected case
        }
    }
);

// Add news
export const addNews = createAsyncThunk<NewsData, FormData>(
    'news/add',
    async (credentials, { dispatch }) => {
        try {
            const response = await api.post<NewsData>('news/admin/add', credentials, {
                headers: {
                    'Content-Type': "multipart/form-data",
                },
            });
            console.log('News added');
            dispatch(fetchNewsToView()); // Refresh news list after adding
            return response.data;
        } catch (err) {
            console.error('Error while adding news', err);
            throw err; // Propagate error for the rejected case
        }
    }
);

// Delete news
export const deleteNews = createAsyncThunk<number, number>(
    'news/del',
    async (id, { dispatch }) => { // блять саня я твой код в рот ебал какого хуя диспач забыл в редююсере сука это интерфейс который юзает этот ебаный редьюсер ну блять
        try {
            dispatch(fetchNewsToView()); // Refresh news list after deleting
            return id; // Return the ID of the deleted news item
        } catch (err) {
            console.error('Error while deleting news', err);
            throw err; // Propagate error for the rejected case
        }
    }
);

const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchNewsToView.pending, (state) => {
                state.loading = true;
                state.error = null; // Reset error
            })
            .addCase(fetchNewsToView.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Error while fetching news';
            })
            .addCase(fetchNewsToView.fulfilled, (state, action) => {
                state.loading = false;
                state.news = action.payload ?? []; // Ensure it's an array even if null or undefined
            })
            .addCase(addNews.pending, (state) => {
                state.loading = true;
                state.error = null; // Reset error
            })
            .addCase(addNews.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Error while adding news';
            })
            .addCase(addNews.fulfilled, (state, action) => {
                state.loading = false;
                state.news.push(action.payload); // Add the new news item to the list
            })
            .addCase(deleteNews.pending, (state) => {
                state.loading = true;
                state.error = null; // Reset error
            })
            .addCase(deleteNews.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Error while deleting news';
            })
            .addCase(deleteNews.fulfilled, (state, action) => {
                state.loading = false;
                state.news = state.news.filter(newsItem => newsItem.id !== action.payload); // Remove deleted item
            });
    },
});

export const { clearError } = newsSlice.actions;
export const newsReducer = newsSlice.reducer;
