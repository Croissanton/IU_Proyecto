import "./css/custom.css";
import "../node_modules/bootstrap-icons/font/bootstrap-icons.css";
import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { ToastProvider } from "./Context/ToastContext";

function App() {
  useEffect(() => {
    document.title = "Foro mundo";
  }, []);
  return (
    <ToastProvider>
        <Outlet />
    </ToastProvider>
  );
}

export default App;
