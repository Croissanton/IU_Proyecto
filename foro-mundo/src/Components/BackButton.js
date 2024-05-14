import React from "react";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      className="btn btn-primary text-secondary border border-secondary-subtle m-3"
      onClick={() => navigate(-1)}
    >
      <i className="bi bi-arrow-left-circle pe-2"></i>
      Volver Atrás
    </button>
  );
};

export default BackButton;
