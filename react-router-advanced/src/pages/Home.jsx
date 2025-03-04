import { Link } from "react-router-dom";

const Home = () => (
  <div className="p-4">
    <h1 className="text-3xl mb-4">Welcome to the Advanced Routing App</h1>
    <nav className="space-x-4">
      <Link to="/profile" className="text-blue-600 hover:underline">
        Profile
      </Link>
      <Link to="/blog/123" className="text-blue-600 hover:underline">
        Sample Blog Post
      </Link>
    </nav>
  </div>
);

export default Home;
