import React, { useState, useEffect } from "react";
import MainLayout from "../layout/MainLayout.js";
import { Breadcrumb, Modal, Button } from "react-bootstrap";
import Cookies from "universal-cookie";
import { useToast } from "../Context/ToastContext.js";
import { Link } from "react-router-dom";

function ProfilePage() {
  useEffect(() => {
    document.title = "Perfil";
  }, []);

  const cookies = new Cookies();
  const cookieUser = cookies.get("user");

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
    cookies.set("user", profileData, { path: "/", secure: true, sameSite: 'None'});
    setIsEditing(false);
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
      profileData.imageInput = ""; // Puede que se implemente en el futuro, por ahora no.
    }
  };

  return (
    <MainLayout>
      <div className="container-xxl my-3">
        <h1>Mi Perfil</h1>
        <Breadcrumb className="custom-breadcrumb">
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>Inicio</Breadcrumb.Item>
          <Breadcrumb.Item active>Mi perfil</Breadcrumb.Item>
        </Breadcrumb>
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
                  <Link to="/historial">
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

      {/* Modal de confirmación de guardar cambios */}
      <Modal show={showConfirmationModal} onHide={() => setShowConfirmationModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Cambios</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que quieres guardar los cambios en tu perfil?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmationModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal de confirmación de cancelar */}
      <Modal show={showCancelConfirmationModal} onHide={() => setShowCancelConfirmationModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Cancelación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que quieres cancelar la edición sin guardar los cambios?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCancelConfirmationModal(false)}>
            Volver a Edición
          </Button>
          <Button variant="primary" onClick={handleCancelConfirmation}>
            Confirmar Cancelación
          </Button>
        </Modal.Footer>
      </Modal>
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
  const inputClassNames = `form-control ${readOnly ? "no-background no-border" : ""}`;

  return (
    <div className="col-md-6">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      {type === "textarea" ? (
        <textarea
          className={inputClassNames}
          id={id}
          value={value}
          onChange={onChange}
          readOnly={readOnly}
          required={required}
        ></textarea>
      ) : (
        <input
          type={type}
          className={inputClassNames}
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
