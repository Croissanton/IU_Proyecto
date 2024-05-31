import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import BackButton from "../Components/BackButton";

function LoginPage() {
  useEffect(() => {
    document.title = "Login";
  }, []);

  const cookies = new Cookies();
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user) {
      window.location.href = "/"; // Redirigir después de que se actualice el estado de user
    }
  }, [user]);

  const login = (e) => {
    e.preventDefault();

    // Validar credenciales, por ejemplo:
    if (username === "usuario" && password === "contraseña") {
      const userData = {
        username: "usuario",
        password: "contraseña",
        name: "Juan",
        lastName: "Perez",
        birthDate: "1990-01-01",
        country: "Mexico",
        city: "CDMX",
        socialMedia: "https://www.facebook.com/juanperez",
        description: "Soy un desarrollador web"
      };
      cookies.set("user", userData, { path: "/" });
      setUser(userData);
    } else {
      alert("Nombre de usuario o contraseña incorrectos.");
    }
  }

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center border border-dark-subtle bg-light" style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
      <div className="p-4" style={{ maxWidth: "400px", background: "#ececec", borderRadius: "8px", boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.1)" }}>
        <form className="row col-12 g-3" onSubmit={login}>
          <div className="login-container text-center">
            <h1>Bienvenido</h1>
            <p>Por favor, inicia sesión para continuar.</p>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Nombre de usuario</label>
              <input type="text" className="form-control form-control-sm" aria-label="nombre_de_usuario" required value={username} onChange={(e) => setUsername(e.target.value)} style={{ marginBottom: "0.5rem", width: "300px", margin: "0 auto" }} />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Contraseña</label>
              <input type="password" className="form-control form-control-sm" aria-label="contraseña" required value={password} onChange={(e) => setPassword(e.target.value)} style={{ marginBottom: "0.5rem", width: "300px", margin: "0 auto" }} />
            </div>
            <button type="submit" className="btn btn-primary text-secondary border border-secondary-subtle m-3">Iniciar Sesión</button>
            <button type="button" onClick={() => window.location.href = "/register" } className="btn btn-primary text-secondary border border-secondary-subtle m-3">Registrarse</button>
            <BackButton />
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
