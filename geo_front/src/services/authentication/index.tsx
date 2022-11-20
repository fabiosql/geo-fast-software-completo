import { createContext, useMemo, useState } from "react";
import api from "../axios";
import { IUser } from "../interfaces/IUser";
import { IAuthProvider, IContext } from "./types";
import { isLogged, logout } from "./utils";

export const AuthContext = createContext<IContext>({} as IContext);

export const AuthProvider = ({ children }: IAuthProvider) => {
    const [user, setUser] = useState<IUser>({
        full_name: ""
    });
    const token = localStorage.getItem("token");
    useMemo(async () => {
        try {
            if (token) {
                isLogged().then(async logged => {
                    if (!logged) {
                        logout();
                        window.location.href = "/welcome";
                    } else {
                        let response = await api.get("/user/info");
                        setUser({
                            full_name: response.data.full_name
                        });
                    }
                })
            }
        } catch (e) {
        }

    }, [token]);

    async function authenticateRegister(data) {

        const response = await api.post("/register", data).then(r => {
            localStorage.setItem("token", r.data.token);
            return r.data;
        }).catch(function (error) {
            return error.response;
        });

        return response;

    }

    return (
        <AuthContext.Provider value={{ user, setUser, authenticateRegister }}>
            {children}
        </AuthContext.Provider>
    )
}