import React, {useState} from "react";
import styles from "./authform.module.scss"
import AuthorizationButton from "../AuthorizationButton/AuthorizationButton.tsx";

interface AuthFormProps {
    type: 'login' | 'signup';
    onUserDataChange: (data: {email: string, password: string, username: string}) => void;
    onSubmit: () => Promise<void>
}

const AuthForm: React.FC<AuthFormProps> = ({type, onUserDataChange, onSubmit}) => {


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')

    const handleChange = () => {
        onUserDataChange({email, password, username})
    }

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()

        onSubmit()
    }




    return (
    <div className={styles.authForm}>
        <div className={styles.form__container}>
            <h1 className={styles.form__title}>{type === 'login' ? "Login" : "Sign up"}</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.form__label_cover}>
                    <label>Username</label>
                    <input type="text"
                           value={username}
                           name="username"
                           required
                           placeholder="Enter the username..."
                           onChange={(e) => {
                               setUsername(e.target.value)
                               handleChange()
                           }}
                    />
                </div>
                <div className={styles.form__label_cover}>
                    <label>Email</label>
                    <input type="email"
                           value={email}
                           name="email"
                           required
                           placeholder="Enter the email..."
                           onChange={(e) => {
                               setEmail(e.target.value)
                               handleChange()
                           }}
                    />
                </div>
                <div className={styles.form__label_cover}>
                    <label>Password</label>
                    <input type="password"
                           name="password"
                           value={password}
                           required
                           placeholder="Enter the password..."
                           onChange={(e) => {
                               setPassword(e.target.value)
                               handleChange()
                           }}

                    />
                </div>
                <AuthorizationButton btnText={type === 'login' ? 'Login' : "Sign Up"}/>
            </form>
        </div>
    </div>

    )
};

export default AuthForm;