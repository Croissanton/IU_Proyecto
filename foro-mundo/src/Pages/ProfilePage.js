import MainLayout from "../layout/MainLayout.js";
import React from "react";

function ProfilePage() {
  return (
    <MainLayout>
      <h1>Mi Perfil</h1>
      <div style={{ display: "flex" }}>
        <div className="m-auto">
          <img
            src="https://via.placeholder.com/150"
            alt="profile"
            width="250"
            height="350"
            justifyContent="center"
          />
          <div className="m-auto">
            <input
              type="file"
              id="imageInput"
              style={{ display: "none" }}
              onChange={(e) => handleImageSelection(e.target.files)}
            />
            <button
              type="secondary"
              className="btn btn-primary"
              onClick={() => document.getElementById("imageInput").click()}
            >
              Cambiar foto
            </button>
          </div>
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
              <input required
                type="text"
                className="form-control"
                id="inputNombre4"
              ></input>
            </div>
            <div className="col-md-6">
              <label htmlFor="inputApellidos4" className="form-label">
                Apellidos
              </label>
              <input required
                type="text"
                className="form-control"
                id="inputApellidos4"
              ></input>
            </div>
            <div className="col-12">
              <label htmlFor="inputFechaNacimiento" className="form-label">
                Fecha de nacimiento
              </label>
              <input required
                type="date"
                className="form-control"
                id="inputFechaNacimiento"
              ></input>
            </div>
            <div className="col-md-6">
              <label htmlFor="inputPais" className="form-label">
                Pais
              </label>
              <input required
                type="text"
                className="form-control"
                id="inputPais"
              ></input>
            </div>
            <div className="col-md-6">
              <label htmlFor="inputCiduad" className="form-label">
                Ciudad
              </label>
              <input required
                type="text"
                className="form-control"
                id="inputCiudad"
              ></input>
            </div>
            <div className="col-md-12">
              <label htmlFor="inputRedes" className="form-label">
                Redes
              </label>
              <textarea required className="form-control" id="inputRedes"></textarea>
            </div>
            <div className="col-12">
              <label htmlFor="inputDescripcion" className="form-label">
                Descripción
              </label>
              <textarea required
                className="form-control"
                id="inputDescripcion"
                rows="3"
              ></textarea>
            </div>
            <div className="col-12">
              <button type="submit" className="btn btn-primary">
                Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
    </MainLayout>
  );
}

function handleImageSelection(files) {
  const image = files[0];
  const reader = new FileReader();
  reader.onload = (e) => {
    document.querySelector("img").src = e.target.result;
  };
  reader.readAsDataURL(image);
}
export default ProfilePage;
