import React from "react";
import { useInView } from "react-intersection-observer";
import { Box, Typography,Icon } from "@mui/material";
import MoneyIcon from '@mui/icons-material/Money';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import BarChartIcon from '@mui/icons-material/BarChart';
import StarIcon from '@mui/icons-material/Star';
import RateReviewIcon from '@mui/icons-material/RateReview';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import './MoreFunc.css';

const BoxItem = ({ box }) => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.5,
    });

    return (
        <Box
            ref={ref}
            className={inView ? 'fadeIn' : 'box-hidden'}
            sx={{
                border: 1,
                borderColor: 'grey.300',
                borderRadius: '20px',
                boxShadow: 3,
                p: 2,
                maxWidth: 300, // 최대 너비 설정
                flexBasis: 'calc(33.333% - 16px)', // flex-basis를 사용하여 3개의 박스가 한 줄에 들어갈 수 있도록 조정
                height: 250,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'start',
                textAlign: 'start',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                    transform: 'translateY(-10px)',
                    boxShadow: 6,
                }}}
        >
            {box.icon}
            <Typography variant="h6" style={{margin:'5px', fontFamily:'NotoSansKR-SemiBold' ,textAlign:'start', marginBottom:'20px'}}>{box.title}</Typography>
            <Typography variant="body1" style={{margin:'5px',fontFamily:'NotoSansKR-Regular'}}>{box.description}</Typography>
        </Box>
    );
};

const MoreFunc = () => {
    const boxes = [
        { title: '점수', description: '개인정보 처리방침의 현재 상황을 수치로 확인해보세요.', icon: <MoneyIcon sx={{width:'50px', height:'50px', marginBottom:'10px', color: '#009bff'}} /> },
        { title: '위반 유형별 결과 제공', description: '프라이펜은 법률 위반 뿐만 아니라, 처리방침 작성지침과 법률 위반에 애매모호한 부분까지 알려드려요.', icon: <CreditScoreIcon   sx={{width:'50px', height:'50px', marginBottom:'10px', color: '#009bff'}} /> },
        { title: '업종별 평균 비교', description: '여러분의 처리방침 결과와 같은 업종의 처리방침 결과를 수치적으로 비교해보세요.', icon: <BarChartIcon sx={{width:'50px', height:'50px', marginBottom:'10px', color: '#009bff'}} />},
        { title: '모범 사례 제공', description: '어떻게 고쳐야 할지 감이 안오나요? 여러분의 위반 유형에 대한 모범 사례를 통해 감을 익혀보셈', icon: <StarIcon sx={{width:'50px', height:'50px', marginBottom:'10px', color: '#009bff'}} /> },
        { title: '가이드라인 제공', description: '여러분의 위반 문장에 대해 가이드라인을 제공해드려요. 가이드라인을 통해 모범적인 문장으로 고쳐보세요.', icon: <RateReviewIcon sx={{width:'50px', height:'50px', marginBottom:'10px', color: '#009bff'}} /> },
        { title: '레포트 다운로드', description: '진단 결과를 PDF를 통해 파일로 간직하세요.', icon: <PictureAsPdfIcon sx={{width:'50px', height:'50px', marginBottom:'10px', color: '#009bff'}} /> }
    ];

    return (
        <Box sx={{
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: 3, 
            p: 1, 
            justifyContent: 'center',
            maxWidth: '80%', // 최대 너비 설정
            }}
        >
            {boxes.map((box, index) => (
                <BoxItem key={index} box={box} />
            ))}
        </Box>
    );

};

export default MoreFunc;





{/* <Box key={index} sx={{
    border: 1,
    borderColor: 'grey.300',
    borderRadius: '20px',
    boxShadow: 3,
    p: 2,
    maxWidth: 300, // 최대 너비 설정
    flexBasis: 'calc(33.333% - 16px)', // flex-basis를 사용하여 3개의 박스가 한 줄에 들어갈 수 있도록 조정
    height: 250,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'start',
    textAlign: 'start',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    '&:hover': {
        transform: 'translateY(-10px)',
        boxShadow: 6,
    },
}}>

<Typography variant="h6" style={{margin:'5px', fontFamily:'NotoSansKR-SemiBold' ,textAlign:'start', marginBottom:'20px'}}>{box.title}</Typography>
<Typography variant="body1" style={{margin:'5px',fontFamily:'NotoSansKR-Regular'}}>{box.description}</Typography> */}