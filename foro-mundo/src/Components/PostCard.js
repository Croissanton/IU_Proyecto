import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate, NavLink } from "react-router-dom";

const PostCard = ({
  id,
  title,
  text,
  upvotes,
  downvotes,
  author,
  date,
  res_num,
  view_num,
  lm_author,
  lm_date,
  onPostClick,
}) => {
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem("usuario")) || undefined;
  const [postUpvotes, setPostUpvotes] = useState(upvotes ?? 0);
  const [postDownvotes, setPostDownvotes] = useState(downvotes ?? 0);
  const [userVote, setUserVote] = useState(null);
  const [authorProfilePicture, setAuthorProfilePicture] = useState("");
  const [lmAuthorProfilePicture, setLmAuthorProfilePicture] = useState("");

  useEffect(() => {
    if (usuario) {
      if (usuario.upPosts.includes(id)) {
        setUserVote("upvote");
      } else if (usuario.downPosts.includes(id)) {
        setUserVote("downvote");
      }
    }
  }, [id, usuario]);

  useEffect(() => {
    const allUsers = JSON.parse(localStorage.getItem("usuarios")) || [];
    const authorData = allUsers.find((user) => user.username === author);
    const lmAuthorData = allUsers.find((user) => user.username === lm_author);

    if (authorData) {
      setAuthorProfilePicture(authorData.profilePicture || "https://corporate.bestbuy.com/wp-content/uploads/2022/06/Image-Portrait-Placeholder-364x368.jpg");
    }
    if (lmAuthorData) {
      setLmAuthorProfilePicture(lmAuthorData.profilePicture || "https://corporate.bestbuy.com/wp-content/uploads/2022/06/Image-Portrait-Placeholder-364x368.jpg");
    }
  }, [author, lm_author]);

  const updateLocalStorage = (newUpvotes, newDownvotes) => {
    const posts = JSON.parse(localStorage.getItem("posts")) || [];
    const postIndex = posts.findIndex((post) => post.id === id);

    if (postIndex !== -1) {
      posts[postIndex].upvotes = newUpvotes;
      posts[postIndex].downvotes = newDownvotes;
      localStorage.setItem("posts", JSON.stringify(posts));
    }
  };

  const handleVote = (type, e) => {
    e.stopPropagation();
    let newUpvotes = postUpvotes;
    let newDownvotes = postDownvotes;

    if (type === "upvote") {
      if (userVote === "upvote") {
        if (newUpvotes > 0) newUpvotes -= 1;
        setUserVote(null);
        usuario.upPosts = usuario.upPosts.filter((postId) => postId !== id);
      } else {
        if (userVote === "downvote") {
          if (newDownvotes > 0) newDownvotes -= 1;
          newUpvotes += 1;
          usuario.downPosts = usuario.downPosts.filter((postId) => postId !== id);
        } else {
          newUpvotes += 1;
        }
        setUserVote("upvote");
        usuario.upPosts.push(id);
      }
    } else if (type === "downvote") {
      if (userVote === "downvote") {
        if (newDownvotes > 0) newDownvotes -= 1;
        setUserVote(null);
        usuario.downPosts = usuario.downPosts.filter((postId) => postId !== id);
      } else {
        if (userVote === "upvote") {
          if (newUpvotes > 0) newUpvotes -= 1;
          newDownvotes += 1;
          usuario.upPosts = usuario.upPosts.filter((postId) => postId !== id);
        } else {
          newDownvotes += 1;
        }
        setUserVote("downvote");
        usuario.downPosts.push(id);
      }
    }

    setPostUpvotes(newUpvotes);
    setPostDownvotes(newDownvotes);
    localStorage.setItem("usuario", JSON.stringify(usuario));
    localStorage.setItem(
      "usuarios",
      JSON.stringify(
        JSON.parse(localStorage.getItem("usuarios")).map((u) =>
          u.username === usuario.username ? usuario : u
        )
      )
    );
    updateLocalStorage(newUpvotes, newDownvotes);
  };

  const handleClick = () => {
    if (onPostClick) {
      onPostClick(id);
      navigate(`/post/${id}`);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="custom-link mb-2 mx-0 mt-0 p-0"
      role="button"
      tabIndex="0"
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          handleClick();
        }
      }}
    >
      <Container className="border border-dark-subtle bg-light">
        <Row className="custom-link-container">
          <Col className="p-3">
            <Row>
              <span
                className="h4"
                style={{
                  whiteSpace: "normal",
                  wordBreak: "break-word",
                  overflowWrap: "break-word",
                }}
              >
                {title}
              </span>
            </Row>
            <Row>
              <p
                style={{
                  whiteSpace: "normal",
                  wordBreak: "break-word",
                  overflowWrap: "break-word",
                }}
              >
                {text}
              </p>
            </Row>
            <Row>
              <Col>
                <img
                  src={authorProfilePicture || "https://corporate.bestbuy.com/wp-content/uploads/2022/06/Image-Portrait-Placeholder-364x368.jpg"}
                  alt="Foto del autor del post"
                  width="30"
                  height="30"
                  style={{ marginRight: "10px", borderRadius: "50%" }}
                  onClick={(e) => e.stopPropagation()}
                />
                <span> Creador: </span>
                <NavLink
                  className="custom-text-link"
                  to={`/perfil/${author}`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <span>{author}</span>
                </NavLink>
              </Col>
            </Row>
            <Row>
              <p>Fecha de creación: {date}</p>
            </Row>
            <Row>
              <Col>
                <span> Votos positivos: {postUpvotes} </span>
                <Button
                  className={`btn ${userVote === "upvote" ? "btn-success" : "btn-primary"}`}
                  onClick={(e) => handleVote("upvote", e)}
                  disabled={!usuario}
                  style={{ margin: "5px" }}
                  aria-label="Votar positivamente"
                >
                  +
                </Button>
              </Col>
              <Col>
                <span> Votos negativos: {postDownvotes} </span>
                <Button
                  className={`btn ${userVote === "downvote" ? "btn-danger" : "btn-primary"}`}
                  disabled={!usuario}
                  onClick={(e) => handleVote("downvote", e)}
                  style={{ margin: "5px" }}
                  aria-label="Votar negativamente"
                >
                  -
                </Button>
              </Col>
            </Row>
          </Col>
          <Col className="p-3">
            <Row>
              <Col className="m-auto">
                <span className="h5">Respuestas</span>
                <p>{res_num}</p>
              </Col>
              <Col className="m-auto">
                <span className="h5">Número de visualizaciones</span>
                <p>{view_num}</p>
              </Col>
              {lm_author && (
                <Col className="m-auto">
                <Row>
                  <p>Último mensaje por:</p>
                </Row>
                <Row>
                  <NavLink
                    className="custom-text-link"
                    to={`/perfil/${lm_author}`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span>{lm_author}</span>
                  </NavLink>
                </Row>
                <Row>
                  <p>Fecha del último mensaje:</p>
                </Row>
                <Row>
                  <p>{lm_date}</p>
                </Row>
              </Col>
              )}
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PostCard;

