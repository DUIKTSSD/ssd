import React from 'react';
import AuthPage from "../../components/AuthorizationPage/AuthPage.tsx";
import axios from "axios";

const SignUpPage: React.FC= () => {

    const handleRegisterUrl = 'http://localhost:8080/api/auth/register'

    const handleRegister = async(email: string, password: string) => {
        return await axios.post(handleRegisterUrl, {
            email,
            password
        }, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    return (
        <div className="signup__root">
            <AuthPage type='signup' requestFunction={handleRegister}/>
        </div>
    );
};

export default SignUpPage;