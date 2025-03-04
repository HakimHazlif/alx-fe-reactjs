import { useParams } from "react-router-dom";

const BlogPost = () => {
  const { postId } = useParams();

  return (
    <div className="p-4">
      <h1 className="text-2xl">Blog Post</h1>
      <p>Viewing blog post with ID: {postId}</p>
    </div>
  );
};

export default BlogPost;
