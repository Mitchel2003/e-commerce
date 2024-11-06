import axios from "axios";

const instance = axios.create({
  baseURL: 'https://rest-api-qvo9.onrender.com/api', /* to mode production */
  withCredentials: true
})

export default instance