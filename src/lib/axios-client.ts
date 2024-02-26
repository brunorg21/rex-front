import axios from "axios";

export const api = axios.create({
  baseURL: process.env.BASE_URL,
  withCredentials: true,
  headers: {
    "Cache-Control": "no-cache",
    Pragma: "no-cache",
  },
});
