import React from "react";
import MainLayout from "../layout/MainLayout.js";
import { useEffect } from "react";
import BackButton from "../Components/BackButton.js";

function ContactPage() {
  useEffect(() => {
    document.title = "Contacto";
  }, []);

  return (
    <MainLayout>
      <BackButton />
      <h1>Contacto</h1>
      <p>
          Si tienes alguna duda o sugerencia, no dudes en ponerte en contacto con
          nosotros.
      </p>
      <p>
          Puedes escribirnos a nuestro correo electrónico: pepelu49@uma.es
      </p>
      <p>
          O llamarnos por teléfono al número: 123456789
      </p>
    </MainLayout>
  );
}

export default ContactPage;
