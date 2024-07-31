import React from 'react';
import AuthForm from "../../components/AuthorizationPage/AuthorizationForm/AuthForm.tsx";

const LoginPage: React.FC = () => {
    return (
        <div className="login">
            <AuthForm type="login"></AuthForm>
        </div>
    );
};

export default LoginPage;