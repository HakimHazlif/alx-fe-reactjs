import axios from "axios";

// const api_key = process.env.REACT_APP_GITHUB_API_KEY;

const BASE_URL = "https://api.github.com";

const options = {
  header: {
    Authorization: `Bearer  ${import.meta.env.REACT_APP_GITHUB_API_KEY}`,
  },
};

export async function fetchUserData(query) {
  try {
    const url = `${BASE_URL}/users/${query}`;
    const userData = await axios.get(url, options);

    return userData.data;
  } catch {
    return "Looks like we can't find the user";
  }
}
