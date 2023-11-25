import React,{useState,useEffect} from "react";
import { Box,TextField,Button, Typography } from "@mui/material";

const SignupForm2 = ({nextStep, verifyCode, codeError}) =>{
    const [code, setCode] = useState('');

    const handleCodeChange = (e) => {
        // 입력된 값을 대문자로 변환하고, 영문자와 숫자만 허용
        const uppercaseCode = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
        setCode(uppercaseCode);
    };

    const handleSubmit = () => {
        verifyCode(code);
    };
    useEffect(() => {
        if (codeError) {
            console.log(codeError);
        }
    }, [codeError]);
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            backgroundColor: 'white',
            borderRadius: '10px',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)'
        }}>
            <TextField
                label="인증 코드"
                variant="outlined"
                value={code}
                onChange={handleCodeChange}
                sx={{ marginBottom: '10px' }}
            />
            <Button variant="contained" onClick={handleSubmit}>
                확인
            </Button>
            {codeError && (
                <Typography color="error">
                    {codeError}
                </Typography>
            )}
        </Box>
    );
};

export default SignupForm2;