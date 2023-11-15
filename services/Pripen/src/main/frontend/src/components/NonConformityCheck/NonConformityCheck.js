import React, { useState } from 'react';
import { Button, Typography, Box, ToggleButtonGroup, ToggleButton, Paper, Divider } from '@mui/material';
import "../../assets/fonts/fonts.css";
import { makeStyles } from '@mui/styles';
import BookIcon from '@mui/icons-material/Book';
import CustomTooltip from './CustomToolTip';

const NonConformityCheck = ({ data, omissionData }) => {
  const [selectedViolations, setSelectedViolations] = useState(['법률 위반','법률 위반 위험','작성지침 미준수']);
  const contentPieces = [];
  const getMissingIssue = () => {
    const missingIssues = data.issues.filter(issue => issue.startIndex === -999 && selectedViolations.includes(issue.type));

    const countByIssueType = {
      "법률 위반": 0,
      "법률 위반 위험": 0,
      "작성지침 미준수": 0
    };

    missingIssues.forEach(issue => {
      if (countByIssueType[issue.type] !== undefined) {
        countByIssueType[issue.type]++;
      }
    });

    if (missingIssues.length === 0) {
      return null; // 누락된 항목이 없으면 null 반환
    }

    return (
        <div key="missingIssue" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: "3px", borderRadius: "3px", margin: "5px 0", border: "1px solid black" }}>
          <h3 style={{ marginRight: '10px', marginTop:"5px", marginBottom:"5px", fontFamily:"NotoSansKR-SemiBold" }}>누락된 내용</h3>
          <Divider style={{marginBottom:"10px"}} />
          {countByIssueType["법률 위반"] > 0 && (
              <span style={{fontWeight:"bold", marginRight: '10px',fontFamily:"NotoSansKR-Regular"}}>
                <span style={{backgroundColor:"red",borderRadius:"5px"}}>법률 위반</span>: {countByIssueType["법률 위반"]} 건
              </span>
          )}
          {countByIssueType["법률 위반 위험"] > 0 && (
              <span style={{fontWeight:"bold", marginRight: '10px',fontFamily:"NotoSansKR-Regular"}}>
                <span style={{backgroundColor:"orange",borderRadius:"5px"}}>법률 위반 위험</span>: {countByIssueType["법률 위반 위험"]} 건
              </span>
          )}
          {countByIssueType["작성지침 미준수"] > 0 && (
              <span style={{fontWeight:"bold",fontFamily:"NotoSansKR-Regular"}}>
                <span style={{backgroundColor:"gold",borderRadius:"5px"}}>작성지침 미준수</span>: {countByIssueType["작성지침 미준수"]} 건
              </span>
          )}
        </div>
    );
  };

  
  const getOmissionParagraph = () => {


    return (
      <div className="omissionParagraph" style={{ border: "2px solid black",display:"flex", justifyContent:"center" ,flexDirection:"column", alignContent:"center", alignItems:"center", marginBottom:"30px"}}>
        <h2 style={{fontFamily:"NotosansKR-SemiBold"}}>누락된 항목</h2>
        {/* omissionData의 omissionData.content만 ul로 보여주기 */}
        <ul style={{marginRight:"30px", fontSize:"1.2rem", }}>
          {omissionData.map((data, index) => (
            <li key={index} style={{fontFamily:"NotoSansKR-Regular"}}>{data.content}</li>
          ))}
        </ul>
    </div>
    );
  };
    // 각 타입별 설명 문자열 생성
    const getIssueDescription = (issueTypes) => {
      // 먼저 각 타입별로 개수를 계산
      const issueCounts = issueTypes.reduce((acc, type) => {
        acc[type] = (acc[type] || 0) + 1;
        return acc;
      }, {});

      // 개수가 0이 아닌 타입들만 문자열로 만든다
      return Object.entries(issueCounts)
        .filter(([type, count]) => count > 0)
        .map(([type, count]) => `${type}: ${count}건`)
        .join('\n'); // 줄바꿈 문자로 각 타입을 구분
    };

    // 데이터 처리 과정에서 각 startIndex에 대한 issueTypes를 업데이트한다.
    // 이 예시에서는 각 type의 개수를 저장하는 배열을 가정합니다.
    // issueTypesByStartIndex[issue.startIndex] = ['법률 위반', '법률 위반 위험', ...];

    const getUniqueIssues = (issues) => {
      const uniqueIssues = new Set();
      issues.forEach(issue => {
        // 이 예제에서는 issue의 고유 식별자로 issue.id를 사용합니다.
        // 실제 구현에서는 이슈를 고유하게 식별할 수 있는 속성을 사용해야 합니다.
        uniqueIssues.add(issue.id);
      });
      return Array.from(uniqueIssues);
    };

    const createTooltipTitle = (issueCount, issueTypes) => {
      const issueDescriptions = Object.entries(issueTypes)
        .filter(([type,count]) => count >0)
        .map(([type,count]) => `${type} ${count}건`);

          // issueDescriptions 배열을 개행 문자(\n)로 결합
      const descriptionText = issueDescriptions.join('\n');
      return `위 문장은 표시된 위반 유형 외 ${issueCount-1}건의 위반 사항을 가지고 있습니다.\n\n${descriptionText}`;
    };

  const getHighlightedContent = () => {
    let lastIndex = 0;
    const contentPieces = [];
    const displayedStartIndexes = new Set();
    const issueCountsByStartIndex = {};
    const issueTypesByStartIndex = {};

    // 이슈 처리 및 개수 카운트
    data.issues.forEach((issue) => {
      if (selectedViolations.includes(issue.type)) {
        if (issue.startIndex === -999) {
          return; // 이미 처리된 issue
        }

  
        const issueContent = data.content.slice(issue.startIndex, issue.endIndex + 1) +
                            (data.content[issue.endIndex] === '\n' ? '\n' : '');
  
        if (!displayedStartIndexes.has(issue.startIndex)) {
          // 중복되지 않은 경우, 내용을 표시
          const midContent = data.content.slice(lastIndex, issue.startIndex);
          issueTypesByStartIndex[issue.startIndex] = [issue.type];
          contentPieces.push(midContent);

          contentPieces.push(
            <span key={issue.startIndex} style={{ backgroundColor: getColorByType(issue.type), borderRadius: "10px", fontFamily: "NotoSansKR-Medium", fontSize: "1.15em" }}>
              <h3 style={{ color: "black", marginLeft: "5px", fontSize: "18px", fontWeight: "bold" }}>위반 문장</h3>
              {issueContent}
            </span>
          );
  
          displayedStartIndexes.add(issue.startIndex);
          issueCountsByStartIndex[issue.startIndex] = 1;
        } else {
          // 이미 표시된 startIndex인 경우, 개수만 카운트
          if (issueTypesByStartIndex[issue.startIndex].length !== 0) {
            issueTypesByStartIndex[issue.startIndex].push(issue.type);
          }
          issueCountsByStartIndex[issue.startIndex] += 1;
        }
        lastIndex = issue.endIndex + 1  + (data.content[issue.endIndex] === '\n' ? 1 : 0);
      }
    });
  
    // 이슈 처리가 완료된 후, contentPieces에 아이콘 추가
    const newContentPieces = [];

    contentPieces.forEach((contentPiece) => {
      if (React.isValidElement(contentPiece) && contentPiece.key != null) {
        const issueCount = issueCountsByStartIndex[contentPiece.key];
        const issueTypes = issueTypesByStartIndex[contentPiece.key];

        if (issueCount > 1) {
          // 복수 이슈의 경우, 툴팁과 아이콘을 함께 렌더링
          console.log("contentPieces is ");
          console.log(contentPieces);

          console.log("issueCount");
          let types = {
            "법률 위반": 0,
            "법률 위반 위험": 0,
            "작성지침 미준수": 0
          };
          for(var i=1; i <issueTypes.length ; i++){
            if (issueTypes[i] === "법률 위반") {
              types["법률 위반"]++;
            } else if (issueTypes[i] === "법률 위반 위험") {
              types["법률 위반 위험"]++;
            } else {
              types["작성지침 미준수"]++;
            }
          }
          const tooltipTitle = createTooltipTitle(issueCount, types);
    
          newContentPieces.push(
            <>
              {contentPiece}
              <CustomTooltip style={{border:"2px solid #d9d9d9",borderRadius:"5px", marginTop:"10px", marginBottom:"10px", padding:"5px",display:"inline-flex"}} title={tooltipTitle} key={`${contentPiece.key}-tooltip`}>
                <span style={{ fontSize:"0.9rem", fontFamily:"NotoSansKR-SemiBold"}}>추가 위반 사항</span>
                <span style={{ marginLeft:"10px", display: 'inline-flex', alignItems: 'center', whiteSpace: 'pre-line' }}>
                  <BookIcon />
                </span>
              </CustomTooltip>
              <br/>
            </>
          );
        } else {
          // 단일 이슈 또는 이슈 없음의 경우, 내용만 추가
          newContentPieces.push(contentPiece);
        }
      } else {
        // React 요소가 아닌 경우, 그냥 추가
        newContentPieces.push(contentPiece);
      }
    });
    // 마지막으로 남은 텍스트를 추가합니다.
    newContentPieces.push(data.content.slice(lastIndex));
  
    return newContentPieces;
  };
  

  const getColorByType = (type) => {
    switch (type) {
      case "법률 위반": return 'red';
      case "법률 위반 위험": return 'orange';
      case "작성지침 미준수": return 'gold';
      default: return 'transparent';
    }
  };
const useStyles = makeStyles({
  lawViolation: {
    fontFamily:"NotoSansKR-Regular",
    backgroundColor: "transparent", // 예: 빨간색
    '&.Mui-selected': {
      fontFamily:"NotoSansKR-SemiBold",
      borderBottom: "6px solid red",  // 밑줄 적용
      paddingBottom: "5px"            // 밑줄과 텍스트 간의 간격
    }
  },
  lawRisk: {
    fontFamily:"NotoSansKR-Regular",
    backgroundColor: "transparent", // 예: 노란색
    '&.Mui-selected': {

      fontFamily:"NotoSansKR-SemiBold",
      borderBottom: "6px solid orange",  // 밑줄 적용
      paddingBottom: "5px"            // 밑줄과 텍스트 간의 간격
    }
  },
  guidelineViolation: {
    fontFamily:"NotoSansKR-Regular",
    backgroundColor: "transparent", // 예: 자주색
    '&.Mui-selected': {
      fontFamily:"NotoSansKR-SemiBold",
      borderBottom: "6px solid gold",  // 밑줄 적용
      paddingBottom: "5px"            // 밑줄과 텍스트 간의 간격
    }
  },
});
const classes = useStyles();
  return (
    <Box mt={4} style={{display: "flex", flexDirection: "column", marginLeft:"20px",marginRight:"20px"}}>
      <ToggleButtonGroup
        value={selectedViolations}
        onChange={(event, newValues) => setSelectedViolations(newValues)}
        aria-label="issues"
        style={{justifyContent:"flex-end"}}
      > 
        <ToggleButton 
          value="법률 위반" 
          aria-label="법률 위반" 
          className={classes.lawViolation}
        >
          법률 위반
        </ToggleButton>
        <ToggleButton 
          value="법률 위반 위험" 
          aria-label="법률 위반 위험" 
          className={classes.lawRisk}
        >
          법률 위반 위험
        </ToggleButton>
        <ToggleButton 
          value="작성지침 미준수"
          aria-label="작성지침 미준수"
          className={classes.guidelineViolation}
        >
          작성지침 미준수
        </ToggleButton>
      </ToggleButtonGroup>
      <Paper style={{maxHeight: '450px', overflowY: 'scroll', padding: '16px', border: "2px solid #d9d9d9",whiteSpace:"pre-line"}}>
        {
          omissionData && omissionData.length > 0 && getOmissionParagraph()
        }
        {getHighlightedContent().map((item, index) => (
          <Typography key={index} variant="body1" display="inline" style={{fontFamily:"NotoSansKR-Regular"}}>{item}</Typography>
        ))}
        {getMissingIssue()}
      </Paper>
    </Box>
  );
};

export default NonConformityCheck;
