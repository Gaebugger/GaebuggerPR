import React, { useState } from 'react';
import { Button, Typography, Box, ToggleButtonGroup, ToggleButton, Paper } from '@mui/material';
import "../../assets/fonts/fonts.css";
import { makeStyles } from '@mui/styles';

const NonConformityCheck = ({ data }) => {
  const [selectedViolations, setSelectedViolations] = useState(['법률 위반','법률 위반 위험','작성지침 미준수']);

  const getHighlightedContent = () => {
    let lastIndex = 0;
    const contentPieces = [];

    data.issues.forEach((issue) => {
      if (selectedViolations.includes(issue.type)) {
        // 중간 문자열을 처리
        const midContent = data.content.slice(lastIndex, issue.startIndex);
        contentPieces.push(parseText(midContent));

        // issue 부분을 처리 (끝나는 부분에 \n이 있으면 <br /> 추가)
        let issueContent = data.content.slice(issue.startIndex, issue.endIndex);
        if (data.content[issue.endIndex] === '\n') {
          issueContent += '\n';
        }
        contentPieces.push(
          <span key={issue.startIndex} style={{ backgroundColor: getColorByType(issue.type) }}>
            {parseText(issueContent)}
          </span>
        );
        lastIndex = issue.endIndex + (data.content[issue.endIndex] === '\n' ? 1 : 0);
      }
    });
    contentPieces.push(parseText(data.content.slice(lastIndex)));
    return contentPieces;
  };

  const getColorByType = (type) => {
    switch (type) {
      case "법률 위반": return 'red';
      case "법률 위반 위험": return 'orange';
      case "작성지침 미준수": return 'yellow';
      default: return 'transparent';
    }
  };
  const parseText = (text) => {
    const splitByNewLine = text.split('\n');
    return splitByNewLine.map((line, index) => (
        <React.Fragment key={index}>
            {line.replace(/\t/g, '    ')} {/* 탭을 4개의 공백으로 변경. 필요에 따라 조정 가능 */}
            {index !== splitByNewLine.length - 1 && <br />}
        </React.Fragment>
    ));
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
      borderBottom: "6px solid yellow",  // 밑줄 적용
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
      <Paper style={{maxHeight: '450px', overflowY: 'scroll', padding: '16px', border: "2px solid #d9d9d9"}}>
        {getHighlightedContent().map((item, index) => (
          <Typography key={index} variant="body1" display="inline" style={{fontFamily:"NotoSansKR-Regular"}}>{item}</Typography>
        ))}
      </Paper>
    </Box>
  );
};

export default NonConformityCheck;
