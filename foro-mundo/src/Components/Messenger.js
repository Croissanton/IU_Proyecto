import React, { useState, useRef, useEffect } from "react";
import {
  Row,
  Col,
  ListGroup,
  Form,
  Button,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { NavLink } from "react-router-dom";
import data from "../data/initialMessages.json";

const Messenger = () => {
  // Obtener mensajes desde localStorage o inicializar con mensajes predeterminados
  const initialMessages = JSON.parse(localStorage.getItem("messages")) || data;

  const chatContacts = ["Pepe", "Jose", "percebe43", "Juanito Golondrina"];

  const [activeChat, setActiveChat] = useState("Pepe");
  const [messages, setMessages] = useState(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const chatboxRef = useRef(null);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    const newMessage = {
      id: messages[activeChat].length + 1,
      text: inputValue,
      sender: "You",
    };
    const updatedMessages = {
      ...messages,
      [activeChat]: [...messages[activeChat], newMessage],
    };
    setMessages(updatedMessages);
    setInputValue("");
    // Guardar mensajes en localStorage
    localStorage.setItem("messages", JSON.stringify(updatedMessages));
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleChatChange = (name) => {
    setActiveChat(name);
    setTimeout(() => chatboxRef.current?.focus(), 0);
  };

  useEffect(() => {
    if (chatboxRef.current && activeChat) {
      chatboxRef.current.focus();
    }
    if (chatboxRef.current) {
      const { scrollHeight, clientHeight } = chatboxRef.current;
      if (scrollHeight > clientHeight) {
        chatboxRef.current.scrollTo({
          top: scrollHeight,
          behavior: "smooth",
        });
      }
    }
  }, [messages, activeChat]);

  useEffect(() => {
    const lastMessageRef = messages[activeChat].length - 1;
    lastMessageRef.current?.focus();
  }, [messages, activeChat]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  return (
    <Row className="g-0 py-5">
      <Col md={3}>
        <ListGroup>
          {chatContacts.map((name) => (
            <ListGroup.Item className="border-0" key={name}>
              <button
                className={`d-flex align-items-center w-100 text-dark border border-secondary-subtle rounded py-2 px-3 custom-button ${
                  name === activeChat ? "active" : ""
                }`}
                onClick={() => handleChatChange(name)}
                style={{ cursor: "pointer" }}
                aria-pressed={name === activeChat}
              >
                <i className="bi bi-person-circle me-2"></i> {name}
              </button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Col>
      <Col
        md={9}
        className="d-flex flex-column h-100 border border-secondary-subtle bg-light rounded"
      >
        <div className="p-3 border-bottom border-secondary-subtle">
          <NavLink
            className="bi bi-person-circle d-inline-flex align-items-center"
            to={`/perfil/${activeChat}`}
            style={{ color: "inherit", textDecoration: "none" }}
            aria-label={`Perfil de ${activeChat}`}
          >
            <h2 className="m-0 ps-2">{activeChat}</h2>
          </NavLink>
        </div>
        <div
          className="flex-grow-1 overflow-auto p-3"
          style={{ height: "60vh" }}
          ref={chatboxRef}
          tabIndex="0"
          aria-atomic="true"
          aria-live="polite"
        >
          {messages[activeChat].map((message) => (
            <div
              key={message.id}
              className={`my-2 p-2 rounded border border-secondary-subtle ${
                message.sender === "You"
                  ? "bg-primary text-secondary align-self-end text-end"
                  : "bg-light text-start"
              }`}
              style={{
                width: "fit-content",
                maxWidth: "80%",
                marginLeft: message.sender === "You" ? "auto" : "0",
              }}
              tabIndex="-1"
              aria-label={`${message.sender} dice ${message.text}`}
            >
              <span>{message.text}</span>
            </div>
          ))}
        </div>
        <Form className="p-3 border-top border-secondary-subtle">
          <InputGroup>
            <FormControl
              className="border-secondary-subtle"
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              aria-label="Esribe tu mensaje aqui."
            />
            <Button
              className="border-secondary-subtle"
              onClick={handleSendMessage}
              variant="primary"
            >
              Enviar
            </Button>
          </InputGroup>
        </Form>
      </Col>
    </Row>
  );
};

export default Messenger;
