import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { useToast } from "../Context/ToastContext.js";
import ConfirmationModal from "./ConfirmationModal";

const PostComment = ({
  id,
  postId,
  title,
  author,
  initialUpvotes,
  initialDownvotes,
  date,
  onDelete,
}) => {
  const usuario = JSON.parse(localStorage.getItem("usuario")) || undefined;
  const [upvotes, setUpvotes] = useState(initialUpvotes);
  const [downvotes, setDownvotes] = useState(initialDownvotes);
  const [userVote, setUserVote] = useState(null);
  const [authorProfilePicture, setAuthorProfilePicture] = useState("");
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [showDeleteCommentModal, setShowDeleteCommentModal] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);

  useEffect(() => {
    if (usuario) {
      if (usuario.upComments.includes(id)) {
        setUserVote("upvote");
      } else if (usuario.downComments.includes(id)) {
        setUserVote("downvote");
      }
    }
  }, [id, usuario]);

  useEffect(() => {
    const allUsers = JSON.parse(localStorage.getItem("usuarios")) || [];
    const authorData = allUsers.find((user) => user.username === author);
    if (authorData) {
      setAuthorProfilePicture(authorData.profilePicture || "https://via.placeholder.com/150");
    }
  }, [author]);

  useEffect(() => {
    const posts = JSON.parse(localStorage.getItem("posts")) || [];
    const post = posts.find((post) => post.id.toString() === postId.toString());
    if (post) {
      const storedComment = post.comments.find((comment) => comment.id === id);
      if (storedComment) {
        setUpvotes(storedComment.upvotes);
        setDownvotes(storedComment.downvotes);
      }
    }
  }, [postId, id]);

  const updateLocalStorage = (newUpvotes, newDownvotes) => {
    const posts = JSON.parse(localStorage.getItem("posts")) || [];
    const post = posts.find((post) => post.id.toString() === postId.toString());
    const comments = post.comments || [];
    const commentIndex = comments.findIndex((comment) => comment.id === id);

    if (commentIndex !== -1) {
      comments[commentIndex].upvotes = newUpvotes;
      comments[commentIndex].downvotes = newDownvotes;
    } else {
      comments.push({
        id,
        postId,
        title,
        author,
        upvotes: newUpvotes,
        downvotes: newDownvotes,
        date,
        onDelete,
      });
    }

    post.comments = comments;
    posts[posts.findIndex((post) => post.id.toString() === postId.toString())] = post;
    localStorage.setItem("posts", JSON.stringify(posts));
  };

  const handleVote = (type) => {
    let newUpvotes = upvotes;
    let newDownvotes = downvotes;

    if (type === "upvote") {
      if (userVote === "upvote") {
        newUpvotes = Math.max(newUpvotes - 1, 0);
        setUserVote(null);
        usuario.upComments = usuario.upComments.filter((commentId) => commentId !== id);
      } else {
        if (userVote === "downvote") {
          newDownvotes = Math.max(newDownvotes - 1, 0);
          usuario.downComments = usuario.downComments.filter((commentId) => commentId !== id);
        }
        newUpvotes += 1;
        setUserVote("upvote");
        usuario.upComments.push(id);
      }
    } else if (type === "downvote") {
      if (userVote === "downvote") {
        newDownvotes = Math.max(newDownvotes - 1, 0);
        setUserVote(null);
        usuario.downComments = usuario.downComments.filter((commentId) => commentId !== id);
      } else {
        if (userVote === "upvote") {
          newUpvotes = Math.max(newUpvotes - 1, 0);
          usuario.upComments = usuario.upComments.filter((commentId) => commentId !== id);
        }
        newDownvotes += 1;
        setUserVote("downvote");
        usuario.downComments.push(id);
      }
    }

    setUpvotes(newUpvotes);
    setDownvotes(newDownvotes);
    localStorage.setItem("usuario", JSON.stringify(usuario));
    const updatedUsers = JSON.parse(localStorage.getItem("usuarios")).map((u) =>
      u.username === usuario.username ? usuario : u
    );
    localStorage.setItem("usuarios", JSON.stringify(updatedUsers));
    updateLocalStorage(newUpvotes, newDownvotes);
  };

  const handleDeleteComment = (id) => {
    setCommentToDelete(id);
    setShowDeleteCommentModal(true);
  };

  const handleCancelDelete = () => {
    setShowDeleteCommentModal(false);
  };

  const handleConfirmDeleteComment = () => {
    const posts = JSON.parse(localStorage.getItem("posts")) || [];
    const postIndex = posts.findIndex((post) => post.id.toString() === postId.toString());

    if (postIndex !== -1) {
      const post = posts[postIndex];
      const updatedComments = post.comments.filter((comment) => comment.id !== commentToDelete);
      
      post.comments = updatedComments;
      if (post.comments && post.comments.length > 0) {
        post.lm_author = post.comments[post.comments.length - 1].author;
        post.lm_date = post.comments[post.comments.length - 1].date;
      } else {
        post.lm_author = "";
        post.lm_date = "";
      }

      post.res_num = updatedComments.length;
      posts[postIndex] = post;
      localStorage.setItem("posts", JSON.stringify(posts));

      setShowDeleteCommentModal(false);
      showToast("Comentario eliminado", "bg-danger");
      navigate(`/post/${postId}`);
      if (onDelete) onDelete(commentToDelete);
    }
  };

  return (
    <Row className="gy-3">
      <Col className="p-3 m-auto">
        <Container id="comment-container" className="border border-dark-subtle bg-light" role="region" aria-labelledby="comment-title">
          <Row>
            <Col className="border-end border-dark-subtle p-3">
              <p id="comment-title" style={{ whiteSpace: "normal", wordBreak: "break-word", overflowWrap: "break-word" }}>
                {title}
              </p>
            </Col>
            <Col>
              <Row className="p-3">
                <Col className="text-center" tabIndex="0">
                  <Button
                    disabled={!usuario}
                    className="btn"
                    onClick={() => handleVote("upvote")}
                    variant={userVote === "upvote" ? "success" : "primary"}
                    aria-label="Votar positivamente"
                  >
                    +
                  </Button>
                  <Row>
                    <span className="h5">Votos positivos</span>
                  </Row>
                  <Row>
                    <p>{upvotes}</p>
                  </Row>
                </Col>
                <Col className="text-center" tabIndex="0">
                  <Button
                    className="btn"
                    disabled={!usuario}
                    onClick={() => handleVote("downvote")}
                    variant={userVote === "downvote" ? "danger" : "primary"}
                    aria-label="Votar negativamente"
                  >
                    -
                  </Button>
                  <Row>
                    <span className="h5">Votos negativos</span>
                  </Row>
                  <Row>
                    <p>{downvotes}</p>
                  </Row>
                </Col>
                <Col className="text-center">
                  <Row>
                    <Col>
                      <img
                        src={authorProfilePicture}
                        alt="author profile"
                        width="30"
                        height="30"
                        style={{ marginRight: "10px", borderRadius: "50%" }}
                      />
                      <NavLink
                        className="custom-text-link text-light"
                        to={`/perfil/${author}`}
                        aria-label={`Perfil de ${author}`}
                        tabIndex="0"
                      >
                        <span>{author}</span>
                      </NavLink>
                    </Col>
                  </Row>
                  <Row>
                    <p>{new Date(date).toLocaleString()}</p>
                  </Row>
                </Col>
                <Col className="text-center text-light">
                  {usuario && usuario.username === author && (
                    <div>
                      <Button aria-label="Eliminar" className="btn btn-danger" onClick={() => handleDeleteComment(id)}>
                        <i className="bi bi-trash"></i>
                        <span>Eliminar</span>
                      </Button>
                      <ConfirmationModal
                        show={showDeleteCommentModal}
                        handleClose={handleCancelDelete}
                        handleConfirm={handleConfirmDeleteComment}
                        title="Eliminar comentario"
                        message="¿Estás seguro de que deseas eliminar este comentario?"
                      />
                    </div>
                  )}
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </Col>
    </Row>
  );
};

export default PostComment;
