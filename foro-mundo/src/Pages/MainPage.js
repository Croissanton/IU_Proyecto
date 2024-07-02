import React, { useEffect } from "react";
import { Breadcrumb } from "react-bootstrap";
import MainLayout from "../layout/MainLayout.js";
import ForumCard from "../Components/ForumCard.js";
import IndexSelector from "../Components/IndexSelector.js";

function MainPage() {
  useEffect(() => {
    document.title = "Foro Mundo";
  }, []);

  // Definir los tópicos del foro
  const forumTopics = [
    { id: 1, topic: "General", post_num: 124, view_num: 154367 },
    { id: 2, topic: "Off-topic", post_num: 64, view_num: 15436 },
    { id: 3, topic: "Tecnología", post_num: 59, view_num: 18567 },
    { id: 4, topic: "Deportes", post_num: 32, view_num: 24357 },
    { id: 5, topic: "Cine", post_num: 41, view_num: 23580 },
  ];

  // Almacenar los tópicos en localStorage
  useEffect(() => {
    localStorage.setItem("forumTopics", JSON.stringify(forumTopics));
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
        {forumTopics.map((topic) => (
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
