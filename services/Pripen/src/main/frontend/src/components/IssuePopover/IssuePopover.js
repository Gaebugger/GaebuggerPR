import React, { useRef, useState } from 'react';
import Popover from '@mui/material/Popover';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import { makeStyles } from '@mui/styles';
export default function IssuePopover() {
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
          <h4 style={{fontFamily: "NotoSansKR-SemiBold"}}>이슈란?</h4>
          <p style={{fontFamily:"NotoSansKR-Regular"}}>파도에서는 진단 내린 후 부적합하다고 나온 부분 하나하나를 "이슈"라고 일컫고 있습니다.</p>
        </div>
      </Popover>
    </div>
  );
}
