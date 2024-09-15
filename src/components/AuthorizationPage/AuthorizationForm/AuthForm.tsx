import React, {useState} from "react";
import styles from "./authform.module.scss"
import AuthorizationButton from "../AuthorizationButton/AuthorizationButton.tsx";

interface AuthFormProps {
    type: 'login' | 'signup';
}
const AuthForm: React.FC<AuthFormProps> = ({type}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    }

    return (
    <div className={styles.authForm}>
        <div className={styles.form__container}>
            <h1 className={styles.form__title}>{type === 'login' ? "Login" : "Sign up"}</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
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