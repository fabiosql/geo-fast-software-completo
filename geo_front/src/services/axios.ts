import axios from 'axios';

const baseURL = "//localhost:8000/api";
const api = axios.create({
    baseURL
});

api.interceptors.request.use(async req => {
    let token = localStorage.getItem("token");
    if(token){
        if(req.headers !== undefined){
            req.headers.Authorization = `Bearer ${token}`
        }
    }
    return req
})

export default api;
