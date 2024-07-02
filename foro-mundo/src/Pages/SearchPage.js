import React, { useState, useEffect } from "react";
import MainLayout from "../layout/MainLayout.js";
import PostCard from "../Components/PostCard.js";
import IndexSelector from "../Components/IndexSelector.js";
import { Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import { useParams } from "react-router-dom";

const forumTopics = [
  { id: 1, topic: "General" },
  { id: 2, topic: "Off-topic" },
  { id: 3, topic: "Tecnología" },
  { id: 4, topic: "Deportes" },
  { id: 5, topic: "Cine" },
];

function SearchPage() {
  useEffect(() => {
    document.title = "Posts";
  }, []);

  const { topicId } = useParams();
  const cookies = new Cookies();
  const [posts, setPosts] = useState([]);

  // Cargar posts desde localStorage
  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    const filteredPosts = storedPosts.filter((post) => post.topicId === topicId);
    setPosts(filteredPosts);
  }, [topicId]);

  const category = forumTopics.find(topic => topic.id === parseInt(topicId));

  return (
    <MainLayout>
      <div className="container-xxl my-3">
        <h1>Foro</h1>
        <Breadcrumb className="custom-breadcrumb">
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>
            Inicio
          </Breadcrumb.Item>
          <Breadcrumb.Item active>
            {category ? category.topic : "Foro"}
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      {cookies.get("user") === undefined ? (
        <div></div>
      ) : (
        <div className="row justify-content-center">
          <div className="col-auto">
            <Link to="/create" className="btn btn-primary">
              Crear Nuevo Post
            </Link>
          </div>
        </div>
      )}
      <div className="container-xxl my-3">
        {posts.length > 0 ? (
          posts.map((post) => (
            <PostCard
              key={post.id}
              id={post.id}
              topicId={post.topicId}
              titulo={post.title}
              text={post.text}
              author={post.author}
              date={post.date}
              lm_author={post.lm_author}
              lm_date={post.lm_date}
              res_num={post.res_num}
              view_num={post.view_num}
            />
          ))
        ) : (
          <p>No hay posts disponibles</p>
        )}
      </div>
      <IndexSelector />
    </MainLayout>
  );
}

export default SearchPage;
