import React from "react";
import { Link } from "react-router-dom";

function NotFound({ message }) {
  return (
    <div className="text-center">
      <h1>404 No Encontrado</h1>
      <p>{message}</p>
      <p>
        <Link className="btn btn-primary" to="/">
          Volver a la página de inicio
        </Link>
      </p>
    </div>
  );
}

export default NotFound;
