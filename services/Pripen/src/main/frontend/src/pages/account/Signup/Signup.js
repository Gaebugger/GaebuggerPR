import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import axiosInstance from "../../../api/axiosInstance";
import SignupForm from "../../../components/Signup/SignupForm";
import '../LoginLayout.css';

const Signup = ({nextStep,handleChange}) => {


    
    return(
        <div className="login-container">
            <div className="login-form">
                <SignupForm nextStep={nextStep} handleChange={handleChange} />
            </div>
            <div className="background-image"/>
        </div>
    )
}

export default Signup;
