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
  // const [messages, setMessages] = useState([
  //   { id: 1, text: "¡Hola!", sender: "You" },
  //   { id: 2, text: "¡Hola!", sender: "You" },
  //   { id: 3, text: "Hola, ¿cómo estás?", sender: "Pepe" },
  //   { id: 4, text: "Estoy bien, ¡gracias!", sender: "You" },
  //   { id: 5, text: "¿Cómo estuvo tu día?", sender: "Pepe" },
  //   { id: 6, text: "Estuvo bien, ¿y el tuyo?", sender: "You" },
  //   {
  //     id: 7,
  //     text: "Muy bien, ¿has visto el último post en el foro de autos?",
  //     sender: "Pepe",
  //   },
  //   { id: 8, text: "Sí, es una locura.", sender: "You" },
  // ]);

  const initialMessages = {
    Pepe: [
      { id: 1, text: "Hola, ¿cómo estás?", sender: "Pepe" },
      {
        id: 2,
        text: "Muy bien, ¿has visto el último post en el foro de autos?",
        sender: "Pepe",
      },
    ],
    Jose: [
      { id: 1, text: "¡Hola amigo!", sender: "Jose" },
      { id: 2, text: "¿Quieres jugar fútbol esta tarde?", sender: "Jose" },
    ],
    percebe43: [
      { id: 1, text: "¿Has terminado el proyecto?", sender: "percebe43" },
    ],
    "Juanito Golondrina": [
      { id: 1, text: "Buenas tardes", sender: "Juanito Golondrina" },
    ],
  };

  const chatContacts = ["Pepe", "Jose", "percebe43", "Juanito Golondrina"];

  const [activeChat, setActiveChat] = useState("Pepe");
  const [messages, setMessages] = useState(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const chatboxRef = useRef(null);

  // const handleSendMessage = () => {
  //   if (!inputValue.trim()) return; // prevent sending empty messages
  //   const newMessage = {
  //     id: messages.length + 1, // simple id increment, consider uuid for real apps
  //     text: inputValue,
  //     sender: "You", // static sender, can be dynamic based on actual user context
  //   };
  //   setMessages([...messages, newMessage]); // append new message
  //   setInputValue(""); // clear input field
  // };

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
  };

  useEffect(() => {
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

  return (
    <Row className="g-0">
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
          >
            <p className="m-0 ps-2">{activeChat}</p>
          </NavLink>
        </div>
        <div
          className="flex-grow-1 overflow-auto p-3"
          style={{ height: "60vh" }}
          ref={chatboxRef}
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
            >
              {message.sender !== "You" && <strong>{message.sender}: </strong>}
              {message.text}
            </div>
          ))}
        </div>
        <Form className="p-3 border-top border-secondary-subtle" >
          <InputGroup>
            <FormControl
              className="border-secondary-subtle"
              type="text"
              placeholder="Type a message..."
              value={inputValue}
              onChange={handleInputChange}
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
