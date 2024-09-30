import axios from "axios";

const authUrl = "localhost://8080/"

export const login = async(email: string, password: string) => {
    return await axios.post(`${authUrl}/login`, {
        email,
        password
    })
}

export const register = async(email: string, password: string) => {
    return await axios.post(`${authUrl}/register`, {
        email,
        password
    })
}

export default {
    register,
    login
}
