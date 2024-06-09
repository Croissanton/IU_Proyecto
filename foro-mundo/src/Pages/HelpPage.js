import React from "react";
import MainLayout from "../layout/MainLayout.js";
import { useEffect } from "react";
import { Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";

function HelpPage() {
  useEffect(() => {
    document.title = "Ayuda";
  }, []);

  return (
    <MainLayout>
      <div className="container-xxl my-3">
        <h1>Ayuda y Contacto</h1>
        <Breadcrumb className="custom-breadcrumb">
          <Breadcrumb.Item as={Link} to="/">
            Inicio
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Ayuda</Breadcrumb.Item> {/* */}
        </Breadcrumb>
      </div>
      <div className="container-xxl my-3 pb-2 pt-2">
        <h2>Atajos:</h2>
        <ul>
          <li>CTRL+ALT+C : Chats</li>
          <li>CTRL+ALT+P : Crear post</li>
          <li>CTRL+ALT+R : Registro</li>
          <li>CTRL+ALT+L : Inicio de sesión</li>
          <li>CTRL+ALT+H : Ayuda</li>
        </ul>
      </div>
      <hr />
      <div className="container-xxl my-3">
        <p>
          Si tienes alguna duda o sugerencia, no dudes en ponerte en contacto
          con nosotros.
        </p>
        <p>Puedes escribirnos a nuestro correo electrónico: pepelu49@uma.es</p>
        <p>O llamarnos por teléfono al número: 123456789</p>
      </div>
    </MainLayout>
  );
}

export default HelpPage;
