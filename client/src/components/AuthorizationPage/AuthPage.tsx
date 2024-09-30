import React from 'react';
import styles from './auth.module.scss'
import AuthForm from "./AuthorizationForm/AuthForm.tsx";

interface Props  {
    type: 'login' | 'signup'
}

const AuthPage: React.FC<Props> = ({type}) => {
    return (
        <div className={styles.auth}>
            <div className={styles.auth__backdrop}>
                <h2 className={styles.auth__backdrop_text}> {type === 'login'
                    ? 'Sign in to your '
                    : 'Sign up into your '}
                <span className={styles.auth__backdrop_adventure}>adventure !</span>
                </h2>
            </div>
            <AuthForm type={type}/>
        </div>
    );
};

export default AuthPage;