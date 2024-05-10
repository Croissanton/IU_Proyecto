import React, { useState } from "react";
import { Breadcrumb } from "react-bootstrap"; 
import MainLayout from "../layout/MainLayout.js";
import PostCard from "../Components/PostCard.js";
import PostComment from "../Components/PostComment.js";
import IndexSelector from "../Components/IndexSelector.js";

function PostPage() {
  const [newComment, setNewComment] = useState(""); // Estado para almacenar el nuevo comentario
  const [characterCount, setCharacterCount] = useState(0); // Estado para almacenar el contador de caracteres
  const MAX_CHARACTERS = 500; // Número máximo de caracteres permitidos

  const handleInputChange = (event) => {
    setNewComment(event.target.value); // Actualizar el estado del nuevo comentario al escribir en la caja de texto
    setCharacterCount(event.target.value.length); // Actualizar el contador de caracteres (opcional)
    handleDisableButton();
  };

  const handleDisableButton = () => {
    var button = document.getElementById("publicar_button")
    button.disabled = characterCount === 0 || characterCount > MAX_CHARACTERS;
  }


  const handleSubmit = (event) => {
    event.preventDefault(); // Evitar que el formulario se envíe y la página se recargue
    // Aquí puedes manejar la lógica para guardar el nuevo comentario
    console.log("Nuevo comentario:", newComment);
    // Limpia el estado del nuevo comentario después de enviar el formulario
    setNewComment("");
    setCharacterCount(0);
    handleDisableButton();
  };

  return (
    <MainLayout>
      <div className="container-xxl my-3">
          <Breadcrumb>
          <Breadcrumb.Item href="../#">Inicio</Breadcrumb.Item>
          <Breadcrumb.Item href="./search">Foro</Breadcrumb.Item> {/* Aquí debería ir el nombre del topico */}
          <Breadcrumb.Item active>Post</Breadcrumb.Item> {/* Aquí debería ir el nombre del post */}
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
        <PostComment
          title={"a mi no me gusta tanto la verdad"}
          upvotes={2}
          downvotes={5}
          date={new Date()}
        />
      </div>

  

      <IndexSelector />

      {/* Formulario para añadir un nuevo comentario */}
      <div className="container-xxl my-3">
        <h3>Añadir un nuevo comentario</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="commentInput" className="form-label">
            </label>
            <textarea required
              rows={4}
              type="text"
              className="form-control"
              id="commentInput"
              value={newComment}
              onChange={handleInputChange}
            />
            <p>Caracteres restantes: {MAX_CHARACTERS - characterCount}</p>
          </div>
          <button type="submit" className="btn btn-primary" id="publicar_button" disabled>
            Publicar
          </button>
        </form>
      </div>

    </MainLayout>
  );
}

export default PostPage;
