import React, { useState } from "react";
import MainLayout from "../layout/MainLayout.js";
import PostCard from "../Components/PostCard.js";
import PostComment from "../Components/PostComment.js";

function PostPage() {
  const [newComment, setNewComment] = useState(""); // Estado para almacenar el nuevo comentario

  const handleInputChange = (event) => {
    setNewComment(event.target.value); // Actualizar el estado del nuevo comentario al escribir en la caja de texto
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Evitar que el formulario se envíe y la página se recargue
    // Aquí puedes manejar la lógica para guardar el nuevo comentario
    console.log("Nuevo comentario:", newComment);
    // Limpia el estado del nuevo comentario después de enviar el formulario
    setNewComment("");
  };

  return (
    <MainLayout>
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
      <div className="container-xxl my-3">
        <h3>Añadir un nuevo comentario</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="commentInput" className="form-label">
              Nuevo comentario:
            </label>
            <input
              type="text"
              className="form-control"
              id="commentInput"
              value={newComment}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Enviar comentario
          </button>
        </form>
      </div>

      {/* Comentarios existentes */}
      <div className="container-xxl my-3">
        <h3>Comentarios</h3>
        <PostComment
          title={"Que buen foro"}
          upvotes={10}
          downvotes={5}
          date={new Date()}
        />
        <PostComment
          title={"Que mal foro"}
          upvotes={15}
          downvotes={3}
          date={new Date()}
        />
      </div>
    </MainLayout>
  );
}

export default PostPage;
