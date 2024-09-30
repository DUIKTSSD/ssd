import React, {useState} from "react";
import styles from "./authform.module.scss"
import AuthorizationButton from "../AuthorizationButton/AuthorizationButton.tsx";
import axios from "axios";
import api from "../../../api.ts";

interface AuthFormProps {
    type: 'login' | 'signup';
}

interface Props {
    apiRegisterOrLogin: string;
    requestFunction: (email: axios.AxiosResponse<any>, password: axios.AxiosResponse<any>) => Promise<any>;
    successMessage: string,
    errorMessage: string
}
const AuthForm: React.FC<AuthFormProps & Props> = ({type, requestFunction, successMessage, errorMessage, apiRegisterOrLogin}) => {


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [isLoadng, setIsLoading] = useState(false)

    const handleRequest = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const email = await axios.post(`http://localhost:8080/auth/${apiRegisterOrLogin}`)
        const password = await axios.post(`http://localhost:8080/api/auth/${apiRegisterOrLogin}`)

        try {
            const response = await requestFunction(email, password)

            if(response.status === 200) {
                console.log(successMessage, response.data)
            } else {
                console.log(errorMessage, response.data)
            }
        } catch(err: any) {
            setError(err.response?.data?.message || errorMessage)
        } finally {
            setIsLoading(false)
        }
    }


    return (
    <div className={styles.authForm}>
        <div className={styles.form__container}>
            <h1 className={styles.form__title}>{type === 'login' ? "Login" : "Sign up"}</h1>
            <form className={styles.form} onSubmit={handleRequest}>
                <div className={styles.form__label_cover}>
                    <label>Email</label>
                    <input type="email"
                           value={email}
                           name="email"
                           required
                           placeholder="Enter the email..."
                           onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className={styles.form__label_cover}>
                    <label>Password</label>
                    <input type="password"
                           name="password"
                           value={password}
                           required
                           placeholder="Enter the password..."
                           onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <AuthorizationButton btnText={type === 'login' ? 'Login' : "Sign Up"}/>
            </form>
        </div>
    </div>

)
};

export default AuthForm;