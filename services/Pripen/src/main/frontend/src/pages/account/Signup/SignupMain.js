import React,{useState} from "react";
import Signup from "./Signup";
import Signup2 from "./Signup2";
import Signup3 from "./Signup3";



const SignupMain = () =>{
    const [step, setStep] = useState(1); // 현재 단계
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: '',
    });

    // 다음 단계로 넘어가는 함수
    const nextStep = () => {
        setStep(step + 1);
        console.log("my userData is:");
        console.log("your step is " , step);
        console.log(userData);
    };

    // 데이터 변경 핸들러
    const handleChange = input => e => {
        setUserData({ ...userData, [input]: e.target.value });
    };

    // 현재 단계에 따른 컴포넌트 렌더링
    switch(step) {
        case 1:
            return <Signup nextStep={nextStep} handleChange={handleChange} />;
        case 2:
            return <Signup2 nextStep={nextStep} userData={userData} />;
        case 3:
            return <Signup3 nextStep={nextStep} handleChange={handleChange} userData={userData}/>;
        case 4:  // redirect login
        default:
            return <div>Unknown step</div>;
    }
};

export default SignupMain;