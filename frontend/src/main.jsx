import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import { Home } from "./routes/Home";
import { Register } from "./routes/Register";
import { Login } from "./routes/Login";
import { AdminPage } from "./routes/AdminPage";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import { Favorites } from "./components/Favorites";
import { FavoritesProvider } from "./contexts/FavoritesContext";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: 'login',
    element: <Login />,
  },
  {
    path: 'register',
    element: <Register />,
  },
  {
    path: 'admin',
    element: <ProtectedRoute />, 
    children: [
      {
        path: '',
        element: <AdminPage />,
      },
    ],
  },
  {
    element: <ProtectedRoute />, 
    children: [
      {
        path: 'favorites', 
        element: <Favorites />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <FavoritesProvider>
        <RouterProvider router={router} />
      </FavoritesProvider>
    </AuthProvider>
  </React.StrictMode>
);
