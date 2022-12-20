import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL : "https://mern-blog-fahimesti.onrender.com/api/"
})
