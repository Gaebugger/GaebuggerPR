import React, { useState,useEffect } from 'react';
import RecommendIcon from '@mui/icons-material/Recommend';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    minWidth: '1000px', // Box 컴포넌트의 최소 너비 설정

    display: 'flex', // flexbox 레이아웃 사용
    flexDirection: 'column', // 자식 요소들을 수직 방향으로 정렬
    maxHeight: '80vh', // 모달의 최대 높이를 화면 높이의 90%로 제한
    overflowY: 'hidden', // Box의 직접적인 스크롤을 비활성화
};

// 스크롤 영역을 위한 스타일
const scrollableStyle = {
    overflowY: 'auto', // 스크롤 영역 설정
    maxHeight: '80vh', // 스크롤 영역의 최대 높이를 조정
};

const BestPractice = ({ issue_case }) => {
    const [open, setOpen] = useState(false);
    const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const onImageLoad = ({ target: img }) => {
        setImageSize({ width: img.offsetWidth, height: img.offsetHeight });
    };

    // 이미지 파일의 경로를 생성합니다.
    const imagePath = `/assets/images/BestPractice/${issue_case+1}.png`;

    const boxStyle = {
        ...style,
        overflowY: 'auto',
        // 이미지 크기에 맞추거나 최소 너비 1000px을 사용합니다.
        width: imageSize.width > 0 ? Math.max(imageSize.width,1000) : 'auto',
        minWidth: '1000px', // 최소 너비 설정
    };

    return (
        <>
            <RecommendIcon onClick={handleOpen} style={{ cursor: 'pointer' }} />
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="best-practice-modal-title"
                aria-describedby="best-practice-modal-description"

            >
                <Box sx={style}> {/* 이미지 너비에 맞게 Box 너비를 설정 */}
                    <h2 id="best-practice-modal-title" style={{ fontSize:"2rem", fontFamily:"NotoSansKR-SemiBold", backgroundColor: 'white', zIndex: 1, position: 'sticky', top: 0 }}>
                        이슈 모범사례
                    </h2>
                    <Box sx={scrollableStyle}>
                        <img src={imagePath} alt={`Best Practice ${issue_case}`} onLoad={onImageLoad} style={{ width: '100%', height: 'auto' }} />
                    </Box>
                </Box>
            </Modal>
        </>
    );
}

export default BestPractice;
