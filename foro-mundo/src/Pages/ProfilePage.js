import React, { useState, useEffect } from "react";
import MainLayout from "../layout/MainLayout.js";
import { Breadcrumb } from "react-bootstrap";
import ToastMessage from "../Components/ToastMessage";
import Cookies from "universal-cookie";

function ProfilePage() {
  useEffect(() => {
    document.title = "Perfil";
  }, []);

  const cookies = new Cookies();
  const cookieUser = cookies.get("user"); 

  const [toastMessage, setToastMessage] = useState("");
  const [toastColor, setToastColor] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    nombre: cookieUser ? cookieUser.name : "",
    apellidos: cookieUser ? cookieUser.lastName : "",
    fechaNacimiento: cookieUser ? cookieUser.birthDate : "",
    pais: cookieUser ? cookieUser.country : "",
    ciudad: cookieUser ? cookieUser.city : "",
    redes: cookieUser ? cookieUser.socialMedia : "",
    descripcion: cookieUser ? cookieUser.description : "",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.values(profileData).every((value) => value.trim() !== "")) {
      console.log("Submitting Data:", profileData);
      setIsEditing(false); // Disable editing mode on successful validation and submission
      setToastColor("bg-success");
      setToastMessage("Se han guardado los cambios!");
      setShowToast(true);
    } else {
      alert("Completa todos los campos.");
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleImageSelection = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        document.querySelector("img").src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };


  return (
    <MainLayout>
      <div className="container-xxl my-3">
        <Breadcrumb>
          <Breadcrumb.Item href="../#">Inicio</Breadcrumb.Item>
          <Breadcrumb.Item active>Mi perfil</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <h1>Mi Perfil</h1>
      <div style={{ display: "flex" }}>
        <div className="m-auto">
          <img
            src="https://via.placeholder.com/150"
            alt="profile"
            width="250"
            height="350"
            style={{ justifyContent: "center" }}
          />
          <div className="m-auto">
            <input
              type="file"
              id="imageInput"
              style={{ display: "none" }}
              onChange={handleImageSelection}
            />
            {isEditing && (
              <button
                type="button"
                className="btn btn-primary"
                style={{ marginTop: "10px" }}
                onClick={() => document.getElementById("imageInput").click()}>
                Cambiar foto
              </button>
            )}
          </div>
        </div>
        <div
          className="m-auto"
          style={{ width: "60%", display: "flex", justifyContent: "flex-end" }}
        >
          <form className="row col-12 g-3" onSubmit={handleSubmit}>
            <InputComponent
              id="nombre"
              label="Nombre"
              value={profileData.nombre}
              onChange={handleInputChange}
              readOnly={!isEditing}
            />
            <InputComponent
              id="apellidos"
              label="Apellidos"
              value={profileData.apellidos}
              onChange={handleInputChange}
              readOnly={!isEditing}
            />
            <InputComponent
              id="fechaNacimiento"
              type="date"
              label="Fecha de Nacimiento"
              value={profileData.fechaNacimiento}
              onChange={handleInputChange}
              readOnly={!isEditing}
            />
            <InputComponent
              id="pais"
              label="País"
              value={profileData.pais}
              onChange={handleInputChange}
              readOnly={!isEditing}
            />
            <InputComponent
              id="ciudad"
              label="Ciudad"
              value={profileData.ciudad}
              onChange={handleInputChange}
              readOnly={!isEditing}
            />
            <InputComponent
              id="redes"
              label="Redes"
              type="textarea"
              value={profileData.redes}
              onChange={handleInputChange}
              readOnly={!isEditing}
            />
            <InputComponent
              id="descripcion"
              label="Descripción"
              type="textarea"
              value={profileData.descripcion}
              onChange={handleInputChange}
              readOnly={!isEditing}
            />

            <div className="col-12">
              {!isEditing ? (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => setIsEditing(true)}>
                  Editar
                </button>
              ) : (
                <>
                  <button 
                    type="submit" 
                    className="btn btn-primary">
                    Guardar
                  </button>
                  {"   "}
                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={handleCancel}
                  >
                    Cancelar
                  </button>
                </>
              )}
            </div>

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

function InputComponent({
  id,
  type = "text",
  label,
  value,
  onChange,
  readOnly,
}) {
  return (
    <div className="col-md-6">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      {type === "textarea" ? (
        <textarea
          className="form-control"
          id={id}
          placeholder={`Tu ${label.toLowerCase()}`}
          value={value}
          onChange={onChange}
          readOnly={readOnly}
          required
        ></textarea>
      ) : (
        <input
          type={type}
          className="form-control"
          id={id}
          placeholder={`Tu ${label.toLowerCase()}`}
          value={value}
          onChange={onChange}
          readOnly={readOnly}
          required
        />
      )}
    </div>
  );
}

export default ProfilePage;
