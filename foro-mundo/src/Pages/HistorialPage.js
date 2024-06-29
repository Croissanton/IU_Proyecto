import React, { useEffect, useState } from "react";
import MainLayout from "../layout/MainLayout.js";
import { Breadcrumb } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import PostComment from "../Components/PostComment.js";
import Cookies from "universal-cookie";
import PostCard from "../Components/PostCard.js";

function HistorialPage() {
  const [userComments, setUserComments] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const cookies = new Cookies();
  const cookieUser = cookies.get("user");

  useEffect(() => {
    document.title = "Historial";
    if (cookieUser) {
      const allComments = JSON.parse(localStorage.getItem('comments')) || [];
      const filteredComments = allComments.filter(comment => comment.author === cookieUser.username);
      setUserComments(filteredComments);

      const allPosts = JSON.parse(localStorage.getItem('posts')) || [];
      const filteredPosts = allPosts.filter(post => post.author === cookieUser.username);
      setUserPosts(filteredPosts);
    }
  }, [cookieUser]);

  return (
    <MainLayout>
      <div className="container-xxl my-3">
        <h1>Historial</h1>
        <nav aria-label="breadcrumb">
          <Breadcrumb className="custom-breadcrumb">
            <Breadcrumb.Item linkAs={NavLink} linkProps={{ to: "/" }}>
              Inicio
            </Breadcrumb.Item>
            <Breadcrumb.Item linkAs={NavLink} linkProps={{ to: "/profile" }}>
              Perfil
            </Breadcrumb.Item>
            <Breadcrumb.Item active aria-current="page">Historial</Breadcrumb.Item>
          </Breadcrumb>
        </nav>
      </div>
      <h2>Posts</h2>
      <div className="container-xxl my-3">
        {userPosts.length === 0 ? (
          <p>No hay posts.</p>
        ) : (
          userPosts.map((post) => (
            <PostCard
              key={post.id}
              text={post.text}
              titulo={post.titulo}
              author={post.author}
              date={post.date}
              res_num={post.res_num}
              view_num={post.view_num}
              lm_author={post.lm_author}
              lm_date={post.lm_date}
            />
          ))
        )}
      </div>
      <h2>Comentarios</h2>
      <div className="container-xxl my-3">
        {userComments.length === 0 ? (
          <p>No hay comentarios.</p>
        ) : (
          userComments.map((comment) => (
            <PostComment
              key={comment.id}
              title={comment.title}
              author={comment.author}
              initialUpvotes={comment.upvotes}
              initialDownvotes={comment.downvotes}
              date={comment.date}
            />
          ))
        )}
      </div>
    </MainLayout>
  );
}

export default HistorialPage;
