
import React, { useState, useEffect,useRef } from 'react';
import { Typography, Divider } from '@mui/material';
import { StyledPaper } from '../../pages/Start/check/Guideline_detail/styles/ComponentStyles';
import './RenderIssue.css';
import '../../assets/fonts/fonts.css';
import BestPractice from '../bestpractice/BestPractice';
function RenderIssue({issuelist,highlightIssue, style}){


    const [animate, setAnimate] = useState(false);
    const highlightedIssueRef = useRef(null);
    const prevHighlightIssueIdRef = useRef();
    useEffect(() => {
        if (highlightIssue){
            console.log("issue click and highlight effect is on!");
            // highlightIssue의 고유 식별자나 특정 속성을 사용합니다. 
            // 예를 들어, highlightIssue에 id 속성이 있다고 가정합니다.
            const currentIssueId = highlightIssue.issue_id;
            if (currentIssueId !== prevHighlightIssueIdRef.current) {
                console.log("highlight issue changed and on!");

                if (highlightedIssueRef.current) {
                    console.log("move highlight!");
                    // 내부 컨테이너 스크롤
                    highlightedIssueRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
        
                // 현재 highlightIssue ID를 저장
                prevHighlightIssueIdRef.current = currentIssueId;
            }
        }
    }, [highlightIssue]); // 의존성 배열에 highlightIssue를 유지합니다.
    

    useEffect(() => {
        if (issuelist) {
            setAnimate(true);
            setTimeout(() => setAnimate(false), 500); // 500ms는 애니메이션 지속 시간과 동일하게 설정
        }
    }, [issuelist]);

    if(!issuelist) return(
        <StyledPaper className={animate ? "fade-in" : ""} style={{ ...style, textAlign: 'center', padding: '20px',fontSize:"24px",fontFamily:"NotoSansKR-SemiBold",display:"flex",flexDirection:"column",justifyContent:"center" }}>
            <p>슬라이드를 넘기면 해당 단락의 모든 위반 사항을 보여드립니다.</p>
        </StyledPaper>
    )
    if (issuelist.length === 0) return(
        <StyledPaper style={{ ...style, textAlign: 'center',fontFamily:"NotoSansKR-Regular",display:"flex",flexDirection:"column",overflow: "hidden" }}>
            <h2 style={{fontFamily:"NotoSansKR-Medium"}}>위반 사항 리스트</h2>
            <Divider style={{marginBottom:"10px",marginTop:"32px"}} />
            <p>해당 단락은 위반사항 없습니다.</p>
        </StyledPaper>
    )


    return (
        <StyledPaper style={{ ...style, textAlign: 'center',fontFamily:"NotoSansKR-Regular",display:"flex",flexDirection:"column",overflow: "hidden" }}>
            <h2 style={{fontFamily:"NotoSansKR-Medium"}}>위반 사항 리스트</h2>
            <Divider style={{marginBottom:"10px",marginTop:"32px"}} />
            <div className={animate ? "fade-in" : ""} style={{ overflowY: 'auto', maxHeight: '400px', padding: '20px' }}>
                {issuelist.map((issue, index) => (
                    <div
                        key={index}
                        ref={
                            highlightIssue && issue.issue_id === highlightIssue.issue_id 
                            ? highlightedIssueRef 
                            : null
                        }
                        style={{
                            border: 
                                highlightIssue && issue.issue_id === highlightIssue.issue_id 
                                ? '2px solid red' 
                                : '1px solid #999',
                            marginBottom: '40px',
                            padding: '10px'
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid #e0e0e0' }}>
                                <h4 style={{margin:'10px'}}>번호</h4>
                                <body>{issue.issue_id}</body>
                            </div>
                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                <h4 style={{margin:'10px'}}>진단 유형</h4>
                                <body>{issue.issue_type}</body>
                            </div>
                        </div>

                        <Divider style={{ margin: '10px 0' }} />

                        <h4>진단 근거</h4> {/* 여기에 위반 사유를 넣으세요 */}
                        <body>{issue.issue_reason}</body>
                        <Divider style={{ margin: '10px 0' }} />

                        <h4>가이드 라인</h4>
                        <ul style={{textAlign:"start"}}>
                            {issue.issue_guideline.map((guideline, index) => (
                                <li key={index} style={{marginBottom:"10px"}}>
                                    {guideline}
                                </li>
                            ))}
                        </ul>
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <h4 style={{margin:'10px'}}>모범 사례</h4>
                            <BestPractice issue_case={issue.issue_case} />
                        </div>
                    </div>
                ))}
            </div>
        </StyledPaper>
    );

}
export default RenderIssue;