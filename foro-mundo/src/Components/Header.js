import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import { useState, forwardRef, useRef, useEffect } from "react";
import Cookies from "universal-cookie";
import ToastMessage from "./ToastMessage";

const Header = forwardRef((props, ref) => {
  const cookies = new Cookies();
  const [expanded, setExpanded] = useState(false);
  const [isCollapsing, setIsCollapsing] = useState(false); // New state to track collapsing delay

  const containerRef = useRef(null);
  const combinedRef = ref || containerRef; // Use forwarded ref if available, otherwise use internal ref

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (combinedRef.current && !combinedRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [combinedRef]);

  const toggleNavbar = () => {
    setExpanded((prev) => !prev);
    if (expanded) {
      setIsCollapsing(true); // Set collapsing state when starting to collapse
      setTimeout(() => {
        setIsCollapsing(false); // Reset collapsing state after a delay
      }, 400); // Delay slightly longer than the animation duration
    }
  };

  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const allSuggestions = ["Coche", "Mundo", "Pepe", "Off-topic", "Cine"]; // Example suggestions

  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    const userInput = event.target.value;
    setInputValue(userInput);

    if (!userInput.trim()) {
      setSuggestions([]);
      setShowSuggestions(false);
    } else {
      const filteredSuggestions = allSuggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(userInput.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
      setShowSuggestions(true);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!inputValue.trim()) {
      return;
    }
    // Handle your search redirection here or call an API
    console.log("Searching for:", inputValue);
    // For redirect you might use useHistory from 'react-router-dom' or window.location
    window.location.href = `/search?query=${encodeURIComponent(inputValue)}`;
  };

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastColor, setToastColor] = useState("");

  const handleLogout = () => {
    cookies.remove("user");
    setToastColor("bg-success");
    setToastMessage("Se ha cerrado la sesión!");
    setShowToast(true);
  };

  return (
    <Navbar
      ref={combinedRef}
      expand="lg"
      expanded={expanded}
      onToggle={toggleNavbar}
      className="header bg-primary border-bottom border-dark-subtle border-1 fixed-top"
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
        <Navbar.Toggle className="border-0" aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="my-1" id="basic-navbar-nav">
          <Nav className="w-100 justify-content-between">
            <div></div> {/* Placeholder for left alignment */}
            <Form
              onSubmit={handleSubmit}
              className={`d-flex my-2 ${
                expanded || isCollapsing ? "" : "w-50"
              }`}
              style={{ position: "relative" }} // Position relative for the suggestion box
            >
              <FormControl
                id="searchInput"
                type="search"
                placeholder="Buscar..."
                className="me-2"
                aria-label="Search"
                value={inputValue}
                onChange={handleInputChange}
                onBlur={() => {
                  // Delay hiding suggestions a bit to allow onClick to fire on suggestions
                  setTimeout(() => {
                    setShowSuggestions(false);
                  }, 200);
                }}
                onFocus={() => {
                  if (inputValue && suggestions.length > 0) {
                    setShowSuggestions(true);
                  }
                }}
                required
                autoComplete="off"
              />
              <Button
                variant="outline-secondary"
                type="submit"
                disabled={!inputValue.trim()}
              >
                <i className="bi bi-search"></i>
              </Button>
              {showSuggestions && inputValue && suggestions.length > 0 && (
                <div
                  className="bg-white"
                  style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    top: "100%",
                    zIndex: 2,
                    border: "1px solid #ccc",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                  }}
                  role="listbox"
                  aria-label="Search suggestions"
                >
                  {suggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      role="option"
                      tabIndex="0"
                      aria-selected={inputValue === suggestion}
                      style={{ padding: "10px", cursor: "pointer" }}
                      onClick={() => {
                        console.log("Selected suggestion:", suggestion);
                        setInputValue(suggestion);
                        setShowSuggestions(false);
                        setSuggestions([]);
                        document.getElementById("searchInput").focus(); // Optionally set focus back
                      }}
                    >
                      {suggestion}
                    </div>
                  ))}
                </div>
              )}
            </Form>
            <Nav>
              {cookies.get("user") === undefined ? (
                <div></div>
              ) : (
                <Nav.Link href="/create">
                  <i className="bi bi-plus-circle custom-icon"></i>
                </Nav.Link>
              )}
              {cookies.get("user") === undefined ? (
                <div></div>
              ) : (
                <Nav.Link href="/profile">
                  <i className="bi bi-person-circle custom-icon"></i>
                </Nav.Link>
              )}
              {cookies.get("user") === undefined ? (
                <div></div>
              ) : (
                <Nav.Link href="/messenger">
                  <i className="bi bi-chat custom-icon"></i>
                </Nav.Link>
              )}
              {cookies.get("user") === undefined ? (
                <Nav.Link
                  href="/login"
                  className="text-secondary m-auto custom-link"
                  style={{
                    fontSize: "1rem",
                    fontWeight: "bold",
                  }}
                >
                  Iniciar Sesión
                </Nav.Link>
              ) : (
                <Nav.Link
                  onClick={handleLogout}
                  className="text-secondary m-auto custom-link"
                  style={{
                    fontSize: "1rem",
                    fontWeight: "bold",
                  }}
                >
                  Cerrar Sesión
                </Nav.Link>
              )}
              {cookies.get("user") === undefined ? (
                <Nav.Link
                  href="/register"
                  className="text-secondary m-auto custom-link"
                  style={{
                    fontSize: "1rem",
                    fontWeight: "bold",
                  }}
                >
                  Registrarse
                </Nav.Link>
              ) : (
                <div></div>
              )}
            </Nav>
          </Nav>
        </Navbar.Collapse>
      </Container>
      <ToastMessage
        show={showToast}
        onClose={() => setShowToast(false)}
        message={toastMessage}
        color={toastColor}
      />
    </Navbar>
  );
});

export default Header;
