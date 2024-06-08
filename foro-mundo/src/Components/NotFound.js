import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="text-center">
      <h1>404 No Encontrado</h1>
      <p>La página que estás buscando no existe o ha ocurrido otro error.</p>
      <p>
        <Link to="/">Volver a la página de inicio</Link>
      </p>
    </div>
  );
}

export default NotFound;
