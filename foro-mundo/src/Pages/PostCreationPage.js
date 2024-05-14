import BackButton from "../Components/BackButton.js";
import MainLayout from "../layout/MainLayout.js";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Breadcrumb } from "react-bootstrap";
import { Button } from "react-bootstrap";
import ConfirmationModal from "../Components/ConfirmationModal.js";
import ToastMessage from "../Components/ToastMessage";

function PostCreationPage() {
  useEffect(() => {
    document.title = "Crear Post";
  }, []);

  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastColor, setToastColor] = useState("");

  const handleClose = () => {
    setShowModal(false);
    setToastColor("bg-danger");
    setToastMessage("El post no se ha creado.");
    setShowToast(true);
  };
  const handleConfirm = () => {
    //submit form data to backend

    setShowModal(false);
    setToastColor("bg-success");
    setToastMessage("El post se ha creado correctamente!");
    setShowToast(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent traditional form submission
    const form = e.target;

    // Check if form contents are valid:
    if (form.reportValidity()) {
      setShowModal(true); // Open the modal only if the form is valid
    }
  };

  return (
    <MainLayout>
      <BackButton />

      <div className="container-xxl my-3">
        <Breadcrumb>
          <Breadcrumb.Item href="../#">Inicio</Breadcrumb.Item>
          <Breadcrumb.Item active>Crear Post</Breadcrumb.Item> {/**/}
        </Breadcrumb>
      </div>
      <h1>Crear Post</h1>
      <div style={{ display: "flex" }}>
        <div
          className="m-auto"
          style={{ width: "60%", display: "flex", justifyContent: "flex-end" }}
        >
          <form onSubmit={handleSubmit} className="row col-12 g-3">
            <div className="col-md-6">
              <label htmlFor="inputTitulo" className="form-label">
                Título
              </label>
              <input
                type="text"
                required
                className="form-control"
                id="inputTitulo"
              ></input>
            </div>
            <div className="col-md-6">
              <label htmlFor="inputCategoria" className="form-label">
                Categoría
              </label>
              <select
                name="categoria"
                id="categoria"
                required
                className="form-control"
                defaultValue={"default"}
              >
                <option value="default" disabled>
                  Selecciona una categoría...
                </option>
                <option value="general">General</option>
                <option value="coches">Coches</option>
                <option value="musica">Música</option>
                <option value="plantas">Plantas</option>
              </select>
            </div>
            <div className="col-12">
              <label htmlFor="inputTexto" className="form-label">
                Texto
              </label>
              <textarea
                type="text"
                className="form-control input-group-lg"
                required
                placeholder="Escriba acerca del tema..."
                rows={7}
                id="inputTexto"
              ></textarea>
            </div>
            <Button type="submit" className="btn btn-primary">
              Crear
            </Button>
            <ConfirmationModal
              message="¿Estás seguro de que quieres crear este post?"
              show={showModal}
              handleClose={handleClose}
              handleConfirm={handleConfirm}
            ></ConfirmationModal>
            <ToastMessage
              show={showToast}
              onClose={() => setShowToast(false)}
              message={toastMessage}
              color={toastColor}
            />
          </form>
        </div>
      </div>
    </MainLayout>
  );
}

export default PostCreationPage;
