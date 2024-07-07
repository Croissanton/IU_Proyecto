import React, { useState, useRef, useEffect } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import ToastMessage from "../Components/ToastMessage";
import { useToast } from "../Context/ToastContext";
import { Outlet } from "react-router-dom";

function MainLayout({ children }) {
  const controlRef = useRef(null);
  const [topOffset, setTopOffset] = useState(0);

  useEffect(() => {
    const updatePadding = () => {
      if (controlRef.current) {
        setTopOffset(controlRef.current.offsetHeight);
      }
    };

    updatePadding();
    window.addEventListener("resize", updatePadding);
    return () => window.removeEventListener("resize", updatePadding);
  }, []);

  return (
    <div className="d-flex flex-column vh-100">
      <Header ref={controlRef} />
      <div
        className="flex-grow-1 pb-5"
        style={{ paddingTop: `${topOffset}px` }}
      >
        {children}
        <Outlet />
        <ToastMessagesLayout />
      </div>
      <Footer />
    </div>
  );
}

const ToastMessagesLayout = () => {
  const { toast, hideToast } = useToast();

  return (
    <ToastMessage
      show={toast.show}
      onClose={hideToast}
      message={toast.message}
      color={toast.color}
    />
  );
};

export default MainLayout;
