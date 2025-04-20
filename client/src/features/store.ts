import {configureStore} from "@reduxjs/toolkit";
import projectsReducer from "./projects/projectsSlice"
import {authReducer} from "./auth/authSlice.ts";
import documentationsReducer from "./documentations/documentations";
import {memesReducer} from "./memes/memes.ts";
import {newsReducer} from "./news/newsSlice.ts";
import {collectivesReducer} from "./collectives/collectives.ts";
import {LinksReducer} from "./documentations/documentationLinks.ts";
import {announcementReducer} from "./announcement/announcementSlice.ts";

export const store = configureStore({
    reducer: {
        projects: projectsReducer,
        auth: authReducer,
        documentations: documentationsReducer,
        documentationLinks: LinksReducer,
        news: newsReducer,
        announcement: announcementReducer,
        memes:memesReducer,
        collectives:collectivesReducer
    }
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
