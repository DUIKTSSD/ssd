import React from 'react';
import AuthPage from "../../components/AuthorizationPage/AuthPage.tsx";

const LoginPage: React.FC = () => {
    return (
        <div className="login__root">
            <AuthPage type='login'/>
        </div>
    );
};

export default LoginPage;