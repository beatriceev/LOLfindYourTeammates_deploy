import axios from "axios";

const instance = axios.create({
  baseURL:
    process.env.NODE_ENV === "production" ? "/" : `http://localhost:4000/`,
});

export default instance;

// instance.get('/hi').then((data) => console.log(data));
