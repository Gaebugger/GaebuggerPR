import React,{useState} from "react";
import axios from "axios";
import Signup from "./Signup";
import Signup2 from "./Signup2";
import Signup3 from "./Signup3";
import { useNavigate } from "react-router-dom";


const SignupMain = () =>{
    const navigate = useNavigate();
    const [step, setStep] = useState(1); // 현재 단계
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: '',
        companyId: ''
    });

    // 다음 단계로 넘어가는 함수
    const nextStep = () => {
        if(step+1 === 4){
            signUpUser(userData,navigate);
        } else{
            setStep(step + 1);
        }
        console.log("my userData is:");
        console.log("your step is " , step);
        console.log(userData);
    };

    // 데이터 변경 핸들러
    const handleChange = input => e => {
        setUserData({ ...userData, [input]: e.target.value });
    };

    const signUpUser = async (userData, navigate) => {
        try {
            const response = await axios.post('https://backapi.pri-pen.com/userAuthentication/signup', {
                email: userData.email,
                password: userData.password,
                name: userData.name,
                companyId: userData.companyId ? Number(userData.companyId) : null // companyId가 문자열인 경우 숫자로 변환
            });
            console.log(response.data);
            alert('회원가입 성공하였습니다!'); // 성공 메시지 표시
            navigate('/login'); // /login 페이지로 리다이렉트

        } catch (error) {
            console.error('Signup failed:', error);
            // 오류 처리 로직
        }
    };
    // 현재 단계에 따른 컴포넌트 렌더링
    switch(step) {
        case 1:
            return <Signup nextStep={nextStep} handleChange={handleChange} />;
        case 2:
            return <Signup2 nextStep={nextStep} userData={userData} />;
        case 3:
            return <Signup3 nextStep={nextStep} userData={userData} setUserData={setUserData}/>;
        default:
            return;
    }
};

export default SignupMain;