import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProfilePage from "./Pages/ProfilePage";
import TopicPage from "./Pages/TopicPage";
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
import BlockedPage from "./Pages/BlockedPage";
import FriendsPage from "./Pages/FriendsPage";
import RequestsPage from "./Pages/RequestsPage";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        { path: "/", element: <MainPage /> },
        { path: "/perfil", element: <ProfilePage /> },
        { path: "/perfil/:username", element: <ProfilePublic /> },
        { path: "/topic/:topicId", element: <TopicPage /> },
        { path: "/post/:postId", element: <PostPage /> },
        { path: "/crear/:topicId", element: <PostCreationPage /> },
        { path: "/inicioSesion", element: <LoginPage /> },
        { path: "/registro", element: <SignUpPage /> },
        { path: "/ayuda", element: <HelpPage /> },
        { path: "/mensajes", element: <MessengerPage /> },
        { path: "/historial/:username", element: <HistorialPage /> },
        { path: "/bloqueados", element: <BlockedPage /> },
        { path: "/amigos", element: <FriendsPage /> },
        { path: "/peticiones", element: <RequestsPage /> },
        { path: "/buscar", element: <SearchPage /> },
        { path: "*", element: <ErrorPage /> },
      ],
    },
  ],
  { basename: process.env.PUBLIC_URL }
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
