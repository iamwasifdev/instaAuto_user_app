
import axios from "axios";

export  const api=axios.create({
    baseURL:"http://192.168.29.251:5000/api/v1",
    timeout:10000,
    headers: {
    "Content-Type": "application/json",
  },

})