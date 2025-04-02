import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import { addPost, fetchPosts, fetchTags } from "../api/api";

function PostList() {
  const {
    data: postData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  const { data: tagsData } = useQuery({
    queryKey: ["tags"],
    queryFn: fetchTags,
  });

  const {
    mutate,
    isError: isPostError,
    error: postError,
    isPending,
    reset,
  } = useMutation({
    mutationFn: addPost,
  });

  console.log(postData, isLoading, isError, error);
  return (
    <div className="container">
      <form action="">
        <input type="text" placeholder="Enter Your Text..." name="title" className="postbox" />

        <div className="tags">
          {tagsData?.map((tags) => (
            <div key={tags} className="items">
              <input type="checkbox" name="tag" id="tag" />
              <label htmlFor="tag">{tags}</label>
            </div>
          ))}
        </div>

        <button>Post</button>
      </form>

      {isLoading && <p>loading...</p>}
      {isError && <p>{error.message}</p>}
      {postData?.map((post) => {
        return (
          <div key={post.id} className="post">
            <div> {post.title}</div>
            {post.tags.map((tags) => (
              <span key={tags}>{tags}</span>
            ))}
          </div>
        );
      })}
    </div>
  );
}

export default PostList;
