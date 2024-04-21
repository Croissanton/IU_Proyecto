import React from "react";
import MainLayout from "../layout/MainLayout.js";
import ForumCard from "../Components/ForumCard.js";
import IndexSelector from "../Components/IndexSelector.js";

function MainPage() {
  return (
    <MainLayout>
      <div className="container-xxl my-3">
        <ForumCard topic={"General"} post_num={124} view_num={154367} />
        <ForumCard topic={"Off-topic"} post_num={64} view_num={15436} />
        <ForumCard topic={"Tecnología"} post_num={59} view_num={18567} />
        <ForumCard topic={"Deportes"} post_num={32} view_num={24357} />
        <ForumCard topic={"Cine"} post_num={41} view_num={23580} />
      </div>
      <IndexSelector />
    </MainLayout>
  );
}

export default MainPage;
