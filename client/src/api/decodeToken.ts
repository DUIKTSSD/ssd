import Cookies from "js-cookie";
import {jwtDecode, JwtPayload} from "jwt-decode";

interface CustomJwtPayload extends JwtPayload {
    username: string,
    exp: number,
    role: string
}
export function decodeToken() {
     const token = Cookies.get('token')
    if(!token) {
        return null
    }
    try {
        const decoded: CustomJwtPayload = jwtDecode(token);
        return decoded || null;
    } catch(err) {
        console.error('Error: ', err)
        return null
    }
};
