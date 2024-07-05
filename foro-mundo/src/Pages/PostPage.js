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
import { v4 as uuidv4 } from "uuid";
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
  const navigate = useNavigate();

  const cookies = new Cookies();
  const cookieUser = cookies.get("user");

  // Cargar post desde localStorage
  useEffect(() => {
    const storedPosts = localStorage.getItem("posts");
    if (storedPosts) {
      console.log("Stored posts: ", storedPosts);
      const posts = JSON.parse(storedPosts);
      console.log("Posts: ", posts);
      const currentPost = posts.find(
        (post) => post.id.toString() === postId.toString(),
      );
      console.log("currentPost: ", currentPost);
      setPost(currentPost);
      setComments(currentPost.comments);
    }
  }, [postId]);

  // Cargar comentarios desde localStorage
  // useEffect(() => {
  //   const storedComments = localStorage.getItem("comments");
  //   if (storedComments) {
  //     const allComments = JSON.parse(storedComments);
  //     const filteredComments = allComments.filter(
  //       (comment) => comment.postId === postId,
  //     );
  //     setComments(filteredComments);
  //   }
  // }, [postId]);

  const handleClose = () => {
    setShowModal(false);
    showToast("El comentario no se ha creado.");
  };

  const handleConfirm = () => {
    setShowModal(false);
    //instead of saving each comment while being unrelated to the post, we should add a "comments" field to the post object, and save comments there.
    //it will be easier to get all comments from a single post.
    const newCommentObject = {
      id: uuidv4(),
      postId: postId,
      title: newComment,
      author: cookieUser.username,
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
    const updatedPosts = existingPosts.map((p) => (p.id === postId ? post : p));

    // Save updated post back to localStorage
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
    setComments(post.comments);
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
    post.comments = post.comments.filter((comment) => comment.id !== id);
    post.res_num = post.comments.length;
    post.lm_text = post.comments.length > 0 ? post.comments[0].title : "";
    post.lm_author = post.comments.length > 0 ? post.comments[0].author : "";
    post.lm_date = post.comments.length > 0 ? post.comments[0].date : "";
    //get existing posts and add updated post to the list
    const existingPosts = JSON.parse(localStorage.getItem("posts")) || [];
    const updatedPosts = existingPosts.map((p) => (p.id === postId ? post : p));

    // Save updated post back to localStorage
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
    setComments(post.comments);
    showToast("Comentario eliminado", "bg-danger");
  };

  //  This has to be changed so a user can't delete a post that was not his.
  const handleDeletePost = () => {
    // Eliminar el post del localStorage
    const existingPosts = JSON.parse(localStorage.getItem("posts")) || [];
    const filteredPosts = existingPosts.filter((p) => p.id !== postId);
    localStorage.setItem("posts", JSON.stringify(filteredPosts));

    showToast("Post eliminado", "bg-danger");
    navigate("/search");
  };

  return (
    <MainLayout>
      <div className="container-xxl my-3">
        <h1>Post</h1>
        <Breadcrumb className="custom-breadcrumb">
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>
            Inicio
          </Breadcrumb.Item>
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/search" }}>
            Foro
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Post</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      {post === null || post === undefined ? (
        <div></div>
      ) : (
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
            category={post.category}
          />
        </div>
      )}

      {cookies.get("user") === undefined || post === null || post === undefined ||
        
      post.author !== cookies.get("user").username ? (
        <div></div>
      ) : (
        <Button variant="danger" onClick={handleDeletePost}>
          Eliminar Post
        </Button>
      )}

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
              message="¿Estás seguro de que quieres crear este comentario?"
              show={showModal}
              handleClose={handleClose}
              handleConfirm={handleConfirm}
            ></ConfirmationModal>
          </form>
        </div>
      )}

      <div className="container-xxl my-3">
        <h2>Comentarios</h2>
        {comments.length === 0 ? (
          <p>No hay comentarios.</p>
        ) : (
          comments.map((comment) => (
            <PostComment
              key={comment.id}
              id={comment.id}
              postId={comment.postId}
              title={comment.title}
              author={comment.author}
              initialUpvotes={comment.upvotes}
              initialDownvotes={comment.downvotes}
              date={comment.date}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>

      <IndexSelector />
    </MainLayout>
  );
}

export default PostPage;
