
import {
    createBrowserRouter, Navigate, Route, Routes,
} from "react-router-dom";


import MainPage from "./pages/mainPage/MainPage.tsx";
import LoginPage from "./pages/AuthorizationPage/LoginPage.tsx";
import SignUpPage from "./pages/AuthorizationPage/SignUpPage.tsx";


//Admin
import AdminPage from "./pages/adminPages/AdminPage.tsx";
import AdminGalleryPage from "./pages/adminPages/AdminGalleryPage.tsx";
import AdminNewsPage from "./pages/adminPages/AdminNewsPage.tsx";
import AdminProjectsPage from "./pages/adminPages/AdminProjectsPage.tsx";


// Projects
import ProjectsPage from "./pages/projectsPage/ProjectsPage.tsx";
import ProjectsCreate from "./pages/projectsPage/ProjectsCreate.tsx";
import ProjectsJoin from "./pages/projectsPage/ProjectsJoin.tsx";

//News

import NewsPage from './pages/newsPage/News.tsx';
import NewsDetails from "./pages/newsPage/NewsDetails.tsx";
import AdminMemesInspectionPage from "./pages/adminPages/MemePage/AdminMemesInspectionPage.tsx";
import AdminMemesApprovePage from "./pages/adminPages/MemePage/AdminMemesApprovePage.tsx";
import AdminDocumentationsPage from "./pages/adminPages/documentationsPage/AdminDocumentationsPage.tsx";
import DocumentationPage from "./pages/documentationPage/DocumentationPage.tsx";
import CollectivePage from "./pages/collectivePage/CollectivePage.tsx";
import CollectiveLeaders from "./pages/collectivePage/CollectiveLeaders.tsx";
import CollectiveDep from "./pages/collectivePage/CollectiveDep.tsx";
import AdminCollectivesLeadersPage from "./pages/adminPages/collectivePage/AdminCollectivesLeadersPage.tsx";
import AdminCollectivesDepartmentPage from "./pages/adminPages/collectivePage/AdminCollectivesDepartmentPage.tsx";
import CollectiveItemDetails from "./pages/collectivePage/CollectiveItemDetails.tsx";
import React from 'react'
import VerificationPage from "./pages/AuthorizationPage/VerificationPage.tsx";
import {decodeToken} from "./api/decodeToken.ts";
import AdminUsefulLinksPage from "./pages/adminPages/documentationsPage/AdminUsefulLinksPage.tsx";
import AdminCourseLinksPage from "./pages/adminPages/documentationsPage/AdminCourseLinksPage.tsx";
import Announcement from "./pages/announcementPage/Announcement.tsx";
import AnnouncementDetails from "./pages/announcementPage/AnnouncementDetails.tsx";
import Vacancies from "./pages/vacancyPage/Vacancies.tsx";
import VacanciesDetails from "./pages/vacancyPage/VacanciesDetails.tsx";

interface ProtectedRouteProps {
    children: React.ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({children}) => {
    const role = decodeToken()?.role;
    if (role === 'ROLE_ADMIN') {
        return children;
    }
    return <Navigate to="/" replace/>
}

const AdminRoutes = () => {
    return (
        <Routes>
            <Route path="projects" element={<AdminProjectsPage />} />
            <Route path="gallery" element={<AdminGalleryPage />} />
            <Route path="memes/inspection" element={<AdminMemesInspectionPage />} />
            <Route path="memes/approve" element={<AdminMemesApprovePage />} />
            <Route path="docs/ssd" element={<AdminDocumentationsPage/>} />
            <Route path="docs/useful-link" element={<AdminUsefulLinksPage/>} />
            <Route path="docs/course-link" element={<AdminCourseLinksPage/>} />
            <Route path="collective/leaders" element={<AdminCollectivesLeadersPage/>} />
            <Route path="collective/department" element={<AdminCollectivesDepartmentPage/>} />
            <Route path="news" element={<AdminNewsPage />} />
            <Route path="" element={<AdminPage />} />
        </Routes>
    )
}

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
        path: "/verification",
        element:<VerificationPage/>
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
        path: "/documentations/:section?",
        element : <DocumentationPage/>
    },

    {
        path: '/news/view/:id',
        element: <NewsDetails/>
    },
    {
        path:'/announcement',
        element:<Announcement/>
    },
    {
        path:'/announcement/view/:id',
        element:<AnnouncementDetails/>
    },
    {
        path:'/vacancies',
        element:<Vacancies/>
    },
      {
        path:'/vacancies/view/:id',
        element:<VacanciesDetails/>
    },
    {
        path: '/collective',
        element: <CollectivePage/>
    },
    {
        path: 'collective/leaders',
        element: <CollectiveLeaders/>
    },
    {
      path: 'collective/departments',
        element: <CollectiveDep/>
    },
    {
      path: 'collective/departments/:id',
      element: <CollectiveItemDetails/>
    },
    {
        path: "admin/*",
        element: (
            <ProtectedRoute>
                <AdminRoutes/>
            </ProtectedRoute>
        )
    }

], {
    basename: '/ssd/'
});
