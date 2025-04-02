export const fetchPosts = async () => {
    const res = await fetch(`http://localhost:3000/posts?_sort=-id`);
    const data = await res.json();
    console.log(data);
    return data;

}
