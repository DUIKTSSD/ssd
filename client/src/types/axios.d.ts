import axios, {AxiosInstance} from "axios";

declare module "axios" {
    interface AxiosInstance {
        auth: {
            login: (credentials: AuthRequest) => Promise<any>,
            register: (credentials: AuthRequest) => Promise<any>,
            logout: () => void
        }
    }
}