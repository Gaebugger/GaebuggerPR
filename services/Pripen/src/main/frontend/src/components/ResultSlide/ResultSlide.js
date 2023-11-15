import React,{useEffect, useState,useRef} from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { Divider, Paper } from '@mui/material';
import "../../assets/fonts/fonts.css";
import "./ResultSlide.css";
import { StyledPaper } from '../../pages/Start/check/Guideline_detail/styles/ComponentStyles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconHoverEvent from '../SlideByIssue/IconHoverEvent';
function ResultSlide({issues, paragraph, style, onIssueRender,onIssueClick,selectedButtonIssue,setSelectedButtonIssue}) {

    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const [onlyShowIssueParagraphs, setOnlyShowIssueParagraphs] = useState(false);
    const sliderRef = useRef(null);
    const [clickedIssueId, setClickedIssueId] = useState(null);
    const [activeIssueId, setActiveIssueId] = useState(null);
    const [isIconHovered, setIconHovered] = useState(false);
    const prevSlideIndexRef = useRef(); // 이전 슬라이드 인덱스를 저장할 ref
    const getDisplayedParagraphs = () => {
        const issueParagraphIds = getIssueParagraphIds();
        return onlyShowIssueParagraphs ? paragraph.filter(p => issueParagraphIds.includes(p.paragraph_id)) : paragraph;
    };

    const handleCheckboxChange = (event) => {
        setOnlyShowIssueParagraphs(event.target.checked);
    };
    // 현재 슬라이드의 index가 변경될 때 호출되는 함수
    const handleAfterChange = (currentIndex) => {
        if(currentIndex !==prevSlideIndexRef.current){
            setCurrentSlideIndex(currentIndex);
            prevSlideIndexRef.current = currentIndex; // 현재 인덱스를 저장

            const displayedParagraphs = getDisplayedParagraphs();
            const currentParagraphId = displayedParagraphs[currentIndex].paragraph_id;
            const relevantIssues = getRelevantIssues(currentParagraphId);
            // 현재 paragraph와 관련된 모든 issue들을 onIssueRender에 전달
            console.log("handleAfterChange is on!!");
            onIssueRender(relevantIssues);
        }
    };
    
    // 위반사항이 있는 paragraph_id 목록을 가져옵니다.
    const getIssueParagraphIds = () => {
        const uniqueIds = new Set(issues.map(issue => issue.issue_paragraph_id));
        return Array.from(uniqueIds);
    };
    // 슬라이드 설정    
    const settings = {
        arrows:true,
        dots: true,
        infinite: false, // 수정
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        afterChange: handleAfterChange
    };
    const prevButton = document.querySelector(".slick-prev");
    const nextButton = document.querySelector(".slick-next");
    // 버튼의 텍스트를 제거합니다.
    if (prevButton) {
        prevButton.innerText = '';
    }
    if (nextButton) {

        nextButton.innerText = '';
    }

    
    // 클릭 이벤트 
    const handleIssueClick = (issue) => {
        console.log("Issue clicked!", issue);
        setClickedIssueId(issue.issue_id); // 클릭된 이슈의 ID 저장

        // 해당 문장이 복수의 이슈를 가지고 있는지 확인합니다.
        const sameStartIndexIssues = issues.filter(item => item.issue_startIndex === issue.issue_startIndex);
        if (sameStartIndexIssues.length > 1) {
            setActiveIssueId(issue.issue_id);
        }

        onIssueClick(issue);
    }

    // 주어진 paragraph에 대해 관련된 issues를 반환하는 함수
    const getRelevantIssues = (paragraphId) => {
        return issues.filter(issue => issue.issue_paragraph_id === paragraphId);
    }

    const wrapMultipleIssuesWithIcon = (issues,paragraphInfo) => {
        issues.sort((a, b) => a.issue_id - b.issue_id);

        const activeIssue = issues.find(issue => issue.issue_id === activeIssueId) || issues[0];
        const otherIssues = issues.filter(issue => issue.issue_id !== activeIssue.issue_id);

        return (
            <div className="issueWrapper" >
                {wrapWithIssueSpan(paragraphInfo.paragraph_content.slice(activeIssue.issue_startIndex-paragraphInfo.paragraph_startIndex, (activeIssue.issue_endIndex ) - paragraphInfo.paragraph_startIndex), activeIssue)}
                <IconHoverEvent otherIssues={otherIssues} handleIssueClick={handleIssueClick} wrapWithIssueSpan={wrapWithIssueSpan}/>
            </div>
        );

    };


    // issue를 감싸는 span 생성
    const wrapWithIssueSpan = (text, issue) => {
        let className;
        let style = {};
        let issueNumberStyle = {
            display: 'inline-block',
            borderRadius: '50%',  // 동그라미 모양
            color: 'white',  // 글자색 지정
            backgroundColor:"transparent",
            width: '20px',  // 원 크기 조절
            height: '20px',
            textAlign: 'center',  // 번호 중앙 정렬
            marginRight: '5px',  // 이슈 번호와 텍스트 사이의 간격
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
                break;
        }
        return (
            <span key={issue.issue_id} className={`issue ${className}`} title={issue.issue_content} onClick={() => handleIssueClick(issue)} style={{...style, borderRadius:"10px"}}>
                {/* 동그라미 (이슈 ID) */}
                
                <span style={{...issueNumberStyle}}>{issue.issue_id}</span>    
                {/* 문구 */}
                {text}
            </span>
        );
    }

    const wrapWithBreaks = (text) => {
        return text.split('\n').map((line, index, array) => (
            <React.Fragment key={index}>
                {line}
                {index !== array.length - 1 && <br />}
            </React.Fragment>
        ));
    }
    
      
    // 각 paragraph를 슬라이드 항목으로 변환
    const renderSlides = () => {
        const paragraphsToRender = getDisplayedParagraphs();
        const issueParagraphIds = getIssueParagraphIds(); // 여기에서 함수의 결과를 변수에 저장
        return paragraphsToRender.map(p => {
            let contentArray = [];
            let lastIndex = 0;


            const relevantIssues = getRelevantIssues(p.paragraph_id);
            const omittedIssues = relevantIssues.filter(issue => issue.issue_startIndex === -999 && issue.issue_endIndex === -999);
            const normalIssues = relevantIssues.filter(issue => issue.issue_startIndex !== -999 && issue.issue_endIndex !== -999);

            // 체크박스가 체크되어 있고, 해당 단락의 ID가 위반사항이 있는 단락의 ID 목록에 없다면 렌더링하지 않습니다.
            if (onlyShowIssueParagraphs && !issueParagraphIds.includes(p.paragraph_id) && omittedIssues.length === 0) {
                return (
                    <p>위반사항이 없습니다!</p>
                );
            }

            // 누락된 항목 렌더링
            if (omittedIssues.length > 0) {
                const omittedIssueElements = omittedIssues.map(issue => {
                    const wrappedIssue = wrapWithIssueSpan(null, issue);
                    return (
                        <span
                            key={issue.issue_id}
                            onClick={() => handleIssueClick(issue)}
                        >
                            {wrappedIssue}
                        </span>
                    );
                });

                contentArray.push(
                    <div key="omittedIssues" className="omittedContent" style={{padding: "5px", borderRadius: "5px", margin: "10px 0", border: "2px solid #d9d9d9"}}>
                        <strong>대단락 내 누락에 의한 위반 사항</strong>
                        <Divider style={{marginTop:"3px", marginBottom:"5px"}} />
                        <div className="omittedIssuesList" style={{marginBottom:"5px"}}>{omittedIssueElements}</div>
                    </div>

                    // <div className="omittedIssuesList" key={"missingDiv-" + issue.issue_startIndex} style={{ padding: "5px", borderRadius: "5px", margin: "10px 0", border: "2px solid #d9d9d9" }}>
                    //     <strong>대단락 내 누락에 의한 위반 사항</strong>
                    //     <Divider style={{marginBottom:"10px"}} />
                    //     {missingIssueContent}
                    // </div>
                );
            }

            // 누락 아닌 이슈 랜더링
            for (let i = 0; i < normalIssues.length; i++) {
                const issue = normalIssues[i];
                const relativeStart = issue.issue_startIndex - p.paragraph_startIndex;
                const relativeEnd = issue.issue_endIndex - p.paragraph_startIndex;

                // 복수 이슈를 가진 문장 wrap 랜더링
                if (i + 1 < normalIssues.length && normalIssues[i + 1].issue_startIndex === issue.issue_startIndex) {
                    const sameIndexIssues = [issue];

                    while (i + 1 < normalIssues.length && normalIssues[i + 1].issue_startIndex === issue.issue_startIndex) {
                        i++;
                        sameIndexIssues.push(normalIssues[i]);
                    }

                    contentArray.push(wrapWithBreaks(p.paragraph_content.slice(lastIndex, relativeStart)));
                    contentArray.push(wrapMultipleIssuesWithIcon(sameIndexIssues,p ));
                    lastIndex = relativeEnd + 1;
                }
                else {
                    contentArray.push(wrapWithBreaks(p.paragraph_content.slice(lastIndex, relativeStart)));
                    contentArray.push(wrapWithIssueSpan(p.paragraph_content.slice(relativeStart, relativeEnd + 1), issue));
                    lastIndex = relativeEnd + 1;
                }
            }
            contentArray.push(wrapWithBreaks(p.paragraph_content.slice(lastIndex)));

            return (
                <div key={p.paragraph_id} className="slideContent">
                    {contentArray}
                </div>
            );
        });
    }
    useEffect(() => {
        console.log("hihi im firsteffect");
        setCurrentSlideIndex(0);

        const currentParagraphId = paragraph[0].paragraph_id;
        const relevantIssues = getRelevantIssues(currentParagraphId);

        // 현재 paragraph와 관련된 모든 issue들을 onIssueRender에 전달
        onIssueRender(relevantIssues);
    }, []);   //초기 설정
    useEffect(() => {
        console.log("hihi im 2effect");
        // 체크박스의 상태가 변경될 때마다 첫 번째 슬라이드로 이동
        setCurrentSlideIndex(0);
        // 미세한 딜레이 후에 슬라이드 이동

        if (sliderRef.current && sliderRef.current.slickGoTo) {
            
            sliderRef.current.slickGoTo(0);
        }

    
        // 첫 번째 슬라이드에 대한 이슈들을 가져와서 onIssueRender 호출
        const firstParagraphId = getDisplayedParagraphs()[0].paragraph_id;
        const relevantIssues = getRelevantIssues(firstParagraphId);
        onIssueRender(relevantIssues);

    }, [onlyShowIssueParagraphs, paragraph,issues]);  //onlyShowIssueParagraphs = 체크박스(이슈있는 항목만)

    useEffect(() => {
        console.log("hihi im it");
        if (selectedButtonIssue) {
            setOnlyShowIssueParagraphs(false);
            console.log("checkbox false!");
            // 100ms의 딜레이를 준 후에 slickGoTo 호출
            setTimeout(() => {
                const targetSlide = selectedButtonIssue.issue_paragraph_id - 1;
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


                
            }, 100);
            setTimeout(()=>{
                handleIssueClick(selectedButtonIssue);
            },1000)


        }
    }, [selectedButtonIssue]);
    
    return (
        <StyledPaper style={style}>
            <h2 style={{fontFamily:"NotoSansKR-Medium",textAlign:"center"}}>항목</h2>
            {/* 위반 사항이 있는 단락만 보기 체크박스 구현 */}
            <div style={{ marginBottom: '10px', textAlign:"end" }}>
                <input
                    type="checkbox"
                    id="onlyShowIssueParagraphs"
                    checked={onlyShowIssueParagraphs}
                    onChange={handleCheckboxChange}
                />
                <label htmlFor="onlyShowIssueParagraphs" style={{fontFamily:"NotoSansKR-Medium"}}>위반 사항이 있는 항목만 보기</label>
            </div>
            <Divider style={{marginBottom:"10px"}} />
            <Slider ref={sliderRef} {...settings} key={onlyShowIssueParagraphs ? 'withIssues' : 'all'} style={{whiteSpace: 'pre-line'}}>
                {renderSlides()}
            </Slider>

            <p style={{textAlign:"center",paddingTop:"10px"}}>{`${currentSlideIndex + 1} / ${getDisplayedParagraphs().length}`}</p>
        </StyledPaper>
    );
}

export default ResultSlide;
