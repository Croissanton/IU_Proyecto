import "./css/custom.css";
import "../node_modules/bootstrap-icons/font/bootstrap-icons.css";
import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { ToastProvider } from "./Context/ToastContext";
import useShortcuts from "./shortcuts";
import data from "./data/initialPosts.json";

function App() {
  useShortcuts();

  useEffect(() => {
    document.title = "Foro mundo";
  }, []);

  var storedPosts = JSON.parse(localStorage.getItem("posts")) || [];
  if (storedPosts.length <= 0) {
    storedPosts = data;
    localStorage.setItem("posts", JSON.stringify(storedPosts));
  }

  return (
    <ToastProvider>
      <Outlet />
    </ToastProvider>
  );
}

export default App;
