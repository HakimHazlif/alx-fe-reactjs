import axios from "axios";

// const api_key = process.env.REACT_APP_GITHUB_API_KEY;

const BASE_URL = "https://api.github.com";

const options = {
  header: {
    Authorization: `Bearer  ${import.meta.env.REACT_APP_GITHUB_API_KEY}`,
  },
};

export async function fetchUserData({ username, location, minRepos }) {
  try {
    let query = `q=${username}`;
    if (location) query += `+location:${location}`;
    if (minRepos) query += `+repos:${minRepos}`;

    // const url1 = "https://api.github.com/search/users?q";

    const url = `${BASE_URL}/search/users?${query}`;
    const userData = await axios.get(url, options);

    return userData.data;
  } catch (err) {
    throw new Error(err.message);
  }
}
