import React, { useState, useRef, useEffect, useCallback, act } from "react";
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

  const ShowConnectionStatus = (username) => {
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    let usuario = usuarios.find((usuario) => usuario.username === username);
    //Compara lastConnection con lastDisconnection, si lastConnection es mayor, el usuario esta conectado
    if (!usuario) return "Usuario no encontrado";
    if (
      new Date(usuario.lastConnection) > new Date(usuario.lastDisconnection)
    ) {
      return <small className="text-success"> En Línea; </small>;
    }
    return (
      <small className="text-muted">
        {" "}
        {"Última conexión: " +
          new Date(usuario.lastDisconnection).toLocaleString()}{" "}
      </small>
    );
  };

  const getProfilePicture = (username) => {
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    let usuario = usuarios.find((usuario) => usuario.username === username);
    return usuario.profilePicture;
  };

  const getConversationsForUser = (username) => {
    var allMessages;
    const storedMessages = JSON.parse(localStorage.getItem("messages")) || null;
    if (storedMessages === null) {
      localStorage.setItem("messages", JSON.stringify(data));
      allMessages = data;
    } else {
      allMessages = storedMessages;
    }

    const userConversations = Object.keys(allMessages).filter((key) =>
      key.includes(username)
    );

    return userConversations.map((conversationKey) => {
      const conversationData = allMessages[conversationKey];
      const messages = conversationData.messages || [];
      const archived = conversationData.archived || false;
      const otherUsername = conversationKey
        .replace(username, "")
        .replace("@", "");

      const sortedMessages = messages.sort(
        (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
      );

      return {
        conversationKey: conversationKey,
        otherUser: otherUsername,
        messages: sortedMessages,
        archived: archived,
      };
    });
  };

  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState({});
  const [activeChat, setActiveChat] = useState(null);

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
      ...(allMessages[activeChat.conversationKey].messages || []),
      newMessage,
    ];

    setMessages({
      ...messages,
      [activeChat.conversationKey]: updatedMessages,
    });

    setChatInputValue("");

    allMessages[activeChat.conversationKey] = {
      ...allMessages[activeChat.conversationKey],
      messages: updatedMessages,
    };

    localStorage.setItem("messages", JSON.stringify(allMessages));
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
      [conversationKey]: {
        archived: false,
        messages: [],
      },
    };

    localStorage.setItem("messages", JSON.stringify(updatedMessages));

    setMessages({
      ...messages,
      [conversationKey]: [],
    });

    const newConversation = {
      conversationKey: conversationKey,
      otherUser: newChatUser,
      messages: [],
      archived: false,
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

  const unArchiveChat = (conversationKey) => {
    setConversations((prevConversations) => {
      const updatedConversations = prevConversations.map((convo) =>
        convo.conversationKey === conversationKey
          ? { ...convo, archived: false }
          : convo
      );

      // Update localStorage
      const allMessages = JSON.parse(localStorage.getItem("messages")) || {};
      if (allMessages[conversationKey]) {
        allMessages[conversationKey] = {
          ...allMessages[conversationKey],
          archived: false,
        };
        localStorage.setItem("messages", JSON.stringify(allMessages));
      }

      return updatedConversations;
    });

    setActiveChat((prevActiveChat) => {
      if (
        prevActiveChat &&
        prevActiveChat.conversationKey === conversationKey
      ) {
        return { ...prevActiveChat, archived: false };
      }
      return prevActiveChat;
    });
  };

  const archiveChat = (conversationKey) => {
    setConversations((prevConversations) => {
      const updatedConversations = prevConversations.map((convo) =>
        convo.conversationKey === conversationKey
          ? { ...convo, archived: true }
          : convo
      );

      // Update localStorage
      const allMessages = JSON.parse(localStorage.getItem("messages")) || {};
      if (allMessages[conversationKey]) {
        allMessages[conversationKey] = {
          ...allMessages[conversationKey],
          archived: true,
        };
        localStorage.setItem("messages", JSON.stringify(allMessages));
      }

      return updatedConversations;
    });

    setActiveChat((prevActiveChat) => {
      if (
        prevActiveChat &&
        prevActiveChat.conversationKey === conversationKey
      ) {
        return { ...prevActiveChat, archived: true };
      }
      return prevActiveChat;
    });
  };

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
        const firstNonArchivedConvo = userConversations.find(
          (c) => !c.archived
        );
        setActiveChat(firstNonArchivedConvo || userConversations[0]);
      }
    }
  }, [usuario]);

  const [showArchivedChatsModal, setShowArchivedChatsModal] = useState(false);

  return (
    <Row>
      {/* lista de chats */}
      <Col md={3}>
        <ListGroup>
          <ListGroup.Item className="border-0 mx-0 px-0">
            <button
              id="addChatButton"
              className="d-flex align-items-center w-100 text-dark rounded py-2 px-3 custom-button"
              onClick={() => setShowAddChatModal(true)}
              style={{ cursor: "pointer" }}
            >
              <i className="bi bi-plus-circle custom-icon me-2"></i>
              <span>Añadir nuevo chat</span>
            </button>
          </ListGroup.Item>
          <ListGroup.Item className="border-0 mx-0 px-0">
            <button
              id="archivedChatsButton"
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
              <ListGroup.Item
                className="border-0  mx-0 px-0"
                key={convo.conversationKey}
              >
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
                  <img
                    src={
                      getProfilePicture(convo.otherUser) ||
                      "https://corporate.bestbuy.com/wp-content/uploads/2022/06/Image-Portrait-Placeholder-364x368.jpg"
                    }
                    alt="Perfil"
                    width="30"
                    height="30"
                    style={{ marginRight: "10px", borderRadius: "50%" }}
                  />
                  {convo.otherUser}
                </button>
              </ListGroup.Item>
            ))}
        </ListGroup>
      </Col>
      {/* chatbox */}
      <Col
        id="chatbox"
        md={9}
        className="d-flex flex-column h-100 border border-secondary-subtle bg-light rounded p-0"
      >
        {activeChat ? (
          <>
            {/* header de chatbox y el boton de archivar */}
            <div
              id="chatboxHeader"
              className="p-3 border-bottom border-secondary-subtle d-flex justify-content-between align-items-center"
            >
              <div className="d-flex align-items-center">
                <img
                  src={
                    getProfilePicture(activeChat.otherUser) ||
                    "https://corporate.bestbuy.com/wp-content/uploads/2022/06/Image-Portrait-Placeholder-364x368.jpg"
                  }
                  alt="Perfil"
                  width="30"
                  height="30"
                  style={{ marginRight: "10px", borderRadius: "50%" }}
                />
                <NavLink
                  className="d-inline-flex align-items-center custom-icon"
                  to={`/perfil/${activeChat.otherUser}`}
                  style={{ color: "inherit", textDecoration: "none" }}
                  aria-label={`Perfil de ${activeChat.otherUser}`}
                >
                  <span className="h2 m-0 ps-2 custom-text-link">
                    {activeChat.otherUser}
                  </span>
                </NavLink>
              </div>
              {ShowConnectionStatus(activeChat.otherUser)}

              {activeChat.archived ? (
                <Button
                  variant="outline-secondary"
                  size="sm"
                  onClick={() => unArchiveChat(activeChat.conversationKey)}
                >
                  <i className="bi bi-archive-fill me-2"></i>
                  Desarchivar
                </Button>
              ) : (
                <Button
                  variant="outline-secondary"
                  size="sm"
                  onClick={() => archiveChat(activeChat.conversationKey)}
                >
                  <i className="bi bi-archive me-2"></i>
                  Archivar
                </Button>
              )}
            </div>

            {/* mensajes */}
            <div
              className="flex-grow-1 overflow-auto p-3"
              style={{ height: "60vh" }}
              ref={chatboxRef}
              tabIndex="0"
              aria-atomic="true"
              aria-live="polite"
            >
              {/* solo se ejecuta si hay chat selecionado y se puede leer mensajes */}
              {activeChat &&
                messages[activeChat.conversationKey] &&
                messages[activeChat.conversationKey].map((message) => (
                  <div
                    key={message.id}
                    className={`my-2 p-2 rounded border border-secondary-subtle ${
                      message.sender === usuario.username
                        ? "bg-primary text-secondary align-self-end"
                        : "bg-light text-dark align-self-start"
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
                    {/* solo se ejecuta cuando el mensaje es "abierto" */}
                    {expandedMessages[message.id] && (
                      <div
                        id="expandedmsg"
                        className="d-flex justify-content-between align-items-center mb-1"
                      >
                        {message.sender === usuario.username && (
                          <Button
                            id="deleteMessageButton"
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
                        {/* timestamp */}
                        <small className="text-dark">
                          {formatTimestamp(message.timestamp)}
                        </small>
                      </div>
                    )}
                    {/* el text de mensaje */}
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
            <p className="m-3">Selecciona un chat para comenzar</p>
          </div>
        )}
      </Col>
      {/* modals para anadir chat, confirmacion, y chats archivados */}
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
        unArchiveChat={unArchiveChat}
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
              className="bg-secondary-subtle"
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
  unArchiveChat,
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
                    unArchiveChat(convo.conversationKey);
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
