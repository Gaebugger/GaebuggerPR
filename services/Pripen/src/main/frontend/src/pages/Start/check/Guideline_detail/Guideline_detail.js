import React, {useEffect, useState,useMemo} from "react";
import CustomizedSteppers from "../../../../components/StepIndicator/StepIndicator";
import {    Select, MenuItem, InputLabel, FormControl, Typography,  Box, Divider, Container, Button, IconButton,Table, TableBody, TableCell, TableHead, TableRow,TablePagination  } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import testIssue from './issues.json';
import ResultSlide from "../../../../components/ResultSlide/ResultSlide";
import RenderIssue from "../../../../components/RenderIssue/RenderIssue";
import SlideByIssue from "../../../../components/SlideByIssue/SlideByIssue";
import TablePage from "../../../../components/TablePage/TablePage";
import guidelineDetail from './test_process.json';
import './Highlight.css';
import './Guideline_detail.css';
import '../../../../assets/fonts/fonts.css';
import { 
    StyledPaper, 
    customStyles, 
    customStyles_title, 
    StyledToggleButton, 
    StyledToggleButtonGroup 
} from './styles/ComponentStyles';
function Guideline_detail({processId, prevStep,responseData}){
    // 임의의 데이터    
    const [solutionTypes,setSolutionTypes] = useState([1,2,3]);
    const modifiedTxt = guidelineDetail.modifiedText;
    const modifiedText_component = guidelineDetail.modifiedText_component;
    const [selectedBpIssue, setSelectedBpIssue] = useState(null);
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

    console.log("process_Issues is:");
    console.log(responseData.process_Issues);
    console.log("process_Paragraph is:");
    console.log(responseData.process_Paragraph);
    console.log("testIssue_Issues is:");
    console.log(testIssue.process_Issues);
    console.log("testIssue_paragraph is:");
    console.log(testIssue.process_Paragraph);
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
    const handleModifiedText = (event, newTypes) => {
        // 전체 버튼이 선택된 경우
        if (newTypes.includes("all")) {
            // 이미 모든 버튼이 선택된 상태인 경우 선택을 모두 해제
            if (solutionTypes.length === 3) {
                setSolutionTypes([]);
            } else {
                // 그렇지 않은 경우 모든 버튼을 선택
                setSolutionTypes([1, 2, 3]);
            }
        } else {
            // 전체 버튼을 선택 해제하고 다른 버튼 중 하나를 선택할 경우
            setSolutionTypes(newTypes.filter(type => type !== "all"));
        }
    };
    const highlightModifiedText = () => {
        let highlightedText = modifiedTxt;
        modifiedText_component.forEach(component => {
            if (solutionTypes.includes(component.wrong_id) || solutionTypes.includes('all')) {
                const regex = new RegExp(component.convertTo, "g");
                const className = `highlight type${component.wrong_id}`;
                highlightedText = highlightedText.replace(
                    regex, 
                    `<span class="${className}"><span class="idCircle">${component.wrong_id}</span>${component.convertTo}</span>`
                );
            }
        });
        return highlightedText;
    };
    

    const downloadModifiedText = () => {
        const element = document.createElement('a');
        const file = new Blob([guidelineDetail.modifiedText], {type: 'text/plain'});
        element.href = URL.createObjectURL(file);
        element.download = "modifiedText.txt";
        document.body.appendChild(element); // 이 부분이 필요하므로 Firefox에서 잘 동작하도록
        element.click();
    }

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
                {/* <Box mt={4}> 
                    <Typography variant="h6" gutterBottom style={customStyles_title}>솔루션 적용 후</Typography>
                    <Box border={1} p={2} borderColor="grey.300" mt={2} position="relative">
                        <Box position="absolute" top={5} right={5}>
                            <StyledToggleButtonGroup 
                                value={solutionTypes} 
                                onChange={handleModifiedText}
                            >
                                <StyledToggleButton value="all" aria-label="전체">
                                    전체
                                </StyledToggleButton>
                                <StyledToggleButton value={1} aria-label="Type 1">
                                    법률 위반
                                </StyledToggleButton>
                                <StyledToggleButton value={2} aria-label="Type 2">
                                    법률 위반 위험
                                </StyledToggleButton>
                                <StyledToggleButton value={3} aria-label="Type 3">
                                    작성지침 미준수
                                </StyledToggleButton>
                            </StyledToggleButtonGroup>
                        </Box>
                        <Divider style={{ margin: "20px", opacity: 0 }} />

                        <pre dangerouslySetInnerHTML={{ __html: highlightModifiedText() }} />
                    </Box>

                    <Box textAlign="right" mt={2}>
                        <IconButton onClick={downloadModifiedText} color="primary" aria-label="download">
                            <DescriptionIcon />
                        </IconButton>
                        <Typography>다운로드</Typography>   
                    </Box>
                </Box> */}

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