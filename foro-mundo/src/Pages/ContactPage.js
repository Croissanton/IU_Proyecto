import React from "react";
import MainLayout from "../layout/MainLayout.js";
import { useEffect } from "react";
import { Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";

function ContactPage() {
  useEffect(() => {
    document.title = "Contacto";
  }, []);

  return (
    <MainLayout>
      <div className="container-xxl my-3">
        <h1>Contacto</h1>
        <Breadcrumb>
          <Breadcrumb.Item as={Link} to="/">Inicio</Breadcrumb.Item>
          <Breadcrumb.Item active>Contacto</Breadcrumb.Item> {/* */}
        </Breadcrumb>
      </div>
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

export default ContactPage;
