import React, { useState, useEffect } from "react";
import { Breadcrumb } from "react-bootstrap";
import MainLayout from "../layout/MainLayout.js";
import PostCard from "../Components/PostCard.js";
import PostComment from "../Components/PostComment.js";
import IndexSelector from "../Components/IndexSelector.js";
import ConfirmationModal from "../Components/ConfirmationModal.js";
import Cookies from "universal-cookie";
import { useToast } from "../Context/ToastContext.js";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid'; // Importa uuid para generar ids únicos

function PostPage() {
  useEffect(() => {
    document.title = "Post";
  }, []);

  const [newComment, setNewComment] = useState("");
  const [characterCount, setCharacterCount] = useState(0);
  const MAX_CHARACTERS = 500;

  const [showModal, setShowModal] = useState(false);
  const { showToast } = useToast();
  const [comments, setComments] = useState([
    {
      id: uuidv4(),
      title: "Que buen foro",
      author: "Juanito Golondrina",
      upvotes: 10,
      downvotes: 5,
      date: new Date(),
    },
    {
      id: uuidv4(),
      title: "Que mal foro",
      author: "Pepito Grillo",
      upvotes: 15,
      downvotes: 3,
      date: new Date(),
    },
    {
      id: uuidv4(),
      title: "a mi no me gusta tanto la verdad",
      author: "Paquito Palotes",
      upvotes: 2,
      downvotes: 5,
      date: new Date(),
    },
  ]);

  const handleClose = () => {
    setShowModal(false);
    showToast("El comentario no se ha creado.");
  };

  const cookies = new Cookies();
  const cookieUser = cookies.get("user");

  const handleConfirm = () => {
    setShowModal(false);
    const newCommentObject = {
      id: uuidv4(),
      title: newComment,
      author: cookieUser.username,
      upvotes: 0,
      downvotes: 0,
      date: new Date(),
    };

    setComments((prevComments) => [newCommentObject, ...prevComments]);
    showToast("El comentario se ha creado correctamente!", "bg-success");
    setNewComment("");
  };

  useEffect(() => {
    if (cookies.get("user") === undefined) {
      return;
    }
    const button = document.getElementById("publicar_button");
    button.disabled =
      newComment.trim().length === 0 || characterCount > MAX_CHARACTERS;
  }, [newComment, characterCount]);

  const handleInputChange = (event) => {
    const commentText = event.target.value;
    setNewComment(commentText);
    setCharacterCount(commentText.length);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setShowModal(true);
    setCharacterCount(0);
  };

  return (
    <MainLayout>
      <div className="container-xxl my-3">
        <h1>Post</h1>
        <Breadcrumb className="custom-breadcrumb" >
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>Inicio</Breadcrumb.Item>
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/search" }}>Foro</Breadcrumb.Item>{" "}
          {/* Aquí debería ir el nombre del topico */}
          <Breadcrumb.Item active>Post</Breadcrumb.Item>{" "}
          {/* Aquí debería ir el nombre del post */}
        </Breadcrumb>
      </div>
      {/* PostCard principal */}
      <div className="container-xxl my-3">
        <PostCard
          titulo={"buen foro :D"}
          text={"Este es un foro muy bueno"}
          author={"Juan Jaun"}
          date={"18.10.1992"}
          lm_author={"Jose Jose"}
          lm_date={"19.04.2024"}
          res_num={100}
          view_num={1000}
        />
      </div>

      {/* Formulario para añadir un nuevo comentario */}
      {cookies.get("user") === undefined ? (
        <div></div>
      ) : (
        <div className="container-xxl my-3">
          <h3>Añadir un nuevo comentario</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="commentInput" className="form-label"></label>
              <textarea
                aria-label="texto_para_nuevo_comentario"
                required
                rows={4}
                type="text"
                className="form-control"
                id="commentInput"
                value={newComment}
                onChange={handleInputChange}
              />
              <p>Caracteres restantes: {MAX_CHARACTERS - characterCount}</p>
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              id="publicar_button"
              disabled
            >
              Publicar
            </button>
            <ConfirmationModal
              message="¿Estás seguro de que quieres crear este post?"
              show={showModal}
              handleClose={handleClose}
              handleConfirm={handleConfirm}
            ></ConfirmationModal>
          </form>
        </div>
      )}

      {/* Comentarios existentes */}
      <div className="container-xxl my-3">
        <h2>Comentarios</h2>
        {comments.map((comment) => (
          <PostComment
            key={comment.id} // Usamos el id único
            title={comment.title}
            author={comment.author}
            initialUpvotes={comment.upvotes}
            initialDownvotes={comment.downvotes}
            date={comment.date}
          />
        ))}
      </div>

      <IndexSelector />
    </MainLayout>
  );
}

export default PostPage;
