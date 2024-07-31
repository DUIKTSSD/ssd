import React from 'react';
import AuthForm from "../../components/AuthorizationPage/AuthorizationForm/AuthForm.tsx";


const SignUpPage: React.FC= () => {
    return (
        <div className="signup">
            <AuthForm type="signup"/>
        </div>
    );
};

export default SignUpPage;