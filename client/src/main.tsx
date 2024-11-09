    import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import "./styles/_variables/_tags.scss";
import {Provider} from "react-redux";
import {router} from "./routes.tsx";
import {store} from "./features/store.ts";
import {RouterProvider} from "react-router-dom";


ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
      <React.StrictMode>
          <RouterProvider router={router} />
      </React.StrictMode>
    </Provider>
);
