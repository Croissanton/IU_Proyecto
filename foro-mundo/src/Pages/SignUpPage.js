import React, { useState } from "react";
import Cookies from "universal-cookie";
import { Breadcrumb } from "react-bootstrap";
import BackButton from "../Components/BackButton";


function SignUpPage() {
  const cookies = new Cookies();
  const [user, setUser] = useState({
    username: "",
    password: "",
    name: "",
    lastName: "",
    birthDate: "",
    country: "",
    city: "",
    socialMedia: "",
    description: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const register = () => {
    // Aquí puedes agregar la lógica para validar los campos del formulario antes de crear el usuario
    // Por ejemplo, verificar si todos los campos obligatorios están completos

    // Crear el usuario con los datos del formulario
    cookies.set("user", user, { path: "/" });
    window.location.href = "/";
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center border border-dark-subtle bg-light" style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
      <div className="p-4" style={{ maxWidth: "400px", background: "#ececec", borderRadius: "8px", boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.1)" }}>
        <Breadcrumb>
          <Breadcrumb.Item href="../#">Inicio</Breadcrumb.Item>
          <Breadcrumb.Item active>Registro</Breadcrumb.Item>
        </Breadcrumb>

        <div className="login-container text-center">
          <h1>Registro</h1>
          <p>Por favor, completa el siguiente formulario para registrarte.</p>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Nombre de usuario</label>
            <input type="text" className="form-control form-control-sm" name="username" value={user.username} onChange={handleInputChange} required />
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input type="password" className="form-control form-control-sm" name="password" value={user.password} onChange={handleInputChange} required />
            <label htmlFor="name" className="form-label">Nombre</label>
            <input type="text" className="form-control form-control-sm" name="name" value={user.name} onChange={handleInputChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="lastName" className="form-label">Apellido</label>
            <input type="text" className="form-control form-control-sm" name="lastName" value={user.lastName} onChange={handleInputChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="birthDate" className="form-label">Fecha de Nacimiento</label>
            <input type="date" className="form-control form-control-sm" name="birthDate" value={user.birthDate} onChange={handleInputChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="country" className="form-label">País</label>
            <input type="text" className="form-control form-control-sm" name="country" value={user.country} onChange={handleInputChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="city" className="form-label">Ciudad</label>
            <input type="text" className="form-control form-control-sm" name="city" value={user.city} onChange={handleInputChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="socialMedia" className="form-label">Redes Sociales</label>
            <input type="text" className="form-control form-control-sm" name="socialMedia" value={user.socialMedia} onChange={handleInputChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Descripción</label>
            <textarea className="form-control form-control-sm" name="description" value={user.description} onChange={handleInputChange} required />
          </div>
          <button onClick={register} className="btn btn-primary text-secondary border border-secondary-subtle m-3">Registrarse</button>
          <BackButton />
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
