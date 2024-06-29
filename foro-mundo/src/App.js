import "./css/custom.css";
import "../node_modules/bootstrap-icons/font/bootstrap-icons.css";
import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { ToastProvider } from "./Context/ToastContext";
import useShortcuts from "./shortcuts";
import initialPosts from "./initialPosts";

function App() {
  useShortcuts();

  useEffect(() => {
    document.title = "Foro mundo";

    // Cargar posts iniciales en localStorage si no están presentes
    const storedPosts = localStorage.getItem('posts');
    if (!storedPosts) {
      localStorage.setItem('posts', JSON.stringify(initialPosts));
    }
  }, []);

  return (
    <ToastProvider>
      <Outlet />
    </ToastProvider>
  );
}

export default App;
