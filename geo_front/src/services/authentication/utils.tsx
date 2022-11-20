
import api from "../axios";

export async function isLogged() {
    const token = localStorage.getItem("token");
    if (!token) return false;
    try {
        let response = await api.get("/auth/check");
        return response.data.token ? true : false;
    } catch (e) {
        return false;
    }
}

export async function getUserInfo() {
    try {
        let response = await api.get("/user/info");
        return response;
    } catch (e) {
        return false;
    }
}

export function logout() {
    localStorage.clear();
}