import React, { useState, useEffect } from 'react';
import styles from "./AuthorizationForm/authform.module.scss";
import AuthorizationButton from "./AuthorizationButton/AuthorizationButton.tsx";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxhooks.ts";
import { verifiUser } from "../../../features/auth/authSlice.ts";

const VerificationForm = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { status, error } = useAppSelector(state => state.auth);
    const [code, setCode] = useState<string>("");
    const [email, setEmail] = useState<string | null>(null);

    useEffect(() => {
        const storedEmail = localStorage.getItem("email");
        if (!storedEmail) {
            navigate('/register');
        } else {
            setEmail(storedEmail);
        }
    }, [navigate]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        
        if (!email) {
            console.error("Email is not available. Please provide a valid email.");
            return; 
        }
        const userData = {email, code};
        await dispatch(verifiUser({userData, navigate}));
        navigate('/');
    };
    return (
        <div className={styles.authForm}>
            <div className={styles.form__container}>
                <h1 className={styles.form__title}>VERIFY YOUR EMAIL</h1>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <span className={styles.form__description}>
                        Ми надіслали код на вашу електронну адресу. Введіть його нижче, щоб завершити реєстрацію
                    </span>
                    <div className={styles.form__label_cover}>
                        <label htmlFor="email">Your Email</label>
                        <input
                            id="email"
                            type="email"
                            value={email || ""}
                            disabled={true}
                            required
                            placeholder="Enter the email..."
                        />
                    </div>
                    <div className={styles.form__label_cover}>
                        <label htmlFor="code">Code</label>
                        <input
                            id="code"
                            type="text"
                            value={code}
                            required
                            placeholder="Enter the code"
                            onChange={(e) => setCode(e.target.value.trim())}
                            maxLength={6}
                        />
                    </div>
                    {status === 'loading' && <p className={styles.form__status}>Loading...</p>}
                    {error && <p className={styles.form__error}>{error}</p>}
                    <AuthorizationButton 
                        btnText={'Verify'} 
                        disabled={status === 'loading' || !code.trim()}
                    />
                </form>
            </div>
        </div>
    );
};

export default VerificationForm;
