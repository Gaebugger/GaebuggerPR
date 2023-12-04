import React, {useState, useRef, useEffect} from 'react';
import Slider from 'react-slick';  // 예시로 react-slick 사용
import { Divider } from '@mui/material';
import '../../assets/fonts/fonts.css';
import { StyledPaper } from '../../pages/Start/check/Guideline_detail/styles/ComponentStyles';
import './SlideByIssue.css';
import MoreIcon from '@mui/icons-material/More';

import BestPractice from '../bestpractice/BestPractice';
import IconHoverEvent from './IconHoverEvent';
const SlideByIssue = ({ original, paragraphs, issues,style,selectedButtonIssue,omissionIssuesCount}) => {
    const [currentIssueIndex, setCurrentIssueIndex] = useState(0);
    const [clickedIssueId, setClickedIssueId] = useState(1); // 추가
    const paragraphRef = useRef(null);
    const sliderRef = useRef(null);
    const [activeIssueId, setActiveIssueId] = useState(null);
    let lastClickedIssueId = null; // 마지막으로 클릭된 이슈의 ID를 추적하는 변수

    const handleIssueClick = (issue) => {
        setClickedIssueId(issue.issue_id);
    
        // 해당 issue의 슬라이드 인덱스를 찾습니다.
        const issueIndex = issues.findIndex((item) => item.issue_id === issue.issue_id);
    
        // 해당 슬라이드로 이동합니다.
        if (issueIndex >= 0) {
            sliderRef.current.slickGoTo(issueIndex);
        }

        // 해당 문장이 복수의 이슈를 가지고 있는지 확인합니다.
        const sameStartIndexIssues = issues.filter(item => item.issue_startIndex === issue.issue_startIndex);
        if (sameStartIndexIssues.length > 1) {
            setActiveIssueId(issue.issue_id);
        }
    };

    const handleSlideChange = (newIndex) => {
        if (currentIssueIndex !== newIndex) {
            setCurrentIssueIndex(newIndex);
            scrollToIssueAndClick(newIndex);
        }
    };

    const scrollToIssueAndClick = (issueIndex) => {
        console.log("im on!");
        console.log("issueindex is :", issueIndex);
    
        // 현재 활성화된 이슈 ID를 가져옵니다.
        const currentIssueId = issues[issueIndex].issue_id;

        // 클래스가 'highlighted-issue'이면서 data-issue-id 속성이 원하는 이슈 ID와 일치하는 요소를 찾습니다.
        const spanElement = document.querySelector(`.highlighted-issue[data-issue-id="${currentIssueId}"]`);
        const containerElement = document.querySelector('.paragraph-section');
        if (spanElement && currentIssueId !== lastClickedIssueId) {

            let elementRect = spanElement.getBoundingClientRect();
            const containerRect = containerElement.getBoundingClientRect();
            let parentElement = spanElement.parentElement;

            // 부모 요소를 탐색하며 'issuewrapper' 클래스를 가진 요소를 찾습니다.
            while (parentElement && !parentElement.classList.contains('issueWrapper')) {
                parentElement = parentElement.parentElement;
            }
        
            if (parentElement) {
                elementRect = parentElement.getBoundingClientRect();
                // parentRect를 사용하여 위치 및 크기 정보를 얻을 수 있습니다.
            }
            const relativeTop = elementRect.top - containerRect.top + containerElement.scrollTop;
            const scrollPosition = relativeTop - containerElement.offsetHeight / 2 + elementRect.height / 2;

            containerElement.scrollTo({
                top: scrollPosition,
                behavior: 'smooth'
            });

            

            spanElement.click();

            lastClickedIssueId = currentIssueId; // 마지막으로 클릭된 이슈 ID를 업데이트
        }
    };

    const getIssuesLength = () => {
        return issues.length;
    };
    


    const sliderSettings = {
        arrows: true,
        dots: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        afterChange: handleSlideChange
    };

    const wrapMultipleIssuesWithIcon = (issues) => {
        issues.sort((a, b) => a.issue_id - b.issue_id);

        const activeIssue = issues.find(issue => issue.issue_id === activeIssueId) || issues[0];
        const otherIssues = issues.filter(issue => issue.issue_id !== activeIssue.issue_id);

        return (
            <div className="issueWrapper" >

                {wrapWithIssueSpan(original.slice(activeIssue.issue_startIndex, activeIssue.issue_endIndex + 1), activeIssue)}
                <IconHoverEvent otherIssues={otherIssues} handleIssueClick={handleIssueClick} wrapWithIssueSpan={wrapWithIssueSpan} />

            </div>
        );

    };




    // issue를 감싸는 span 생성
    const wrapWithIssueSpan = (text, issue) => {
        //console.log('wrapWithIssueSpan called with issue_id:', issue.issue_id);
        let className;
        let style = {};
        let issueNumberStyle = {
            display: 'inline-block',
            borderRadius: '50%',  // 동그라미 모양
            color: 'white',  // 글자색 지정
            backgroundColor:"transparent",
            width: '23.2px',  // 원 크기 조절
            height: '20px',
            textAlign: 'center',  // 번호 중앙 정렬

            lineHeight: '20px',  // 수직 중앙 정렬
            fontSize: '1em'  // 폰트 크기
        };

        if (issue.issue_id === clickedIssueId) {
            style.fontWeight = 'bold'; // 볼드체로 설정
            if(text===null){
                style.fontSize ='1.5em';
                style.display ='inline-block';
                style.width = '35px';
                style.textAlign = 'center';
            }
            else {
                style.fontSize = '1.3em'; // 폰트 사이즈 조정
            }
        }

        switch(issue.issue_type) {
            case "법률 위반":
                className = "issue-law-violation";
                break;
            case "법률 위반 위험":
                className = "issue-law-risk";
                break;
            case "작성지침 미준수":
                className = "issue-guideline";
                break;
            default:
                className = "issue";
        }
        return (
            <span key={issue.issue_id} className={`highlighted-issue ${className}`} title={issue.issue_content} onClick={() => handleIssueClick(issue)} style={{...style, borderRadius:"10px"}} data-issue-id={issue.issue_id}>
                <span style={{...issueNumberStyle}}>{issue.issue_id}</span>
                {text}
            </span>
        );
    }

    const renderParagraphWithIssues = () => {
        let contentArray = [];
        let lastIndex = 0;
        let showIssuesBox = false; // 호버 박스 컴포넌트의 표시 여부를 관리하는 state (여기서는 예시로 변수로 처리)

        const transformedIssues = issues.map(issue => {
            if (issue.issue_startIndex === -999 && issue.issue_endIndex === -999) {
                const relatedParagraph = paragraphs.find(p => p.paragraph_id === issue.issue_paragraph_id);
                return {
                    ...issue,
                    issue_startIndex: relatedParagraph ? relatedParagraph.paragraph_startIndex : -999,
                    issue_endIndex: relatedParagraph ? relatedParagraph.paragraph_startIndex : -999,
                };
            }
            return issue;
        });

        const sortedIssues = transformedIssues.sort((a, b) => a.issue_startIndex - b.issue_startIndex);

        for (let i = 0; i < sortedIssues.length; i++) {
            let issue = sortedIssues[i];

            if (issue.issue_startIndex === issue.issue_endIndex) {
                contentArray.push(original.slice(lastIndex, issue.issue_startIndex));

                let missingIssueContent = [];

                missingIssueContent.push(wrapWithIssueSpan(null, sortedIssues[i]));

                // 같은 index를 가진 다음 누락 이슈들을 찾아 span으로 추가
                while (i + 1 < sortedIssues.length && sortedIssues[i + 1].issue_startIndex === issue.issue_startIndex) {
                    i++;
                    missingIssueContent.push(wrapWithIssueSpan(null, sortedIssues[i]));
                }

                contentArray.push(
                    <div className="omittedIssuesList" key={"missingDiv-" + issue.issue_startIndex} style={{ padding: "5px", borderRadius: "5px", margin: "10px 0", border: "2px solid #d9d9d9" }}>
                        <strong>대단락 내 누락에 의한 위반 사항</strong>
                        <Divider style={{marginBottom:"10px"}} />
                        {missingIssueContent}
                    </div>
                );

                lastIndex = issue.issue_startIndex;
                continue;
            }

            if (i + 1 < sortedIssues.length && sortedIssues[i + 1].issue_startIndex === issue.issue_startIndex && issue.issue_startIndex !== -999) {
                const sameIndexIssues = [issue];

                while (i + 1 < sortedIssues.length && sortedIssues[i + 1].issue_startIndex === issue.issue_startIndex) {
                    i++;
                    sameIndexIssues.push(sortedIssues[i]);
                }

                contentArray.push(original.slice(lastIndex, issue.issue_startIndex));
                contentArray.push(wrapMultipleIssuesWithIcon(sameIndexIssues));
                lastIndex = issue.issue_endIndex + 1;
                continue;
            }
            contentArray.push(original.slice(lastIndex, issue.issue_startIndex));
            contentArray.push(wrapWithIssueSpan(original.slice(issue.issue_startIndex, issue.issue_endIndex + 1), issue));
            lastIndex = issue.issue_endIndex + 1;
        }

        // 남은 부분의 내용을 추가
        contentArray.push(original.slice(lastIndex));

        return contentArray;
    }

    useEffect(() => {

        // if (selectedButtonIssue) {



        //     setTimeout(()=>{
        //         handleIssueClick(selectedButtonIssue);
        //     },800)


        // }
        if(selectedButtonIssue){
            // 현재 활성화된 이슈 ID를 가져옵니다.
            console.log("selectedButtonIssue is :" , selectedButtonIssue);
            const currentIssueId = selectedButtonIssue.issue_id;

            // 클래스가 'highlighted-issue'이면서 data-issue-id 속성이 원하는 이슈 ID와 일치하는 요소를 찾습니다.
            const spanElement = document.querySelector(`.highlighted-issue[data-issue-id="${currentIssueId}"]`);
            const containerElement = document.querySelector('.paragraph-section');
            if (spanElement && currentIssueId !== lastClickedIssueId) {
                // 윈도우 스크롤입니다.
                let slideIdx = (selectedButtonIssue.issue_id - 1) - omissionIssuesCount;
                if(slideIdx<0){
                    slideIdx = (selectedButtonIssue.issue_id - 1);
                };
                const targetSlide = slideIdx;
                
                sliderRef.current.slickGoTo(targetSlide);   
    
                var element = document.querySelector('.slick-list'); // 요소를 선택
                var rect = element.getBoundingClientRect();
                console.log("slider~~~~offsetTop is:", rect.top);
    
                var absoluteY = rect.top + window.scrollY-250;  // 절대적인 y좌표 계산
                console.log("Absolute Y position of .slick-list is:", absoluteY);
    
                window.scrollTo({
                    top: absoluteY,  // 절대적인 y좌표로 스크롤
                    behavior: 'smooth'
                });

                // // 내부 컨테이너 스크롤입니다.
                // let elementRect = spanElement.getBoundingClientRect();
                // const containerRect = containerElement.getBoundingClientRect();
                // let parentElement = spanElement.parentElement;

                // // 부모 요소를 탐색하며 'issuewrapper' 클래스를 가진 요소를 찾습니다.
                // while (parentElement && !parentElement.classList.contains('issueWrapper')) {
                //     parentElement = parentElement.parentElement;
                // }
            
                // if (parentElement) {
                //     elementRect = parentElement.getBoundingClientRect();
                //     // parentRect를 사용하여 위치 및 크기 정보를 얻을 수 있습니다.
                // }
                // const relativeTop = elementRect.top - containerRect.top + containerElement.scrollTop;
                // const scrollPosition = relativeTop - containerElement.offsetHeight / 2 + elementRect.height / 2;

                // containerElement.scrollTo({
                //     top: scrollPosition,
                //     behavior: 'smooth'
                // });

                

                spanElement.click();

                lastClickedIssueId = currentIssueId; // 마지막으로 클릭된 이슈 ID를 업데이트
            }
        }

    }, [selectedButtonIssue]);





    return (
        <div className="issue" style={{display:"flex",justifyContent:"space-between"}}>
            <StyledPaper style={style}>
                <h2 style={{fontFamily:"NotoSansKR-Medium",textAlign:"center"}}>전체 내용</h2>
                <Divider style={{marginBottom:"10px",marginTop:"32px"}} />
                <div ref={paragraphRef} className="paragraph-section" style={{ overflowY: 'auto', maxHeight: '400px', padding: '20px', flex: 1, whiteSpace: 'pre-line', fontFamily:"NotoSansKR-Regular"}}>
                    {renderParagraphWithIssues()}
                </div>
            </StyledPaper>
            
            <StyledPaper style={{ ...style, textAlign: 'center',fontFamily:"NotoSansKR-Regular",display:"flex",flexDirection:"column",overflow: "hidden"}}>
                {/*여기에 bp 아이콘 넣기 */}
                <h2 style={{fontFamily:"NotoSansKR-Medium"}}>위반 문장</h2>
                <Divider style={{marginBottom:"10px",marginTop:"1px"}} />
                <Slider {...sliderSettings} ref={sliderRef} style={{alignItems: "center", display:"flex",height:"100%",justifyContent:"center"}}>
                    {issues.map(issue => (
                        <div key={issue.issue_id} className="issue-item">
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid #e0e0e0' }}>
                                    <h4 style={{margin:'10px'}}>번호</h4>
                                    <body style={{fontFamily:"NotoSansKR-Regular"}}>{issue.issue_id}</body>
                                </div>
                                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                    <h4 style={{margin:'10px'}}>진단 유형</h4>
                                    <body style={{fontFamily:"NotoSansKR-Regular"}}>{issue.issue_type}</body>
                                </div>
                            </div>

                            <Divider style={{ margin: '10px 0' }} />

                            <h4>진단 근거</h4> {/* 여기에 위반 사유를 넣으세요 */}
                            <body style={{fontFamily:"NotoSansKR-Regular"}}>{issue.issue_reason}</body>
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
                </Slider>
                <p style={{ textAlign: "center", paddingTop: "10px" }}>{`${currentIssueIndex + 1} / ${getIssuesLength()}`}</p>
            </StyledPaper>
            
        </div>
    );
    
}

export default SlideByIssue;