import React, {useState} from 'react';
import AuthPage from "../../components/AuthorizationPage/AuthPage.tsx";
import axios from 'axios'


const LoginPage: React.FC = () => {

    const handleLoginUrl = `http://localhost:8080/api/auth/login`

    const [userData, setUserData] = useState({
        username: "",
        password: ""
    })

    const handleLogin = async() => {
        try {
            const response = await axios.post(handleLoginUrl, userData, {
                headers: {
                    'Content-Type': "application/json"
                }
            })

            console.log('Successful login', response.data)
        } catch(e) {
            console.log('Error while trying to register', e)
        }
    }



    return (
        <div className="login__root">
            <AuthPage type='login' setUserData={setUserData} onSubmit={handleLogin}/>
        </div>
    );
};

export default LoginPage;