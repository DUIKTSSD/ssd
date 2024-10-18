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
import AdminPage from "./pages/adminPages/AdminPage.tsx";
import ProjectsPage from "./pages/adminPages/ProjectsPage.tsx";
import GalleryPage from "./pages/adminPages/GalleryPage";
import MemesPage from "./pages/adminPages/MemesPage";
import NewsPage from "./pages/adminPages/NewsPage";

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
        path: "/admin/projects",
        element: <ProjectsPage />
    },
    {
        path: "/admin/gallery",
        element: <GalleryPage />
    },
    {
        path: "/admin/memes",
        element: <MemesPage />
    },
    {
        path: "/admin/news",
        element: <NewsPage />   // Добавлено element для корректного рендеринга
    },
    {
        path: "/admin",
        element: <AdminPage />
    }

], {
    basename: '/ssd/'
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);
