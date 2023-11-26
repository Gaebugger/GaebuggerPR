import React from "react";
import SignupForm3 from "../../../components/Signup/SignupForm3";

const Signup3 = ({nextStep, handleChange, userData}) => {

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: '#E2F5FF',
        }}>
            <SignupForm3 nextStep={nextStep} handleChange={handleChange} userData={userData} />
        </div>
    );
};

export default Signup3;