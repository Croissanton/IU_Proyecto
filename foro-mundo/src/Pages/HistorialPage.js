import React, { useEffect, useState } from "react";
import MainLayout from "../layout/MainLayout.js";
import { Breadcrumb } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import PostComment from "../Components/PostComment.js";
import Cookies from "universal-cookie";

function HistorialPage() {
  const [userComments, setUserComments] = useState([]);
  const cookies = new Cookies();
  const cookieUser = cookies.get("user");

  useEffect(() => {
    document.title = "Historial";
    if (cookieUser) {
      const allComments = JSON.parse(localStorage.getItem('comments')) || [];
      const filteredComments = allComments.filter(comment => comment.author === cookieUser.username);
      setUserComments(filteredComments);
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
