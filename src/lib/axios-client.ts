import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3333",
  withCredentials: true,
  headers: {
    "Cache-Control": "no-cache",
    Pragma: "no-cache",
  },
});
