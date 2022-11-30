import axios from "axios";

const BASEURL = "http://localhost:8800/api";

export const publicRequest = axios.create({
  baseURL: BASEURL,
});
