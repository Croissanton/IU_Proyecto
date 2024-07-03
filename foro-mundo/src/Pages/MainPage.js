import React, { useEffect, useState } from "react";
import { Breadcrumb } from "react-bootstrap";
import MainLayout from "../layout/MainLayout.js";
import ForumCard from "../Components/ForumCard.js";
import IndexSelector from "../Components/IndexSelector.js";

function MainPage() {
  useEffect(() => {
    document.title = "Foro Mundo";
  }, []);

  // Estado local para almacenar los tópicos del foro
  const [topics, setTopics] = useState([]);

  // Tópicos predeterminados del foro
  const defaultTopics = [
    { id: 1, topic: "General", post_num: 0, view_num: 0 },
    { id: 2, topic: "Off-topic", post_num: 0, view_num: 0 },
    { id: 3, topic: "Tecnología", post_num: 0, view_num: 0 },
    { id: 4, topic: "Deportes", post_num: 0, view_num: 0 },
    { id: 5, topic: "Cine", post_num: 0, view_num: 0 },
  ];

  // Al cargar el componente, intenta obtener los tópicos del localStorage
  useEffect(() => {
    const storedTopics = JSON.parse(localStorage.getItem("topics"));
    if (storedTopics) {
      setTopics(storedTopics);
    } else {
      // Si no hay tópicos en localStorage, los inicializamos con los predeterminados
      localStorage.setItem("topics", JSON.stringify(defaultTopics));
      setTopics(defaultTopics);
    }
  }, []);

  return (
    <MainLayout>
      <div className="container-xxl my-2">
        <h1> Foros </h1>
        <Breadcrumb className="custom-breadcrumb">
          <Breadcrumb.Item active>Inicio</Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <div className="container-xxl my-3">
        {topics.map((topic) => (
          <ForumCard
            key={topic.id}
            id={topic.id}
            topic={topic.topic}
            post_num={topic.post_num}
            view_num={topic.view_num}
          />
        ))}
      </div>

      <IndexSelector />
    </MainLayout>
  );
}

export default MainPage;
