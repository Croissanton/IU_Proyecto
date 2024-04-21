import React from "react";
import MainLayout from "../layout/MainLayout.js";
import PostCard from "../Components/PostCard.js";
import IndexSelector from "../Components/IndexSelector.js";

function SearchPage() {
  return (
    <MainLayout>
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
      <IndexSelector />
    </MainLayout>
  );
}

export default SearchPage;