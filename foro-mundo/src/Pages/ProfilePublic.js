import React, { useEffect, useState } from "react";
import MainLayout from "../layout/MainLayout.js";
import { Breadcrumb } from "react-bootstrap";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useToast } from "../Context/ToastContext.js";

function ProfilePublic() {
  const { username } = useParams(); // Obtener el username de usuario desde los parámetros de la URL
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const { showToast } = useToast();

  useEffect(() => {
    document.title = "Perfil";

    // Obtener los datos del usuario desde localStorage basado en el username
    const storedUsers = localStorage.getItem("usuarios");
    if (storedUsers) {
      const parsedUsers = JSON.parse(storedUsers);
      const user = parsedUsers.find((user) => user.username === username);
      if (user) {
        setUserData(user);
      }
    }
  }, [username]);

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

        // Navegar a la página de usuarios bloqueados o mostrar un mensaje de éxito
        navigate("/blocked");
        showToast("Usuario bloqueado correctamente.", "bg-success");
      } else {
        alert("Este usuario ya está bloqueado.");
      }
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
                  Bloquear Usuario
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
