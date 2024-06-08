// src/shortcuts.js
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useShortcuts = () => {
  const navigate = useNavigate();

  const handleKeyDown = (e) => {
    if (e.ctrlKey && e.altKey) {
      switch (e.key) {
        case "l":
          navigate("/login");
          break;
        case "r":
          navigate("/register");
          break;
        case "p":
          navigate("/create");
          break;
        case "c":
          navigate("/messenger");
          break;
        default:
          break;
      }
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
};

export default useShortcuts;
