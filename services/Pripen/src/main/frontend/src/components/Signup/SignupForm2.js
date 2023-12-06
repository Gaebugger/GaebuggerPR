import React,{useState,useEffect,useRef} from "react";
import { Box,TextField,Button, Typography } from "@mui/material";

const SignupForm2 = ({verifyCode, codeError}) =>{
    const codeLength = 6;
    const [code, setCode] = useState(Array(codeLength).fill(''));
    const textFields = useRef([]);


    const handleCodeChange = (index) => (e) => {
        const newCode = [...code];
        // 입력된 값을 대문자로 변환하고, 영문자와 숫자만 허용
        newCode[index] = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');

        setCode(newCode);
        console.log("Updated real Code:  ", code);

        // 다음 입력 필드로 자동 포커스 이동
        if (index < codeLength - 1 && e.target.value) {
            textFields.current[index + 1].focus();
        }
    };

    const handleSubmit = () => {
        verifyCode(code.join(''));
    };
    useEffect(() => {
        if (codeError) {
            console.log(codeError);
        }
    }, [codeError]);
    useEffect(() => {
        textFields.current[0].focus();
    }, []);
    return (
        <div style={{background:'white' , borderRadius:'50px', padding:'50px 100px 100px 100px',width: '600px', display:'flex', flexDirection:'column', justifyContent:'start', margin:'50px 0px 50px 0px'}}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px',
                backgroundColor: 'white',
                borderRadius: '10px',
            }}>
                <Typography style={{fontFamily: 'NotoSansKR-Bold', fontSize:'1.3rem'}}>이메일로 인증코드를 전송하였습니다.</Typography>
                <Typography style={{fontFamily: 'NotoSansKR-Bold', fontSize:'1.3rem'}}>수신된 인증코드를 입력해주세요!</Typography>
                <div style={{display:"flex", flexDirection:'row',margin:'20px 0 20px'}}>
                    {Array.from({ length: codeLength }, (_, i) => (
                        <TextField
                            key={i}
                            value={code[i]}
                            onChange={handleCodeChange(i)}
                            inputProps={{ maxLength: 1, style: { textAlign: 'center' } }}
                            sx={{ width: '3em', margin: '0 4px' }}
                            inputRef={(el) => (textFields.current[i] = el)}
                        />
                    ))}
                </div>
                <Button variant="contained" onClick={handleSubmit}>
                    확인
                </Button>
                {codeError && (
                    <Typography color="error">
                        {codeError}
                    </Typography>
                )}
            </Box>
        </div>
    );
};

export default SignupForm2;