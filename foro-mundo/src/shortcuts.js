import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const usuario = JSON.parse(localStorage.getItem("usuario")) || undefined;

const useShortcuts = () => {
  const navigate = useNavigate();

  const handleKeyDown = (e) => {
    if (e.ctrlKey && (e.altKey || e.metaKey)) {
      switch (e.key) {
        case "l":
          if (!usuario) navigate("/inicioSesion");
          break;
        case "r":
          if (!usuario) navigate("/registro");
          break;
        case "p":
          if (usuario) navigate("/crear/0");
          break;
        case "c":
          if (usuario) navigate("/mensajes");
          break;
        case "h":
          navigate("/ayuda");
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
