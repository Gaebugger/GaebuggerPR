import React, { useEffect, useState } from 'react';
import { Autocomplete, TextField, Button,Modal, Divider } from '@mui/material';
import axios from 'axios';
import SignupForm3Duplication from './SignupForm3Duplication';

const SignupForm3 = ({nextStep, userData,setUserData}) => {
    const [options, setOptions] = useState([]);

    const [companyId,setCompanyId] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [companyAddress, setCompanyAddress] = useState('');
    const [companyExtraAddress, setCompanyExtraAddress] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [businessRegistrationFile, setBusinessRegistrationFile] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);


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
                setOptions([]);
                setOptions(response.data);
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
            console.log("CompanyExtraAddress is ", companyExtraAddress);
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
    const handleModalClose = () => {
        setIsModalOpen(false);
    };
    const createCompanyData = async () => {
        // 서버에 데이터 전송
        const payload = {
            companyName: inputValue, // 사용자가 입력한 회사명
            companyAddress: companyAddress,
            companyExtraAddress: companyExtraAddress,
            companyPostCode: postalCode,
            companyBusinessRegistration: businessRegistrationFile // 파일이나 파일의 데이터
        };

        try {
            const response = await axios.post(`https://backapi.pri-pen.com/userAuthentication/company-create`, payload);
            // id 가져와서 user setting
            const newCompanyId = response.data.companyId;
            setUserData({...userData, companyId: newCompanyId});
            nextStep();
            // 성공 시 응답 처리
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        
        if (options.length > 0) {
            setIsModalOpen(true);
        } else {
            createCompanyData();
        }
    };

    return (
        <div style={{background:'white' , borderRadius:'50px', padding:'50px 100px 100px 100px',width: '600px', height:'85%', display:'flex', flexDirection:'column', justifyContent:'start', margin:'50px 0px 50px 0px'}}>

            <p style={{fontFamily:'NotoSansKR-SemiBold', fontSize:'1.8rem', marginBottom:'50px'}}> {userData['name']}님 안녕하세요!<br/> 회사 정보를 입력해주세요! </p>
            <Divider style={{marginBottom:'10px'}}/>
            <div style={{marginBottom:'50px'}}>
                <div style={{ display: 'flex', flexDirection: 'row',margin:'20px 0 30px' }}>
                    <p style={{ fontFamily: 'NotoSansKR-SemiBold', fontSize: '1.3rem', margin: 0 }}>
                        회사 명
                    </p>
                    <span style={{ color: 'orange', marginLeft: '5px' }}>*</span>
                </div>
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
                <div style={{ display: 'flex', flexDirection: 'row', margin:'20px 0 30px'}}>
                    <p style={{fontFamily:'NotoSansKR-SemiBold', fontSize:'1.3rem',margin:0}}>회사 주소</p>
                    <span style={{ color: 'orange', marginLeft: '5px' }}>*</span>
                </div>
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
                        value={companyExtraAddress || ''}  // null값일 경우 처리
                        onChange={(event) => setCompanyExtraAddress(event.target.value)}
                    />
                </div>
            </div>

            <div style={{marginBottom:'50px'}}>
                <p style={{fontFamily:'NotoSansKR-SemiBold', fontSize:'1.3rem'}}>사업자 등록증 (선택)</p>
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
                <Modal
                    open={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                >
                    <SignupForm3Duplication nextStep={nextStep} handleModalClose={handleModalClose} options={options} setOptions={setOptions} createCompanyData={createCompanyData} userData={userData} setUserData={setUserData} />
                </Modal>
            </div>
        </div>
    );
};

export default SignupForm3;