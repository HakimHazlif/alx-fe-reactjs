import { useState } from "react";
import { fetchUserData } from "../services/githubService";

const Search = () => {
  const [searchInput, setSearchInput] = useState("");
  const [location, setLocation] = useState("");
  const [minRepos, setMinRepos] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  async function handleSearch(e, newPage = 1) {
    e.preventDefault();
    if (!searchInput) return;

    try {
      setLoading(true);
      setError("");
      if (newPage === 1) setUsers([]);

      const data = await fetchUserData({
        username: searchInput,
        location,
        minRepos,
        page: newPage,
      });
      setUsers((prev) =>
        newPage === 1 ? data.items : [...prev, ...data.items]
      );
      setTotalCount(data.total_count);
      setPage(newPage);
    } catch {
      setError("Looks like we can't find the users");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-lg rounded-lg">
      <form onSubmit={(e) => handleSearch(e)} className="space-y-4">
        <input
          type="text"
          className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter GitHub username..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          required
        />
        <input
          type="text"
          className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Location (optional)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <input
          type="number"
          className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Min repositories (optional)"
          value={minRepos}
          onChange={(e) => setMinRepos(e.target.value)}
          min="0"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Search
        </button>
      </form>

      {loading && <p className="mt-4 text-gray-600">Loading...</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}

      {users.length > 0 && (
        <div className="mt-6 space-y-4">
          <p className="text-sm text-gray-600">
            Showing {users.length} of {totalCount} results
          </p>
          {users.map((user) => (
            <div
              key={user.id}
              className="flex items-center gap-4 p-4 border rounded bg-gray-50"
            >
              <img
                src={user.avatar_url}
                alt="Avatar"
                className="w-16 h-16 rounded-full"
              />
              <div>
                <h2 className="text-lg font-semibold">{user.login}</h2>
                <p className="text-sm text-gray-600">
                  Location: {user.location || "Unknown"}
                </p>
                <p className="text-sm text-gray-600">
                  Repos: {user.public_repos || "N/A"}
                </p>
                <a
                  href={user.html_url}
                  className="text-blue-500 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Profile
                </a>
              </div>
            </div>
          ))}
          {users.length < totalCount && (
            <button
              onClick={(e) => handleSearch(e, page + 1)}
              className="w-full bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition"
            >
              Load More
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
