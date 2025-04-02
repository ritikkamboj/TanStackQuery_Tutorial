export const fetchPosts = async () => {
    const res = await fetch(`http://localhost:3000/posts?_sort=-id`);
    const data = await res.json();
    console.log(data);
    return data;

}
export const addPost = async (post) => {

    const res = await fetch(`http://localhost:3000/posts`, {
        method: "POST",
        headers: {
            "Content-Type": "applications/json"
        },
        body: JSON.stringify(post)

    })

    return res.json();

}

export const fetchTags = async () => {
    const res = await fetch(`http://localhost:3000/tags`);
    const data = res.json();

    return data;

}