import { useQuery } from "react-query";

function PostsComponent() {
  const {
    data: posts,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts");

      if (!res.ok) throw new Error("Failed to fetch posts");

      return res.json();
    },
    staleTime: 5000,
  });

  if (isLoading) return <p>Loading posts...</p>;

  if (error) return <p>{error.message}</p>;

  return (
    <div>
      <h2>Posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
      <button onClick={() => refetch()}>Refetch Posts</button>
    </div>
  );
}

export default PostsComponent;
