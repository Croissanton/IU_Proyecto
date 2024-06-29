import React, { useState, useEffect } from "react";
import MainLayout from "../layout/MainLayout.js";
import { Breadcrumb, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import PostCard from "../Components/PostCard";

function HistorialPage() {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Historial";

    const storedPosts = JSON.parse(localStorage.getItem("posts"));
    if (storedPosts) {
      setPosts(storedPosts);
    }

    const storedComments = JSON.parse(localStorage.getItem("comments"));
    if (storedComments) {
      setComments(storedComments);
    }
  }, []);

  const handleViewPost = (postId) => {
    navigate(`/post/${postId}`);
  };

  return (
    <MainLayout>
      <div className="container-xxl my-3">
        <h1>Historial</h1>
        <Breadcrumb className="custom-breadcrumb">
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>
            Inicio
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Historial</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <h2 className="text-center">Posts</h2>
      <div className="container-xxl my-3">
        {posts.length === 0 ? (
          <p>No hay posts.</p>
        ) : (
          posts.map((post) => (
            <PostCard
              key={post.id}
              id={post.id}
              titulo={post.title}
              text={post.text}
              author={post.author}
              date={post.date}
              lm_author={post.lastCommentAuthor}
              lm_date={post.lastCommentDate}
              res_num={post.comments ? post.comments.length : 0}
              view_num={post.views || 0}
            />
          ))
        )}
      </div>
      <h2 className="text-center">Comentarios</h2>
      <div className="container-xxl my-3">
        {comments.length === 0 ? (
          <p>No hay comentarios.</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="card my-3">
              <div className="card-body">
                <h5 className="card-title">{comment.title}</h5>
                <p className="card-text">{comment.text}</p>
                <p className="card-text">
                  <small className="text-muted">
                    Fecha: {new Date(comment.date).toLocaleDateString()} | Upvotes: {comment.upvotes} | Downvotes: {comment.downvotes}
                  </small>
                </p>
                <Button
                  variant="primary"
                  onClick={() => handleViewPost(comment.postId)}
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
