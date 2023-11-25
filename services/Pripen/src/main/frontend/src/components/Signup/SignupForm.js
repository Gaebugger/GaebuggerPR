import React, { useState,useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MuiLink from '@mui/material/Link';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignupForm = ({nextStep, handleChange}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [isCheckingEmail, setIsCheckingEmail] = useState(false);

    const checkEmailDuplicate = async () => {
        if (!email) {
            setEmailError("이메일을 입력해주세요.");
            return;
        }
    
        setIsCheckingEmail(true);
        try {
            const response = await axios.get(`https://backapi.pri-pen.com/userAuthentication/check-email?email=${encodeURIComponent(email)}`);
            
            if (response.data.isAvailable) {
                setEmailError("사용 가능한 이메일입니다.");
                console.log("possible!");
            } else {
                setEmailError("이미 사용 중인 이메일입니다.");
                console.log("impossible!");
            }
        } catch (error) {
            setEmailError("이메일 확인 중 오류가 발생했습니다.");
            console.log("error!!");
        }
        setIsCheckingEmail(false);
    };
    // 비밀번호 조건 검증
    const validatePassword = (password) => {
        const regex = /^(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,20}$/;
        return regex.test(password);
    }

    // 비밀번호 변경 핸들러
    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        if (newPassword.length === 0) {
            setPasswordError("");
        } else if (!validatePassword(newPassword)) {
            setPasswordError("최소 8자, 최대 20자, 특수문자 (!@#$%^&*()_+) 포함");
        } else {
            setPasswordError("");
        }
    }

    // 비밀번호 확인 변경 핸들러
    const handleConfirmPasswordChange = (e) => {
        const newConfirmPassword = e.target.value;
        setConfirmPassword(newConfirmPassword);
        if (newConfirmPassword.length === 0) {
            setConfirmPasswordError("");
        } else if (newConfirmPassword !== password) {
            setConfirmPasswordError("비밀번호가 일치하지 않습니다.");
        } else {
            setConfirmPasswordError("");
        }
    }

    const handleSignup = async () => {
        if (!email || !password || !username || !confirmPassword) {
            setErrorMessage("모든 필드를 채워주세요.");
            return;
        }
        if (password !== confirmPassword) {
            setErrorMessage("비밀번호가 일치하지 않습니다.");
            return;
        }
        setErrorMessage(null);
        nextStep();
    };
    // 모든 조건을 확인하는 함수
    const checkFormValidity = () => {
        return (
            email.length > 0 &&
            emailError === "사용 가능한 이메일입니다." &&
            username.length > 0 &&
            validatePassword(password) &&
            password === confirmPassword
        );
    };
    // 입력 필드 변경 시 조건 확인
    useEffect(() => {
        setIsFormValid(checkFormValidity());
    }, [email, emailError, username, password, confirmPassword]);

    return (
        <Box sx={{
            width: '300px',
            padding: '40px',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
            borderRadius: '10px',
            display: 'flex',
            flexDirection: 'column',
            gap: '30px'
        }}>
            <Typography variant="h5" component="div" fontFamily="NotoSansKR-Bold">
                회원가입
            </Typography>
            <TextField
                label="테스트"
                variant="outlined"
                size="small"
                fullWidth
                onChange={handleChange('name')}
                sx={{ marginBottom: '5px', fontFamily:"NotoSansKR-Bold"  }}
            />
            <TextField
                label="사용자 이름"
                variant="outlined"
                size="small"
                fullWidth
                onChange={(e) => {
                    setUsername(e.target.value);
                    handleChange('name')(e);
                }}
                sx={{ marginBottom: '5px', fontFamily:"NotoSansKR-Bold"  }}
            />
            <div>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <TextField
                        label="이메일"
                        variant="outlined"
                        size="small"
                        fontFamily="NotoSansKR-Regular"
                        fullWidth
                        onChange={(e) => {
                            setEmail(e.target.value)
                            setEmailError('');
                            handleChange('email')(e); // handleChange 함수 호출
                        }}
                        sx={{ marginBottom: '5px' }}
                    />
                    <Button
                        variant="outlined"
                        onClick={checkEmailDuplicate}
                        disabled={isCheckingEmail}
                        sx={{fontSize:"0.8rem",padding:'2px', height:'40px', bottom:'1.5px'}}
                    >
                        중복 확인
                    </Button>
                </Box>
                <Typography
                    style={{
                        color: emailError === "사용 가능한 이메일입니다." ? "green" : "red",
                        fontFamily: "NotoSansKR-SemiBold",
                        fontSize: '0.8rem',
                        marginLeft:"10px"
                    }}
                >
                    {emailError}
                </Typography>
            </div>
            <div>
                <div>
                    <TextField
                        label="비밀번호"
                        type="password"
                        onChange={(e) => {
                            handlePasswordChange(e); // 비밀번호 유효성 검사 등을 수행하는 기존 함수
                            handleChange('password')(e); // 비밀번호 상태를 업데이트하는 함수
                        }}
                        fullWidth
                        sx={{ marginBottom: '5px' }}
                        variant="outlined"
                        size="small"
                        fontFamily="NotoSansKR-Regular"
                    />
                    <Typography color={passwordError ? 'error' : passwordError === "" ? 'inherit' : 'green'} style={{fontFamily:"NotoSansKR-SemiBold", fontSize:"0.8rem",marginLeft:"5px"}}>
                        {passwordError || (password && "비밀번호 조건 충족")}
                    </Typography>
                </div>
                <div style={{marginTop:"15px"}}>
                    <TextField
                        label="비밀번호 확인"
                        variant="outlined"
                        size="small"
                        fontFamily="NotoSansKR-Regular"
                        type="password"
                        fullWidth
                        onChange={handleConfirmPasswordChange}
                    />
                    <Typography color={confirmPasswordError ? 'error' : confirmPasswordError === "" ? 'inherit' : 'green'} style={{fontFamily:"NotoSansKR-SemiBold", fontSize:"0.8rem",marginLeft:"5px"}}>
                        {confirmPasswordError || (confirmPassword && password === confirmPassword && "비밀번호 일치")}
                    </Typography>

                    <Typography
                        color="error"
                        style={{
                            height: '20px',
                            visibility: errorMessage ? 'visible' : 'hidden'
                        }}
                    >
                        {errorMessage}
                    </Typography>
                </div>
            </div>
            <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ fontFamily: "NotoSansKR-Bold", fontSize: '1.2rem' }}
                onClick={handleSignup}
                disabled={!isFormValid}  // 버튼 활성화 조건
            >
                다음
            </Button>

            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: '10px',
                marginTop: '20px'
            }}>
                <Typography style={{fontFamily:"NotoSansKR-SemiBold"}}> 이미 계정이 있으신가요?</Typography>
                <MuiLink
                    component={RouterLink}
                    to="/login"
                    color="primary"
                    fontFamily="NotoSansKR-SemiBold"
                    sx={{
                        textDecoration:"none",
                        '&:hover': {
                            fontWeight: 'bold',
                            color: 'secondary.main'
                        }
                    }}
                >
                    로그인
                </MuiLink>
            </Box>
        </Box>
    );
}

export default SignupForm;
