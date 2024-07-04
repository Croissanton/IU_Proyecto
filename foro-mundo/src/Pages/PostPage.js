import React, { useState, useEffect } from "react";
import { Breadcrumb, Button } from "react-bootstrap";
import MainLayout from "../layout/MainLayout.js";
import PostCard from "../Components/PostCard.js";
import PostComment from "../Components/PostComment.js";
import IndexSelector from "../Components/IndexSelector.js";
import ConfirmationModal from "../Components/ConfirmationModal.js";
import Cookies from "universal-cookie";
import { useToast } from "../Context/ToastContext.js";
import { Link, useParams, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

const topics = JSON.parse(localStorage.getItem("topics"));

function PostPage() {
  useEffect(() => {
    document.title = "Post";
  }, []);
  
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [characterCount, setCharacterCount] = useState(0);
  const MAX_CHARACTERS = 500;

  const [showModal, setShowModal] = useState(false);
  const { showToast } = useToast();
  const [comments, setComments] = useState([]);
  const [sortCriteria, setSortCriteria] = useState("newest"); // Estado para el criterio de ordenación
  const navigate = useNavigate();

  const cookies = new Cookies();
  const cookieUser = cookies.get("user");

  const [showDeleteCommentModal, setShowDeleteCommentModal] = useState(false);
  const [showDeletePostModal, setShowDeletePostModal] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);

  // Cargar post desde localStorage
  useEffect(() => {
    const storedPosts = localStorage.getItem('posts');
    if (storedPosts) {
      const posts = JSON.parse(storedPosts);
      const currentPost = posts.find(post => post.id === postId);
      setPost(currentPost);
    }

    //Establecer el criterio de ordenación por defecto
    setSortCriteria("textoAZ");
  }, [postId]);

  // Cargar comentarios desde localStorage
  useEffect(() => {
    const storedComments = localStorage.getItem('comments');
    if (storedComments) {
      const allComments = JSON.parse(storedComments);
      const filteredComments = allComments.filter(comment => comment.postId === postId);
      setComments(filteredComments);
    }
  }, [postId]);

  const handleClose = () => {
    setShowModal(false);
    showToast("El comentario no se ha creado.");
  };

  const handleConfirm = () => {
    setShowModal(false);
  
    const newCommentObject = {
      id: uuidv4(),
      postId: postId,
      title: newComment,
      author: cookieUser.username,
      upvotes: 0,
      downvotes: 0,
      date: new Date().toLocaleString(),
    };
  
    // Obtener los comentarios existentes del localStorage
    const existingComments = JSON.parse(localStorage.getItem('comments')) || [];
  
    // Actualizar los comentarios en el localStorage
    const updatedComments = [newCommentObject, ...existingComments];
    localStorage.setItem('comments', JSON.stringify(updatedComments));
  
    // Filtrar y establecer solo los comentarios para el post actual
    const postComments = updatedComments.filter(comment => comment.postId === postId);
    setComments(postComments);
  
    // Incrementar res_num en localStorage para el post correspondiente
    const existingPosts = JSON.parse(localStorage.getItem('posts')) || [];
    const updatedPosts = existingPosts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          res_num: post.res_num + 1,
          lm_text: newCommentObject.title,
          lm_author: newCommentObject.author,
          lm_date: new Date().toLocaleString(),
        };
      }
      return post;
    });
  
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
  
    // Limpiar el área de texto
    setNewComment("");
    setCharacterCount(0);
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

  const handleDelete = (id) => {
    setCommentToDelete(id);
    setShowDeleteCommentModal(true);
  };

  const handleConfirmDeleteComment = () => {
    const updatedComments = comments.filter(comment => comment.id !== commentToDelete);
    setComments(updatedComments);
  
    // Update comments in localStorage
    localStorage.setItem('comments', JSON.stringify(updatedComments));
    showToast("Comentario eliminado", "bg-danger");
  
    // Decrease res_num in localStorage for the corresponding post
    const existingPosts = JSON.parse(localStorage.getItem('posts')) || [];
    const updatedPosts = existingPosts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          res_num: post.res_num - 1,
          ...(updatedComments.length > 0 ? {
            lm_text: updatedComments[0].title,
            lm_author: updatedComments[0].author,
            lm_date: updatedComments[0].date,
          } : {
            lm_text: "",
            lm_author: "",
            lm_date: ""
          })
        };
      }
      return post;
    });
  
    // Save updated posts back to localStorage
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
    navigate(`/post/${post.id}`);
    setShowDeleteCommentModal(false);
  };

  const handleConfirmDeletePost = () => {
    // Eliminar el post del localStorage
    const existingPosts = JSON.parse(localStorage.getItem('posts')) || [];
    const filteredPosts = existingPosts.filter(p => p.id !== postId);
    localStorage.setItem('posts', JSON.stringify(filteredPosts));
  
    // Eliminar los comentarios asociados al post del localStorage
    const existingComments = JSON.parse(localStorage.getItem('comments')) || [];
    const filteredComments = existingComments.filter(comment => comment.postId !== postId);
    localStorage.setItem('comments', JSON.stringify(filteredComments));
  
    // Actualizar el número de posts en el localStorage para el topic correspondiente
    const existingTopics = JSON.parse(localStorage.getItem("topics")) || [];
    const updatedTopics = existingTopics.map(topic => {
      if (topic.id === parseInt(post.topicId)) {
        return {
          ...topic,
          post_num: (topic.post_num || 0) - 1,
        };
      }
      return topic;
    });

    localStorage.setItem("topics", JSON.stringify(updatedTopics));

    showToast("Post eliminado", "bg-danger");
    navigate(`/search/${post.topicId}`);
    setShowDeletePostModal(false);
  };

  const handleClearComment = () => {
    setNewComment("");
    setCharacterCount(0);
  };

  const handleSortChange = (criteria) => {
    setSortCriteria(criteria);
  };

  const sortedComments = [...comments].sort((a, b) => {
    if (sortCriteria === "textoAZ") {
      return a.title.localeCompare(b.title);
    } else if (sortCriteria === "textoZA") {
      return b.title.localeCompare(a.title);
    } else if (sortCriteria === "nuevo") {
      return new Date(b.date) - new Date(a.date);
    } else if (sortCriteria === "antiguo") {
      return new Date(a.date) - new Date(b.date);
    } else if (sortCriteria === "masPositivos") {
      return b.upvotes - a.upvotes;
    } else if (sortCriteria === "menosPositivos") {
      return a.upvotes - b.upvotes;
    } else if (sortCriteria === "masNegativos") {
      return b.downvotes - a.downvotes;
    } else if (sortCriteria === "menosNegativos") {
      return a.downvotes - b.downvotes;
    }
    
    return 0;
  });

  const category = post ? topics.find(topic => topic.id === parseInt(post.topicId)) : null;

  return (
    <MainLayout>
      <div className="container-xxl my-3">
        <Breadcrumb className="custom-breadcrumb">
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>Inicio</Breadcrumb.Item>
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: `/search/${post?.topicId}` }}>
            {category ? category.topic : "Foro"}
          </Breadcrumb.Item>
          <Breadcrumb.Item active>{post ? post.title : "Post"}</Breadcrumb.Item>
        </Breadcrumb>
        <label style={{ fontSize: "3rem", fontWeight: "bold", display: "block", textAlign: "center" }}>{post ? post.title : "Post"}</label>
      </div>
      {post && (
        <div className="container-xxl my-3">
          <PostCard
            id={post.id}
            titulo={post.title}
            text={post.text}
            author={post.author}
            date={post.date}
            lm_author={post.lm_author}
            lm_date={post.lm_date}
            res_num={comments.length}
            view_num={post.view_num}
          />
        </div>
      )}

      {post && (
        <div className="container-xxl my-3">
          <Button variant="danger" onClick={() => setShowDeletePostModal(true)}>
            Eliminar Post
          </Button>
          <ConfirmationModal
            show={showDeletePostModal}
            handleClose={() => setShowDeletePostModal(false)}
            handleConfirm={handleConfirmDeletePost}
            title="Eliminar Post"
            message="¿Estás seguro de que quieres eliminar este post?"
          />
        </div>
      )}

      {cookies.get("user") === undefined ? (
        <div></div>
      ) : (
        <div className="container-xxl my-3">
          <label style={{ fontSize: "1.5rem", fontWeight: "bold" }}>Añadir un nuevo comentario</label>
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
            <Button onClick={handleClearComment} className="ms-2">
              Limpiar
            </Button>
            <ConfirmationModal
              message="¿Estás seguro de que quieres crear este comentario?"
              show={showModal}
              handleClose={handleClose}
              handleConfirm={handleConfirm}
              title="Confirmar Comentario"
            />
          </form>
        </div>
      )}

      <div className="container-xxl my-3">
        <label style={{ fontSize: "2rem", fontWeight: "bold" }}>Comentarios</label>
        <div className="mb-3">
          <label htmlFor="sortSelect" className="form-label">Ordenar por:</label>
          <select
            id="sortSelect"
            className="form-select"
            value={sortCriteria}
            onChange={(e) => handleSortChange(e.target.value)}
          >
            <option value="textoAZ">Texto A-Z</option>
            <option value="textoZA">Texto Z-A</option>
            <option value="reciente">Más recientes</option>
            <option value="antiguo">Más antiguos</option>
            <option value="masPositivos">Más votos positivos</option>
            <option value="menosPositivos">Menos votos positivos</option>
            <option value="masNegativos">Más votos negativos</option>
            <option value="menosNegativos">Menos votos negativos</option>
          </select>
        </div>
        {sortedComments.length === 0 ? (
          <p>No hay comentarios.</p>
        ) : (
          sortedComments.map((comment) => (
            <PostComment
              key={comment.id}
              id={comment.id}
              postId={comment.postId}
              title={comment.title}
              author={comment.author}
              initialUpvotes={comment.upvotes}
              initialDownvotes={comment.downvotes}
              date={comment.date}
              onDelete={() => handleDelete(comment.id)}
            />
          ))
        )}
      </div>
      <ConfirmationModal
        show={showDeleteCommentModal}
        handleClose={() => setShowDeleteCommentModal(false)}
        handleConfirm={handleConfirmDeleteComment}
        title="Eliminar Comentario"
        message="¿Estás seguro de que quieres eliminar este comentario?"
      />
      <IndexSelector />
    </MainLayout>
  );
}

export default PostPage;
