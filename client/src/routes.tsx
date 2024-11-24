
import {
    createBrowserRouter,
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
import AdminDocumentationsPage from "./pages/adminPages/AdminDocumentationsPage.tsx";
import DocumentationPage from "./pages/documentationPage/DocumentationPage.tsx";
import CollectivePage from "./pages/collectivePage/CollectivePage.tsx";
import CollectiveLeaders from "./pages/collectivePage/CollectiveLeaders.tsx";
import CollectiveDep from "./pages/collectivePage/CollectiveDep.tsx";
import AdminCollectivesLeadersPage from "./pages/adminPages/collectivePage/AdminCollectivesLeadersPage.tsx";
import AdminCollectivesDepartmentPage from "./pages/adminPages/collectivePage/AdminCollectivesDepartmentPage.tsx";
import React from "react";
import CollectiveItemDetails from "./pages/collectivePage/CollectiveItemDetails.tsx";
import VerificationPage from "./pages/AuthorizationPage/VerificationPage.tsx";

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
        path: "/documentations",
        element: <DocumentationPage/>
    },
    {
        path: '/news/view/:id',
        element: <NewsDetails/>
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
        path: "/admin/projects",
        element: <AdminProjectsPage />
    },
    {
        path: "/admin/gallery",
        element: <AdminGalleryPage />
    },
    {
      path: 'admin/memes/inspection',
      element: <AdminMemesInspectionPage></AdminMemesInspectionPage>
    },
    {
      path: 'admin/memes/approve',
      element: <AdminMemesApprovePage></AdminMemesApprovePage>
    },
    {
        path: 'admin/docs',
        element: <AdminDocumentationsPage/>
    },
    {
        path: 'admin/collective/leaders',
        element: <AdminCollectivesLeadersPage/>
    },
    {
        path: 'admin/collective/department',
        element: <AdminCollectivesDepartmentPage/>
    },
    {
        path: "/admin/news",
        element: <AdminNewsPage />
    },
    {
        path: "/admin",
        element: <AdminPage />
    }

], {
    basename: '/ssd/'
});
