import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL : "https://mern-blog-esti.herokuapp.com/api/"
})