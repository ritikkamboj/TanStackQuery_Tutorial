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

  const handleSubmit = (e) =>
  {
    e.preventDefault();
    console.log(e.target)
    // console.log('jai baabe ki')
    const formData = new FormData(e.target);
    console.log(formData)
    const title = formData.get('title');
// console.log(Array.from(formData.keys()))
const tags =Array.from(formData.keys()).filter((key)=> formData.get(key)==='on');
console.log(tags)
  }
  return (
    <div className="container">
      <form action="" onSubmit={handleSubmit}>
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
