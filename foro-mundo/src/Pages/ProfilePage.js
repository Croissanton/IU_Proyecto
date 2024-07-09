import React, { useState, useEffect } from "react";
import MainLayout from "../layout/MainLayout.js";
import { Breadcrumb, Col, Row, Container } from "react-bootstrap";
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
    profilePicture: usuario
      ? usuario.profilePicture
      : "https://via.placeholder.com/150",
    friendList: usuario ? usuario.friendList : [],
    incomingRequests: usuario ? usuario.incomingRequests : [],
    blockList: usuario ? usuario.blockList : [],
    upPosts: usuario ? usuario.upPosts : [],
    downPosts: usuario ? usuario.downPosts : [],
    upComments: usuario ? usuario.upComments : [],
    downComments: usuario ? usuario.downComments : [],
    lastConnection: usuario ? usuario.lastConnection : "",
    lastDisconnection: usuario ? usuario.lastDisconnection : "",
  });

  const [initialProfileData, setInitialProfileData] = useState({
    ...profileData,
  });
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showCancelConfirmationModal, setShowCancelConfirmationModal] =
    useState(false);

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

    localStorage.setItem(
      "usuarios",
      JSON.stringify(
        JSON.parse(localStorage.getItem("usuarios")).map((user) => {
          if (user.username === profileData.username) {
            return profileData;
          }
          return user;
        })
      )
    );
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
        setProfileData((prev) => ({
          ...prev,
          profilePicture: e.target.result,
        }));
      };
      reader.readAsDataURL(file);
    } else {
      setProfileData((prev) => ({
        ...prev,
        profilePicture: "https://via.placeholder.com/150",
      }));
    }
  };

  return (
    <MainLayout>
      <div className="container-xxl my-3">
        <Breadcrumb className="custom-breadcrumb">
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>
            Inicio
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Mi perfil</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <Container>
        <Row>
          <Col md={3} className="m-auto">
            <Row>
              <label
                style={{
                  fontSize: "3rem",
                  fontWeight: "bold",
                  display: "block",
                  textAlign: "center",
                  paddingBottom: "50px",
                }}
              >
                {profileData.username}
              </label>
            </Row>
            <Row>
              <img
                src={profileData.profilePicture}
                alt="imagen del perfil"
                className="m-auto shadow"
              />
            </Row>
            <Row className="m-auto">
              <input
                type="file"
                id="imageInput"
                style={{ display: "none" }}
                onChange={handleImageSelection}
              />
              {isEditing && (
                <Row className="my-2">
                  <Col className="d-flex align-items-center justify-content-center">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() =>
                        document.getElementById("imageInput").click()
                      }
                    >
                      Cambiar foto
                    </button>
                  </Col>
                  <Col className="d-flex align-items-center justify-content-center">
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() =>
                        handleImageSelection({ target: { files: [] } })
                      }
                    >
                      Quitar foto
                    </button>
                  </Col>
                </Row>
              )}
              <label htmlFor="imageInput" className="form-label" hidden>
                {" "}
                Imagen del perfil{" "}
              </label>
            </Row>
          </Col>
          <Col md={6} className="m-auto shadow">
            <form className="p-3" onSubmit={handleSubmit}>
              <Row>
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
              </Row>
              <Row>
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
              </Row>
              <Row>
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
              </Row>
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

              <div className="col-12 my-2">
                {!isEditing ? (
                  <div className="col-12">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsEditing(true);
                      }}
                      style={{ margin: "5px" }}
                    >
                      Editar
                    </button>

                    <Link to={`/historial/${profileData.username}`}>
                      <button
                        type="button"
                        className="btn btn-primary"
                        style={{ margin: "5px" }}
                      >
                        Ver Historial
                      </button>
                    </Link>

                    <Link to={`/bloqueados`}>
                      <button
                        type="button"
                        className="btn btn-primary"
                        style={{ margin: "5px" }}
                      >
                        Ver Bloqueados
                      </button>
                    </Link>

                    <Link to={`/amigos`}>
                      <button
                        type="button"
                        className="btn btn-primary"
                        style={{ margin: "5px" }}
                      >
                        Ver Amigos
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
          </Col>
        </Row>
      </Container>

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
  noBorder = false,
}) {
  const inputStyles = {
    border: noBorder ? "none" : "",
    boxShadow: noBorder ? "none" : "",
    backgroundColor: noBorder ? "transparent" : "",
  };

  return (
    <div className={colClass}>
      <label
        htmlFor={id}
        className="form-label border-bottom border-dark-subtle"
      >
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
