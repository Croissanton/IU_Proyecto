import React, { useState, useEffect } from "react";
import MainLayout from "../layout/MainLayout.js";
import { Breadcrumb } from "react-bootstrap";
import { useToast } from "../Context/ToastContext.js";
import { Link } from "react-router-dom";
import ConfirmationModal from "../Components/ConfirmationModal";

function ProfilePage() {
  useEffect(() => {
    document.title = "Perfil";
  }, []);

  const usuario = JSON.parse(localStorage.getItem("usuario"));

  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    username: usuario ? usuario.username : "",
    password: usuario ? usuario.password : "",
    name: usuario ? usuario.name : "",
    lastName: usuario ? usuario.lastName : "",
    birthDate: usuario ? usuario.birthDate : "",
    country: usuario ? usuario.country : "",
    city: usuario ? usuario.city : "",
    socialMedia: usuario ? usuario.socialMedia : "",
    description: usuario ? usuario.description : "",
    profilePicture: usuario ? usuario.profilePicture : "",
    friendList: usuario ? usuario.friendList : [],
    blockList: usuario ? usuario.blockList : [],
    upPosts: usuario ? usuario.upPosts : [],
    downPosts: usuario ? usuario.downPosts : [],
    upComments: usuario ? usuario.upComments : [],
    downComments: usuario ? usuario.downComments : [],
    lastConnection: usuario ? usuario.lastConnection : "",
    lastDisconnection: usuario ? usuario.lastDisconnection : "",
  });

  const [initialProfileData, setInitialProfileData] = useState({ ...profileData });
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showCancelConfirmationModal, setShowCancelConfirmationModal] = useState(false);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const { showToast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowConfirmationModal(true);
  };

  const handleSaveChanges = () => {
    localStorage.setItem("usuario", JSON.stringify(profileData));

    localStorage.setItem("usuarios", JSON.stringify(
      JSON.parse(localStorage.getItem("usuarios")).map((user) => {
        if (user.username === profileData.username) {
          return profileData;
        }
        return user;
      })
    ));
    setIsEditing(false);
    console.log("Submitting Data:", profileData);
    setInitialProfileData({ ...profileData });
    showToast("Se han guardado los cambios!");
    setShowConfirmationModal(false);
  };

  const handleCancel = () => {
    setShowCancelConfirmationModal(true);
  };

  const handleCancelConfirmation = () => {
    setProfileData({ ...initialProfileData });
    setIsEditing(false);
    setShowCancelConfirmationModal(false);
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
        <Breadcrumb className="custom-breadcrumb">
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>Inicio</Breadcrumb.Item>
          <Breadcrumb.Item active>Mi perfil</Breadcrumb.Item>
        </Breadcrumb>
        <label style={{ fontSize: "3rem", fontWeight: "bold", display: "block", textAlign: "center", paddingBottom: "50px" }}>Mi perfil</label>
      </div>
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
                onClick={() => document.getElementById("imageInput").click()}
              >
                Cambiar foto
              </button>
            )}
            <label htmlFor="imageInput" className="form-label"> Imagen del perfil </label>
          </div>
        </div>
        <div
          className="m-auto"
          style={{ width: "60%", display: "flex", justifyContent: "flex-end" }}
        >
          <form className="row col-12 g-3" onSubmit={handleSubmit}>
            <div className="row">
              <InputComponent
                id="name"
                label="Nombre"
                value={profileData.name}
                onChange={handleInputChange}
                readOnly={!isEditing}
                required={true}
                colClass="col-md-6"
                noBorder={!isEditing}
              />
              <InputComponent
                id="lastName"
                label="Apellidos"
                value={profileData.lastName}
                onChange={handleInputChange}
                readOnly={!isEditing}
                required={true}
                colClass="col-md-6"
                noBorder={!isEditing}
              />
            </div>
            <InputComponent
              id="birthDate"
              type="date"
              label="Fecha de Nacimiento"
              value={profileData.birthDate}
              onChange={handleInputChange}
              readOnly={!isEditing}
              required={true}
              noBorder={!isEditing}
            />
            <div className="row">
              <InputComponent
                id="country"
                label="País"
                value={profileData.country}
                onChange={handleInputChange}
                readOnly={!isEditing}
                required={true}
                colClass="col-md-6"
                noBorder={!isEditing}
              />
              <InputComponent
                id="city"
                label="Ciudad"
                value={profileData.city}
                onChange={handleInputChange}
                readOnly={!isEditing}
                required={false}
                colClass="col-md-6"
                noBorder={!isEditing}
              />
            </div>
            <InputComponent
              id="socialMedia"
              label="Redes"
              type="textarea"
              value={profileData.socialMedia}
              onChange={handleInputChange}
              readOnly={!isEditing}
              required={false}
              noBorder={!isEditing}
            />
            <InputComponent
              id="description"
              label="Descripción"
              type="textarea"
              value={profileData.description}
              onChange={handleInputChange}
              readOnly={!isEditing}
              required={false}
              noBorder={!isEditing}
            />

            <div className="col-12">
              {!isEditing ? (
                <div className="col-12">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsEditing(true);
                    }}
                  >
                    Editar
                  </button>
                  <Link to={`/historial/${profileData.username}`}>
                    <button
                      type="button"
                      className="btn btn-primary"
                      style={{ marginLeft: "10px" }}
                    >
                      Ver Historial
                    </button>
                  </Link>
                </div>
              ) : (
                <div className="col-12">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ marginRight: "10px" }}
                  >
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
          </form>
        </div>
      </div>

      <ConfirmationModal
        show={showConfirmationModal}
        handleClose={() => setShowConfirmationModal(false)}
        handleConfirm={handleSaveChanges}
        title="Confirmar Cambios"
        message="¿Estás seguro de que quieres guardar los cambios en tu perfil?"
      />

      <ConfirmationModal
        show={showCancelConfirmationModal}
        handleClose={() => setShowCancelConfirmationModal(false)}
        handleConfirm={handleCancelConfirmation}
        title="Confirmar Cancelación"
        message="¿Estás seguro de que quieres cancelar la edición sin guardar los cambios?"
      />
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
  colClass = "col-12",
  noBorder = false
}) {
  const inputStyles = {
    border: noBorder ? "none" : "",
    boxShadow: noBorder ? "none" : "",
    backgroundColor: noBorder ? "transparent" : ""
  };

  return (
    <div className={colClass}>
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      {type === "textarea" ? (
        <textarea
          className="form-control"
          style={inputStyles}
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
          style={inputStyles}
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
