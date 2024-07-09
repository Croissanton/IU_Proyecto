import React from "react";
import { NavLink } from "react-router-dom";
const Footer = () => {

  return (
    <footer className="custom-footer">
      <p className="m-0">
        &copy; 2024 Mundo Foro. Todos los derechos reservados.{" "}
        <NavLink to="/ayuda" style={{ color: "inherit" }}>
          Contacto
        </NavLink>
      </p>
    </footer>
  );
};

export default Footer;
