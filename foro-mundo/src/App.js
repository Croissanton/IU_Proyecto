import "./css/custom.css";
import "../node_modules/bootstrap-icons/font/bootstrap-icons.css";
import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { ToastProvider } from "./Context/ToastContext";
import useShortcuts from "./shortcuts";
import posts from "./data/initialPosts.json";
import usuarios from "./data/usuarios.json";

function App() {
  useShortcuts();

  useEffect(() => {
    document.title = "Foro mundo";
  }, []);

  var storedPosts = JSON.parse(localStorage.getItem("posts")) || [];
  var storedUsuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  if (storedPosts.length <= 0) {
    storedPosts = posts;
    localStorage.setItem("posts", JSON.stringify(storedPosts));
  }
  if (storedUsuarios.length <= 0) {
    storedUsuarios = usuarios;
    localStorage.setItem("usuarios", JSON.stringify(storedUsuarios));
  }

  return (
    <ToastProvider>
      <Outlet />
    </ToastProvider>
  );
}

export default App;
