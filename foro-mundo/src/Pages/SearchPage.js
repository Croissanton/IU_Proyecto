import React from "react";
import MainLayout from "../layout/MainLayout.js";
import Post from "../Components/Post.js";
import IndexSelector from "../Components/IndexSelector.js";

function SearchPage() {
  return (
    <MainLayout>
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <IndexSelector />
    </MainLayout>
  );
}

export default SearchPage;