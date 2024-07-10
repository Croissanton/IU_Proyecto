import React, { useState, useEffect } from "react";
import { Breadcrumb, Button } from "react-bootstrap";
import MainLayout from "../layout/MainLayout.js";
import PostCard from "../Components/PostCard.js";
import PostComment from "../Components/PostComment.js";
import IndexSelector from "../Components/IndexSelector.js";
import ConfirmationModal from "../Components/ConfirmationModal.js";
import ErrorPage from "./ErrorPage.js";
import { useToast } from "../Context/ToastContext.js";
import { Link, useParams, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

function PostPage() {
  const [topics, setTopics] = useState([]);
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [characterCount, setCharacterCount] = useState(0);
  const MAX_CHARACTERS = 500;

  const [showModal, setShowModal] = useState(false);
  const { showToast } = useToast();
  const [comments, setComments] = useState([]);
  const [sortCriteria, setSortCriteria] = useState("masPositivos");
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 5;

  const usuario = JSON.parse(localStorage.getItem("usuario")) || undefined;

  const [showDeletePostModal, setShowDeletePostModal] = useState(false);
  const [showClearCommentModal, setShowClearCommentModal] = useState(false);

  const titleStyle = {
    wordWrap: "break-word",
    whiteSpace: "normal",
    overflowWrap: "break-word",
  };

  useEffect(() => {
    document.title = "Post";

    // Load topics
    const loadTopics = () => {
      try {
        const storedTopics = JSON.parse(localStorage.getItem("topics"));
        if (Array.isArray(storedTopics) && storedTopics.length > 0) {
          setTopics(storedTopics);
        } else {
          console.warn("Topics data is empty or invalid");
          setTopics([]);
        }
      } catch (error) {
        console.warn("Error parsing topics from localStorage:", error);
        setTopics([]);
      }
    };

    loadTopics();

    // Load post
    const loadPost = () => {
      const storedPosts = localStorage.getItem("posts");
      if (storedPosts) {
        const posts = JSON.parse(storedPosts);
        const currentPost = posts.find((post) => post.id.toString() === postId);

        if (currentPost) {
          setPost(currentPost);
          setComments(currentPost.comments || []);
        } else {
          console.warn("Post not found");
        }
      } else {
        console.warn("No posts found in localStorage");
      }
    };

    loadPost();
    setSortCriteria("masPositivos");
  }, [postId, navigate, showToast]);

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
      author: usuario.username,
      upvotes: 0,
      downvotes: 0,
      date: new Date().toLocaleString(),
    };

    post.comments = [...post.comments, newCommentObject];
    post.res_num = post.comments.length;
    post.lm_text = newCommentObject.title;
    post.lm_author = newCommentObject.author;
    post.lm_date = new Date().toLocaleString();

    //get existing posts and add updated post to the list
    const existingPosts = JSON.parse(localStorage.getItem("posts")) || [];
    const updatedPosts = existingPosts.map((p) =>
      p.id.toString() === postId.toString() ? post : p
    );

    // Save updated post back to localStorage
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
    setComments(post.comments);
    // Limpiar el área de texto
    setNewComment("");
    setCharacterCount(0);
  };

  useEffect(() => {
    if (!localStorage.getItem("usuario")) {
      return;
    }

    const button = document.getElementById("publicar_button");
    if (!button) {
      return;
    }
    
    button.disabled =
      newComment.trim().length === 0 || characterCount > MAX_CHARACTERS;
  }, [newComment, characterCount]);

  const handleInputChange = (event) => {
    const commentText = event.target.value;
    setNewComment(commentText);
    setCharacterCount(commentText.length);
  };

  const handleSubmitComment = (event) => {
    event.preventDefault();
    setShowModal(true);
    setCharacterCount(0);
  };

  //  This has to be changed so a user can't delete a post that was not his.
  const handleConfirmDeletePost = () => {
    // Eliminar el post del localStorage
    const existingPosts = JSON.parse(localStorage.getItem("posts")) || [];
    const filteredPosts = existingPosts.filter((p) => p.id !== postId);

    // Actualizar el número de posts en el localStorage para el topic correspondiente
    const existingTopics = JSON.parse(localStorage.getItem("topics")) || [];
    const updatedTopics = existingTopics.map((topic) => {
      if (topic.id === parseInt(post.topicId)) {
        return {
          ...topic,
          post_num: (topic.post_num || 0) - 1,
        };
      }
      return topic;
    });

    localStorage.setItem("topics", JSON.stringify(updatedTopics));
    localStorage.setItem("posts", JSON.stringify(filteredPosts));

    showToast("Post eliminado", "bg-danger");
    navigate(`/topic/${post.topicId}`);
    setShowDeletePostModal(false);
  };

  const handleClearComment = () => {
    setShowClearCommentModal(true);
  };

  const handleConfirmClearComment = () => {
    setNewComment("");
    setCharacterCount(0);
    setShowClearCommentModal(false);
  };

  const handleSortChange = (criteria) => {
    setSortCriteria(criteria);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
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

  const paginatedComments = sortedComments.slice(
    (currentPage - 1) * commentsPerPage,
    currentPage * commentsPerPage
  );

  const topic = post ? topics.find((t) => t.id === post.topicId) : null;

  if (!post) {
    return <ErrorPage />;
  }

  return (
    <MainLayout>
      <div className="container-xxl my-3">
        <Breadcrumb className="custom-breadcrumb">
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>
            Inicio
          </Breadcrumb.Item>
          <Breadcrumb.Item
            linkAs={Link}
            linkProps={{ to: `/topic/${post.topicId}` }}
          >
            {topic ? topic.topic : "Foro"}
          </Breadcrumb.Item>
          <Breadcrumb.Item active style={titleStyle}>
            {post.title}
          </Breadcrumb.Item>
        </Breadcrumb>
        <label
          style={{
            fontSize: "3rem",
            fontWeight: "bold",
            display: "block",
            textAlign: "center",
            ...titleStyle,
          }}
        >
          {post.title}
        </label>
      </div>
      {post === null || post === undefined ? (
        <div></div>
      ) : (
        <div className="container-xxl my-3">
          <PostCard
            id={post.id}
            titulo={post.title}
            text={post.text}
            upvotes={post.upvotes}
            downvotes={post.downvotes}
            author={post.author}
            date={post.date}
            lm_author={post.lm_author}
            lm_date={post.lm_date}
            res_num={comments.length}
            view_num={post.view_num}
          />
        </div>
      )}

      {usuario === undefined ||
      post === null ||
      post.author !== usuario.username ? (
        <div></div>
      ) : (
        <div className="container-xxl my-3">
          <Button variant="danger" onClick={() => setShowDeletePostModal(true)}>
            <i className="bi bi-trash"></i>
            <span>Eliminar Post</span>
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
      {usuario === undefined ? (
        <div></div>
      ) : (
        <div className="container-xxl my-3">
          <label style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
            Añadir un nuevo comentario
          </label>
          <form onSubmit={handleSubmitComment}>
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
              message="¿Estás seguro de que quieres crear este comentario?"
              show={showModal}
              handleClose={handleClose}
              handleConfirm={handleConfirm}
              title="Confirmar Comentario"
            />

            <Button
              variant="primary"
              style={{ marginLeft: "10px" }}
              onClick={handleClearComment}
            >
              Limpiar
            </Button>
            
            <ConfirmationModal
              message="¿Estás seguro de que quieres limpiar el texto escrito?"
              show={showClearCommentModal}
              handleClose={() => setShowClearCommentModal(false)}
              handleConfirm={handleConfirmClearComment}
              title="Confirmar Limpieza"
            />

          </form>
        </div>
      )}

      <div className="container-xxl my-3">
        <label
          style={{
            fontSize: "2rem", 
            fontWeight: "bold",
            marginTop: "30px", 
          }}
        >
          Comentarios
        </label>
        <div className="d-flex justify-content-end mb-3">
          <label htmlFor="sortSelect" className="form-label p-2 mb-0">
            Ordenar por:
          </label>
          <div className="d-flex justify-content-center">
            <select
              id="sortSelect"
              className="form-select"
              onChange={(e) => handleSortChange(e.target.value)}
              defaultValue="masPositivos"
            >
              <option value="masPositivos">Más votos positivos</option>
              <option value="menosPositivos">Menos votos positivos</option>
              <option value="masNegativos">Más votos negativos</option>
              <option value="menosNegativos">Menos votos negativos</option>
              <option value="textoAZ">Texto A-Z</option>
              <option value="textoZA">Texto Z-A</option>
              <option value="reciente">Más recientes</option>
              <option value="antiguo">Más antiguos</option>
            </select>
          </div>
        </div>

        {post === null || sortedComments.length === 0 ? (
          <p>No hay comentarios.</p>
        ) : (
          paginatedComments.map((comment) => (
            <PostComment
              key={comment.id}
              id={comment.id}
              postId={comment.postId}
              title={comment.title}
              author={comment.author}
              initialUpvotes={comment.upvotes}
              initialDownvotes={comment.downvotes}
              date={comment.date}
            />
          ))
        )}
      </div>

      <IndexSelector
        totalTopics={sortedComments.length}
        topicsPerPage={commentsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </MainLayout>
  );
}

export default PostPage;
