import MainLayout from "../layout/MainLayout.js";
import React, {useState} from "react";

function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const inputs = document.querySelectorAll('input[required], textarea[required]');
    let formIsValid = true;
  
    inputs.forEach(input => {
      if (!input.value.trim()) {
        formIsValid = false;
        // Puedes agregar algún mensaje de error o estilo para indicar que el campo es requerido
        input.classList.add('is-invalid');
      } else {
        input.classList.remove('is-invalid');
      }
    });
  
    if (formIsValid) {
      setFormSubmitted(true);
      setIsEditing(false);
    }
  };

  if (formSubmitted) {
    window.location.reload();
  }

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
              style={{ display: isEditing ? "block" : "none" }}
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
                placeholder="Tu nombre"
                readOnly={!isEditing}
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
                placeholder="Tus apellidos"
                readOnly={!isEditing}
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
                placeholder="Tu fecha de nacimiento en formato dd/mm/aaaa"
                readOnly={!isEditing}
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
                placeholder="El nombre de tu pais"
                readOnly={!isEditing}
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
                placeholder="El nombre de tu ciudad"
                readOnly={!isEditing}
              ></input>
            </div>
            <div className="col-md-12">
              <label htmlFor="inputRedes" className="form-label">
                Redes
              </label>
              <textarea required 
              className="form-control" 
              id="inputRedes" 
              placeholder="Describe cómo encontrarte en las redes sociales"
              readOnly={!isEditing}
              >
              </textarea>
            </div>
            <div className="col-12">
              <label htmlFor="inputDescripcion" className="form-label">
                Descripción
              </label>
              <textarea required
                className="form-control"
                id="inputDescripcion"
                rows="3"
                placeholder="Tu descripción de perfil"
                readOnly={!isEditing}
              ></textarea>
            </div>
            <div className="col-12">
              <button
                type="button"
                className="btn btn-primary"
                style={{ display: isEditing ? "none" : "block" }}
                onClick={handleEdit}
              >
                Editar
              </button>
              <button 
              type="submit" 
              className="btn btn-primary"
              style={{ display: isEditing ? "block" : "none" }}
              onClick={handleSubmit}
              >
                Guardar
              </button>
            </div>
            <div className="col-12">
              <button
                type="button"
                className="btn btn-primary"
                style={{ display: isEditing ? "block" : "none" }}
                onClick={() => {
                  setIsEditing(false)
                  window.location.reload();
                  } 
                }
              >
                Cancelar
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
