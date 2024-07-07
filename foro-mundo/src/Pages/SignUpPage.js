import React, { useState } from "react";
import { Breadcrumb, ProgressBar, OverlayTrigger, Tooltip } from "react-bootstrap";
import BackButton from "../Components/BackButton";
import { useToast } from "../Context/ToastContext.js";
import { Link, useNavigate } from "react-router-dom";
import zxcvbn from "zxcvbn";

function PasswordStrengthMeter({ password }) {
  const testResult = zxcvbn(password);
  const score = testResult.score * 25;

  const getProgressBarVariant = (score) => {
    if (score === 100) return "success";
    if (score >= 75) return "info";
    if (score >= 50) return "warning";
    return "danger";
  };

  return (
    <ProgressBar
      now={score < 25 && password !== "" ? 10 : score}
      variant={getProgressBarVariant(score)}
      label={
        score === 100
          ? "Muy fuerte"
          : score >= 75
            ? "Fuerte"
            : score >= 50
              ? "Regular"
              : "Débil"
      }
    />
  );
}

function SignUpPage() {

  const [usuario, setUsuario] = useState({
    username: "",
    password: "",
    name: "",
    lastName: "",
    birthDate: "",
    country: "",
    city: "",
    socialMedia: "",
    description: "",
    profilePicture: "",
    friendList: [],
    blockedList: [],
    upPosts: [],
    downPosts: [],
    upComments: [],
    downComments: [],
    lastConnection: "",
    lastDisconnection: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUsuario({ ...usuario, [name]: value });
  };

  const register = (e) => {
    e.preventDefault();
    //Si ya hay un usuario con ese username o correo, mostrar un mensaje de error
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    if (usuarios.find((u) => u.username === usuario.username)) {
      alert("El nombre de usuario ya está en uso.");
      return;
    }
    usuario.lastConnection = new Date().toLocaleString();
    usuario.lastDisconnection = usuario.lastConnection;

    usuarios.push(usuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    localStorage.setItem("usuario", JSON.stringify(usuario));
    
    showToast("Registro correcto.", "bg-success");
    navigate("/"); // Redirigir después de que se actualice el estado de usuario
  };

  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center border border-dark-subtle bg-light"
      style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}
    >
      <div
        className="p-4"
        style={{
          maxWidth: "400px",
          background: "#ececec",
          borderRadius: "8px",
          boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.1)",
        }}
      >
        <Breadcrumb className="custom-breadcrumb">
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>
            Inicio
          </Breadcrumb.Item>
          <Breadcrumb.Item active aria-label="enlace_a_registro">
            Registro
          </Breadcrumb.Item>
        </Breadcrumb>
        <form className="row col-12 g-3" onSubmit={register} action="/">
          <div className="login-container text-center">
          <label style={{ fontSize: "2.5rem" }}>Registro</label>
          <label style={{ fontSize: "1rem", paddingBottom: "25px" }}>Por favor, completa el siguiente formulario para registrarte.</label>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Nombre de usuario
              </label>
              <input
                id="username"
                type="text"
                className="form-control form-control-sm"
                name="username"
                value={usuario.username}
                onChange={handleInputChange}
                required
                aria-label="nombre_usuario"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Contraseña
              </label>
              <div className="input-group">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className="form-control form-control-sm"
                  name="password"
                  value={usuario.password}
                  onChange={handleInputChange}
                  required
                  aria-label="contraseña"
                />
                <OverlayTrigger
                  placement="bottom"
                  overlay={
                    <Tooltip id="tooltip-create">
                      {showPassword ? "Ocultar" : "Mostrar"}
                    </Tooltip>
                  }
                >
                  <button
                    type="button"
                    className={
                      showPassword
                        ? "bi bi-eye btn btn-outline-secondary"
                        : "bi bi-eye-slash btn btn-outline-secondary"
                    }
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label="toggle_password_visibility"
                  ></button>
                </OverlayTrigger>
              </div>
              <PasswordStrengthMeter password={usuario.password} />
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="name" className="form-label">
                  Nombre
                </label>
                <input
                  id="name"
                  type="text"
                  className="form-control form-control-sm"
                  name="name"
                  value={usuario.name}
                  onChange={handleInputChange}
                  required
                  aria-label="nombre"
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="lastName" className="form-label">
                  Apellidos
                </label>
                <input
                  id="lastName"
                  type="text"
                  className="form-control form-control-sm"
                  name="lastName"
                  value={usuario.lastName}
                  onChange={handleInputChange}
                  required
                  aria-label="apellidos"
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="birthDate" className="form-label">
                Fecha de Nacimiento
              </label>
              <input
                id="birthDate"
                type="date"
                className="form-control form-control-sm"
                name="birthDate"
                value={usuario.birthDate}
                onChange={handleInputChange}
                required
                aria-label="fecha_de_nacimiento"
              />
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="country" className="form-label">
                  País
                </label>
                <input
                  id="country"
                  type="text"
                  className="form-control form-control-sm"
                  name="country"
                  value={usuario.country}
                  onChange={handleInputChange}
                  required
                  aria-label="pais"
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="city" className="form-label">
                  Ciudad (Opcional)
                </label>
                <input
                  id="city"
                  type="text"
                  className="form-control form-control-sm"
                  name="city"
                  value={usuario.city}
                  onChange={handleInputChange}
                  aria-label="ciudad_opcional"
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="socialMedia" className="form-label">
                Redes Sociales (Opcional)
              </label>
              <input
                id="socialMedia"
                type="text"
                className="form-control form-control-sm"
                name="socialMedia"
                value={usuario.socialMedia}
                onChange={handleInputChange}
                aria-label="redes_sociales_opcional"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Descripción (Opcional)
              </label>
              <textarea
                id="description"
                className="form-control form-control-sm"
                name="description"
                value={usuario.description}
                onChange={handleInputChange}
                aria-label="descripcion_opcional"
              />
            </div>
            <BackButton />
            <button
              type="submit"
              className="btn btn-primary text-secondary border border-secondary-subtle m-3"
            >
              Registrarse
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUpPage;
