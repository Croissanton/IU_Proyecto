import React, { useState } from "react";
import Cookies from "universal-cookie";
import { Breadcrumb } from "react-bootstrap";
import { useEffect } from "react";
import BackButton from "../Components/BackButton";


function LoginPage() {
  useEffect(() => {
    document.title = "Login";
  }, []);

  const cookies = new Cookies();
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    // Validar credenciales, por ejemplo:
    if (username === "usuario" && password === "contraseña") {
      const user = {
        name: "Juan",
        lastName: "Perez",
        birthDate: "01/01/1990",
        country: "Mexico",
        city: "CDMX",
        socialMedia: "https://www.facebook.com/juanperez",
        description: "Soy un desarrollador web"
      };
      cookies.set("user", user, { path: "/" });
      setUser(user);
    } else {
      alert("Nombre de usuario o contraseña incorrectos.");
    }
  }

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center border border-dark-subtle bg-light" style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
      <div className="p-4" style={{ maxWidth: "400px", background: "#ececec", borderRadius: "8px", boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.1)" }}>

        <div className="login-container text-center">
          <h1>Bienvenido</h1>
          <p>Por favor, inicia sesión para continuar.</p>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Nombre de usuario</label>
            <input type="text" className="form-control form-control-sm" value={username} onChange={(e) => setUsername(e.target.value)} style={{ marginBottom: "0.5rem", width: "300px", margin: "0 auto" }} />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input type="password" className="form-control form-control-sm" value={password} onChange={(e) => setPassword(e.target.value)} style={{ marginBottom: "0.5rem", width: "300px", margin: "0 auto" }} />
          </div>
          <button onClick={login} className="btn btn-primary btn-sm">Iniciar Sesión</button> {" "}
          <button onClick={() => window.location.href = "/register" } className="btn btn-primary btn-sm">Registrarse</button>
          <BackButton />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
