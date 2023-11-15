import React from 'react';
import LoginImage from '../../assets/images/Login_Prototype.png';
import './LoginLayout.css';
import LoginForm from '../../components/LoginForm/LoginForm';

const LoginLayout = () => {
    return (
        <div className="login-container">
            <div className="login-form">
                <LoginForm />
            </div>
            <div className="background-image"/>

        </div>
    );
}

export default LoginLayout;
