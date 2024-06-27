import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProfilePage from "./Pages/ProfilePage";
import SearchPage from "./Pages/SearchPage";
import PostPage from "./Pages/PostPage";
import PostCreationPage from "./Pages/PostCreationPage";
import ErrorPage from "./Pages/ErrorPage";
import LoginPage from "./Pages/LoginPage";
import HelpPage from "./Pages/HelpPage";
import ProfilePublic from "./Pages/ProfilePublic";
import MessengerPage from "./Pages/MessengerPage";
import SignUpPage from "./Pages/SignUpPage";
import MainPage from "./Pages/MainPage";
import HistorialPage from "./Pages/HistorialPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <MainPage /> },
      { path: "/profile", element: <ProfilePage /> },
      { path: "/profile/id", element: <ProfilePublic /> },
      { path: "/search", element: <SearchPage /> },
      { path: "/post", element: <PostPage /> },
      { path: "/create", element: <PostCreationPage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <SignUpPage /> },
      { path: "/help", element: <HelpPage /> },
      { path: "/messenger", element: <MessengerPage /> },
      { path: "/historial", element: <HistorialPage /> },
      { path: "*", element: <ErrorPage /> },
    ],
  },
],{basename: process.env.PUBLIC_URL});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
