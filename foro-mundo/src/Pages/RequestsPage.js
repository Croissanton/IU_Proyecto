import React, { useState, useEffect } from "react";
import MainLayout from "../layout/MainLayout.js";
import { Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useToast } from "../Context/ToastContext.js";

function RequestsPage() {
  const [requests, setRequests] = useState([]);
  const { showToast } = useToast();

  useEffect(() => {
    document.title = "Peticiones de Amistad";

    const usuario = JSON.parse(localStorage.getItem("usuario"));
    const usuarios = JSON.parse(localStorage.getItem("usuarios"));

    if (usuario && usuarios && Array.isArray(usuario.incomingRequests)) {
      const peticiones = usuarios.filter((user) =>
        usuario.incomingRequests.includes(user.username)
      );
      setRequests(peticiones);
    }
  }, []);

  const handleAcceptRequest = (username) => {
    const currentUser = JSON.parse(localStorage.getItem("usuario"));
    const allUsers = JSON.parse(localStorage.getItem("usuarios"));

    if (currentUser && allUsers) {
      if (!currentUser.friendList) currentUser.friendList = [];

      if (!currentUser.friendList.includes(username)) {
        currentUser.friendList.push(username);
        currentUser.incomingRequests = currentUser.incomingRequests.filter(
          (request) => request !== username
        );

        const friendUser = allUsers.find((user) => user.username === username);
        if (!friendUser.friendList) friendUser.friendList = [];
        console.log(friendUser.friendList, currentUser.username)
        friendUser.friendList.push(currentUser.username);

        const updatedUsers = allUsers.map((user) => {
          if (user.username === currentUser.username) return currentUser;
          if (user.username === friendUser.username) return friendUser;
          return user;
        });

        localStorage.setItem("usuario", JSON.stringify(currentUser));
        localStorage.setItem("usuarios", JSON.stringify(updatedUsers));
        setRequests(requests.filter((user) => user.username !== username));
        showToast("Solicitud de amistad aceptada.", "bg-success");
      }
    }
  };

  const handleRejectRequest = (username) => {
    const currentUser = JSON.parse(localStorage.getItem("usuario"));
    const allUsers = JSON.parse(localStorage.getItem("usuarios"));

    if (currentUser && allUsers) {
      currentUser.incomingRequests = currentUser.incomingRequests.filter(
        (request) => request !== username
      );

      localStorage.setItem("usuario", JSON.stringify(currentUser));
      setRequests(requests.filter((user) => user.username !== username));
      showToast("Solicitud de amistad rechazada.", "bg-danger");
    }
  };

  return (
    <MainLayout>
      <div className="container-xxl my-3">
        <Breadcrumb className="custom-breadcrumb">
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>
            Inicio
          </Breadcrumb.Item>
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/perfil" }}>
            Perfil
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Peticiones de Amistad</Breadcrumb.Item>
        </Breadcrumb>
        <label
          style={{
            fontSize: "3rem",
            fontWeight: "bold",
            display: "block",
            textAlign: "center",
          }}
        >
          Peticiones de Amistad
        </label>
      </div>
      <div className="container-xxl my-3">
        {requests.length === 0 ? (
          <label
            style={{
              fontSize: "1rem",
              display: "block",
              textAlign: "center",
            }}
          >
            No tienes peticiones de amistad.
          </label>
        ) : (
          requests.map((user) => (
            <div key={user.username} className="card mb-3">
              <div className="card-body">
                <Link to={`/perfil/${user.username}`} 
                style={{ 
                  fontSize: "1.5rem",
                  textDecoration: 'none',
                  color: 'black'
                  }}>
                  {user.username}
                </Link>
                <button
                  className="btn btn-danger"
                  onClick={() => handleRejectRequest(user.username)}
                  style={{ margin: "5px", float: "right" }}
                >
                  Rechazar
                </button>
                <button
                  className="btn btn-success"
                  onClick={() => handleAcceptRequest(user.username)}
                  style={{ margin: "5px", float: "right" }}
                >
                  Aceptar
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </MainLayout>
  );
}

export default RequestsPage;
