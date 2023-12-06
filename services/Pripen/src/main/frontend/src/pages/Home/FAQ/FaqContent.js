import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  borderBottom: '1px solid rgba(0, 0, 0, .125)', // 하단 보더 추가
  '&:not(:last-child)': {
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
  },
  '&:before': {
    display: 'none', // 위쪽 보더 숨김
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary {...props} />
))(({ theme }) => ({
  '& .MuiAccordionSummary-expandIconWrapper': {
    transform: 'rotate(0deg)',
    marginRight: theme.spacing(1),
  },
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(180deg)',
  },
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.08)', // 호버 색상
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  borderTop: 'none', // 제목과 내용 사이의 보더 제거
}));

const FaqContent = () => {
    // FAQ 데이터를 관리할 state (질문과 대답을 포함)
    const [faqs, setFaqs] = useState([
        { title: '요즘 재밌는 영화 뭐가 있을까요?', content: '서울의 봄 추천드립니다. 개쩔어요,' },
        { title: '당신의 이름은 무엇인가요?', content: '알아서 뭐하게요'},
        { title: '여신호는 ㅈㄴ 멋있지 않나요?', content:'인정합니다. 최고의 남자.'},
        { title: '저녁 뭐먹을까요? ' , content: '종로 6번지버거 ㄱㄱ'}
    ]);

    return (
        <div>
          {faqs.map((faq, index) => (
            <Accordion key={index}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />} // 확장/축소 아이콘 추가
                aria-controls={`panel${index}-content`}
                id={`panel${index}-header`}
              >
                <Typography style={{lineHeight:'2.5',marginLeft:'20px' ,fontFamily:'NotoSansKR-Light', fontSize:'24px'}}>{faq.title}</Typography>
              </AccordionSummary>
              <AccordionDetails style={{marginTop:'20px'}}>
                <Typography style={{marginLeft:'10px' ,fontFamily:'NotoSansKR-ExtraLight', fontSize:'16px'}}>{faq.content}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      );
};

export default FaqContent;
