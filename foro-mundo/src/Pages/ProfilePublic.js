import React, { useEffect, useState } from "react";
import MainLayout from "../layout/MainLayout.js";
import { Breadcrumb } from "react-bootstrap";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useToast } from "../Context/ToastContext.js";

function ProfilePublic() {
  const { username } = useParams(); // Obtener el username de usuario desde los parámetros de la URL
  const [userData, setUserData] = useState(null);
  const [friendStatus, setFriendStatus] = useState("");
  const [blockStatus, setBlockStatus] = useState("");
  const navigate = useNavigate();
  const { showToast } = useToast();

  useEffect(() => {
    document.title = "Perfil";

    // Obtener los datos del usuario desde localStorage basado en el username
    const storedUsers = localStorage.getItem("usuarios");
    const currentUser = JSON.parse(localStorage.getItem("usuario"));
    if (storedUsers) {
      const parsedUsers = JSON.parse(storedUsers);
      const user = parsedUsers.find((user) => user.username === username);
      if (user) {
        setUserData(user);
        updateStatuses(currentUser, user);
      }
    }
  }, [username]);

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

    if (currentUser && allUsers) {
      // Asegurarse de que currentUser tenga una blockList
      if (!currentUser.blockList) {
        currentUser.blockList = [];
      }

      if (!currentUser.blockList.includes(username)) {
        // Añadir usuario a la lista de bloqueados
        currentUser.blockList.push(username);
        setBlockStatus("Desbloquear Usuario");
      } else {
        // Eliminar usuario de la lista de bloqueados
        currentUser.blockList = currentUser.blockList.filter(user => user !== username);
        setBlockStatus("Bloquear Usuario");
      }

      // Actualizar el usuario actual en localStorage
      localStorage.setItem("usuario", JSON.stringify(currentUser));

      // Actualizar la lista de usuarios en localStorage
      const updatedUsers = allUsers.map((user) => {
        if (user.username === currentUser.username) {
          return currentUser;
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
    let friendUser = allUsers.find(user => user.username === username);

    if (currentUser && friendUser && allUsers) {
      // Inicializar las propiedades si no existen
      if (!currentUser.friendList) currentUser.friendList = [];
      if (!currentUser.incomingRequests) currentUser.incomingRequests = [];
      if (!friendUser.friendList) friendUser.friendList = [];
      if (!friendUser.incomingRequests) friendUser.incomingRequests = [];

      // Comprobaciones y actualizaciones de las listas de amigos y solicitudes
      if (currentUser.friendList.includes(username)) {
        // Borrar amigo de la lista de amigos
        currentUser.friendList = currentUser.friendList.filter(friend => friend !== username);
        friendUser.friendList = friendUser.friendList.filter(friend => friend !== currentUser.username);
        setFriendStatus("Agregar Amigo");
      } else if (currentUser.incomingRequests.includes(username)) {
        // Añadir usuario a la lista de amigos
        currentUser.friendList.push(username);
        friendUser.friendList.push(currentUser.username);
        currentUser.incomingRequests = currentUser.incomingRequests.filter(request => request !== username);
        setFriendStatus("Eliminar Amigo");
      } else if (friendUser.incomingRequests.includes(currentUser.username)) {
        // Quitar solicitud de amistad
        friendUser.incomingRequests = friendUser.incomingRequests.filter(request => request !== currentUser.username);
        setFriendStatus("Agregar Amigo");
      } else {
        // Añadir solicitud de amistad
        friendUser.incomingRequests.push(currentUser.username);
        setFriendStatus("Solicitud Enviada");
      }

      // Actualizar la lista de usuarios en localStorage
      const updatedUsers = allUsers.map(user => {
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
      {userData ? (
        <div style={{ display: "flex" }}>
          <div className="m-auto">
            <img
              src="https://via.placeholder.com/150"
              alt="profile"
              width="250"
              height="350"
            />
          </div>
          <div
            className="m-auto"
            style={{
              width: "60%",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <form className="row col-12 g-3">
              <div className="row">
                <div className="col-md-6">
                  <label htmlFor="inputNombre4" className="form-label">
                    Nombre
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputNombre4"
                    value={userData.name}
                    disabled
                  ></input>
                </div>
                <div className="col-md-6">
                  <label htmlFor="inputApellidos4" className="form-label">
                    Apellidos
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputApellidos4"
                    value={userData.lastName}
                    disabled
                  ></input>
                </div>
              </div>
              <div className="col-12">
                <label htmlFor="inputFechaNacimiento" className="form-label">
                  Fecha de nacimiento
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="inputFechaNacimiento"
                  value={userData.birthDate}
                  disabled
                ></input>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <label htmlFor="inputPais" className="form-label">
                    País
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputPais"
                    value={userData.country}
                    disabled
                  ></input>
                </div>
                <div className="col-md-6">
                  <label htmlFor="inputCiudad" className="form-label">
                    Ciudad
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputCiudad"
                    value={userData.city}
                    disabled
                  ></input>
                </div>
              </div>
              <div className="col-12">
                <label htmlFor="inputRedes" className="form-label">
                  Redes Sociales
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputRedes"
                  value={userData.socialMedia}
                  disabled
                ></input>
              </div>
              <div className="col-12">
                <label htmlFor="inputDescripcion" className="form-label">
                  Descripcion
                </label>
                <textarea
                  className="form-control"
                  id="inputDescripcion"
                  rows="3"
                  value={userData.description}
                  disabled
                ></textarea>
              </div>
              <div className="col-12">
                <Link to={`/historial/${username}`}>
                  <button
                    type="button"
                    className="btn btn-primary"
                    style={{ margin: "5px" }}
                  >
                    Ver Historial
                  </button>
                </Link>
                <button
                  type="button"
                  className="btn btn-danger"
                  style={{ margin: "5px" }}
                  onClick={handleBlockUser}
                >
                  {blockStatus}
                </button>
                <button
                  type="button"
                  className="btn btn-success"
                  style={{ margin: "5px" }}
                  onClick={handleFriendRequest}
                >
                  {friendStatus}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <p>No se encontraron datos para el usuario seleccionado.</p>
      )}
    </MainLayout>
  );
}

export default ProfilePublic;
