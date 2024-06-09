// src/shortcuts.js
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const user = cookies.get("user");

const useShortcuts = () => {
  const navigate = useNavigate();

  const handleKeyDown = (e) => {
    if (e.ctrlKey && e.altKey) {
      switch (e.key) {
        case "l":
          if (!user) navigate("/login");
          break;
        case "r":
          if (!user) navigate("/register");
          break;
        case "p":
          if (user) navigate("/create");
          break;
        case "c":
          if (user) navigate("/messenger");
          break;
        case "h":
          navigate("/help");
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
  });
};

export default useShortcuts;
