import React from "react";
import MainLayout from "../layout/MainLayout.js";
import PostCard from "../Components/PostCard.js";
import PostComment from "../Components/PostComment.js";

function PostPage() {
  return (
    <MainLayout>
        {/* PostCard principal */}
      <div className="container-xxl my-3">
        <PostCard
            titulo={"buen foro :D"}
            text={"Este es un foro muy bueno"}
            author={"Juan Jaun"}
            date={"18.10.1992"}
            lm_author={"Jose Jose"}
            lm_date={"19.04.2024"}
            res_num={100}
            view_num={1000}
        />
    </div>

    {/* PostComments */}
    <div className="container-xxl my-3">
        <h3>Comentarios</h3>
        <PostComment
          title={"Que buen foro"}
          upvotes={10}
          downvotes={5}
          date={new Date()}
        />
        <PostComment
          title={"Que mal foro"}
          upvotes={15}
          downvotes={3}
          date={new Date()}
        />
      </div>
    </MainLayout>
  );
}

export default PostPage;
