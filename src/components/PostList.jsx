import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { addPost, fetchPosts, fetchTags } from "../api/api";

function PostList() {

  const [page, setpage] = useState(1);


  const {
    data: postData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts(),
  });

  const { data: tagsData } = useQuery({
    queryKey: ["tags"],
    queryFn: fetchTags,
    staleTime: Infinity,
  });

  const queryClient = useQueryClient();

  const {
    mutate,
    isError: isPostError,
    error: postError,
    isPending,
    reset,
  } = useMutation({
    mutationFn: addPost,
    onMutate: () => {
      return { id: 1 };
    },
    onSuccess: (data, variables, context) => {
      // console.log(data , variables , context)
      queryClient.invalidateQueries({
        queryKey: ["posts"],
        exact: true,
      });
    },
    // onError : (error , variables , context)=>
    // {

    // },
    // onSettled : (data , error , variables , context) =>
    // {

    // }
  });

  console.log(postData, isLoading, isPostError, postError);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(e.target);
    // console.log('jai baabe ki')
    const formData = new FormData(e.target);
    console.log(formData);
    const title = formData.get("title");
    console.log(title);
    // console.log(Array.from(formData.keys()))
    const tags = Array.from(formData.keys()).filter(
      (key) => formData.get(key) === "on"
    );
    console.log(tags);

    if (!title || !tags) {
      return;
    }

    mutate({ id: postData.length + 1, title, tags });

    e.target.reset();
  };
  return (
    <div className="container">
      <form action="" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Your Text..."
          name="title"
          className="postbox"
        />

        <div className="tags">
          {tagsData?.map((tags) => (
            <div key={tags} className="items">
              <input type="checkbox" name={tags} id={tags} />
              <label htmlFor={tags}>{tags}</label>
            </div>
          ))}
        </div>

        <button>Post</button>
      </form>

      {isLoading && isPending && <p>loading...</p>}
      {isError && <p>{error.message}</p>}
      {isPostError && <p onClick={() => reset()}>{postError.message}</p>}

      <div className="pages">
        <button>Previous Page</button>
        <p>{page}</p>
        <button>Next Page </button>
      </div>
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
