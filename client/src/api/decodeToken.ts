import Cookies from "js-cookie";
import {jwtDecode} from 'jwt-decode'

interface DecodedToken {
    id: number;
    username: string;
    email: string,
    role: string;
}

export const decodeToken = (): DecodedToken | null => {
    const token = Cookies.get('token')
    if (!token) {
        return null;
    }
    try {
        const userDate = jwtDecode<DecodedToken>(token);
        return userDate;
    } catch (error) {
        console.error('Error decoding token:', error);
        return null;

    }
};
