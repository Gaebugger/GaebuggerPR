import React, { useState } from "react";
import axios from 'axios';
import { Box, Button, Typography, Container, Divider, Input, Paper,TextField, Select, MenuItem,FormControl,InputLabel } from '@mui/material';
import { styled } from '@mui/material/styles';
import CustomizedSteppers from "../../../../components/StepIndicator/StepIndicator";
import './Step1.css';
import { CloudUpload as UploadFile } from '@mui/icons-material';

function Step1({ nextStep, infoObject, setInfoObject,setFile,file  }) {
    const { companyName, industryType, position, name, email } = infoObject;
    // Select 컴포넌트에서 선택된 값을 처리하는 함수
    const [textFieldValue, setTextFieldValue] = useState("");
    const [selectValue, setSelectValue] = useState("");
    const handleCompanyNameChange = (e) => {
        setInfoObject({
            ...infoObject,
            companyName: e.target.value
        });
    };
    const areFieldsValid = () => {
        return companyName && industryType && position && name && email && file;
    }

    const missingFields = () => {
        const fields = [];
        if (!companyName) fields.push("회사 명");
        if (!industryType) fields.push("업종");
        if (!position) fields.push("직책/직위");
        if (!name) fields.push("이름");
        if (!email) fields.push("이메일");
        if (!file) fields.push("파일");
        return fields.join(', ');
    };

      
    const handleIndustryTypeChange = (e) => {
        setInfoObject({
            ...infoObject,
            industryType: e.target.value
        });
    };
    const handlePositionChange = (e) => {
        setInfoObject({
            ...infoObject,
            position: e.target.value
        });
    };
    const handleNameChange = (e) => {
        setInfoObject({
            ...infoObject,
            name: e.target.value
        });
    };
    const handleEmailChange = (e) => {
        setInfoObject({
            ...infoObject,
            email: e.target.value
        });
    };
    const handleFileChange = (e) => {
        const chosenFile = e.target.files[0];
    
        // 파일 확장자 검사
        if (chosenFile && !chosenFile.name.endsWith('.txt')) {
            alert("오직 .txt 파일만 허용됩니다.");
            e.target.value = '';  // 파일 입력을 초기화
            return;
        }

        setFile(chosenFile);
    };
    const StyledPaper = styled(Paper)({
        padding: '30px',
        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
        borderRadius: '10px',
        margin: '100px'
    });
    


    const handleNext = async () => {
/*         const formData = new FormData();
        formData.append('checkedItems', JSON.stringify(checkedItems));
        formData.append('uploadedFile', file); */

/*         try {
            const response = await axios.post("http://localhost:8080/api/checklist/submit", formData);
            if (response.data && response.data.processId) {
                setProcessId(response.data.processId);
                console.log(response.data.processId);
                nextStep();
            } else {
                console.error("No processId received from server");
            }
        } catch (error) {
            console.error("Error sending data", error);
        } */
        nextStep();
    };

    return (
        <Container className="compact-container" style={{padding:"0px"}}>
            <CustomizedSteppers activeStep={0} />
            <Divider style={{ marginTop: '24px', opacity: 0 }} />
            <Box width="80%" mx="auto" my={4}>
                <Box mb={4}>
                    <Typography variant="h5" style={{fontFamily:"NotoSansKR-SemiBold"}} fontWeight="bold" gutterBottom>정보 입력</Typography>
                </Box>
                <Paper elevation={3} style={{ padding: '40px', borderRadius: '15px' }}>
                    <Box display="flex" flexDirection="column" alignItems="center"  mb={3}>
                        <Box display="flex" justifyContent="center" position="relative" mb={2}>
                            <div className="firm">
                                <h4 style={{ fontWeight: "bold", fontFamily: "NotoSansKR-Regular" }}>회사 정보</h4>
                                <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom="15px">
                                    <p style={{fontSize: "12px", paddingRight:"50px"}}>회사 명</p>
                                    
                                    <TextField
                                        variant="outlined"
                                        label="회사명"
                                        size="small"
                                        InputLabelProps={{ shrink: true, fontSize:"small" }}
                                        InputProps={{
                                            sx: {  
                                              fontSize: "small",
                                              fontFamily:"NotoSansKR-Regular"
                                            },
                                          }}
                                        style={{ width: '200px',fontSize: "small" }}
                                        value={companyName}
                                        onChange={handleCompanyNameChange}
                                        />
                                </Box>
                                <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom="15px">
                                    <p style={{fontSize: "12px", paddingRight:"50px"}}>업종</p>
                                    <Select
                                        variant="outlined"
                                        size="small"
                                        value={industryType} // state 값을 사용하여 현재 선택된 값을 관리해야 합니다.
                                        onChange={handleIndustryTypeChange} // 선택된 항목을 변경할 때 호출될 핸들러 함수
                                        label="업종유형"
                                        style={{ width: '200px', fontSize:"small" }}
                                    >
                                        <MenuItem value={"제조"} style={{fontSize: "small"}}>제조</MenuItem>
                                        <MenuItem value={"전기/가스/수도"} style={{fontSize: "small"}}>전기/가스/수도</MenuItem>
                                        <MenuItem value={"건설업"} style={{fontSize: "small"}}>건설업</MenuItem>
                                        <MenuItem value={"유통/물류/도소매"} style={{fontSize: "small"}}>유통/물류/도소매</MenuItem>
                                        <MenuItem value={"숙박/음식"} style={{fontSize: "small"}}>숙박/음식</MenuItem>
                                        <MenuItem value={"정보/통신"} style={{fontSize: "small"}}>정보/통신</MenuItem>
                                        <MenuItem value={"금융/보험"} style={{fontSize: "small"}}>금융/보험</MenuItem>
                                        <MenuItem value={"부동산/임대"} style={{fontSize: "small"}}>부동산/임대</MenuItem>
                                        <MenuItem value={"교육 서비스업"} style={{fontSize: "small"}}>교육 서비스업</MenuItem>
                                        <MenuItem value={"보건/복지"} style={{fontSize: "small"}}>보건/복지</MenuItem>
                                        <MenuItem value={"협회/단체"} style={{fontSize: "small"}}>협회/단체</MenuItem>
                                        <MenuItem value={"기타"} style={{fontSize: "small"}}>기타</MenuItem>

                                    </Select>
                                </Box>
                            </div>
                        </Box>
                        <Box display="flex" justifyContent="center" position="relative" mb={2} >
                            <div className="yourInfo">
                                <h4 style={{ fontWeight: "bold",fontFamily:"NotoSansKR-Regular" }}>개인정보 보호책임자</h4>
                                <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom="15px">
                                    <p style={{fontSize: "12px", paddingRight:"50px"}}>직책/직위</p>
                                    <TextField
                                        variant="outlined"
                                        InputProps={{
                                            sx: {
                                              fontSize: 12,
                                            },
                                          }}
                                        size="small"
                                        InputLabelProps={{ shrink: true }}
                                        style={{  width: '200px' }}
                                        value={position}
                                        onChange={handlePositionChange}
                                        placeholder="예) CEO, 대표이사 등"
                                    />
                                </Box>
                                <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom="15px">
                                    <p style={{fontSize: "12px", paddingRight:"50px"}}>이름</p>
                                    <TextField
                                        variant="outlined"
                                        InputProps={{
                                            sx: {
                                              fontSize: 12,
                                            },
                                          }}
                                        size="small"
                                        InputLabelProps={{ shrink: true }}
                                        style={{  width: '200px'  }}
                                        value={name}
                                        onChange={handleNameChange}
                                    />
                                </Box>
                                <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom="15px">
                                    <p style={{fontSize: "12px", paddingRight:"50px"}}>이메일</p>
                                    <TextField
                                        variant="outlined"
                                        size="small"
                                        InputProps={{
                                            sx: {
                                              fontSize: 12,
                                            },
                                          }}
                                        InputLabelProps={{ shrink: true }}
                                        style={{ width: '200px'  }}
                                        value={email}
                                        onChange={handleEmailChange}
                                    />
                                </Box>
                            </div>
                        </Box>
                    </Box>
                    <Divider style={{ margin: '20px 0' }} />
                    <div className="fileInput" style={{display: "flex",justifyContent:"space-around", alignItems: "center"}}>
                        <div className="fileinput-Info" style={{textAlign: "justify"}}>
                            <Typography variant="h6" style={{ fontFamily:'NotoSansKR-SemiBold', marginBottom: '10px' }}>
                                파일 업로드
                            </Typography>
                            <Typography variant="body2" style={{ fontFamily:'NotoSansKR-SemiBold', marginBottom: '10px', color:"#999"}}>
                                개인정보 처리방침 내용에 대한 파일을 업로드 해주세요
                            </Typography>
                        </div>
                        <Box my={4}>
                            <Button 
                                variant="outlined" 
                                color="primary" 
                                component="label"
                                startIcon={<UploadFile />}
                            >
                                파일 선택
                                <Input type="file" accept=".txt" onChange={handleFileChange} style={{ display: 'none' }} />

                                {/* inline 스타일로 'display: none'을 추가하여 숨김 처리 */}
                            </Button>
                        </Box>
                    </div>
                    {file && (
                                <Box width="100%" style={{ textAlign: 'center' }}>
                                    <Typography variant="body2" style={{ marginTop: '10px', fontFamily:"NotoSansKR-SemiBold"}}>
                                        <br/><br/>
                                    </Typography>
                                    <Typography variant="h6" style={{ fontFamily:"NotoSansKR-SemiBold"}}>
                                        {file.name}
                                    </Typography>
                                    <Typography variant="body2" style={{ fontFamily:"NotoSansKR-SemiBold"}}>
                                        <br/>
                                        선택된 파일이 이 파일이 맞는지 확인하세요!
                                        <br/><br/>
                                    </Typography>
                                </Box>
                            )}
                    <Divider style={{ margin: '20px 0' }} />

                    {!areFieldsValid() && (
                        <Box mt={1} color="red" textAlign="center" fontFamily="NotoSansKR-SemiBold">
                            다음 항목을 확인해 주세요: {missingFields()}
                        </Box>
                    )}
                    <Box mt={3} display="flex" justifyContent="flex-end">
                        <Button 
                            variant="contained" 
                            color="primary" 
                            onClick={handleNext} 
                            disabled={!areFieldsValid()}
                        >
                            다음 단계
                        </Button>
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
}

export default Step1;
