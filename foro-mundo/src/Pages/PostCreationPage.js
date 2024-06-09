import MainLayout from "../layout/MainLayout.js";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Breadcrumb } from "react-bootstrap";
import { Button } from "react-bootstrap";
import ConfirmationModal from "../Components/ConfirmationModal.js";
import { useToast } from "../Context/ToastContext.js";
import { Link, useNavigate } from "react-router-dom";



function PostCreationPage() {
  useEffect(() => {
    document.title = "Crear Post";
  }, []);

  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleClose = () => {
    setShowModal(false);
    showToast("El post no se ha creado.", "bg-danger");
  };

  const handleConfirm = () => {
    setShowModal(false);
    showToast("El post se ha creado correctamente!", "bg-success");
    navigate("/search");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit(e);
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
  
    // Verificación adicional para asegurarse de que una categoría válida ha sido seleccionada
    const categoriaSelect = form.querySelector('#categoria');
    if (categoriaSelect.value === "default") {
      alert("Por favor, selecciona una categoría antes de continuar.");
      return;
    }
  
    if (form.reportValidity()) {
      setShowModal(true);
    }
  };

  return (
    <MainLayout>
      <div className="container-xxl my-3">
        <h1>Crear Post</h1>
        <Breadcrumb className="custom-breadcrumb" >
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>Inicio</Breadcrumb.Item>
          <Breadcrumb.Item active>Crear Post</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div style={{ display: "flex" }}>
        <div
          className="m-auto"
          style={{ width: "60%", display: "flex", justifyContent: "flex-end" }}
        >
          <form
            onSubmit={handleSubmit}
            onKeyDown={handleKeyDown}
            className="row col-12 g-3"
          >
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
              <label htmlFor="categoria" className="form-label">
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
                rows={7}
                id="inputTexto"
              ></textarea>
            </div>
            <Button type="submit" className="btn btn-primary">
              Crear
            </Button>
          </form>
        </div>
      </div>
      <ConfirmationModal
        message="¿Estás seguro de que quieres crear este post?"
        show={showModal}
        handleClose={handleClose}
        handleConfirm={handleConfirm}
      ></ConfirmationModal>
    </MainLayout>
  );
}

export default PostCreationPage;
