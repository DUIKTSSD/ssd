import React, {useState} from 'react';
import AuthPage from "../../components/AuthorizationPage/AuthPage.tsx";
import api from "../../api.ts";

const SignUpPage: React.FC= () => {
    const [userData, setUserData] = useState({
        email: "",
        password: "",
        username: ""
    })

    const handleRegister = async() => {
        try {
            console.log(userData)
            const response = await api.auth.register(userData)
            console.log(response)
        } catch(err) {
            console.error(`Error while registering: ${err}`)
        }
    }



    return (
        <div className="signup__root">
            <AuthPage setUserData={setUserData} onSubmit={handleRegister} type="signup"/>
        </div>
    );
};

export default SignUpPage;