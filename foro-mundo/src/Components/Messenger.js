import React, { useState, useRef, useEffect } from "react";
import {
  Row,
  Col,
  ListGroup,
  Form,
  FormLabel,
  Button,
  InputGroup,
  FormControl,
  Modal,
  Container,
} from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useToast } from "../Context/ToastContext.js";
import { v4 as uuidv4 } from "uuid";
import data from "../data/initialMessages.json";

const Messenger = () => {
  // Obtener mensajes desde localStorage o inicializar con mensajes predeterminados
  const usuario = JSON.parse(localStorage.getItem("usuario")) || undefined;

  const getConversationsForUser = (username) => {
    const allMessages = JSON.parse(localStorage.getItem("messages")) || data;

    // Filter the keys where the current username is part of the conversation
    const userConversations = Object.keys(allMessages).filter((key) =>
      key.includes(username)
    );

    // Map filtered keys to their respective messages and identify the other user in the chat
    return userConversations.map((conversationKey) => {
      const messages = allMessages[conversationKey];

      // Extract the other user's name by replacing the current username and @ from the key
      const otherUsername = conversationKey
        .replace(username, "")
        .replace("@", "");

      // Optionally, sort messages by timestamp if needed
      const sortedMessages = messages.sort(
        (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
      );

      return {
        conversationKey: conversationKey,
        otherUser: otherUsername,
        messages: sortedMessages,
      };
    });
  };

  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState({});
  const [activeChat, setActiveChat] = useState(null);

  useEffect(() => {
    if (usuario && conversations.length === 0) {
      const userConversations = getConversationsForUser(usuario.username);
      setConversations(userConversations);
      let messagesMap = {};
      userConversations.forEach((c) => {
        messagesMap[c.conversationKey] = c.messages;
      });
      setMessages(messagesMap);
      if (userConversations.length > 0 && !activeChat) {
        setActiveChat(userConversations[0]);
      }
    }
  }, [usuario]);

  const [inputValue, setInputValue] = useState("");
  const chatboxRef = useRef(null);

  const handleSendMessage = () => {
    if (!inputValue.trim() || !activeChat) return;
    const newMessage = {
      id: uuidv4(),
      text: inputValue,
      sender: usuario.username,
      timestamp: new Date().toISOString(),
    };
    const updatedMessages = [
      ...(messages[activeChat.conversationKey] || []),
      newMessage,
    ];
    setMessages({ ...messages, [activeChat.conversationKey]: updatedMessages });
    setInputValue("");
    localStorage.setItem(
      "messages",
      JSON.stringify({
        ...messages,
        [activeChat.conversationKey]: updatedMessages,
      })
    );
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleChatChange = (convo) => {
    if (convo) {
      setActiveChat(convo);
      setTimeout(() => chatboxRef.current?.focus(), 0);
    }
  };

  useEffect(() => {
    if (chatboxRef.current && messages[activeChat.conversationKey]) {
      const { scrollHeight, clientHeight } = chatboxRef.current;
      if (scrollHeight > clientHeight) {
        chatboxRef.current.scrollTo({ top: scrollHeight, behavior: "smooth" });
      }
    }
  }, [messages, activeChat]);

  useEffect(() => {
    if (activeChat && messages[activeChat.conversationKey]) {
      const lastMessageRef = messages[activeChat.conversationKey].length - 1;
      lastMessageRef.current?.focus();
    }
  }, [messages, activeChat]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  const [showModal, setShowModal] = useState(false);
  const { showToast } = useToast();

  const addChat = () => {
    const currentUser = JSON.parse(localStorage.getItem("usuario"));
    const newChatUser = inputValue;

    if (!currentUser || !newChatUser) {
      console.error("Current user or new chat user is not defined");
      return;
    }

    const conversationKey = [currentUser.username, newChatUser]
      .sort()
      .join("@");

    const existingMessages = JSON.parse(localStorage.getItem("messages")) || {};

    if (existingMessages[conversationKey]) {
      console.warn("This chat already exists");
      return;
    }

    const updatedMessages = {
      ...existingMessages,
      [conversationKey]: [],
    };

    localStorage.setItem("messages", JSON.stringify(updatedMessages));

    setMessages(updatedMessages);

    const newConversation = {
      conversationKey: conversationKey,
      otherUser: newChatUser,
      messages: [],
    };

    setConversations((prevConversations) => [
      ...prevConversations,
      newConversation,
    ]);
    setActiveChat(newConversation);
    setInputValue("");
  };

  const handleConfirmModal = () => {
    addChat();
    setShowModal(false);
    showToast("El chat se ha añadido correctamente.", "bg-success");
  };

  const handleCloseModal = () => {
    setShowModal(false);
    showToast("El chat no se ha añadido.", "bg-danger");
  };

  return (
    <Row className="g-0">
      <Col md={3}>
        <ListGroup>
          <ListGroup.Item className="border-0">
            <button
              className={`d-flex align-items-center w-100 text-dark border border-secondary-subtle rounded py-2 px-3 custom-button`}
              onClick={() => setShowModal(true)}
              style={{ cursor: "pointer" }}
            >
              <i className="bi bi-plus-circle custom-icon me-2"></i>
              <span>Añadir nuevo chat</span>
            </button>
          </ListGroup.Item>
          {conversations.map((convo) => (
            <ListGroup.Item className="border-0" key={convo.conversationKey}>
              <button
                className={`d-flex align-items-center w-100 text-dark border border-secondary-subtle rounded py-2 px-3 custom-button ${
                  activeChat.conversationKey === convo.conversationKey
                    ? "active"
                    : ""
                }`}
                onClick={() => handleChatChange(convo)}
                style={{ cursor: "pointer" }}
                aria-pressed={
                  activeChat.conversationKey === convo.conversationKey
                }
              >
                <i className="bi bi-person-circle me-2"></i> {convo.otherUser}
              </button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Col>
      <Col
        md={9}
        className="d-flex flex-column h-100 border border-secondary-subtle bg-light rounded"
      >
        {activeChat ? (
          <>
            <div className="p-3 border-bottom border-secondary-subtle">
              <NavLink
                className="bi bi-person-circle d-inline-flex align-items-center"
                to={`/profile/${activeChat.otherUser}`}
                style={{ color: "inherit", textDecoration: "none" }}
                aria-label={`Perfil de ${activeChat.otherUser}`}
              >
                <span className="h2 m-0 ps-2 custom-text-link">
                  {activeChat.otherUser}
                </span>
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
              {activeChat &&
                messages[activeChat.conversationKey] &&
                messages[activeChat.conversationKey].map((message) => (
                  <div
                    key={message.id}
                    className={`my-2 p-2 rounded border border-secondary-subtle ${
                      message.sender === usuario.username
                        ? "bg-primary text-secondary align-self-end text-end"
                        : "bg-light text-start"
                    }`}
                    style={{
                      width: "fit-content",
                      maxWidth: "80%",
                      marginLeft:
                        message.sender === usuario.username ? "auto" : "0",
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
          </>
        ) : (
          <div className="d-flex justify-content-center align-items-center h-100">
            <p>Selecciona un chat para comenzar</p>
          </div>
        )}
      </Col>
      <AddChatModal
        show={showModal}
        handleClose={handleCloseModal}
        handleConfirm={handleConfirmModal}
        inputValue={inputValue}
        setInputValue={setInputValue}
        handleInputChange={handleInputChange}
      />
    </Row>
  );
};

function AddChatModal({
  show,
  handleClose,
  handleConfirm,
  inputValue,
  setInputValue,
  handleInputChange,
}) {
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (!inputValue.trim()) {
      setSuggestions([]);
      setShowSuggestions(false);
    } else {
      const usuarios = JSON.parse(localStorage.getItem("usuarios"));
      const usernameSuggestions = usuarios.filter((usuario) =>
        usuario.username.toLowerCase().includes(inputValue.toLowerCase())
      );

      const nameSuggestions = usuarios.filter((usuario) =>
        usuario.name.toLowerCase().includes(inputValue.toLowerCase())
      );

      const lastNameSuggestions = usuarios.filter((usuario) =>
        usuario.lastName.toLowerCase().includes(inputValue.toLowerCase())
      );

      const combinedSuggestions = [
        ...usernameSuggestions,
        ...nameSuggestions,
        ...lastNameSuggestions,
      ];
      setSuggestions(combinedSuggestions.slice(0, 5));
      setShowSuggestions(true);
    }
  }, [inputValue]);

  const handleSuggestionClick = (suggestion) => {
    setShowSuggestions(false);
    setInputValue(suggestion.username);
    setSuggestions([]);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Añadir nuevo chat</Modal.Title>
      </Modal.Header>
      <Form
        onSubmit={handleConfirm}
        className={`my-2`}
        style={{ position: "relative" }}
      >
        <Modal.Body>
          <FormLabel htmlFor="searchInput">Buscar usuario</FormLabel>
          <FormControl
            title="Buscar usuario"
            id="searchInput"
            type="search"
            className="me-2"
            aria-label="Buscar usuario"
            value={inputValue}
            onChange={handleInputChange}
            onBlur={() => {
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
              aria-label="Sugerencias de búsqueda"
            >
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  role="option"
                  tabIndex="0"
                  aria-selected={inputValue === suggestion.username}
                  className="p-2 border border-bottom-1 custom-list-item"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  <Container>
                    <span>{suggestion.username}</span>
                    <br />
                    <Form.Text muted>
                      {suggestion.name} {suggestion.lastName}
                    </Form.Text>
                  </Container>
                </div>
              ))}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" type="submit">
            Confirmar
          </Button>
          <Button variant="light" onClick={handleClose}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default Messenger;
