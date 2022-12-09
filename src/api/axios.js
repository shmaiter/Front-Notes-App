import axios from "axios";

export default axios.create({
    baseURL: "https://pinit-notes-api.onrender.com",
    // baseURL: "http://localhost:3500",
});
