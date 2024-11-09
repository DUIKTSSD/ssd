
import {
    createBrowserRouter,
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
import ProjectsJoin from "./pages/projectsPage/ProjectsJoin.tsx";

//News

import NewsPage from './pages/newsPage/News.tsx';
import NewsDetails from "./pages/newsPage/NewsDetails.tsx";

export const router = createBrowserRouter([
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
        path: "/projects/create",
        element: <ProjectsCreate/>
    },
    {
        path: "/projects/join",
        element: <ProjectsJoin/>
    },
    {
      path: "/news",
      element: <NewsPage/>
    },
    {
        path: '/news/view/:id',
        element: <NewsDetails/>
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
        path: "/admin",
        element: <AdminPage />
    }

], {
    basename: '/ssd/'
});