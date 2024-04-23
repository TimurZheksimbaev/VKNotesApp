import axios from "axios"
import  { ACCESS_TOKEN } from "./constants"

const apiURL = "https://vknotesapp.onrender.com/api"

const api = axios.create({
    baseURL: apiURL,
})

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN)
        if (token)  {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)


export default api