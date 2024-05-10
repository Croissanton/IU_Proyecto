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
    <div>
      <div className="m-5" style={{ padding: `${padding}px`}}>
        <Header ref={controlRef} />
        {children}
      </div>
      <Footer />
    </div>
  );
}

export default MainLayout;
