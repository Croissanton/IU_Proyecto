import React, { useState, useEffect } from "react";
import MainLayout from "../layout/MainLayout.js";
import { Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useToast } from "../Context/ToastContext.js";
import ConfirmationModal from '../Components/ConfirmationModal';

function BlockedUsersPage() {
  const [blockedUsers, setBlockedUsers] = useState([]);
  const { showToast } = useToast();

  const [showUnblockModal, setShowUnblockModal] = useState(false);
  const [usernameToUnblock, setUsernameToUnblock] = useState("");

  useEffect(() => {
    document.title = "Bloqueados";

    const usuario = JSON.parse(localStorage.getItem("usuario"));
    const usuarios = JSON.parse(localStorage.getItem("usuarios"));

    if (usuario && usuarios && Array.isArray(usuario.blockList)) {
      const bloqueados = usuarios.filter((user) => usuario.blockList.includes(user.username));
      setBlockedUsers(bloqueados);
    }
  }, []);

  const handleShowUnblockModal = (username) => {
    setUsernameToUnblock(username);
    setShowUnblockModal(true);
  };

  const confirmUnblock = () => {
    handleUnblock(usernameToUnblock);
    setShowUnblockModal(false);
  };

  const handleUnblock = (username) => {
    const currentUser = JSON.parse(localStorage.getItem("usuario"));
    const allUsers = JSON.parse(localStorage.getItem("usuarios"));

    if (currentUser && allUsers) {
      // Asegurarse de que currentUser tenga una blockList
      if (!currentUser.blockList) {
        currentUser.blockList = [];
      }

      if (currentUser.blockList.includes(username)) {
        // Eliminar usuario de la lista de bloqueados
        currentUser.blockList = currentUser.blockList.filter((blockedUser) => blockedUser !== username);

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

        // Actualizar la lista de bloqueados
        const updatedBlockedUsers = blockedUsers.filter((user) => user.username !== username);
        setBlockedUsers(updatedBlockedUsers);

        showToast("Usuario desbloqueado correctamente.", "bg-success");
      } else {
        alert("Este usuario no está bloqueado.");
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
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/perfil" }}>
            Perfil
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Bloqueados</Breadcrumb.Item>
        </Breadcrumb>
        <label
          style={{
            fontSize: "3rem",
            fontWeight: "bold",
            display: "block",
            textAlign: "center",
          }}
        >
          Usuarios Bloqueados
        </label>
      </div>
      <div className="container-xxl my-3">
        {blockedUsers.length === 0 ? (
            <label
                style={{
                fontSize: "1rem",
                display: "block",
                textAlign: "center",
              }}
            >
                No hay usuarios bloqueados.
            </label>
        ) : (
          blockedUsers.map((user) => (
            <div key={user.username} className="card mb-3">
              <div className="card-body">
              <Link to={`/perfil/${user.username}`} 
              className='custom-text-link'
              style={{ 
                fontSize: "1.5rem",
                color: 'black',
                marginLeft: '10px',
                }}>
                {user.username}
              </Link>
                <button
                    className="btn btn-danger"
                    onClick={() => { handleShowUnblockModal(user.username); }}
                    style={{ margin: "5px", float: "right"}}
                >
                    Desbloquear
                </button>
                <ConfirmationModal
                  show={showUnblockModal}
                  handleClose={() => setShowUnblockModal(false)}
                  handleConfirm={confirmUnblock}
                  title="Desbloquear Usuario"
                  message="¿Estás seguro de que quieres desbloquear a este usuario?"
                />
              </div>
            </div>
          ))
        )}
      </div>
    </MainLayout>
  );
}

export default BlockedUsersPage;
