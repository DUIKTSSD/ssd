import React from 'react';
import AuthPage from "../../components/AuthorizationPage/AuthPage.tsx";
import axios from 'axios'


const LoginPage: React.FC = () => {

    const handleLoginUrl = `http://localhost:8080/api/auth/login`

    const handleLogin = async (email: string, password: string) => {
        return await axios.post(handleLoginUrl, {
            email,
            password
        })
    }

    return (
        <div className="login__root">
            <AuthPage type='login' requestFunction={handleLogin}/>
        </div>
    );
};

export default LoginPage;