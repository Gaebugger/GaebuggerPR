import React, { useState } from 'react';
import DropdownComponent from '../../../../components/select/select';
import { Box, Typography, Divider, Container,Paper, Button  } from '@mui/material';
import CustomizedSteppers from '../../../../components/StepIndicator/StepIndicator';
import {styled} from '@mui/material/styles';
import axios from 'axios';
import '../../../../assets/fonts/fonts.css';
import './Step2.css';
import axiosInstance from '../../../../api/axiosInstance';
function Step2({ nextStep, prevStep, setCheckedItems, checkedItems, setProcessId,infoObject,file  }) {
    console.log("infoObject is:",infoObject);
    const StyledPaper = styled(Paper)({
        padding: '30px',
        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)', // 부드러운 그림자
        borderRadius: '10px', // 둥근 모서리
    });

    const getCsrfToken = async () => {
        const response = await axios.get('https://www.pri-pen.com/csrf-token');
        console.log("csrftoken is get!");
        console.log(response);
        return response.data;
    }

    const StyledButton = styled(Button)({
        backgroundColor: '#007BFF', // 버튼의 주색상
        '&:hover': {
            backgroundColor: '#0056b3' // 호버 시 색상
        }
    });

    const handleDropdownChange = (selectedOption, item) => {
        setCheckedItems(prevState => ({
            ...prevState,
            [item.id]: selectedOption.value
        }));
    };

    const items = [
        { id: 1, text: '제목 및 서문', type: 'text', default: '필수기재'},
        { id: 2, text: '개인정보 처리목적', type: 'text', default: '필수기재' },
        { id: 3, text: '개인정보의 처리 및 보유 기간 작성', type: 'text', default: '필수기재' },
        { id: 4, text: '처리하는 개인정보의 항목', type: 'text', default: '필수기재' },
        { id: 5, text: '만 14세 미만 아동의 개인정보 처리에 관한 사항', type: 'checkbox', options: ['기재', '기재안함'] },
        { id: 6, text: '개인정보의 제3자 제공에 관한 사항', type: 'checkbox', options: ['기재', '기재안함'] },
        { id: 7, text: '개인정보 처리업무의 위탁에 관한 사항', type: 'checkbox', options: ['기재', '기재안함'] },
        { id: 8, text: '개인정보의 국외 이전에 관한 사항', type: 'checkbox', options: ['기재', '기재안함'] },
        { id: 9, text: '개인정보의 파기 절차 및 방법에 관한 사항', type: 'text', default: '필수기재' },
        { id: 10, text: '미이용자의 개인정보 파기 등에 관한 조치', type: 'checkbox', options: ['기재', '기재안함'] },
        { id: 11, text: '정보주체와 법정대리인의 권리·의무 및 행사방법에 관한 사항', type: 'text', default: '필수기재' },
        { id: 12, text: '개인정보의 안전성 확보조치에 관한 사항', type: 'text', default: '필수기재' },
        { id: 13, text: '개인정보를 자동으로 수집하는 장치의 설치·운영 및 그 거부에 관한 사항',type: 'checkbox', options: ['기재', '기재안함'] },
        { id: 14, text: '행태정보의 수집·이용·제공 및 거부 등에 관한 사항', type: 'checkbox', options: ['기재', '기재안함'] },
        { id: 15, text: '추가적인 이용·제공 관련 판단 기준', type: 'checkbox',options: ['기재', '기재안함'] },
        { id: 16, text: '가명정보 처리에 관한 사항', type: 'checkbox', options: ['기재', '기재안함'] },
        { id: 17, text: '개인정보 보호책임자에 관한 사항', type: 'text', default: '필수기재' },
        { id: 18, text: '국내대리인 지정에 관한 사항', type: 'checkbox', options: ['기재', '기재안함'] },
        { id: 19, text: '개인정보의 열람청구를 접수·처리하는 부서', type: 'checkbox', options: ['기재','기재안함'] },
        { id: 20, text: '정보주체의 권익침해에 대한 구제방법', type: 'checkbox', options: ['기재', '기재안함'] },
        { id: 21, text: '영상정보처리기기 운영·관리에 관한 사항', type: 'checkbox', options: ['기재', '기재안함'] },
        { id: 22, text: '개인정보 처리방침의 변경에 관한 사항', type: 'text', default: '필수기재' }
    ];

    const allItemsChecked = () => {
        // type이 'checkbox'인 items 항목들 중 checkedItems에 없거나 선택되지 않은 항목들을 반환합니다.
        const uncheckedItems = items.filter(item => item.type === 'checkbox' && !checkedItems[item.id]);
        return uncheckedItems.length === 0; // uncheckedItems의 길이가 0이면 모든 항목이 선택된 것입니다.
    }
    
    const uncheckedItemsList = () => {
        // 선택되지 않은 항목들을 반환합니다.
        return items.filter(item => item.type === 'checkbox' && !checkedItems[item.id]);

    }

    const handleNextStep = async () => {
    
        // const csrfToken = await getCsrfToken();
        // const headers = {
        //     'X-CSRF-TOKEN': csrfToken,
        //     'Content-Type': 'multipart/form-data' // formData를 사용할 때 필요합니다.
        // };
        
        // 체크박스가 아닌 항목의 id와 '기재'로 선택된 체크박스 항목의 id를 합쳐서 새로운 배열을 생성합니다.
        const nonCheckboxIds = items.filter(item => item.type !== 'checkbox').map(item => item.id - 1);
        const checkedIds = Object.keys(checkedItems)
            .filter(key => checkedItems[key] === '기재')
            .map(key => parseInt(key) - 1);
    
        let combinedIds = [...nonCheckboxIds, ...checkedIds];
        combinedIds.sort((a, b) => a - b);
    
        console.log("Combined IDs are:", combinedIds);
        console.log("infoObject is:", infoObject);
        console.log("file is:", file);
    
        const formData = new FormData();
        formData.append('file', file);
        formData.append('data', JSON.stringify({
            checkedItems: combinedIds,
            infoData: infoObject
        }));
    
        try {
            //const response = await axios.post('http://localhost:8080/api/start', formData);
            const response = await axios.post('https://backapi.pri-pen.com/api/start', formData);
            if (response.status === 200) {
                console.log("my process id is:", response.data.processID);
                setProcessId(response.data.processID);
                nextStep();
            } else {
                console.error("Failed to send data to the backend.");
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    };
    return (
        <Container className="compact-container" style={{padding:"0px"}}>
            <CustomizedSteppers activeStep={1} />
            <div className="instruction" style={{ height: '200px' }}>해당하는 기재사항을 체크해주세요</div> {/* 20 px 여백을 실제로 추가 */}
            <StyledPaper elevation={3} style={{margin:"20px"}}>

                <div style={{display:"flex", justifyContent:"flex-end", flexDirection:"column", textAlign:"end"}}>
                    <h3 style={{fontFamily:"NotoSansKR-Bold", color:"Black"}}>
                    <span style={{ fontWeight: "bold", fontSize: "1.4em",color:"black" }}>*</span>
                        처리하는 항목일 시 필수 기재</h3>
                </div>
                <Box display="flex" alignItems="center" my={3} >
                    <Box width={60} marginRight={4}>
                        <Typography variant="h6" color="textSecondary" style={{ fontFamily: 'NotoSansKR-Bold, sans-serif' }}>번호</Typography>
                    </Box>
                    <Box flex={1.5} marginRight={4}>
                        <Typography variant="h6" color="textSecondary" style={{ fontFamily: 'NotoSansKR-Bold, sans-serif' }} >내용</Typography>
                    </Box>
                    <Box flex={0.25} justifyContent="flex-end" alignItems="center">
                        <Typography variant="h6" color="textSecondary" style={{ fontFamily: 'NotoSansKR-Bold, sans-serif' }}>선택</Typography>
                    </Box>
                </Box>
                <Divider style={{ marginBottom: '20px' }} />
                {items.map(item => (
                    item.type === 'checkbox' ? (
                        <Box key={item.id} display="flex" justifyContent="center" alignItems="center" my={4}>
                            <Box width={60} marginRight={4}>
                                <Typography variant="h6" style={{ fontFamily: 'NotoSansKR-Bold, sans-serif' }}>{item.id}</Typography>
                            </Box>
                            <Box flex={1} marginRight={2}>
                                <Typography variant="body1" style={{ fontFamily: [6, 7, 13, 14, 15, 16, 18].includes(item.id) ? 'NotoSansKR-Black, sans-serif' : 'NotoSansKR-Medium, sans-serif' }}>
                                    {[6, 7, 13, 14, 15, 16, 18].includes(item.id) ? `* ${item.text}` : item.text}
                                </Typography>
                            </Box>
                            <Box flex={1} display="flex" justifyContent="flex-end" alignItems="center">
                                <DropdownComponent 
                                    options={item.options.map(opt => ({ label: opt, value: opt }))}
                                    onChange={(selectedOption) => handleDropdownChange(selectedOption, item)}
                                    value={checkedItems[item.id] ? { label: checkedItems[item.id], value: checkedItems[item.id] } : null}
                                    setCheckedItems={setCheckedItems}
                                    item={item}
                                />
                            </Box>
                        </Box>
                    ) : (
                        <Box key={item.id} display="flex" justifyContent="center" alignItems="center" my={4}>
                            <Box width={60} marginRight={4}>
                                <Typography variant="h6" style={{ fontFamily: 'NotoSansKR-Bold, sans-serif' }}>{item.id}</Typography>
                            </Box>
                            <Box flex={1} marginRight={2}>
                                <Typography variant="body1" style={{ fontFamily: 'NotoSansKR-Medium, sans-serif' }}>{item.text}</Typography>
                            </Box>
                            <Box flex={0.17} display="flex" alignItems="center">
                                <Typography variant="body1" style={{ fontFamily: 'NotoSansKR-Regular, sans-serif' }}>{item.default}</Typography>
                            </Box>
                        </Box>
                    )
                ))}

                <Divider style={{ marginTop: '20px' }} />
                <Box mt={3} display="flex" justifyContent="space-between">
                    <Button variant="outlined" color="primary" onClick={prevStep}>
                        이전 단계
                    </Button>

                    { !allItemsChecked() && (
                        <Box mt={1} color="red" textAlign="center">
                            <Typography variant="body1" fontFamily="NotoSansKR-SemiBold">
                                다음 사항을 선택해 주세요: 
                                <br/>
                                {uncheckedItemsList().map((item, index) => (
                                    <span key={item.id}>
                                        {item.id}{index !== uncheckedItemsList().length - 1 ? ', ' : ''}
                                    </span>
                                ))}
                            </Typography>
                        </Box>
                    )}
                    <StyledButton 
                        variant="contained" 
                        color="primary" 
                        onClick={handleNextStep} 
                        disabled={!allItemsChecked()}
                    >
                        진단 시작
                    </StyledButton>
                </Box>
            </StyledPaper>
        </Container>
    );

}

export default Step2;
