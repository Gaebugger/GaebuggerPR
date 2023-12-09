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
        { 
          title: '개인정보 처리방침 진단을 어떻게 수행하나요?',
          contents: [
            { subtitle: 'LLM 기반 진단', content: '프라이펜 자체의 룰셋, 텍스트 분류 알고리즘과 OpenAi의 GPT 모델을 통해 진단 아키텍쳐를 제작하였고 이를 통해 동작합니다.' },

          ]
        },
        { 
          title: '점수 산정 기준은 무엇인가요?', 
          contents: [
            {subtitle:'통계 자료', content:'저희 팀에서 100개 이상의 기업들을 진단하고 나온 결과와 과태료 사례들을 통해 점수 산정기준을 정하였습니다.'},
            {subtitle:'점수 감사', content:'법률 위반은 -15점, 법률 위반 위험은 -7점, 작성지침 미준수는 -3점으로 감산되며 총 점수는 현황의 심각성을 고려하여 음수 점수로도 산정이 될 수 있습니다.'}
          ]
        },
        {
          title: '입력은 txt 파일만 가능한가요?',
          contents: [
            {subtitle:'입력 파일', content:'현재까지 txt파일만 입력 가능합니다. 향후 URL 형식의 입력 방식을 개발하여 사용자님들의 경험을 향상시키는 방안을 개발하고자 합니다.'}
          ]
        }
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
              <AccordionDetails style={{marginTop:'40px'}}>
                {faq.contents.map((content, subIndex) => (
                  <div key={subIndex} style={{marginBottom: '50px', marginLeft:'20px'}}>
                    <Typography style={{fontWeight: 'bold', fontFamily:'NotoSansKR-Regular', fontSize:'22px', marginBottom:'20px'}}>
                      {content.subtitle}
                    </Typography>
                    <Typography style={{marginLeft:'10px', fontFamily:'NotoSansKR-Light', fontSize:'20px'}}>
                      {content.content}
                    </Typography>
                  </div>
                ))}
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      );
};

export default FaqContent;
