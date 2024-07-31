import React, {useState} from "react";
import classes from "./auth.module.scss"
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
    <div className={classes.form__container}>
        <h2 className={classes.form__title}>{type === 'login' ? "Login" : "Sign up"}</h2>
        <form className={classes.form} onSubmit={handleSubmit}>
        <div className={classes.form__label_cover}>
                <label>Email</label>
                <input type="email"
                       value={email}
                       name="email"
                       required
                       placeholder="Enter the email..."
                       onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className={classes.form__label_cover}>
                <label>Password</label>
                <input type="password"
                       name="password"
                       value={password}
                       required
                       placeholder="Enter the password..."
                       onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <AuthorizationButton btnText={type === 'login'? 'Login': "Sign Up"}/>
        </form>
    </div>
    )
};

export default AuthForm;