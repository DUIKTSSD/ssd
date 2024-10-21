import React, {useState} from 'react';
import AuthPage from "../../components/AuthorizationPage/AuthPage.tsx";
import api from "../../api.ts";
const LoginPage: React.FC = () => {

    const [userData, setUserData] = useState({
        password: "",
        email: "",
        username: ""
    })

    const handleLogin = async() => {
        try {
            await api.auth.login(userData)
        } catch(err) {
            console.error('Failed to login.', err)
        }
    }



    return (
        <div className="login__root">
            <AuthPage type='login' setUserData={setUserData} onSubmit={handleLogin}/>
        </div>
    );
};

export default LoginPage;