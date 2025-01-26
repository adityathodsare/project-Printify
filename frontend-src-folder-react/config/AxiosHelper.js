import Axios from "axios";

export const baseURL = "http://localhost:8080";
export const httpClient = Axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "text/plain",
  },
});
