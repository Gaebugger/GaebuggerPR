import React, { useRef, useState } from 'react';
import Popover from '@mui/material/Popover';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import { makeStyles } from '@mui/styles';
export default function CategoryPopover() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const iconRef = useRef(null);  // 아이콘에 대한 참조를 생성
  const handlePopoverOpen = (event) => {
    setAnchorEl(iconRef.current);  // 현재 아이콘 요소를 anchorEl로 설정
  };

  const handlePopoverClose = () => {
    console.log("it over!!");
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div id="issuePopover">
      <LiveHelpIcon
        ref={iconRef}  // 아이콘 요소에 ref 속성 연결
        onMouseEnter={handlePopoverOpen}
      />
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: 'bottom',   // 아이콘의 바닥 부분
          horizontal: 'center',  // 아이콘의 중앙
        }}
        transformOrigin={{
          vertical: 'top',   // Popover의 상단 부분
          horizontal: 'center',   // Popover의 중앙
        }}
        onMouseLeave={handlePopoverClose}
      >
        <div style={{ padding: '10px' }}>
            <h3 style={{fontFamily: "NotoSansKR-SemiBold",marginLeft:"25px"}}>진단 유형별 의미</h3>
            <ul style={{fontFamily:"NotoSansKR-Regular"}}>
                <li><strong style={{color:"red"}}>법률 위반:</strong> '개인정보 보호법 제30조'와 그 시행령 및 관련 법령을 위반한 사항</li>
                <li><strong style={{color:"orange"}}> 법률 위반 위험:</strong> 법률에 명시된 내용이 처리방침 상에 모호하게 기재되어 법률 위반의 위험이 있는 경우를 지칭</li>
                <li><strong style={{color:"gold"}}>작성지침 미준수:</strong>'개인정보 처리방침 작성지침' 상의 내용을 준수하지 않은 경우</li>
                <li><strong style={{color:"purple"}}>기재 항목 누락:</strong>'개인정보 처리방침 작성지침' 상의 항목 자체를 누락한 경우</li>
            </ul>
        </div>
      </Popover>
    </div>
  );
}
