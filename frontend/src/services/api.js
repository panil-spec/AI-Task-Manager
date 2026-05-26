import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:8181/api"
});

export default API;