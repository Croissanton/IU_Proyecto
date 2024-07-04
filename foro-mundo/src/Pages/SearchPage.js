import React, { useState, useEffect } from "react";
import MainLayout from "../layout/MainLayout.js";
import PostCard from "../Components/PostCard.js";
import IndexSelector from "../Components/IndexSelector.js";
import { Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import { useParams } from "react-router-dom";

const topics = JSON.parse(localStorage.getItem("topics"));

function SearchPage() {
  useEffect(() => {
    document.title = "Posts";
  }, []);

  const { topicId } = useParams();
  const cookies = new Cookies();
  const [posts, setPosts] = useState([]);
  const [sortCriteria, setSortCriteria] = useState("newest"); // Estado para el criterio de ordenación

  // Cargar posts desde localStorage
  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    const filteredPosts = storedPosts.filter((post) => post.topicId === topicId);
    setPosts(filteredPosts);

    //Establecer el criterio de ordenación por defecto
    setSortCriteria("nombreAZ");
  }, [topicId]);

  const handlePostClick = (id) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === id) {
        return { ...post, view_num: post.view_num + 1 };
      }
      return post;
    });

    setPosts(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
  };

  const handleSortChange = (criteria) => {
    setSortCriteria(criteria);
  };

  const sortedPosts = [...posts].sort((a, b) => {
    if (sortCriteria === "title") {
      return a.title.localeCompare(b.title);
    } else if (sortCriteria === "nuevo") {
      return new Date(b.date) - new Date(a.date);
    } else if (sortCriteria === "antiguo") {
      return new Date(a.date) - new Date(b.date);
    } else if (sortCriteria === "ultimoNuevo") {
      return new Date(b.lm_date) - new Date(a.lm_date);
    } else if (sortCriteria === "ultimoAntiguo") {
      return new Date(a.lm_date) - new Date(b.lm_date);
    } else if (sortCriteria === "nombreAZ") {
      return a.title.localeCompare(b.title);
    } else if (sortCriteria === "nombreZA") {
      return b.title.localeCompare(a.title);
    } else if (sortCriteria === "masVisitas") {
      return b.view_num - a.view_num;
    } else if (sortCriteria === "menosVisitas") {
      return a.view_num - b.view_num;
    } else if (sortCriteria === "masRespuestas") {
      return b.res_num - a.res_num;
    } else if (sortCriteria === "menosRespuestas") {
      return a.res_num - b.res_num;
    }

    return 0;
  });

  const category = topics.find((topic) => topic.id === parseInt(topicId));

  return (
    <MainLayout>
      <div className="container-xxl my-3">
        <Breadcrumb className="custom-breadcrumb">
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>
            Inicio
          </Breadcrumb.Item>
          <Breadcrumb.Item active>
            {category ? category.topic : "Foro"}
          </Breadcrumb.Item>
        </Breadcrumb>
        <label
          style={{
            fontSize: "3rem",
            fontWeight: "bold",
            display: "block",
            textAlign: "center",
            paddingBottom: "30px",
          }}
        >
          {category.topic}
        </label>
      </div>
      {cookies.get("user") === undefined ? (
        <div></div>
      ) : (
        <div>
          <div className="row justify-content-center">
            <div className="col-auto">
              <Link to="/create" className="btn btn-primary">
                Crear Nuevo Post
              </Link>
            </div>
          </div>
        </div>
      )}

      <div className="container-xxl my-3">
        <div className="d-flex justify-content-end mb-3">
          <label className="me-2" style={{padding: "10px"}}>Ordenar por:</label>
          <div className="d-flex justify-content-center">
            <select className="form-select me-2" onChange={(e) => handleSortChange(e.target.value)}>
              <option value="nombreAZ">Título A-Z</option>
              <option value="nombreZA">Título Z-A</option>
              <option value="nuevo">Más nuevo</option>
              <option value="antiguo">Más antiguo</option>
              <option value="ultimoNuevo">Último mensaje más nuevo</option>
              <option value="ultimoAntiguo">Último mensaje más antiguo</option>
              <option value="masVisitas"> Más visitas</option>
              <option value="menosVisitas"> Menos visitas</option>
              <option value="masRespuestas">Más respuestas</option>
              <option value="menosRespuestas">Menos respuestas</option>
            </select>
          </div>
        </div>

        {sortedPosts.length > 0 ? (
          sortedPosts.map((post) => (
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
              onPostClick={handlePostClick}
            />
          ))
        ) : (
          <p>No hay posts disponibles.</p>
        )}
      </div>
      <IndexSelector />
    </MainLayout>
  );
}

export default SearchPage;
