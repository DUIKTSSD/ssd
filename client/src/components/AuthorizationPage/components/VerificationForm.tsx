import React, {useState} from 'react';
import styles from "./AuthorizationForm/authform.module.scss";
import AuthorizationButton from "./AuthorizationButton/AuthorizationButton.tsx";
import {Link, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../hooks/reduxhooks.ts";
import {verifiUser} from "../../../features/auth/authSlice.ts";

const VerificationForm = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate();
     const { status, error, } = useAppSelector(state => state.auth);
    const [code, setCode] = useState<string>("");
    const email = localStorage.getItem("email");  // Получаем строку
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const userData = { email,code,}
        await dispatch(verifiUser({userData, navigate}))
    };
    return (
        <div className={styles.authForm}>
            <div className={styles.form__container}>
                <h1 className={styles.form__title}>Verifi your email</h1>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.form__label_cover}>
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            disabled={true}
                            required
                            placeholder="Enter the email..."
                        />
                    </div>
                    <div className={styles.form__label_cover}>
                        <label>Password</label>
                        <input
                            type="text"
                            value={code}
                            required
                            placeholder="Enter the password..."
                            onChange={(e) => {
                                setCode(e.target.value);
                            }}
                        />
                    </div>
                    {status === 'loading' && <p>Loading...</p>}
                    {error && <p>{error}</p>}
                    <AuthorizationButton btnText={'Sign Up'}/>
                </form>
            </div>
        </div>
    );
};

export default VerificationForm;