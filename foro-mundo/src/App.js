import "./css/custom.css";
import "../node_modules/bootstrap-icons/font/bootstrap-icons.css";
import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { ToastProvider } from "./Context/ToastContext";
import useShortcuts from "./shortcuts";
import topics from "./data/initialTopics.json";
import posts from "./data/initialPosts.json";
import usuarios from "./data/usuarios.json";
import { ThemeProvider } from "./Context/ThemeContext";

function App() {
  useShortcuts();

  useEffect(() => {
    document.title = "Foro mundo";
  }, []);

  var storedTopics = JSON.parse(localStorage.getItem("topics")) || [];
  var storedPosts = JSON.parse(localStorage.getItem("posts")) || [];
  var storedUsuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  if (storedTopics.length <= 0) {
    storedTopics = topics;
    localStorage.setItem("topics", JSON.stringify(storedTopics));
  }

  if (storedPosts.length <= 0) {
    storedPosts = posts;
    localStorage.setItem("posts", JSON.stringify(storedPosts));
  }

  if (storedUsuarios.length <= 0) {
    storedUsuarios = usuarios;
    localStorage.setItem("usuarios", JSON.stringify(storedUsuarios));
  }

  return (
    <ThemeProvider>
      <ToastProvider>
        <Outlet />
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
