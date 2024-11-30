import React, {useState} from "react";
import styles from "./authform.module.scss";
import AuthorizationButton from "../AuthorizationButton/AuthorizationButton.tsx";
import {useAppDispatch, useAppSelector} from "../../../../hooks/reduxhooks.ts";
import {loginUser, registerUser} from "../../../../features/auth/authSlice.ts";
import {Link, useNavigate} from "react-router-dom";
import {checkDomain} from "../checkDomain.ts";

interface AuthFormProps {
    type: 'login' | 'signup';
}

const AuthForm: React.FC<AuthFormProps> = ({type}) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate();
    const {status, error,} = useAppSelector(state => state.auth);
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        checkDomain(email)
        const userData = {username, email, password}
        if (type === 'signup') {
            await dispatch(registerUser({userData, navigate}))
        } else {
            await dispatch(loginUser({userData, navigate}))
        }
    };
    return (
        <div className={styles.authForm}>
            <div className={styles.form__container}>
                <h1 className={styles.form__title}>{type === 'login' ? "Login" : "Sign Up"}</h1>
                <form className={styles.form} onSubmit={handleSubmit}>
                    {type === 'signup' && (
                        <div className={styles.form__label_cover}>
                            <label>Username</label>
                            <input
                                type="text"
                                value={username}
                                required
                                placeholder="Enter the username..."
                                onChange={(e) => {
                                    setUsername(e.target.value);
                                }}
                            />
                        </div>
                    )}
                    <div className={styles.form__label_cover}>
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            required
                            placeholder="Enter the email..."
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                        />
                    </div>
                    <div className={styles.form__label_cover}>
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            required
                            placeholder="Enter the password..."
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                        />
                    </div>
                    {status === 'loading' && <p>Loading...</p>}
                    {error && <p>{error}</p>}
                    <AuthorizationButton btnText={type === 'login' ? 'Login' : 'Sign Up'}/>
                    {type === 'login' && (
                        <p className={styles['auth-prompt']}>
                            Don't have an account? <Link className={styles['auth-prompt-link']} to="/signup"> Sign
                                                                                                              Up</Link>
                        </p>
                    )}
                    {type === 'signup' && (
                        <p className={styles['auth-prompt']}>
                            Already have an account? <Link className={styles['auth-prompt-link']}
                                                           to="/login"> Login</Link>
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
};

export default AuthForm;
