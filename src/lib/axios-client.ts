import axios from "axios";

axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.put["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.get["Access-Control-Allow-Origin"] = "*";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3333",
});
