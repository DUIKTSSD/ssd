import React from 'react';
import AuthPage from "../../components/AuthorizationPage/AuthPage.tsx";

const SignUpPage: React.FC= () => {

    return (
        <div className="signup__root">
            <AuthPage type="signup"/>
        </div>
    );
};

export default SignUpPage;