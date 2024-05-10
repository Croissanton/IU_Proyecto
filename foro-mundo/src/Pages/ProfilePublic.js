import BackButton from "../Components/BackButton.js";
import MainLayout from "../layout/MainLayout.js";
import React from 'react';
import { Breadcrumb } from "react-bootstrap";

function ProfilePublic() {
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
      <div style={{ display: "flex"}}>
        <div className="m-auto">
          <img src="https://via.placeholder.com/150" alt="profile" width="250" height="350" justifyContent="center"/>
        </div>
        <div className="m-auto" style={{ width: "60%", display:"flex", justifyContent:"flex-end"}}>
        <form class="row col-12 g-3">
          <div class="col-md-6">
            <label for="inputNombre4" class="form-label">Nombre</label>
            <input type="text" class="form-control" id="inputNombre4" disabled placeholder="Enter your name"></input>
          </div>
          <div class="col-md-6">
            <label for="inputApellidos4" class="form-label">Apellidos</label>
            <input type="text" class="form-control" id="inputApellidos4" disabled placeholder="Enter your last name"></input>
          </div>
          <div class="col-12">
            <label for="inputFechaNacimiento" class="form-label">Fecha de nacimiento</label>
            <input type="date" class="form-control" id="inputFechaNacimiento" disabled></input>
          </div>
          <div class="col-md-6">
            <label for="inputPais" class="form-label">Pais</label>
            <input type="text" class="form-control" id="inputPais" disabled placeholder="Enter your country"></input>
          </div>
          <div class="col-md-4">
            <label for="inputCiduad" class="form-label">Ciudad</label>
            <input type="text" class="form-control" id="inputCiudad" disabled placeholder="Enter your city"></input>
          </div>
          <div class="col-md-4">
            <label for="inputRedes" class="form-label">Redes</label>
            <input type="text" class="form-control" id="inputRedes" disabled placeholder="Enter your social media links"></input>
          </div>
          <div class="col-12">
            <label for="inputDescripcion" class="form-label">Descripcion</label>
            <textarea class="form-control" id="inputDescripcion" rows="3" disabled placeholder="Enter your description"></textarea>
          </div>
        </form>
          
        </div>
      </div>
    </MainLayout>
  );
}

export default ProfilePublic;