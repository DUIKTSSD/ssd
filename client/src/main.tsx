    import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import "./styles/_variables/_tags.scss";

import {
    createBrowserRouter,
    RouterProvider
} from "react-router-dom";

import MainPage from "./pages/mainPage/MainPage.tsx";
import LoginPage from "./pages/AuthorizationPage/LoginPage.tsx";
import SignUpPage from "./pages/AuthorizationPage/SignUpPage.tsx";


//Admin
import AdminPage from "./pages/adminPages/AdminPage.tsx";
import AdminGalleryPage from "./pages/adminPages/AdminGalleryPage.tsx";
import AdminMemesPage from "./pages/adminPages/AdminMemesPage.tsx";
import AdminNewsPage from "./pages/adminPages/AdminNewsPage.tsx";
import AdminProjectsPage from "./pages/adminPages/AdminProjectsPage.tsx";


// Projects
import ProjectsPage from "./pages/projectsPage/ProjectsPage.tsx";
import ProjectsCreate from "./pages/projectsPage/ProjectsCreate.tsx";
    import {Provider} from "react-redux";
    import {store} from "./features/store.ts";
    import ProjectsJoin from "./pages/projectsPage/ProjectsJoin.tsx";
    import DocumentationPage from "./pages/documentationPage/DocumentationPage.tsx";
    import AdminDocumentationsPage from "./pages/adminPages/AdminDocumentationsPage.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainPage />,
        errorElement: <h1>This page doesn't exist now!</h1>
    },
    {
        path: "/login",
        element: <LoginPage />
    },
    {
        path: "/signup",
        element: <SignUpPage />
    },
    {
      path: "/projects",
      element: <ProjectsPage/>
    },
    {
        path: "/documentations",
        element: <DocumentationPage/>
    },
    {
        path: "/projects/create",
        element: <ProjectsCreate/>
    },
    {
        path: "/projects/join",
        element: <ProjectsJoin/>
    },
    {
        path: "/admin/projects",
        element: <AdminProjectsPage />
    },
    {
        path: "/admin/gallery",
        element: <AdminGalleryPage />
    },
    {
        path: "/admin/memes",
        element: <AdminMemesPage />
    },
    {
        path: "/admin/news",
        element: <AdminNewsPage />   // Добавлено element для корректного рендеринга
    },
    {
        path: "/admin/documentations",
        element: <AdminDocumentationsPage/>
    },
    {
        path: "/admin",
        element: <AdminPage />
    }

], {
    basename: '/ssd/'
});

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
      <React.StrictMode>
          <RouterProvider router={router} />
      </React.StrictMode>
    </Provider>
);
