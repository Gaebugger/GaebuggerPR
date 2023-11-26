import React, { useEffect, useState } from 'react';
import { Autocomplete, TextField, Button } from '@mui/material';
import axios from 'axios';

const SignupForm3 = ({nextStep, handleChange, userData}) => {
    const [inputValue, setInputValue] = useState('');
    const [options, setOptions] = useState([]);
    const [companyAddress, setCompanyAddress] = useState('');
    const [companyExtraAddress, setCompanyExtraAddress] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [businessRegistrationFile, setBusinessRegistrationFile] = useState(null);
    useEffect(() => {
        const script = document.createElement('script');
        script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
        document.head.appendChild(script);

        if (inputValue === '') {
            setOptions([]);
            return;
        }

        const fetchCompanyData = async () => {
            try {
                console.log("inputdata is : " , inputValue);
                const response = await axios.get(`https://backapi.pri-pen.com/userAuthentication/company-search?query=${inputValue}`);
                console.log("response data is ", response.data);
                setOptions(response.data);
                console.log("options? :", options);
            } catch (error) {
                console.error('회사 정보 검색 중 오류 발생:', error);
            }
        };

        const delayDebounceFn = setTimeout(() => {
            fetchCompanyData();
        }, 500);

        return () => {
            clearTimeout(delayDebounceFn);
            document.head.removeChild(script);
        };
    }, [inputValue]);

    const handleOptionSelect = (event, value) => {
        if(value){
            console.log("value is!", value);
            setCompanyExtraAddress('');
            setPostalCode(value.companyPostCode);
            setCompanyAddress(value.companyAddress);
            setCompanyExtraAddress(value.companyExtraAddress);
        }
    }

    // Daum 우편번호 찾기 팝업 핸들러
    const handleAddressSearch = () => {
        new window.daum.Postcode({
            oncomplete: function(data) {
                setPostalCode(data.zonecode);
                setCompanyAddress(data.address);
            }
        }).open();
    };

    const handleFileChange = (event) => {
        setBusinessRegistrationFile(event.target.files[0]);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    return (
        <div style={{background:'white' , borderRadius:'50px', padding:'50px 100px 100px 100px',width: '600px', height:'85%', display:'flex', flexDirection:'column', justifyContent:'start', margin:'50px 0px 50px 0px'}}>
            
            <p style={{fontFamily:'NotoSansKR-Bold', fontSize:'1.8rem', marginBottom:'50px'}}> {userData['name']}님 안녕하세요!<br/> 회사 정보를 입력해주세요! </p>
            <div style={{marginBottom:'50px'}}>
                <p style={{fontFamily:'NotoSansKR-SemiBold', fontSize:'1.3rem'}}>회사 명</p>
                <Autocomplete
                    freeSolo
                    options={options}
                    getOptionLabel={(option) => option.companyName}
                    onChange={handleOptionSelect}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="회사명 검색"
                            variant="outlined"
                            onChange={(event) => setInputValue(event.target.value)}
                        />
                    )}
                />
            </div>

            <div style={{marginBottom:'50px'}}>
                <p style={{fontFamily:'NotoSansKR-SemiBold', fontSize:'1.3rem'}}>회사 주소</p>
                <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '50px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                        <TextField
                            style={{ marginRight: '8px' }}
                            label="우편번호"
                            value={postalCode}
                            variant="outlined"
                            readOnly
                        />
                        <Button variant="outlined" onClick={handleAddressSearch}>우편번호 찾기</Button>
                    </div>
                    <TextField
                        fullWidth
                        label="주소"
                        value={companyAddress}
                        variant="outlined"
                        margin="normal"
                        readOnly
                    />

                    <TextField
                        fullWidth
                        label="상세주소"
                        variant="outlined"
                        margin="normal"
                        value={companyExtraAddress}
                        onChange={(event) => setCompanyExtraAddress(event.target.value)}
                    />
                </div>
            </div>

            <div style={{marginBottom:'50px'}}>
                <p style={{fontFamily:'NotoSansKR-SemiBold', fontSize:'1.3rem'}}>사업자 등록증</p>
                <input
                    type="file"
                    onChange={handleFileChange}
                    style={{ marginTop: '1rem' }}
                />
            </div>
            <div style={{display:'flex' , justifyContent:'end'}}>
                <Button onClick={handleSubmit} variant="contained" color="primary" style={{ marginTop: '2rem' }}>
                    제출
                </Button>
            </div>
        </div>
    );
};

export default SignupForm3;