import React, {useState} from 'react';
import styles from "./AuthorizationForm/authform.module.scss";
import AuthorizationButton from "./AuthorizationButton/AuthorizationButton.tsx";
import { useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../hooks/reduxhooks.ts";
import {verifiUser} from "../../../features/auth/authSlice.ts";

const VerificationForm = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate();
    const {status, error,} = useAppSelector(state => state.auth);
    const [code, setCode] = useState<string>("");
    const email = localStorage.getItem("email");  // Получаем строку
const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Check if email is null and handle it accordingly
    if (!email) {
        console.error("Email is not available. Please provide a valid email.");
        return; // Or show a user-friendly alert
    }

    const userData = { email, code };

    // Ensure the type matches the expected UserState structure
    await dispatch(verifiUser({ userData, navigate }));
};

    return (
        <div className={styles.authForm}>
            <div className={styles.form__container}>
                <h1 className={styles.form__title}>VERIFY YOUR EMAIL</h1>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <span style={{color: "white", textAlign: "center"}}>Ми надіслали код на вашу електронну адресу.Введіть його нижче, щоб завершити реєстрацію</span>
                    <div className={styles.form__label_cover}>
                        <label>Your Email</label>
                        <input
                            type="email"
                            value={email || ""}
                            disabled={true}
                            required
                            placeholder="Enter the email..."
                        />
                    </div>
                    <div className={styles.form__label_cover}>
                        <label>Code</label>
                        <input
                            type="text"
                            value={code}
                            required
                            placeholder="Enter the code"
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