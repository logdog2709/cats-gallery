import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_CATS_API_BASE_URL,
  headers: { "x-api-key": process.env.REACT_APP_CATS_API_KEY },
});

export default instance;
