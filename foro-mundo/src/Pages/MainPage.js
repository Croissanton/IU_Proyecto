import React, { useEffect, useState } from "react";
import { Breadcrumb } from "react-bootstrap";
import MainLayout from "../layout/MainLayout.js";
import ForumCard from "../Components/ForumCard.js";
import IndexSelector from "../Components/IndexSelector.js";

function MainPage() {
  useEffect(() => {
    document.title = "Foro Mundo";
  }, []);

  const [topics, setTopics] = useState([]);
  // Estado para el criterio de ordenación
  const [sortCriteria, setSortCriteria] = useState("nombreAZ");
  const [currentPage, setCurrentPage] = useState(1);
  const topicsPerPage = 5;

  const getNumberOfPosts = (topicId) => {
    var storedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    if (storedPosts.length <= 0) {
      console.log("no posts :(");
      return 0;
    } else {
      return storedPosts.filter((post) => post.topicId === topicId).length;
    }
  };

  // Tópicos predeterminados del foro
  const defaultTopics = [
    { id: 1, topic: "General", post_num: getNumberOfPosts(1), view_num: 0 },
    { id: 2, topic: "Off-topic", post_num: getNumberOfPosts(2), view_num: 0 },
    { id: 3, topic: "Tecnología", post_num: getNumberOfPosts(3), view_num: 0 },
    { id: 4, topic: "Deportes", post_num: getNumberOfPosts(4), view_num: 0 },
    { id: 5, topic: "Cine", post_num: getNumberOfPosts(5), view_num: 0 },
    { id: 6, topic: "Coches", post_num: getNumberOfPosts(6), view_num: 0 },
  ];

  // Al cargar el componente, intenta obtener los tópicos del localStorage
  useEffect(() => {
    const storedTopics = JSON.parse(localStorage.getItem("topics"));
    if (storedTopics) {
      setTopics(storedTopics);
    } else {
      // Si no hay tópicos en localStorage, los inicializamos
      localStorage.setItem("topics", JSON.stringify(defaultTopics));
      setTopics(defaultTopics);
    }
    //Establecer el criterio de ordenación por defecto
    setSortCriteria("nombreAZ");
  }, []);

  const handleTopicClick = (id) => {
    const updatedTopics = topics.map((topic) => {
      if (topic.id === id) {
        return { ...topic, view_num: topic.view_num + 1 };
      }
      return topic;
    });

    setTopics(updatedTopics);
    localStorage.setItem("topics", JSON.stringify(updatedTopics));
  };

  // Manejador para cambiar el criterio de ordenación
  const handleSortChange = (criteria) => {
    setSortCriteria(criteria);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Ordenar los tópicos según el criterio seleccionado
  const sortedTopics = [...topics].sort((a, b) => {
    if (sortCriteria === "nombreAZ") {
      return a.topic.localeCompare(b.topic);
    } else if (sortCriteria === "nombreZA") {
      return b.topic.localeCompare(a.topic);
    } else if (sortCriteria === "masPosts") {
      return b.post_num - a.post_num;
    } else if (sortCriteria === "menosPosts") {
      return a.post_num - b.post_num;
    } else if (sortCriteria === "masVisitas") {
      return b.view_num - a.view_num;
    } else if (sortCriteria === "menosVisitas") {
      return a.view_num - b.view_num;
    }
    return 0;
  });

  const indexOfLastTopic = currentPage * topicsPerPage;
  const indexOfFirstTopic = indexOfLastTopic - topicsPerPage;
  const currentTopics = sortedTopics.slice(indexOfFirstTopic, indexOfLastTopic);

  return (
    <MainLayout>
      <div className="container-xxl my-2">
        <Breadcrumb className="custom-breadcrumb">
          <Breadcrumb.Item active>Inicio</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <label
        style={{
          fontSize: "3rem",
          fontWeight: "bold",
          display: "block",
          textAlign: "center",
        }}
      >
        Foros
      </label>
      <div className="container-xxl my-3">
        <div className="d-flex justify-content-end mb-3">
          <label className="me-2" style={{ padding: "10px" }}>
            Ordenar por:
          </label>
          <div className="d-flex justify-content-center">
            <select
              className="form-select me-2"
              onChange={(e) => handleSortChange(e.target.value)}
            >
              <option value="nombreAZ">Título A-Z</option>
              <option value="nombreZA">Título Z-A</option>
              <option value="masPosts">Más posts</option>
              <option value="menosPosts">Menos posts</option>
              <option value="masVisitas">Más visitas</option>
              <option value="menosVisitas">Menos visitas</option>
            </select>
          </div>
        </div>

        {currentTopics.map((topic) => (
          <ForumCard
            key={topic.id}
            id={topic.id}
            topic={topic.topic}
            post_num={topic.post_num}
            view_num={topic.view_num}
            onTopicClick={handleTopicClick}
          />
        ))}
      </div>

      <IndexSelector
        totalTopics={sortedTopics.length}
        topicsPerPage={topicsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </MainLayout>
  );
}

export default MainPage;
