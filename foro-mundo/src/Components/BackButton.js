import React from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from '../Context/ThemeContext';


const BackButton = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();


  const buttonClass = theme === "dark" ? "btn btn-primary text-secondary  border border-secondary-subtle m-3" : "btn btn-secondary text-primary border border-primary-subtle m-3"

  return (
    
    <button
      type="button"
      className={buttonClass}
      onClick={() => navigate(-1)}
    >
      <i className="bi bi-arrow-left-circle pe-2"></i>
      Volver Atrás
    </button>
  );
};

export default BackButton;
