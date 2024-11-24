import React from 'react';
import AuthPage from "../../components/AuthorizationPage/AuthPage.tsx";

const VerificationPage: React.FC= () =>  {
    return (
        <div className="signup__root">
            <AuthPage type="verification"/>
        </div>
    );
};

export default VerificationPage;