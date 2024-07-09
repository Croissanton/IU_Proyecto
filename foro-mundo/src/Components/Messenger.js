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
import ConfirmationModal from "./ConfirmationModal.js";

const Messenger = () => {
  const usuario = JSON.parse(localStorage.getItem("usuario")) || undefined;

  const getConversationsForUser = (username) => {
    // Get messages from localstorage, if empty get them from data and store to localstorage.
    var allMessages;
    const storedMessages = JSON.parse(localStorage.getItem("messages"));
    if (!storedMessages) {
      localStorage.setItem("messages", JSON.stringify(data));
      allMessages = data;
    } else {
      allMessages = storedMessages;
    }
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
        archived: false,
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
  }, [usuario, conversations, activeChat]);

  const [chatInputValue, setChatInputValue] = useState("");
  const [modalInputValue, setModalInputValue] = useState("");
  const chatboxRef = useRef(null);

  const handleSendMessage = () => {
    if (!chatInputValue.trim() || !activeChat) return;
    const allMessages = JSON.parse(localStorage.getItem("messages")) || {};
    const newMessage = {
      id: uuidv4(),
      text: chatInputValue,
      sender: usuario.username,
      timestamp: new Date().toISOString(),
    };
    const updatedMessages = [
      ...(messages[activeChat.conversationKey] || []),
      newMessage,
    ];
    setMessages({ ...messages, [activeChat.conversationKey]: updatedMessages });
    setChatInputValue("");
    localStorage.setItem(
      "messages",
      JSON.stringify({
        ...allMessages,
        [activeChat.conversationKey]: updatedMessages,
      })
    );
  };

  const handleChatInputChange = (event) => {
    setChatInputValue(event.target.value);
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

  const [showAddChatModal, setShowAddChatModal] = useState(false);
  const { showToast } = useToast();

  const addChat = () => {
    const currentUser = JSON.parse(localStorage.getItem("usuario"));
    const newChatUser = modalInputValue;

    if (!currentUser || !newChatUser) {
      console.error("Current user or new chat user is not defined");
      return;
    }

    const conversationKey = `${currentUser.username}@${newChatUser}`;

    const existingMessages = JSON.parse(localStorage.getItem("messages")) || {};

    if (
      existingMessages.hasOwnProperty(conversationKey) ||
      existingMessages.hasOwnProperty(`${newChatUser}@${currentUser.username}`)
    ) {
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
    setModalInputValue("");
  };

  const handleConfirmAddChatModal = () => {
    addChat();
    setShowAddChatModal(false);
    showToast("El chat se ha añadido correctamente.", "bg-success");
    setModalInputValue("");
  };

  const handleCloseAddChatModal = () => {
    setShowAddChatModal(false);
    showToast("El chat no se ha añadido.", "bg-info");
    setModalInputValue("");
  };

  const [expandedMessages, setExpandedMessages] = useState({});

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const toggleMessage = (messageId) => {
    setExpandedMessages((prev) => ({
      ...prev,
      [messageId]: !prev[messageId],
    }));
  };

  const [showDeleteMessageModal, setShowDeleteMessageModal] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState(null);

  const handleConfirmDeleteMessageModal = () => {
    if (messageToDelete) {
      deleteMessage(messageToDelete);
      setShowDeleteMessageModal(false);
      setMessageToDelete(null);
      showToast("El mensaje se ha eliminado correctamente.", "bg-success");
    }
  };

  const deleteMessage = (messageId) => {
    if (!activeChat) return;

    const updatedMessages = messages[activeChat.conversationKey].filter(
      (message) => message.id !== messageId
    );

    const newMessages = {
      ...messages,
      [activeChat.conversationKey]: updatedMessages,
    };

    setMessages(newMessages);

    // Update localStorage
    const allMessages = JSON.parse(localStorage.getItem("messages")) || {};
    allMessages[activeChat.conversationKey] = updatedMessages;
    localStorage.setItem("messages", JSON.stringify(allMessages));

    // Close the expanded view
    setExpandedMessages((prev) => ({
      ...prev,
      [messageId]: false,
    }));
  };

  const toggleArchiveStatus = (conversationKey) => {
    setConversations((prevConversations) =>
      prevConversations.map((convo) =>
        convo.conversationKey === conversationKey
          ? { ...convo, archived: !convo.archived }
          : convo
      )
    );

    setActiveChat((prevActiveChat) => {
      if (
        prevActiveChat &&
        prevActiveChat.conversationKey === conversationKey
      ) {
        return { ...prevActiveChat, archived: !prevActiveChat.archived };
      }
      return prevActiveChat;
    });

    // Update localStorage
    const allMessages = JSON.parse(localStorage.getItem("messages")) || {};
    allMessages[conversationKey].archived =
      !allMessages[conversationKey].archived;
    localStorage.setItem("messages", JSON.stringify(allMessages));
  };

  const [showArchivedChatsModal, setShowArchivedChatsModal] = useState(false);

  return (
    <Row className="g-0">
      <Col md={3}>
        <ListGroup>
          <ListGroup.Item className="border-0">
            <button
              className="d-flex align-items-center w-100 text-dark border border-secondary-subtle rounded py-2 px-3 custom-button"
              onClick={() => setShowAddChatModal(true)}
              style={{ cursor: "pointer" }}
            >
              <i className="bi bi-plus-circle custom-icon me-2"></i>
              <span>Añadir nuevo chat</span>
            </button>
          </ListGroup.Item>
          <ListGroup.Item className="border-0">
            <button
              className="d-flex align-items-center w-100 text-dark border border-secondary-subtle rounded py-2 px-3 custom-button"
              onClick={() => setShowArchivedChatsModal(true)}
              style={{ cursor: "pointer" }}
            >
              <i className="bi bi-archive custom-icon me-2"></i>
              <span>Chats archivados</span>
            </button>
          </ListGroup.Item>
          {conversations
            .filter((convo) => !convo.archived)
            .map((convo) => (
              <ListGroup.Item className="border-0" key={convo.conversationKey}>
                <button
                  className={`d-flex align-items-center w-100 text-dark border border-secondary-subtle rounded py-2 px-3 custom-button ${
                    activeChat &&
                    activeChat.conversationKey === convo.conversationKey
                      ? "active"
                      : ""
                  }`}
                  onClick={() => handleChatChange(convo)}
                  style={{ cursor: "pointer" }}
                  aria-pressed={
                    activeChat &&
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
            <div className="p-3 border-bottom border-secondary-subtle d-flex justify-content-between align-items-center">
              <NavLink
                className="bi bi-person-circle d-inline-flex align-items-center"
                to={`/perfil/${activeChat.otherUser}`}
                style={{ color: "inherit", textDecoration: "none" }}
                aria-label={`Perfil de ${activeChat.otherUser}`}
              >
                <span className="h2 m-0 ps-2 custom-text-link">
                  {activeChat.otherUser}
                </span>
              </NavLink>
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={() => toggleArchiveStatus(activeChat.conversationKey)}
              >
                {activeChat.archived ? (
                  <>
                    <i className="bi bi-archive-fill me-2"></i>
                    Desarchivar
                  </>
                ) : (
                  <>
                    <i className="bi bi-archive me-2"></i>
                    Archivar
                  </>
                )}
              </Button>
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
                        ? "bg-primary text-secondary align-self-end"
                        : "bg-light text-start"
                    }`}
                    style={{
                      width: "fit-content",
                      maxWidth: "80%",
                      marginLeft:
                        message.sender === usuario.username ? "auto" : "0",
                      cursor: "pointer",
                    }}
                    onClick={() => toggleMessage(message.id)}
                  >
                    {expandedMessages[message.id] && (
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        {message.sender === usuario.username && (
                          <Button
                            className="me-2"
                            variant="danger"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              setMessageToDelete(message.id);
                              setShowDeleteMessageModal(true);
                            }}
                            aria-label="Eliminar mensaje"
                          >
                            <i className="bi bi-trash"></i>
                            <span>Borrar mensaje</span>
                          </Button>
                        )}
                        <small className="text-muted">
                          {formatTimestamp(message.timestamp)}
                        </small>
                      </div>
                    )}
                    <span>{message.text}</span>
                  </div>
                ))}
            </div>
            <Form className="p-3 border-top border-secondary-subtle">
              <InputGroup>
                <FormControl
                  className="border-secondary-subtle"
                  type="text"
                  value={chatInputValue}
                  onChange={handleChatInputChange}
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
        show={showAddChatModal}
        handleClose={handleCloseAddChatModal}
        handleConfirm={handleConfirmAddChatModal}
        inputValue={modalInputValue}
        setInputValue={setModalInputValue}
        handleInputChange={(e) => setModalInputValue(e.target.value)}
      />
      <ConfirmationModal
        message="¿Estás seguro de que quieres eliminar este mensaje?"
        show={showDeleteMessageModal}
        handleClose={() => {
          setShowDeleteMessageModal(false);
          setMessageToDelete(null);
        }}
        handleConfirm={handleConfirmDeleteMessageModal}
      />
      <ArchivedChatsModal
        show={showArchivedChatsModal}
        handleClose={() => setShowArchivedChatsModal(false)}
        conversations={conversations}
        toggleArchiveStatus={toggleArchiveStatus}
        setActiveChat={setActiveChat}
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
      const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
      const currentUser = JSON.parse(localStorage.getItem("usuario"));
      const lowercasedInput = inputValue.toLowerCase();

      const filteredUsers = usuarios.filter(
        (usuario) =>
          usuario.username !== currentUser.username &&
          (usuario.username.toLowerCase().includes(lowercasedInput) ||
            usuario.name.toLowerCase().includes(lowercasedInput) ||
            usuario.lastName.toLowerCase().includes(lowercasedInput))
      );

      const uniqueUsers = removeDuplicates(filteredUsers);
      setSuggestions(uniqueUsers.slice(0, 5));
      setShowSuggestions(uniqueUsers.length > 0);
    }
  }, [inputValue]);

  const handleSuggestionClick = (suggestion) => {
    setShowSuggestions(false);
    setInputValue(suggestion.username);
    setSuggestions([]);
  };

  const [errorMessage, setErrorMessage] = useState("");

  const checkChatExists = (newChatUser) => {
    const currentUser = JSON.parse(localStorage.getItem("usuario"));
    if (!currentUser) return false;

    const existingMessages = JSON.parse(localStorage.getItem("messages")) || {};
    const conversationKey1 = `${currentUser.username}@${newChatUser}`;
    const conversationKey2 = `${newChatUser}@${currentUser.username}`;

    return (
      existingMessages.hasOwnProperty(conversationKey1) ||
      existingMessages.hasOwnProperty(conversationKey2)
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (checkChatExists(inputValue)) {
      setErrorMessage("Este chat ya existe.");
    } else {
      setErrorMessage("");
      handleConfirm();
    }
  };

  const removeDuplicates = (users) => {
    const seen = new Set();
    return users.filter((user) => {
      const duplicate = seen.has(user.username);
      seen.add(user.username);
      return !duplicate;
    });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Añadir nuevo chat</Modal.Title>
      </Modal.Header>
      <Form
        onSubmit={handleSubmit}
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
          {errorMessage && (
            <div className="text-danger mt-2">{errorMessage}</div>
          )}
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
              {suggestions.map((suggestion) => (
                <div
                  key={suggestion.username}
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

function ArchivedChatsModal({
  show,
  handleClose,
  conversations,
  toggleArchiveStatus,
  setActiveChat,
}) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Chats archivados</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ListGroup>
          {conversations
            .filter((convo) => convo.archived)
            .map((convo) => (
              <ListGroup.Item
                key={convo.conversationKey}
                className="d-flex justify-content-between align-items-center"
              >
                {convo.otherUser}
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    toggleArchiveStatus(convo.conversationKey);
                    setActiveChat(convo);
                    handleClose();
                  }}
                >
                  Desarchivar
                </Button>
              </ListGroup.Item>
            ))}
        </ListGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Messenger;
