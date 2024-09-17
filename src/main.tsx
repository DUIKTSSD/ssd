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

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainPage/>,
        errorElement: <h1>This page doesn't exist now!</h1>
    },
    {
        path: "/login",
        element: <LoginPage/>
    },
    {
        path: "/signup",
        element: <SignUpPage/>
    },

], {
    basename: '/ssd/'
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <RouterProvider router={router}/>
  </React.StrictMode>,
)
