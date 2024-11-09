import {UserState} from "../types/userStateTypes.ts";
import axios from "axios";
import Cookies from "js-cookie";

export const registerUserAPI = async(userData: UserState) => {
    const response = await axios.post('http://localhost:8080/api/auth/register', userData)
    if(response) {
        Cookies.set('token', response.data)
        console.log(response.data)
    }
    return response.data
}

export const loginUserAPI = async(userData: UserState) => {
    const response = await axios.post('http://localhost:8080/api/auth/login', userData)
    if(response) {
        Cookies.set('token', response.data)
        console.log(response.data)
    }
    return response.data
}