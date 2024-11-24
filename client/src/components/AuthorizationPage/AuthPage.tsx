import React from 'react';
import styles from './auth.module.scss'
import AuthForm from "./components/AuthorizationForm/AuthForm.tsx";
import VerificationForm from "./components/VerificationForm.tsx";

interface AuthPageProps {
    type: 'login' | 'signup'|'verification'
}

const AuthPage: React.FC<AuthPageProps> = ({type}) => {
    return (
        <div className={styles.auth}>
            <div className={styles.auth__backdrop}>
                <h2 className={styles.auth__backdrop_text}> {type === 'login'
                    ? 'Sign in to your '
                    : 'Sign up into your '}
                <span className={styles.auth__backdrop_adventure}>adventure !</span>
                </h2>
            </div>
            {type === 'verification' ? <VerificationForm/> : <AuthForm type={type}/>}
        </div>
    );
};

export default AuthPage;