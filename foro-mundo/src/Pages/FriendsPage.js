import React, { useState, useEffect } from "react";
import MainLayout from "../layout/MainLayout.js";
import { Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useToast } from "../Context/ToastContext.js";

function FriendsPage() {
  const [friends, setFriends] = useState([]);
  const { showToast } = useToast();

  useEffect(() => {
    document.title = "Amigos";

    const usuario = JSON.parse(localStorage.getItem("usuario"));
    const usuarios = JSON.parse(localStorage.getItem("usuarios"));

    if (usuario && usuarios && Array.isArray(usuario.friendList)) {
      const amigos = usuarios.filter((user) => usuario.friendList.includes(user.username));
      setFriends(amigos);
    }
  }, []);

  const handleRemoveFriend = (username) => {
    const currentUser = JSON.parse(localStorage.getItem("usuario"));
    const allUsers = JSON.parse(localStorage.getItem("usuarios"));

    if (currentUser && allUsers) {
      // Asegurarse de que currentUser tenga una friendList
      if (!currentUser.friendList) {
        currentUser.friendList = [];
      }

      if (currentUser.friendList.includes(username)) {
        // Eliminar usuario de la lista de amigos
        currentUser.friendList = currentUser.friendList.filter((friend) => friend !== username);
        // Eliminar usuario de la lista de amigos del amigo
        const friendUser = allUsers.find((user) => user.username === username);
        if (friendUser.friendList) {
            friendUser.friendList = friendUser.friendList.filter((friend) => friend !== currentUser.username);
            }

        // Actualizar el usuario actual en localStorage
        localStorage.setItem("usuario", JSON.stringify(currentUser));

        // Actualizar la lista de usuarios en localStorage
        const updatedUsers = allUsers.map((user) => {
          if (user.username === currentUser.username) {
            return currentUser;
          }
          if(user.username === friendUser.username)
            {
                return friendUser;
            }
          return user;
        });

        localStorage.setItem("usuarios", JSON.stringify(updatedUsers));

        // Actualizar la lista de amigos
        const updatedFriends = friends.filter((user) => user.username !== username);
        setFriends(updatedFriends);

        showToast("Amigo eliminado correctamente.", "bg-danger");
      } else {
        alert("Este usuario no está en tu lista de amigos.");
      }
    }
  }

  return (
    <MainLayout>
      <div className="container-xxl my-3">
        <Breadcrumb className="custom-breadcrumb">
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>
            Inicio
          </Breadcrumb.Item>
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/profile" }}>
            Perfil
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Amigos</Breadcrumb.Item>
        </Breadcrumb>
        <label
          style={{
            fontSize: "3rem",
            fontWeight: "bold",
            display: "block",
            textAlign: "center",
          }}
        >
          Amigos
        </label>
      </div>
      <div className="container-xxl my-3">
        <Link to="/requests">
          <button className="btn btn-secondary" style={{ marginBottom: "20px" }}>
            Peticiones de Amistad
          </button>
        </Link>
        {friends.length === 0 ? (
            <label
                style={{
                fontSize: "1rem",
                display: "block",
                textAlign: "center",
                }}
            >
                No tienes amigos agregados.
            </label>
        ) : (
          friends.map((user) => (
            <div key={user.username} className="card mb-3">
              <div className="card-body">
                <label style={{ fontSize: "1.5rem" }}> {user.username} </label>
                <button
                    className="btn btn-danger"
                    onClick={() => { handleRemoveFriend(user.username); }}
                    style={{ margin: "5px", float: "right"}}
                >
                    Eliminar amigo
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </MainLayout>
  );
}

export default FriendsPage;
