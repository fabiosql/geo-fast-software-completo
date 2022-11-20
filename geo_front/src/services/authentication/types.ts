import { Dispatch, SetStateAction } from "react";
import { IUser } from "../interfaces/IUser";

export interface IContext {
    authenticateRegister: (data: object) => Promise<any>;
    setUser: Dispatch<SetStateAction<IUser>>,
    user: IUser
}

export interface IAuthProvider {
    children: JSX.Element;
}
