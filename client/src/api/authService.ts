import api from "./api.ts";
import {UserState} from "../types/userStateTypes.ts";

export const registerUserAPI = async(userData: UserState) => {
    const response = await api.auth.register(userData)
    return response.data
}

export const loginUserAPI = async(userData: UserState) => {
    const response = await api.auth.login(userData)
    return response.data
}