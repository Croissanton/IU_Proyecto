import MainLayout from "../layout/MainLayout.js";
import React from "react";
import { useEffect } from "react";
import { Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";

function ProfilePublic() {
  useEffect(() => {
    document.title = "Perfil";
  }, []);

  return (
    <MainLayout>
      <div className="container-xxl my-3">
      <h1>Perfil</h1>
        <Breadcrumb className="custom-breadcrumb">
          <Breadcrumb.Item as={Link} to="/">Inicio</Breadcrumb.Item>
          <Breadcrumb.Item active>Perfil</Breadcrumb.Item> {/* */}
        </Breadcrumb>
      </div>
      <div style={{ display: "flex" }}>
        <div className="m-auto">
          <img
            src="https://via.placeholder.com/150"
            alt="profile"
            width="250"
            height="350"
          />
        </div>
        <div
          className="m-auto"
          style={{ width: "60%", display: "flex", justifyContent: "flex-end" }}
        >
          <form className="row col-12 g-3">
            <div className="col-md-6">
              <label htmlFor="inputNombre4" className="form-label">
                Nombre
              </label>
              <input
                type="text"
                className="form-control"
                id="inputNombre4"
                disabled
              ></input>
            </div>
            <div className="col-md-6">
              <label htmlFor="inputApellidos4" className="form-label">
                Apellidos
              </label>
              <input
                type="text"
                className="form-control"
                id="inputApellidos4"
                disabled
              ></input>
            </div>
            <div className="col-12">
              <label htmlFor="inputFechaNacimiento" className="form-label">
                Fecha de nacimiento
              </label>
              <input
                type="date"
                className="form-control"
                id="inputFechaNacimiento"
                disabled
              ></input>
            </div>
            <div className="col-md-6">
              <label htmlFor="inputPais" className="form-label">
                País
              </label>
              <input
                type="text"
                className="form-control"
                id="inputPais"
                disabled
              ></input>
            </div>
            <div className="col-md-4">
              <label htmlFor="inputCiduad" className="form-label">
                Ciudad
              </label>
              <input
                type="text"
                className="form-control"
                id="inputCiudad"
                disabled
              ></input>
            </div>
            <div className="col-md-4">
              <label htmlFor="inputRedes" className="form-label">
                Redes Sociales
              </label>
              <input
                type="text"
                className="form-control"
                id="inputRedes"
                disabled
              ></input>
            </div>
            <div className="col-12">
              <label htmlFor="inputDescripcion" className="form-label">
                Descripcion
              </label>
              <textarea
                className="form-control"
                id="inputDescripcion"
                rows="3"
                disabled
              ></textarea>
            </div>
          </form>
        </div>
      </div>
    </MainLayout>
  );
}

export default ProfilePublic;
