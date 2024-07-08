import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Container, ListGroup, Breadcrumb, Col, Row } from "react-bootstrap";
import MainLayout from "../layout/MainLayout";

const SearchPage = () => {
  const [suggestions, setSuggestions] = useState({
    users: [],
    posts: [],
    comments: [],
    topics: [],
  });
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const fetchSuggestions = (query) => {
    const posts = JSON.parse(localStorage.getItem("posts")) || [];
    const topics = JSON.parse(localStorage.getItem("topics")) || [];
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const comments = posts.reduce(
      (acc, post) => [
        ...acc,
        ...post.comments.map((comment) => ({
          ...comment,
          postId: post.id,
        })),
      ],
      []
    );

    const topicSuggestions = topics
      .filter((topic) =>
        topic.topic.toLowerCase().includes(query.toLowerCase())
      )
      .map((topic) => ({
        ...topic,
        type: "topic",
      }));

    const postSuggestions = posts
      .filter((post) => post.title.toLowerCase().includes(query.toLowerCase()))
      .map((post) => ({
        ...post,
        type: "post",
      }));

    const postAuthorSuggestions = posts
      .filter((post) => post.author.toLowerCase().includes(query.toLowerCase()))
      .map((post) => ({
        ...post,
        type: "post",
      }));

    const commentSuggestions = comments
      .filter((comment) =>
        comment.title.toLowerCase().includes(query.toLowerCase())
      )
      .map((comment) => ({
        ...comment,
        type: "comment",
      }));

    const commentAuthorSuggestions = comments
      .filter((comment) =>
        comment.author.toLowerCase().includes(query.toLowerCase())
      )
      .map((comment) => ({
        ...comment,
        type: "comment",
      }));

    const userSuggestions = usuarios
      .filter((user) =>
        user.username.toLowerCase().includes(query.toLowerCase())
      )
      .map((user) => ({
        ...user,
        type: "user",
      }));

    setSuggestions({
      users: userSuggestions,
      posts: postSuggestions.concat(postAuthorSuggestions),
      comments: commentSuggestions.concat(commentAuthorSuggestions),
      topics: topicSuggestions,
    });
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get("query");
    if (query) {
      setQuery(query);
      fetchSuggestions(query);
    }
  }, [location]);

  const handleSuggestionClick = (suggestion) => {
    switch (suggestion.type) {
      case "topic":
        navigate(`/topic/${suggestion.id}`);
        break;
      case "post":
        navigate(`/post/${suggestion.id}`);
        break;
      case "comment":
        navigate(`/post/${suggestion.postId}`);
        break;
      case "user":
        navigate(`/perfil/${suggestion.username}`);
        break;
      default:
        console.warn("Unknown suggestion type");
    }
  };

  const renderSuggestionList = (title, items) => (
    <Col md={6} lg={3}>
      <h3>{title}</h3>
      <ListGroup>
        {items.map((suggestion, index) => (
          <ListGroup.Item
            key={index}
            action
            onClick={() => handleSuggestionClick(suggestion)}
          >
            <Container>
              {suggestion.title || suggestion.topic || suggestion.username}
              {suggestion.author && (
                <>
                  <br />
                  <span>
                    Creado por:{" "}
                    <Link
                      className="custom-text-link"
                      to={`/perfil/${suggestion.author}`}
                    >
                      {suggestion.author}
                    </Link>
                  </span>
                </>
              )}
            </Container>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Col>
  );

  return (
    <MainLayout>
      <div className="container-xxl my-2">
        <Breadcrumb className="custom-breadcrumb">
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>
            Inicio
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Buscar</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <label
        style={{
          fontSize: "3rem",
          fontWeight: "bold",
          display: "block",
          textAlign: "center",
        }}
      >
        Busqueda
      </label>
      <Container>
        <h2>Resultados de busqueda: "{query}"</h2>
        <hr />
        <Row>
          {renderSuggestionList("Usuarios", suggestions.users)}
          {renderSuggestionList("Posts", suggestions.posts)}
          {renderSuggestionList("Comentarios", suggestions.comments)}
          {renderSuggestionList("Foros", suggestions.topics)}
        </Row>
      </Container>
    </MainLayout>
  );
};

export default SearchPage;
