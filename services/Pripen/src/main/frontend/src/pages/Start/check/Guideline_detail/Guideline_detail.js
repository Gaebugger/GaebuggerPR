import React, { useState,useMemo} from "react";
import CustomizedSteppers from "../../../../components/StepIndicator/StepIndicator";
import {    Select, MenuItem, InputLabel, FormControl, Typography,  Box, Divider, Container, Button, IconButton,Table, TableBody, TableCell, TableHead, TableRow,TablePagination  } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import ResultSlide from "../../../../components/ResultSlide/ResultSlide";
import RenderIssue from "../../../../components/RenderIssue/RenderIssue";
import SlideByIssue from "../../../../components/SlideByIssue/SlideByIssue";
import TablePage from "../../../../components/TablePage/TablePage";
import './Highlight.css';
import './Guideline_detail.css';
import '../../../../assets/fonts/fonts.css';
import { 
    StyledPaper, 
} from './styles/ComponentStyles';
function Guideline_detail({processId, prevStep,responseData}){
    // 임의의 데이터    
    const [selectedIssueList, setSelectedIssueList] = useState(null);
    const [selectedIssue, setSelectedIssue] = useState(null);
    const [selectedButtonIssue, setSelectedButtonIssue] = useState(null);
    const [selectedOption, setSelectedOption] = useState("issue"); // 초기값은 "paragraph"
    const [selectedIssueType, setSelectedIssueType] = useState('모든 유형');  // 초기 상태 설정
    // issue_type 필터링 기능
    const filteredIssues = responseData.process_Issues.filter(issue => {
        if (selectedIssueType === "모든 유형") return true;
        return issue.issue_type === selectedIssueType;
    });
    const transformedIssues = useMemo(() => {
        return responseData.process_Issues
            .filter(issue => issue.issue_type !== "기재 항목 누락");
    }, [responseData.process_Issues]);

    const omissionParagraphIssues = responseData.process_Issues
        .filter(issue => issue.issue_type === "기재 항목 누락")
        .map(issue =>{
            return{
                id: issue.issue_id,
                type: issue.issue_type,
                content: issue.issue_content,
            };
        });
    const omissionIssuesCount = omissionParagraphIssues.length;

    const handleIssueRender = (issuelist) => {
        setSelectedIssueList(issuelist);
    }
    const handleIssueClick = (issue) => {
        setSelectedIssue(issue);
    }
    const handleOptionChange = (option) => {
        setSelectedOption(option);
    }
    const handleButtonClick = (issue) => {
        setSelectedButtonIssue(null);
        setTimeout(() => {

            console.log(selectedButtonIssue);
            setSelectedButtonIssue(issue);
            console.log("after issue is :", selectedButtonIssue);
        }, 100);

    };

    return (
        <Container className="compact-container" style={{padding:"0px"}}>
            <CustomizedSteppers activeStep={3} />
            <Divider style={{ margin: "20px", opacity: 0 }} />

            <StyledPaper style={{margin:"20px"}}>
                <div className="eachIssue">
                    <h1 style={{ marginLeft: '10px', fontFamily: "NotoSansKR-SemiBold" }}>상세 분석 결과</h1>
                    <Divider style={{ marginBottom: '30px',border: "1px solid" }} />

                    {/* 상세 테이블 */}
                    <div className="issueTable">
                        <h2 style={{fontFamily:"NotoSansKR-SemiBold", marginLeft: "20px"}}>상세 테이블</h2>
                        <Divider style={{marginBottom:'10px'}} />
                        <h3 style={{marginLeft:"25px", fontFamily:"NotoSansKR-Medium", color:"#999"}}>테이블을 통해 진단 결과를 간편하게 확인해보세요</h3>
                        <Divider style={{marginBottom:'20px',opacity:0}} />
                        <TablePage selectedIssueType={selectedIssueType} setSelectedIssueType={setSelectedIssueType} filteredIssues={filteredIssues} handleButtonClick={handleButtonClick}/>
                    </div>

                    <Divider style={{marginBottom:"50px", opacity:0}} />
                    {/* 이슈사항 상세 검토 */}
                    <div className="issueDetail">
                        <h2 style={{fontFamily:"NotoSansKR-SemiBold", marginLeft: "20px"}}>상세 가이드라인</h2>
                        <Divider style={{marginBottom:'10px'}} />
                        <h3 style={{marginLeft:"25px", fontFamily:"NotoSansKR-Medium", color:"#999"}}>진단 유형, 진단 근거, 가이드라인을 확인할 수 있습니다.</h3>
                        <Divider style={{marginBottom:'20px',opacity:0}} />
                        
                        <div className="slideOption" style={{fontFamily:"NotoSansKR-Medium",width:"400px", borderRadius:"10px", marginBottom:"10px"}}>
                            <p style={{fontFamily:"NotoSansKR-Medium",marginLeft:"30px",fontSize:"20px",marginBottom:"10px"}}>슬라이드 넘기기 형식 </p>
                            <div className="OptionChoice" style={{fontFamily:"NotoSansKR-Bold",color:"#e0e0e0", marginLeft:"30px", display: "flex", flexDirection:"row", justifyContent:"flex-start",fontSize:"22px"}}>
                                <p
                                    className="perIssue" 
                                    onClick={() => handleOptionChange("issue")} 
                                    style={{
                                        marginTop:"0px",
                                        marginBottom:"0px",
                                        color: selectedOption === 'issue' ? 'black' : '#e0e0e0'
                                    }}
                                >
                                    위반 문장별
                                </p>
                                <span style={{margin: '0 10px'}}>|</span> {/* 여기에 구분 문자를 추가 */}
                                <p
                                    className="perParagrah"

                                    onClick={() => handleOptionChange("paragraph")}
                                    style={{
                                        marginTop:"0px",
                                        marginBottom:"0px",
                                        color: selectedOption === 'paragraph' ? 'black' : '#e0e0e0'
                                    }}
                                >
                                    항목별
                                </p>
                            </div>
                        </div>
                        <div className="showingIssue" style={{ border:"1px solid #d9d9d9",marginLeft:"20px",borderRadius:"10px",padding:"30px"}}>
                            {selectedOption === "paragraph" ? (
                                <div className="paragraph" style={{display:"flex",justifyContent:"space-between"}}>
                                    <ResultSlide issues={transformedIssues} paragraph={responseData.process_Paragraph} style={{flex:"1",margin:"0 10px",width: "10%"}} onIssueRender={handleIssueRender} onIssueClick={handleIssueClick} selectedButtonIssue={selectedButtonIssue} setSelectedButtonIssue={setSelectedButtonIssue}/>
                                    <RenderIssue issuelist={selectedIssueList} highlightIssue={selectedIssue} style={{flex:"1",margin:"0 10px"}}/>
                                </div>
                            ) : (
                                <SlideByIssue original={responseData.process_Original} issues={transformedIssues} paragraphs={responseData.process_Paragraph} selectedButtonIssue={selectedButtonIssue} omissionIssuesCount={omissionIssuesCount} style={{flex:"1",margin:"0 10px",width: "10%"}} />
                            )}
                        </div>
                    </div>
                </div>

                {/* 수정된 txt파일 내용 */}

                <Divider style={{marginTop:"500px",opacity:0}} />

                <Divider style={{ margin: '20px 0' }} />

                <Box mt={3} display="flex" justifyContent="space-between">
                    <Button variant="outlined" color="primary" onClick={prevStep}>
                        이전 단계
                    </Button>
                </Box>
            </StyledPaper>
        </Container>
    );
}

export default Guideline_detail;