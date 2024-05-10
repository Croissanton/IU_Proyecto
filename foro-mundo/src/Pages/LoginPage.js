import React from "react";
import Cookies from "universal-cookie";
import { useState } from "react";
import Nav from "react-bootstrap/Nav";


function LoginPage() {
    
  //Creamos una instancia de la clase Cookies
  const cookies = new Cookies();

  //Inicializamos el estado del usuario
  const[user , setUser] = useState(null);

  //Función para manejar el evento del botón de login
  const login = () => {
    //Creamos un objeto con los datos del usuario
    const user = {
      name: "Juan",
      lastName: "Perez",
      birthDate: "01/01/1990",
      country: "Mexico",
      city: "CDMX",
      socialMedia: "https://www.facebook.com/juanperez",
      description: "Soy un desarrollador web"
    };

    //Guardamos el objeto en una cookie
    cookies.set("user", user, {path: "/"});

    //Actualizamos el estado del usuario
    setUser(user);
  }

    //Función para manejar el evento del botón de logout
    const logout = () => {
      //Eliminamos la cookie
      cookies.remove("user");
  
      //Actualizamos el estado del usuario
      setUser(null);
    }

    return (
        <div>
            <h1>Login</h1>
            {
            cookies.get("user") !== undefined ?  (
                // El botón debe llevar al usuario a MainPage con href = "/"
                <div>
                <p>Bienvenido {user.name} {user.lastName}</p>
                <Nav.Link href="/">
                    <button onClick={logout}>Logout</button>
                </Nav.Link>
                </div>
            ) : (
                <Nav.Link href="/">
                    <button onClick={login}>Login</button>
                </Nav.Link>
            )
            }
        </div>

        );
}
    export default LoginPage;