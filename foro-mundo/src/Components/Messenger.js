import React, { useState } from "react";
import {
  Container,
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
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello!", sender: "You" },
    { id: 2, text: "Hello!", sender: "You" },
    { id: 3, text: "Hello!", sender: "You" },
    { id: 4, text: "Hello!", sender: "You" },
    { id: 5, text: "Hello!", sender: "You" },
    { id: 6, text: "Hello!", sender: "You" },
    { id: 7, text: "Hello!", sender: "You" },
    { id: 8, text: "Hello!", sender: "You" },
    { id: 9, text: "Hi, how are you?", sender: "Doe" },
    { id: 10, text: "I am fine, thanks!", sender: "You" },
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleSendMessage = () => {
    if (!inputValue.trim()) return; // prevent sending empty messages
    const newMessage = {
      id: messages.length + 1, // simple id increment, consider uuid for real apps
      text: inputValue,
      sender: "You", // static sender, can be dynamic based on actual user context
    };
    setMessages([...messages, newMessage]); // append new message
    setInputValue(""); // clear input field
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleListItemClick = (name) => {
    console.log(`clicked on ${name}`);
  };

  return (
    <Row className="g-0 py-5">
      <Col md={3}>
        <ListGroup>
          {["Jane Doe", "John Smith", "Student A", "Student B"].map((name) => (
            <ListGroup.Item className="border-0" key={name}>
              <button
                className="btn btn-link d-flex align-items-center w-100 bg-light text-dark border border-secondary-subtle custom-link-container"
                onClick={() => handleListItemClick(name)}
                style={{ textDecoration: "none" }}
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
            className="bi bi-person-circle"
            to={`/profile/id`}
            style={{ color: "inherit", textDecoration: "none" }}
          >
            Dose
          </NavLink>
        </div>
        <div
          className="flex-grow-1 overflow-auto p-3"
          style={{ height: "60vh" }}
        >
          {messages.map((message) => (
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
        <Form className="p-3 border-top border-secondary-subtle">
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
