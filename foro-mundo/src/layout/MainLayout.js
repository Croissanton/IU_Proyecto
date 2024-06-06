import React, { useState, useRef, useLayoutEffect } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import ToastMessage from "../Components/ToastMessage";
import { useToast } from "../Context/ToastContext";
import { Outlet } from "react-router-dom";

function MainLayout({ children }) {
  const controlRef = useRef(null);
  const [padding, setPadding] = useState(0);

  useLayoutEffect(() => {
    if (controlRef.current) {
      setPadding(controlRef.current.offsetHeight);
    }

    const handleResize = () => {
      if (controlRef.current) {
        setPadding(controlRef.current.offsetHeight);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [controlRef]);

  return (
    <div className="d-flex flex-column" style={{ height: "100vh" }}>
      <Header ref={controlRef} />
      <div
        className="flex-grow-1 px-5 pb-5 mx-5"
        style={{ paddingTop: `${padding}px` }}
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
