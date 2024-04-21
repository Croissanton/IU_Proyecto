import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import { useState } from "react";

const Header = () => {
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

  return (
    <header className="sticky-top">
      <Navbar
        expand="lg"
        className="bg-primary border-bottom border-dark-subtle border-1"
        expanded={expanded}
        onToggle={toggleNavbar}
      >
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
                className={`d-flex my-2 ${
                  expanded || isCollapsing ? "" : "w-50"
                }`}
              >
                <FormControl
                  type="search"
                  placeholder="Buscar..."
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-secondary" type="submit">
                  <i className="bi bi-search"></i>
                </Button>
              </Form>
              <Nav>
                <Nav.Link href="#">
                  <i
                    style={{
                      fontSize: "1.5rem",
                      color: "#002561",
                    }}
                    className="bi bi-plus-circle"
                  ></i>
                </Nav.Link>
                <Nav.Link href="#">
                  <i
                    style={{
                      fontSize: "1.5rem",
                      color: "#002561",
                    }}
                    className="bi bi-bell"
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
              </Nav>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
