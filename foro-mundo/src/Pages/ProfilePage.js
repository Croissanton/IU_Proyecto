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
    username: cookieUser ? cookieUser.username : "",
    password: cookieUser ? cookieUser.password : "",
    name: cookieUser ? cookieUser.name : "",
    lastName: cookieUser ? cookieUser.lastName : "",
    birthDate: cookieUser ? cookieUser.birthDate : "",
    country: cookieUser ? cookieUser.country : "",
    city: cookieUser ? cookieUser.city : "",
    socialMedia: cookieUser ? cookieUser.socialMedia : "",
    description: cookieUser ? cookieUser.description : "",
    imageInput: cookieUser ? cookieUser.image : "",

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
    console.log("Submitting Data:", profileData);
    cookies.set("user", profileData, { path: "/" });
    setIsEditing(false); // Disable editing mode on successful validation and submission
    setToastColor("bg-success");
    setToastMessage("Se han guardado los cambios!");
    setShowToast(true);
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
      profileData.imageInput = ""; //Puede que se implemente en el futuro, por ahora no.
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
              value={profileData.imageInput}
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
              id="name"
              label="Nombre"
              value={profileData.name}
              onChange={handleInputChange}
              readOnly={!isEditing}
              required={true}
            />
            <InputComponent
              id="lastName"
              label="Apellidos"
              value={profileData.lastName}
              onChange={handleInputChange}
              readOnly={!isEditing}
              required={true}
            />
            <InputComponent
              id="birthDate"
              type="date"
              label="Fecha de Nacimiento"
              value={profileData.birthDate}
              onChange={handleInputChange}
              readOnly={!isEditing}
              required={true}
            />
            <InputComponent
              id="country"
              label="País"
              value={profileData.country}
              onChange={handleInputChange}
              readOnly={!isEditing}
              required={true}
            />
            <InputComponent
              id="city"
              label="Ciudad"
              value={profileData.city}
              onChange={handleInputChange}
              readOnly={!isEditing}
              required={false}
            />
            <InputComponent
              id="socialMedia"
              label="Redes"
              type="textarea"
              value={profileData.socialMedia}
              onChange={handleInputChange}
              readOnly={!isEditing}
              required={false}
            />
            <InputComponent
              id="description"
              label="Descripción"
              type="textarea"
              value={profileData.description}
              onChange={handleInputChange}
              readOnly={!isEditing}
              required={false}
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
              <div className="col-12">
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  style={{ marginRight: "10px" }}>
                  Guardar
                </button>
                <button
                  type="button"
                  className="btn btn-light"
                  onClick={handleCancel}
                >
                  Cancelar
                </button>
              </div>
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
  required,
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
          value={value}
          onChange={onChange}
          readOnly={readOnly}
          required={required}
        ></textarea>
      ) : (
        <input
          type={type}
          className="form-control"
          id={id}
          value={value}
          onChange={onChange}
          readOnly={readOnly}
          required={required}
        />
      )}
    </div>
  );
}

export default ProfilePage;
