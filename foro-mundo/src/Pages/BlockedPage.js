import React, { useState, useEffect } from "react";
import MainLayout from "../layout/MainLayout.js";
import { Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";

function BlockedUsersPage() {
  const [blockedUsers, setBlockedUsers] = useState([]);

  useEffect(() => {
    document.title = "Bloqueados";

    const usuario = JSON.parse(localStorage.getItem("usuario"));
    const usuarios = JSON.parse(localStorage.getItem("usuarios"));

    if (usuario && usuarios && Array.isArray(usuario.blockList)) {
      const bloqueados = usuarios.filter((user) => usuario.blockList.includes(user.username));
      setBlockedUsers(bloqueados);
    }
  }, []);

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
          <p>No hay usuarios bloqueados.</p>
        ) : (
          blockedUsers.map((user) => (
            <div key={user.username} className="card mb-3">
              <div className="card-body">
                <label style={{ fontSize: "1.5rem" }}> {user.username} </label>
                <button
                    className="btn btn-danger"
                    onClick={() => {
                        const usuario = JSON.parse(localStorage.getItem("usuario"));
                        usuario.blockList = usuario.blockList.filter((username) => username !== user.username);
                        localStorage.setItem("usuario", JSON.stringify(usuario));
                        setBlockedUsers(blockedUsers.filter((u) => u.username !== user.username));
                    }}
                    style={{ margin: "5px", float: "right"}}
                >
                    Desbloquear
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </MainLayout>
  );
}

export default BlockedUsersPage;
