import React from 'react';
import { Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';
import '../../assets/fonts/fonts.css';

const CustomTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .MuiTooltip-tooltip`]: {
      backgroundColor: 'white',
      color: 'rgba(0, 0, 0, 0.87)',
      maxWidth: 500, // 툴팁의 최대 너비를 늘립니다.
      fontSize: theme.typography.pxToRem(16), // 폰트 크기를 조정합니다.
      border: '1px solid #dadde9',
      padding: '20px', // 툴팁 내용 주위에 패딩을 추가합니다.
      whiteSpace: 'pre-line', // 줄바꿈을 위해 속성 변경,
      margin:"10px",
      fontFamily: 'NotoSansKR-Regular',
    },
  }));
  

export default CustomTooltip;