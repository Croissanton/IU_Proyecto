import BackButton from "../Components/BackButton.js";
import MainLayout from "../layout/MainLayout.js";
import React from "react";
import { useEffect } from "react";
import { Breadcrumb } from "react-bootstrap";

function ProfilePublic() {
  useEffect(() => {
    document.title = "Perfil";
  }, []);

  return (
    <MainLayout>
      <BackButton />
      <div className="container-xxl my-3">
        <Breadcrumb>
          <Breadcrumb.Item href="../#">Inicio</Breadcrumb.Item>
          <Breadcrumb.Item active>Perfil</Breadcrumb.Item> {/* */}
        </Breadcrumb>
      </div>
      <h1>Profile Public</h1>
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
                placeholder="Enter your name"
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
                placeholder="Enter your last name"
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
                Pais
              </label>
              <input
                type="text"
                className="form-control"
                id="inputPais"
                disabled
                placeholder="Enter your country"
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
                placeholder="Enter your city"
              ></input>
            </div>
            <div className="col-md-4">
              <label htmlFor="inputRedes" className="form-label">
                Redes
              </label>
              <input
                type="text"
                className="form-control"
                id="inputRedes"
                disabled
                placeholder="Enter your social media links"
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
                placeholder="Enter your description"
              ></textarea>
            </div>
          </form>
        </div>
      </div>
    </MainLayout>
  );
}

export default ProfilePublic;
