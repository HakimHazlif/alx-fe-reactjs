import { useState } from "react";
import { fetchUserData } from "../services/githubService";

const Search = () => {
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [userData, setUserData] = useState(null);

  async function handleSearch(e) {
    e.preventDefault();
    if (!searchInput) return;

    try {
      setLoading(true);
      setError("");
      setUserData(null);
      const data = await fetchUserData(searchInput);

      setUserData(data);
      setLoading(false);
    } catch {
      setError("Looks like we can't find the user");
    }
  }

  return (
    <div className="p-6 max-w-lg mx-auto">
      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          type="text"
          className="border p-2 rounded w-full"
          placeholder="Enter GitHub username..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </form>

      {loading && <p className="mt-4 text-gray-600">Loading...</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}

      {userData && (
        <div className="mt-6 flex items-center gap-4 p-4 border rounded">
          <img
            src={userData.avatar_url}
            alt="Avatar"
            className="w-16 h-16 rounded-full"
          />
          <div>
            <h2 className="text-lg font-semibold">
              {userData.name || userData.login}
            </h2>
            <a
              href={userData.html_url}
              className="text-blue-500"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Profile
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
