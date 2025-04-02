import { useQuery } from "@tanstack/react-query";
import React from "react";
import { fetchPosts } from "../api/api";

function PostList() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  console.log(data, isLoading, isError, error);
  return <div>{isLoading && <p>loading...</p>}
  {isError && <p>{error.message}</p>}
  {data?.map((post)=> {
    
    return <p key={post.id}>{post.title} {post.tags.map((tags)=> <span>{tags}</span>)} </p>})
  
  
  
  }
  
  
  </div>;
}

export default PostList;
