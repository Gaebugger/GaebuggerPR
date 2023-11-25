import React,{useEffect,useState} from "react";
import SignupForm2 from "../../../components/Signup/SignupForm2";
import "./Signup.css";
import axios from "axios";
const Signup2 = ({userData, nextStep}) => {
    const email = userData.email;
    const [code, setCode] = useState(''); // 인증 코드 상태
    const [codeError, setCodeError] = useState(''); // 인증 코드 에러 메시지 상태

    // 이메일 전송 함수
    const sendEmail = async () => {
        try {
            // 이메일 전송 API 호출
            await axios.post('https://backapi.pri-pen.com/userAuthentication/email-post', {email});
            
        } catch (error) {
            setCodeError('메시지 전송 실패');
        }
    };

    // 인증 코드 확인 함수
    const verifyCode = async () => {
        try {
            // 인증 코드 확인 API 호출
            const response = await axios.post('https://backapi.pri-pen.com/userAuthentication/email-validity', { email, code });
            if(response.data.isValid){
                setCodeError('');
                nextStep();
            }
            else{
                setCodeError('유효하지 않은 코드 입니다. 다시 입력해주세요.');
            }
        } catch (error) {
            setCodeError('통신 실패');
        }
    };

    // 이메일 코드 전송 
    // 컴포넌트 마운트 시 이메일 전송
    useEffect(() => {
        sendEmail();
    }, []);

    return(
        
        <div className="Signup2">
            <SignupForm2 verifyCode={verifyCode} code={code} codeError={codeError} />
        </div>
    );
};

export default Signup2;