import axios from 'axios';

const baseURL = "http://54.226.159.246/api";
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
