import React, {useState} from "react";
import styles from "./authform.module.scss"
import AuthorizationButton from "../AuthorizationButton/AuthorizationButton.tsx";

interface AuthFormProps {
    type: 'login' | 'signup';
}

interface Props {
    requestFunction: (email: string, password: string) => Promise<any>;
}
const AuthForm: React.FC<AuthFormProps & Props> = ({type, requestFunction}) => {


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleRequest = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setError('')

        try {
            const response = await requestFunction(email, password)

            if (response.status === 200) {
                console.log('Success request!', response.data)
            } else {
                setError('Failed to make a request')
                console.log(error)
            }
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to make a request')
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