import React, { useEffect, useState } from "react";
import MainLayout from "../layout/MainLayout.js";
import { Breadcrumb, Container, Row, Col } from "react-bootstrap";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useToast } from "../Context/ToastContext.js";
import ConfirmationModal from "../Components/ConfirmationModal"; // Importa el modal de confirmación
import ProfilePage from "./ProfilePage.js";

function ProfilePublic() {
  const { username } = useParams();
  const currentUser = JSON.parse(localStorage.getItem("usuario"));
  const isCurrentUser = currentUser?.username === username;

  const [userData, setUserData] = useState(null);
  const [friendStatus, setFriendStatus] = useState("");
  const [blockStatus, setBlockStatus] = useState("");
  const [isBlocked, setIsBlocked] = useState(false);
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [showBlockModal, setShowBlockModal] = useState(false);
  const [showFriendModal, setShowFriendModal] = useState(false);
  const [isButtonUnavailable, setIsButtonUnavailable] = useState(false);

  const friendButtonColor = friendStatus === "Eliminar Amigo" ? "btn-danger" : "btn-primary";

  useEffect(() => {
    if (!currentUser) navigate("/inicioSesion");
    else {
      if (username === currentUser?.username) navigate("/perfil");
       else if (currentUser) {
        if (!currentUser.friendList) currentUser.friendList = [];
        if (!currentUser.incomingRequests) currentUser.incomingRequests = [];
        if (!currentUser.blockList) currentUser.blockList = []; 
      }
    }

  }, [username, currentUser, navigate]);

  useEffect(() => {
    document.title = "Perfil de " + username;

    // Obtener los datos del usuario desde localStorage basado en el username
    const storedUsers = localStorage.getItem("usuarios");
    const currentUser = JSON.parse(localStorage.getItem("usuario"));
    if (storedUsers) {
      const parsedUsers = JSON.parse(storedUsers);
      const user = parsedUsers.find((user) => user.username === username);
      if (user) {
        // Check if the user has blocked the current user
        if (user.blockList?.includes(currentUser?.username)) {
          setIsBlocked(true);
        } else {
          setUserData(user);
        }
        updateStatuses(currentUser, user);
      }
    }
  }, [username]);

  useEffect(() => {
    handleUnavailabilityOfButtons();
  }, [blockStatus, username]);

  const handleShowBlockModal = () => setShowBlockModal(true);
  const handleShowFriendModal = () => setShowFriendModal(true);

  const confirmBlockUser = () => {
    handleBlockUser();
    setShowBlockModal(false);
  };

  const confirmFriendRequest = () => {
    handleFriendRequest();
    setShowFriendModal(false);
  };

  const updateStatuses = (currentUser, user) => {
    if (currentUser && user) {
      // Determinar el estado de la solicitud de amistad
      if (currentUser.friendList?.includes(username)) {
        setFriendStatus("Eliminar Amigo");
      } else if (currentUser.incomingRequests?.includes(username)) {
        setFriendStatus("Aceptar Solicitud");
      } else if (user.incomingRequests?.includes(currentUser.username)) {
        setFriendStatus("Solicitud Enviada");
      } else {
        setFriendStatus("Agregar Amigo");
      }

      // Determinar el estado de bloqueo
      if (currentUser.blockList?.includes(username)) {
        setBlockStatus("Desbloquear Usuario");
      } else {
        setBlockStatus("Bloquear Usuario");
      }
    }
  };

  const handleBlockUser = () => {
    let currentUser = JSON.parse(localStorage.getItem("usuario"));
    const allUsers = JSON.parse(localStorage.getItem("usuarios"));
    let otherUser = allUsers.find((user) => user.username === username);

    if (!currentUser.blockList) {
      currentUser.blockList = [];
    }
    if (!currentUser.friendList) {
      currentUser.friendList = [];
    }
    if (!currentUser.incomingRequests) {
      currentUser.incomingRequests = [];
    }
    if (!otherUser.friendList) {
      otherUser.friendList = [];
    }
    if (!otherUser.incomingRequests) {
      otherUser.incomingRequests = [];
    }

    if (currentUser && allUsers) {
      // Asegurarse de que currentUser tenga una blockList
      if (!currentUser.blockList) {
        currentUser.blockList = [];
      }

      if (!currentUser.blockList.includes(username)) {
        // Añadir usuario a la lista de bloqueados
        currentUser.blockList.push(username);
        setBlockStatus("Desbloquear Usuario");

        if (currentUser.friendList.includes(username)) {
          // Borrar amigo de la lista de amigos
          currentUser.friendList = currentUser.friendList.filter(
            (friend) => friend !== username
          );
          otherUser.friendList = otherUser.friendList.filter(
            (friend) => friend !== currentUser.username
          );
        }
        if (currentUser.incomingRequests.includes(username)) {
          // Borrar solicitud de amistad
          currentUser.incomingRequests = currentUser.incomingRequests.filter(
            (request) => request !== username
          );
        }
        if (otherUser.incomingRequests.includes(currentUser.username)) {
          // Borrar solicitud de amistad
          otherUser.incomingRequests = otherUser.incomingRequests.filter(
            (request) => request !== currentUser.username
          );
        }
      } else {
        // Eliminar usuario de la lista de bloqueados
        currentUser.blockList = currentUser.blockList.filter(
          (user) => user !== username
        );
        setBlockStatus("Bloquear Usuario");
      }

      // Actualizar el usuario actual en localStorage
      localStorage.setItem("usuario", JSON.stringify(currentUser));

      // Actualizar la lista de usuarios en localStorage
      const updatedUsers = allUsers.map((user) => {
        if (user.username === currentUser.username) {
          return currentUser;
        }
        if (user.username === otherUser.username) {
          return otherUser;
        }
        return user;
      });

      localStorage.setItem("usuarios", JSON.stringify(updatedUsers));

      // Mostrar mensaje de éxito
      showToast("Estado de bloqueo actualizado correctamente.", "bg-success");
    }
  };

  const handleFriendRequest = () => {
    let currentUser = JSON.parse(localStorage.getItem("usuario"));
    const allUsers = JSON.parse(localStorage.getItem("usuarios"));
    let friendUser = allUsers.find((user) => user.username === username);

    if (currentUser && friendUser && allUsers) {
      // Inicializar las propiedades si no existen
      if (!currentUser.friendList) currentUser.friendList = [];
      if (!currentUser.incomingRequests) currentUser.incomingRequests = [];
      if (!friendUser.friendList) friendUser.friendList = [];
      if (!friendUser.incomingRequests) friendUser.incomingRequests = [];

      // Comprobaciones y actualizaciones de las listas de amigos y solicitudes
      if (currentUser.friendList.includes(username)) {
        // Borrar amigo de la lista de amigos
        currentUser.friendList = currentUser.friendList.filter(
          (friend) => friend !== username
        );
        friendUser.friendList = friendUser.friendList.filter(
          (friend) => friend !== currentUser.username
        );
        setFriendStatus("Agregar Amigo");
      } else if (currentUser.incomingRequests.includes(username)) {
        // Añadir usuario a la lista de amigos
        currentUser.friendList.push(username);
        friendUser.friendList.push(currentUser.username);
        currentUser.incomingRequests = currentUser.incomingRequests.filter(
          (request) => request !== username
        );
        setFriendStatus("Eliminar Amigo");
      } else if (friendUser.incomingRequests.includes(currentUser.username)) {
        // Quitar solicitud de amistad
        friendUser.incomingRequests = friendUser.incomingRequests.filter(
          (request) => request !== currentUser.username
        );
        setFriendStatus("Agregar Amigo");
      } else {
        // Añadir solicitud de amistad
        friendUser.incomingRequests.push(currentUser.username);
        setFriendStatus("Solicitud Enviada");
      }

      // Actualizar la lista de usuarios en localStorage
      const updatedUsers = allUsers.map((user) => {
        if (user.username === currentUser.username) return currentUser;
        if (user.username === friendUser.username) return friendUser;
        return user;
      });

      localStorage.setItem("usuario", JSON.stringify(currentUser));
      localStorage.setItem("usuarios", JSON.stringify(updatedUsers));

      // Mostrar mensaje de éxito
      showToast("Solicitud de amistad enviada correctamente.", "bg-success");
    }
  };

  const handleUnavailabilityOfButtons = () => {
    let currentUser = JSON.parse(localStorage.getItem("usuario"));
    const allUsers = JSON.parse(localStorage.getItem("usuarios"));
    let otherUser = allUsers.find((user) => user.username === username);

    if (currentUser && otherUser) {
      if (
        currentUser.blockList?.includes(username) ||
        otherUser.blockList?.includes(currentUser.username) ||
        currentUser.username === username
      ) {
        setFriendStatus("Agregar Amigo");
        setIsButtonUnavailable(true);
      } else {
        setIsButtonUnavailable(false);
      }
    }
  };

  if (isCurrentUser) return <ProfilePage />;

  return (
    <MainLayout>
      <div className="container-xxl my-3">
        <Breadcrumb className="custom-breadcrumb">
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>
            Inicio
          </Breadcrumb.Item>
          <Breadcrumb.Item active>{username}</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      {isBlocked ? (
        <p>Este usuario te ha bloqueado.</p>
      ) : userData ? (
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
                  {username}
                </label>
              </Row>
              <Row>
                <img
                  src={
                    userData.profilePicture
                      ? userData.profilePicture
                      : "https://corporate.bestbuy.com/wp-content/uploads/2022/06/Image-Portrait-Placeholder-364x368.jpg"
                  }
                  alt="imagen del perfil"
                  className="m-0 p-0   shadow"
                />
              </Row>
            </Col>
            <Col md={6} className="m-auto shadow">
              <form className="p-3">
                <Row>
                  <Col md={6}>
                    <label
                      htmlFor="inputNombre4"
                      className="form-label border-bottom border-dark-subtle"
                    >
                      Nombre
                    </label>
                    <input
                      type="text"
                      className="form-control border-0 bg-white"
                      id="inputNombre4"
                      value={userData.name}
                      disabled
                    ></input>
                  </Col>
                  <Col md={6}>
                    <label
                      htmlFor="inputApellidos4"
                      className="form-label border-bottom border-dark-subtle"
                    >
                      Apellidos
                    </label>
                    <input
                      type="text"
                      className="form-control border-0 bg-white"
                      id="inputApellidos4"
                      value={userData.lastName}
                      disabled
                    ></input>
                  </Col>
                </Row>
                <Col md={6}>
                  <label
                    htmlFor="inputFechaNacimiento"
                    className="form-label border-bottom border-dark-subtle"
                  >
                    Fecha de nacimiento
                  </label>
                  <input
                    type="date"
                    className="form-control border-0 bg-white"
                    id="inputFechaNacimiento"
                    value={userData.birthDate}
                    disabled
                  ></input>
                </Col>
                <Row>
                  <Col md={6}>
                    <label
                      htmlFor="inputPais"
                      className="form-label border-bottom border-dark-subtle"
                    >
                      País
                    </label>
                    <input
                      type="text"
                      className="form-control border-0 bg-white"
                      id="inputPais"
                      value={userData.country}
                      disabled
                    ></input>
                  </Col>
                  <Col md={6}>
                    <label
                      htmlFor="inputCiudad"
                      className="form-label border-bottom border-dark-subtle"
                    >
                      Ciudad
                    </label>
                    <input
                      type="text"
                      className="form-control border-0 bg-white"
                      id="inputCiudad"
                      value={userData.city}
                      disabled
                    ></input>
                  </Col>
                </Row>
                <Col>
                  <label
                    htmlFor="inputRedes"
                    className="form-label border-bottom border-dark-subtle"
                  >
                    Redes Sociales
                  </label>
                  <input
                    type="text"
                    className="form-control border-0 bg-white"
                    id="inputRedes"
                    value={userData.socialMedia}
                    disabled
                  ></input>
                </Col>
                <Col>
                  <label
                    htmlFor="inputDescripcion"
                    className="form-label border-bottom border-dark-subtle"
                  >
                    Descripcion
                  </label>
                  <textarea
                    className="form-control border-0 bg-white"
                    id="inputDescripcion"
                    rows="3"
                    value={userData.description}
                    disabled
                  ></textarea>
                </Col>

                <Col>
                  {!isButtonUnavailable && (
                    <Link to={`/historial/${username}`}>
                      <button
                        type="button"
                        className="btn btn-primary"
                        style={{ margin: "5px" }}
                      >
                        Ver Historial
                      </button>
                    </Link>
                  )}
                  {!isCurrentUser && currentUser && (
                    <>
                      <button
                        type="button"
                        className="btn btn-primary"
                        style={{ margin: "5px" }}
                        onClick={handleShowBlockModal}
                      >
                        {blockStatus}
                      </button>

                      <ConfirmationModal
                        show={showBlockModal}
                        handleClose={() => setShowBlockModal(false)}
                        handleConfirm={confirmBlockUser}
                        title={
                          blockStatus === "Bloquear Usuario"
                            ? "Bloquear Usuario"
                            : "Desbloquear Usuario"
                        }
                        message={`¿Estás seguro de que quieres ${
                          blockStatus === "Bloquear Usuario"
                            ? "bloquear"
                            : "desbloquear"
                        } a este usuario?`}
                      />

                      {!isButtonUnavailable && (
                        <button
                          type="button"
                          className={`btn ${friendButtonColor}`}
                          style={{ margin: "5px" }}
                          onClick={handleShowFriendModal}
                        >
                          {friendStatus}
                        </button>
                      )}
                      <ConfirmationModal
                        show={showFriendModal}
                        handleClose={() => setShowFriendModal(false)}
                        handleConfirm={confirmFriendRequest}
                        title={
                          friendStatus === "Agregar Amigo" ||
                          friendStatus === "Aceptar Solicitud"
                            ? "Añadir Amigo"
                            : "Eliminar Amigo"
                        }
                        message={`¿Estás seguro de que quieres ${
                          friendStatus === "Agregar Amigo"
                            ? "enviar una solicitud de amistad a " + username
                            : friendStatus === "Aceptar Solicitud"
                            ? "aceptar la solicitud de amistad de " + username
                            : friendStatus === "Solicitud Enviada"
                            ? "cancelar la solicitud de amistad a " + username
                            : "eliminar a " +
                              username +
                              " de tu lista de amigos"
                        }?`}
                      />
                    </>
                  )}
                </Col>
              </form>
            </Col>
          </Row>
        </Container>
      ) : (
        <p>No se encontraron datos para el usuario seleccionado.</p>
      )}
    </MainLayout>
  );
}

export default ProfilePublic;
