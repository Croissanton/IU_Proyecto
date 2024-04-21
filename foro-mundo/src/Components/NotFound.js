import React from "react";

function NotFound() {
  return (
    <div className="text-center">
      <h1>404 No Encontrado</h1>
      <p>La página que estás buscando no existe o ha ocurrido otro error.</p>
      <p>
        <a href="/">Volver a la página de inicio</a>
      </p>
    </div>
  );
}

export default NotFound;
