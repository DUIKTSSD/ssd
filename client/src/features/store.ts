import {configureStore} from "@reduxjs/toolkit";
import projectsReducer from "./projects/projectsSlice"
import {authReducer} from "./auth/authSlice.ts";
import documentationsReducer from "./documentations/documentations";
import {memesReducer} from "./memes/memes.ts";
import {newsReducer} from "./news/newsSlice.ts";

export const store = configureStore({
    reducer: {
        projects: projectsReducer,
        auth: authReducer,
        documentations: documentationsReducer,
        news: newsReducer,
        memes:memesReducer
    }
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
