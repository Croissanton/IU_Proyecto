import React, { useEffect } from "react";
import MainLayout from "../layout/MainLayout.js";
import { Breadcrumb } from "react-bootstrap";
import { NavLink } from "react-router-dom";

function HelpPage() {
  useEffect(() => {
    document.title = "Ayuda";
  }, []);

  return (
    <MainLayout>
      <div className="container-xxl my-3">
        <h1>Ayuda y Contacto</h1>
        <nav aria-label="breadcrumb">
          <Breadcrumb className="custom-breadcrumb">
            <Breadcrumb.Item linkAs={NavLink} linkProps={{ to: "/" }}>
              Inicio
            </Breadcrumb.Item>
            <Breadcrumb.Item active aria-current="page">Ayuda</Breadcrumb.Item>
          </Breadcrumb>
        </nav>
      </div>
      <div className="container-xxl my-3 pb-2 pt-2">
        <h2>Atajos:</h2>
        <ul>
          <li tabIndex="0">CTRL+ALT+C : Chats</li>
          <li tabIndex="0">CTRL+ALT+P : Crear post</li>
          <li tabIndex="0">CTRL+ALT+R : Registro</li>
          <li tabIndex="0">CTRL+ALT+L : Inicio de sesión</li>
          <li tabIndex="0">CTRL+ALT+H : Ayuda</li>
        </ul>
      </div>
      <hr />
      <div className="container-xxl my-3">
        <h2>Contacto</h2>
        <p>
          Si tienes alguna duda o sugerencia, no dudes en ponerte en contacto
          con nosotros.
        </p>
        <p>Puedes escribirnos a nuestro correo electrónico: <a href="mailto:pepelu49@uma.es">pepelu49@uma.es</a></p>
        <p>O llamarnos por teléfono al número: <a href="tel:+123456789">123456789</a></p>
      </div>
    </MainLayout>
  );
}

export default HelpPage;
