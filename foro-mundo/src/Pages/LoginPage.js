import React, { useState } from "react";
import Cookies from "universal-cookie";
import { Breadcrumb } from "react-bootstrap";
import { useEffect } from "react";


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
    <div className="container-fluid d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="container-sm">
        <Breadcrumb>
          <Breadcrumb.Item href="../#">Inicio</Breadcrumb.Item>
          <Breadcrumb.Item active>Login</Breadcrumb.Item>
        </Breadcrumb>

        <div className="login-container text-center">
          <h1>Bienvenido</h1>
          <p>Por favor, inicia sesión para continuar. O en cambio, <a href="/signup">regístrese</a>.</p>
        
          <div className="mb-3">
            <input type="text" className="form-control form-control-sm small-input" placeholder="Nombre de usuario" value={username} onChange={(e) => setUsername(e.target.value)} style={{ marginBottom: "0.5rem" }} />
          </div>
          <div className="mb-3">
            <input type="password" className="form-control form-control-sm small-input" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} style={{ marginBottom: "0.5rem" }} />
          </div>
          <button onClick={login} className="btn btn-primary btn-sm">Iniciar Sesión</button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
