import React, { useState, useRef, useLayoutEffect } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

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
  }, [controlRef]); // Dependency array includes `controlRef` to react on updates

  return (
    <div style={{ padding: `${padding}px 0` }}>
      <Header ref={controlRef} />
      {children}
      <Footer />
    </div>
  );
}

export default MainLayout;
