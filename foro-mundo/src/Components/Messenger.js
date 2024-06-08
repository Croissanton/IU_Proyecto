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

const Messenger = () => {
  const initialMessages = {
    Pepe: [
      { id: 1, text: "Hola, ¿cómo estás?", sender: "Pepe" },
      {
        id: 2,
        text: "Muy bien, ¿has visto el último post en el foro de autos?",
        sender: "You",
      },
      {
        id: 3,
        text: "Sí, fue bastante interesante. ¡Me encantó el nuevo modelo!",
        sender: "Pepe",
      },
      {
        id: 4,
        text: "A mí también, parece tener muy buenas características.",
        sender: "You",
      },
    ],
    Jose: [
      { id: 1, text: "¡Hola amigo!", sender: "Jose" },
      { id: 2, text: "¿Quieres jugar fútbol esta tarde?", sender: "Jose" },
      { id: 3, text: "Claro, ¿a qué hora nos encontramos?", sender: "You" },
      { id: 4, text: "A las 5 pm en el parque de siempre.", sender: "Jose" },
    ],
    percebe43: [
      { id: 1, text: "¿Has terminado el proyecto?", sender: "percebe43" },
      {
        id: 2,
        text: "Estoy casi listo, solo me falta revisar algunos detalles.",
        sender: "You",
      },
      {
        id: 3,
        text: "Perfecto, avísame cuando esté terminado.",
        sender: "percebe43",
      },
      { id: 4, text: "Seguro, te mantendré al tanto.", sender: "You" },
    ],
    "Juanito Golondrina": [
      { id: 1, text: "Buenas tardes", sender: "Juanito Golondrina" },
      { id: 2, text: "Buenas tardes, ¿cómo estás?", sender: "You" },
      {
        id: 3,
        text: "Muy bien, gracias. ¿Y tú?",
        sender: "Juanito Golondrina",
      },
      { id: 4, text: "Todo bien, gracias por preguntar.", sender: "You" },
    ],
  };

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
    setMessages({
      ...messages,
      [activeChat]: [...messages[activeChat], newMessage],
    });
    setInputValue("");
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
        <div className="h2 p-3 border-bottom border-secondary-subtle">
          <NavLink
            className="bi bi-person-circle d-inline-flex align-items-center"
            to={`/profile/${activeChat}`}
            style={{ color: "inherit", textDecoration: "none" }}
            aria-label={`Perfil de ${activeChat}`}
          >
            <p className="m-0 ps-2">{activeChat}</p>
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
              <strong>
                {message.sender !== "You" ? `${message.sender}: ` : ""}
              </strong>
              <span>{message.text}</span>
            </div>
          ))}
        </div>
        <Form className="p-3 border-top border-secondary-subtle">
          <InputGroup>
            <FormControl
              className="border-secondary-subtle"
              type="text"
              placeholder="Type a message..."
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
              Send
            </Button>
          </InputGroup>
        </Form>
      </Col>
    </Row>
  );
};

export default Messenger;
