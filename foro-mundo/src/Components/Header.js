import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import { useState, forwardRef } from "react";
import Cookies from "universal-cookie";

const Header = forwardRef((props, ref) => {
  const cookies = new Cookies();
  const [expanded, setExpanded] = useState(false);
  const [isCollapsing, setIsCollapsing] = useState(false); // New state to track collapsing delay

  const toggleNavbar = () => {
    setExpanded((prev) => !prev);
    if (expanded) {
      setIsCollapsing(true); // Set collapsing state when starting to collapse
      setTimeout(() => {
        setIsCollapsing(false); // Reset collapsing state after a delay
      }, 400); // Delay slightly longer than the animation duration
    }
  };

  const [inputValue, setInputValue] = useState(""); // Step 1

  const handleInputChange = (event) => {
    setInputValue(event.target.value); // Step 2
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!inputValue.trim()) {
      alert("Please enter a search query."); // Optionally alert the user
      return;
    }
    // Handle your search redirection here or call an API
    console.log("Searching for:", inputValue);
    // For redirect you might use useHistory from 'react-router-dom' or window.location
    window.location.href = `/search?query=${encodeURIComponent(inputValue)}`;
  };

  const handleLogout = () => {
    cookies.remove("user");
  }

  return (
    <div
      ref={ref}
      className="bg-primary border-bottom border-dark-subtle border-1 fixed-top"
    >
      <Navbar expand="lg" expanded={expanded} onToggle={toggleNavbar}>
        <Container>
          <Navbar.Brand
            href="/"
            className="text-secondary m-auto"
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
            }}
          >
            Mundo Foro
          </Navbar.Brand>
          <Navbar.Toggle
            className="border-0"
            aria-controls="basic-navbar-nav"
          />
          <Navbar.Collapse className="my-1" id="basic-navbar-nav">
            <Nav className="w-100 justify-content-between">
              <div></div> {/* Placeholder for left alignment */}
              <Form
                onSubmit={handleSubmit}
                className={`d-flex my-2 ${
                  expanded || isCollapsing ? "" : "w-50"
                }`}
              >
                <FormControl
                  type="search"
                  placeholder="Buscar..."
                  className="me-2"
                  aria-label="Search"
                  value={inputValue}
                  onChange={handleInputChange}
                  required
                />
                <Button
                  variant="outline-secondary"
                  type="submit"
                  disabled={!inputValue.trim()}
                >
                  <i className="bi bi-search"></i>
                </Button>
              </Form>
              <Nav>
                <Nav.Link href="/create">
                  <i
                    style={{
                      fontSize: "1.5rem",
                      color: "#002561",
                    }}
                    className="bi bi-plus-circle"
                  ></i>
                </Nav.Link>
                <Nav.Link href="/profile">
                  <i
                    style={{
                      fontSize: "1.5rem",
                      color: "#002561",
                    }}
                    className="bi bi-person-circle"
                  ></i>
                </Nav.Link>
                {
                  cookies.get("user") === undefined ? (
                <Navbar.Brand
                  href="/login"
                  className="text-secondary m-auto"
                  style={{
                    fontSize: "1.3rem",
                    fontWeight: "bold",
                  }}
                >
                  Iniciar Sesión
                </Navbar.Brand>
                
                  ) : (
                //cookies.remove("user"),
                <Navbar.Brand onClick={handleLogout}
                  href="/"
                  className="text-secondary m-auto"
                  style={{
                    fontSize: "1.3rem",
                    fontWeight: "bold",
                  }}
                >
                  Cerrar Sesión
                </Navbar.Brand>
                  )
                }
              </Nav>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
});

export default Header;
