import React, { useEffect, useState,useReducer } from 'react';
import { Box, Typography, Container, Divider, Paper, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import '../compactContainer.css';
import CustomizedSteppers from "../../../../components/StepIndicator/StepIndicator";
import './Step3.css';
import axios from "axios";
import Loading from '../../../../components/animation/Loading';
import apiResponseReducer from "../apiResponseReducer";
import LoadingEnd from '../../../../components/animation/LoadingEnd';

const StyledPaper = styled(Paper)({
    padding: '30px',
    borderRadius: '10px',
});

function Step3({ nextStep, processId,dispatch,apiResponse }) {

    const [loadingComplete, setLoadingComplete] = useState(false);
    useEffect(() => {
        // SSE 연결 설정
        // 로컬:http://localhost:8080/api/check-response/${processId}
        //http://www.pri-pen.com/api/check-response/${processId}
        const sse = new EventSource(`http://localhost:8080/api/check-response/${processId}`, { withCredentials: true });

        //const sse = new EventSource(`https://backapi.pri-pen.com/api/check-response/${processId}`, { withCredentials: true });

        // data 이벤트를 통해 ApiResponseDTO 데이터 수신
        sse.addEventListener('data', event => {
            const responseData = JSON.parse(event.data);

            // responseData를 사용하여 필요한 처리 수행
            console.log("Received data:", responseData);  // 출력문 추가

            // 데이터를 reducer에 전달하여 상태 업데이트
            dispatch({ type: 'SET_DATA', payload: responseData });
            // 점수 계산
        });

        sse.onmessage = event => {
            try {
                const messageData = JSON.parse(event.data);
                if (messageData && messageData.completed) {
                    console.log("Processing completed!");  // 작업 완료 메시지 출력
                    setLoadingComplete(true);
                    sse.close();  // SSE 연결 종료
                }
            } catch (error) {
                // 여기서는 오류를 무시. 오류가 발생한 경우는 "data" 이벤트에 대한 데이터를 파싱하려고 시도했을 때
            }
        };

        // 에러가 발생하면 연결 종료
        sse.onerror = (error) => {
            console.error("SSE error:", error);
            sse.close();
        };

        // 컴포넌트 언마운트 시 연결 종료
        return () => sse.close();
    }, []);

    return (
        <Container className="compact-container" style={{padding:"0px"}}>
            <CustomizedSteppers activeStep={2} />
            <StyledPaper elevation={3}>
                <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" >
                    {!loadingComplete ? (
                        <>
                            <Loading />
                            <Typography variant="h6" style={{ height:'250px' , position: 'absolute', marginTop: '1px', color: '#333', fontFamily: 'NotoSansKR-Black', animation: 'blink 3s infinite' }}>
                                진단 중입니다. 평균적으로 3~5분정도 소모되니 잠시만 기다려주세요.
                            </Typography>
                        </>
                    ) : (
                        <div className="after-acting" style={{display:"flex", justifyContent:"center", alignContent: "center",alignItems:"center", flexDirection:"column"}}>
                            <LoadingEnd />
                            <Typography variant="h6" style={{ height:'100px' , marginTop: '1px', color: '#333', fontFamily: 'NotoSansKR-Black', animation: 'blink 3s infinite' }}>
                                진단이 완료되었습니다. 결과를 바로 확인해보세요!
                            </Typography>
                            <Button
                                className="custom-button"
                                onClick={nextStep}
                                sx= {{
                                    fontSize: "24px",
                                    color:"white",
                                    fontFamily:"NotoSansKR-SemiBold",
                                    marginTop:"-10px",
                                    borderRadius:"20px",
                                    padding:"5px 15px",

                                }}
                            >
                                결과 확인
                            </Button>
                        </div>
                    )}
                </Box>
            </StyledPaper>
        </Container>
    );
}

export default Step3;
