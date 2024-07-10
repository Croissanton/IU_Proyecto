import React, { useState, useEffect } from "react";
import MainLayout from "../layout/MainLayout.js";
import { Breadcrumb, Button } from "react-bootstrap";
import { Link, useParams, useNavigate } from "react-router-dom";
import PostCard from "../Components/PostCard";

function HistorialPage() {
  const { username } = useParams();
  const navigate = useNavigate();
  const [userPosts, setUserPosts] = useState([]);
  const [userComments, setUserComments] = useState([]);

  useEffect(() => {
    document.title = "Historial";

    // Obtener posts del localStorage y filtrar por autor
    const postsFromStorage = localStorage.getItem("posts")
      ? JSON.parse(localStorage.getItem("posts"))
      : [];

    const filteredPosts = postsFromStorage.filter(
      (post) => post.author === username
    );

    const commentsByUser = postsFromStorage.flatMap(post => 
      post.comments ? post.comments.filter(comment => comment.author === username) : []
    );

    setUserPosts(filteredPosts);
    setUserComments(commentsByUser);
  }, [username]);

  const handleViewPost = (postId) => {
    navigate(`/post/${postId}`);
  };

  return (
    <MainLayout>
      <div className="container-xxl my-3">
        <Breadcrumb className="custom-breadcrumb">
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>
            Inicio
          </Breadcrumb.Item>
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/perfil" }}>
            Perfil
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Historial</Breadcrumb.Item>
        </Breadcrumb>
        <label
          style={{
            fontSize: "3rem",
            fontWeight: "bold",
            display: "block",
            textAlign: "center",
          }}
        >
          Historial
        </label>
      </div>
      <label
        style={{
          fontSize: "2rem",
          fontWeight: "bold",
          display: "block",
          textAlign: "center",
        }}
      >
        Posts
      </label>
      <div className="container-xxl my-3">
        {userPosts.length === 0 ? (
          <p>No hay posts.</p>
        ) : (
          userPosts.map((post) => (
            <PostCard
              key={post.id}
              id={post.id}
              title={post.title}
              text={post.text}
              author={post.author}
              date={post.date}
              lm_author={post.lm_author}
              lm_date={post.lm_date}
              res_num={post.comments ? post.comments.length : 0}
              view_num={post.view_num || 0}
              onPostClick={() => handleViewPost(post.id)}
              comments={post.comments}
              upvotes={post.upvotes}
              downvotes={post.downvotes}
            />
          ))
        )}
      </div>
      <label
        style={{
          fontSize: "2rem",
          fontWeight: "bold",
          display: "block",
          textAlign: "center",
        }}
      >
        Comentarios
      </label>
      <div className="container-xxl my-3">
        {userComments.length === 0 ? (
          <p>No hay comentarios.</p>
        ) : (
          userComments.map((comment) => (
            <div key={comment.id} className="card my-3">
              <div className="card-body">
                <h5 className="card-title">{comment.title}</h5>
                <p className="card-text">{comment.text}</p>
                <p className="card-text">
                  <small className="text-muted">
                    Fecha: {new Date(comment.date).toLocaleDateString()} |
                    Votos positivos: {comment.upvotes} |
                    Votos negativos: {comment.downvotes}
                  </small>
                </p>
                <Button
                  variant="primary"
                  onClick={() => handleViewPost(comment.postId)}
                  aria-label={`${comment.title} 
                    Fecha ${comment.date} 
                    Votos positivos ${comment.upvotes}
                    Votos negativos ${comment.downvotes}
                    Ver Post`}
                  >
                    Ver Post
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </MainLayout>
  );
}

export default HistorialPage;
