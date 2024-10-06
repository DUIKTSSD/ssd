import React, {useState} from 'react';
import AuthPage from "../../components/AuthorizationPage/AuthPage.tsx";
import axios from "axios";

const SignUpPage: React.FC= () => {
    const [userData, setUserData] = useState({
        email: "",
        password: "",
        username: ""
    })


    const handleRegisterUrl = 'http://localhost:8080/api/auth/register';
    const handleRegister = async() => {
        try {
            const response = await axios.post(handleRegisterUrl, {
                email: userData.email,
                password: userData.password,
                username: userData.username,
            }, {
                headers: {
                    'Content-Type': "application/json"
                }
            })

            console.log('Successful registration', response.data)
        } catch(e) {
            console.log('Error during registration', e)
        }
    }

    return (
        <div className="signup__root">
            <AuthPage setUserData={setUserData} onSubmit={handleRegister} type="signup"/>
        </div>
    );
};

export default SignUpPage;