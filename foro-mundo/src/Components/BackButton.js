import React from "react";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <div className="container-xxl my-2 mx-3">
      <button
        type="button"
        className="btn btn-primary btn-block"
        onClick={() => navigate(-1)}
      >
        Volver Atrás
      </button>
    </div>
  );
};

export default BackButton;
