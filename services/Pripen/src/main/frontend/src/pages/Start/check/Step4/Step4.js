import React, { useEffect, useState,useRef } from 'react';
import {  Typography, Paper, Box, Divider, List, ListItem, Container, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import BarChartComponent from '../../../../components/bargraph/BarChartComponent';
import PieChartComponent from '../../../../components/piechart/PieChartComponent';
import ResultBoxSection from '../../../../components/ResultBox/ResultBoxSection';
import ScoreDisplay from '../../../../components/scoredisplay/ScoreDisplay';
import NonConformityCheck from '../../../../components/NonConformityCheck/NonConformityCheck';
import '../compactContainer.css';
import './Step4.css';
import '../../../../assets/fonts/fonts.css';    
import CustomizedSteppers from '../../../../components/StepIndicator/StepIndicator';
import { StyledPaper } from '../Guideline_detail/styles/ComponentStyles';
import { useCanvas } from "../../CanvasProvider";
import ResultScore from '../../../../components/resultscore/ResultScore';
function Step4({ processId, nextStep,responseData,infoObject }) {
    const containerRef = useRef(null); // 컨테이너 참조
    const { captureCanvas } = useCanvas();

    // 임의의 테스트 데이터
    const mockServerData = {
        processId: responseData.process_Id,
        industryType: infoObject['companyName'],
        lawViolate: responseData.process_Law_Violate,
        lawDanger: responseData.process_Law_Danger,
        guideViolate: responseData.process_Guide_Violate,
        omissionParagraph: responseData.process_Omission_Paragraph,
        omissionParagraphScore: responseData.process_Issues.reduce((acc, issue) => {
            if (issue.issue_type === "기재 항목 누락") {
              return acc + issue.issue_score;
            }
            return acc;
          }, 0), 
        type: infoObject['industryType'],
        score: responseData.process_Score
    };
    const transformedIssues = responseData.process_Issues
        .filter(issue => issue.issue_type !== "기재 항목 누락")  // "기재 항목 누락"이 아닌 이슈만 필터링
        .map(issue => {  
            return {
                id: issue.issue_id,
                type: issue.issue_type,  
                startIndex: issue.issue_startIndex,
                endIndex: issue.issue_endIndex
            };
        });
    const omissionParagraphIssues = responseData.process_Issues
        .filter(issue => issue.issue_type === "기재 항목 누락")
        .map(issue =>{
            return{
                id: issue.issue_id,
                type: issue.issue_type,
                content: issue.issue_content,
            };
        });

    const extractedData = {
        content: responseData.process_Original,
        issues: transformedIssues
    };

    const IndustryTypeAverage={
        allType:{
            lawViolate: 3,
            lawDanger: 2,
            guideViolate:1
        },
        "제조":{
            lawViolate:2,
            lawDanger:4,
            guideViolate:3
        },
        "전기/가스/수도":{
            lawViolate:4,
            lawDanger:3,
            guideViolate:2
        },
        "건설업":{
            lawViolate:2,
            lawDanger:4,
            guideViolate:2
        },
        "유통/물류/도소매":{
            lawViolate:2,
            lawDanger:1,
            guideViolate:7
        },
        "숙박/음식":{
            lawViolate:1,
            lawDanger:3,
            guideViolate:4
        },
        "정보/통신":{
            lawViolate:0,
            lawDanger:6,
            guideViolate:3
        },
        "금융/보험":{
            lawViolate:2,
            lawDanger:3,
            guideViolate:9
        },
        "부동산/임대":{
            lawViolate:5,
            lawDanger:2,
            guideViolate:5
        },
        "교육 서비스업":{
            lawViolate:1,
            lawDanger:1,
            guideViolate:3
        },
        "보건/복지":{
            lawViolate:1,
            lawDanger:0,
            guideViolate:7
        },
        "협회/단체":{
            lawViolate:1,
            lawDanger:3,
            guideViolate:5
        },
        "기타":{
            lawViolate:1,
            lawDanger:4,
            guideViolate:5
        },
    };
    const [serverData] = useState(mockServerData);

/*     const [serverData, setServerData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/check-response/${processId}`);
                if (response.status === 200) {
                    setServerData(response.data);
                }
            } catch (error) {
                console.error("Error fetching processed data", error);
            }
        };

        fetchData();
    }, [processId]);

    if (!serverData) return <Container className="compact-container">Loading...</Container>;

    const itemsArray = serverData.checkedItems; */


    const graphData = [
        {
            name: '법률 위반',
            사용자: serverData['lawViolate'],
            사용자유형: serverData['type'],
            전체평균: IndustryTypeAverage.allType.lawViolate,
            사용자업종평균: IndustryTypeAverage[serverData['type']].lawViolate
        },
        {
            name: '법률 위반 위험',
            사용자: serverData['lawDanger'],
            사용자유형: serverData['type'],
            전체평균: IndustryTypeAverage.allType.lawDanger,
            사용자업종평균: IndustryTypeAverage[serverData['type']].lawDanger
        },
        {
            name: '작성지침 미준수',
            사용자: serverData['guideViolate'],
            사용자유형: serverData['type'],
            전체평균: IndustryTypeAverage.allType.guideViolate,
            사용자업종평균: IndustryTypeAverage[serverData['type']].guideViolate
        }
    ];
    // '#d32f2f', '#ff9800', '#ffeb3b', 'purple', '#00CC00'
    const pieData = [
        {
            "id": "법률 위반",
            "label": "법률 위반",
            "value": serverData['lawViolate'],
            "color": "#d32f2f",
        },
        {
            "id": "법률 위반 위험",
            "label": "법률 위반 위험",
            "value": serverData['lawDanger'],
            "color": "#ff9800",
        },
        {
            "id": "작성지침 미준수",
            "label": "작성지침 미준수",
            "value": serverData['guideViolate'],
            "color": "#ffeb3b",
        },
        {
            "id" : "기재 항목 누락",
            "label": "기재 항목 누락",
            "value": serverData['omissionParagraph'],
            "score": serverData['omissionParagraphScore'],
            "color": "#9370db"
        }
    ];
    // useEffect(() => {
    //     const handleScroll = () => {
    //       // 전체 문서의 높이
    //       const docHeight = document.documentElement.scrollHeight;
    //       // 현재 스크롤된 높이
    //       const scrollTop = document.documentElement.scrollTop;
    //       // 브라우저 창의 높이
    //       const clientHeight = document.documentElement.clientHeight;
    //       // 스크롤된 비율 계산
    //       const scrollPercent = (scrollTop / (docHeight - clientHeight)) * 100;
      
    //       // 스크롤이 60% 이상이면 동작 실행
    //       if (scrollPercent >= 60) {
    //         captureCanvas('section1', 4);
    //         captureCanvas('section2', 4);
    //         captureCanvas('section3', 4);
    //       }
    //     };
      
    //     // 이벤트 리스너 등록
    //     window.addEventListener('scroll', handleScroll);
      
    //     // 컴포넌트 언마운트 시 이벤트 리스너 제거
    //     return () => {
    //       window.removeEventListener('scroll', handleScroll);
    //     };
    //   }, [captureCanvas]);
    const total = pieData.reduce((acc, data) => acc + data.value, 0);

    return (
        <Container className="compact-container" ref={containerRef} style={{padding:"0px"}}>
            <CustomizedSteppers activeStep={3} />
            {/* 다양한 항목들 */}
            <div className="results" style={{margin:"20px"}}>
                <div className="estimate_userFile" style={{marginBottom: "200px"}}>
                    <h1 style={{marginLeft:'20px', fontFamily: "NotoSansKR-SemiBold"}}>대시보드</h1>
                    <Divider style={{marginBottom:'30px'}} />
                    <StyledPaper>
                        <ResultBoxSection serverData={serverData}/>
                        <Divider style={{margin: "50px", opacity:0}} />
                        <h2 style={{marginLeft:'20px', fontFamily: "NotoSansKR-Medium"}}>점수</h2>
                        <Divider style={{marginBottom:'10px'}} />
                        <h3 style={{ marginLeft: "25px", fontFamily: "NotoSansKR-Medium", color: "#999" }}>
                            <span style={{ fontWeight: "bold", fontSize: "1.2em",color:"black" }}>{serverData['industryType']}</span>님의 개인정보 처리방침 진단 결과를 토대로 계산한 점수입니다.
                        </h3>
                        <div className="score-whyscore" style={{borderRadius: '10px',backgroundColor: "#ffffff", border: '3px solid #F2F2F2',marginTop:"40px", marginLeft:"20px",marginRight:"20px"}}>
                            <ResultScore data={serverData} pieData={pieData} total={total} />  
                        </div>
                    </StyledPaper>
                    <Divider style={{marginBottom:"20px",opacity:0}} />
                </div>

                <div className="average-bargraph" style={{display:"flex", flexDirection:"column"}}>
                    <h1 style={{marginLeft:'20px', fontFamily: "NotoSansKR-SemiBold"}}>업종 내 평균 비교 확인</h1>
                    <Divider style={{marginBottom:'10px'}} />
                    <h3 style={{ marginLeft: "25px", fontFamily: "NotoSansKR-Medium", color: "#999" }}>
                            <span style={{ fontWeight: "bold", fontSize: "1.2em",color:"black" }}>{serverData['industryType']}</span>님의 결과와 업종 평균 값과 비교해 보세요
                    </h3>
                    <Divider style={{marginBottom:'20px',opacity:0}} />
                    <BarChartComponent data={graphData} />
                </div>
                <Divider style={{margin: "100px", opacity:0}} />

                {/* 여기 부적합요소 확인 스크롤 보여주기. */}
                <div className="nonconformity">
                    <h1 style={{marginLeft:'20px', fontFamily: "NotoSansKR-SemiBold"}}>한눈에 진단 결과 확인 하기</h1>
                    <Divider style={{marginBottom:'10px'}} />
                    <div style={{display:"flex", justifyContent: "space-between"}}>
                        <h3 style={{ marginLeft: "25px", fontFamily: "NotoSansKR-Medium", color: "#999" }}>
                            <span style={{ fontWeight: "bold", fontSize: "1.2em",color:"black" }}>{serverData['industryType']}</span>님의 개인정보 처리방침 내용 중 위반 문장을 진단 유형별로 확인해보세요
                        </h3>
{/*                         <div className="whatisIssue" style={{display:"flex",justifyContent:"end", alignItems:"center", marginRight:"20px"}}>
                            <h5 style={{marginRight:"10px",fontFamily:"NotoSansKR-Light"}}> 이슈가 무엇인가요?</h5>
                            <IssuePopover />
                        </div> */}
                    </div>
                    <NonConformityCheck data={extractedData} omissionData={omissionParagraphIssues} />
                </div>
                <Divider style={{margin: "100px", opacity:0}} />

                <Box display="flex" justifyContent="flex-end" mt={4}>
                    <Button onClick={nextStep} variant="outlined" color="primary" style={{fontFamily: "NotoSansKR-Bold"}}>상세 분석 결과</Button>
                </Box>
            </div>
        </Container>
    );
    
}

export default Step4;
