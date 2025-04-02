import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import { addPost, fetchPosts } from "../api/api";

function PostList() {
  const { data: postData, isLoading, isError, error } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  const {mutate, isError : isPostError, error: postError , isPending, reset} = useMutation({
    mutationFn : addPost,
  });

  console.log(postData, isLoading, isError, error);
  return (
    <div className="container">
       
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
