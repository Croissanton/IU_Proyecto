import MainLayout from "../layout/MainLayout.js";
import React from 'react';
/*
function ProfilePage() {
  return (
    <MainLayout>
      <h1>Profile Page</h1>
    </MainLayout>
  );
} */

function ProfilePage() {
  return (
    <MainLayout>
      <h1>Profile Page</h1>
      <div style={{ display: "flex"}}>
        <div className="m-auto">
          <img src="https://via.placeholder.com/150" alt="profile" width="250" height="350" justifyContent="center"/>
          <div className="m-auto">
            <button type="secondary" class="btn btn-primary">Change picture</button>
          </div>
        </div>
        <div className="m-auto" style={{ width: "60%", display:"flex", justifyContent:"flex-end"}}>
        <form class="row col-12 g-3">
          <div class="col-md-6">
            <label for="inputNombre4" class="form-label">Nombre</label>
            <input type="text" class="form-control" id="inputNombre4"></input>
          </div>
          <div class="col-md-6">
            <label for="inputApellidos4" class="form-label">Apellidos</label>
            <input type="text" class="form-control" id="inputApellidos4"></input>
          </div>
          <div class="col-12">
            <label for="inputFechaNacimiento" class="form-label">Fecha de nacimiento</label>
            <input type="date" class="form-control" id="inputFechaNacimiento"></input>
          </div>
          <div class="col-md-6">
            <label for="inputPais" class="form-label">Pais</label>
            <input type="text" class="form-control" id="inputPais"></input>
          </div>
          <div class="col-md-4">
            <label for="inputCiduad" class="form-label">Ciudad</label>
            <input type="text" class="form-control" id="inputCiudad"></input>
          </div>
          <div class="col-md-4">
            <label for="inputRedes" class="form-label">Redes</label>
            <input type="text" class="form-control" id="inputRedes"></input>
          </div>
          <div class="col-12">
            <label for="inputDescripcion" class="form-label">Descripcion</label>
            <textarea class="form-control" id="inputDescripcion" rows="3"></textarea>
          </div>
          <div class="col-12" >
            <button type="submit" class="btn btn-primary">Guardar</button>
          </div>
        </form>
          
        </div>
      </div>
    </MainLayout>
  );
}

export default ProfilePage;