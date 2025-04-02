import { useQuery } from "@tanstack/react-query";
import React from "react";
import { fetchPosts } from "./api/api";

function App() {
  const {data , isLoading , status} = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });


  console.log( data , isLoading , status )
  return <div>Jai Baabe Ki </div>;
}

export default App;
