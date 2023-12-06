import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Typography,Button } from '@mui/material';
import './FuncIntro.css';

const FuncIntro =() => {
    const ref1 = useRef(null);
    const ref2 = useRef(null);
  
    const [visible1, setVisible1] = useState(false);
    const [visible2, setVisible2] = useState(false);
  
    useEffect(() => {
      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            if (entry.target === ref1.current) {
              setVisible1(true);
            } else if (entry.target === ref2.current) {
              setVisible2(true);
            }
            observer.unobserve(entry.target);
          }
        });
      });
  
      observer.observe(ref1.current);
      observer.observe(ref2.current);
  
      return () => {
        observer.disconnect();
      };
    }, []);

    return (
        <div >
          <div ref={ref1} className={`feature-container ${visible1 ? 'visible' : ''} odd`}>
            <div className="feature-name">
                <Typography style={{fontFamily:'NotoSansKR-Bold', fontSize:'40px'}} >개인정보 처리방침 진단</Typography>
            </div>
            <div className="feature-description" style={{flexDirection:'column', display:'flex'}}>
                <Typography style={{fontFamily:'NotoSansKR-SemiBold', marginBottom:'50px',fontSize:'24px'}}> LLM을 사용한 처리방침 문서 진단 </Typography>
                <Typography style={{fontFamily:'NotoSansKR-Regular',marginBottom:'20px'}}> 5분안에 바로 진단해드려요!  </Typography>
                <Link to="/start/check"><Button>바로가기</Button></Link>
            </div>

          </div>
    
          <div ref={ref2} className={`feature-container ${visible2 ? 'visible' : ''} even`}>
            <div className="feature-name">
                <Typography style={{fontFamily:'NotoSansKR-Bold', fontSize:'40px'}} >개인정보 처리방침 비서 챗봇</Typography>
            </div>
            <div className="feature-description" style={{flexDirection:'column', display:'flex'}}>
                <Typography style={{fontFamily:'NotoSansKR-SemiBold', marginBottom:'50px',fontSize:'24px'}}>LLM을 사용한 사용자 맞춤 질의응답 챗봇 서비스</Typography>
                <Typography style={{fontFamily:'NotoSansKR-Regular'}}>여러분의 사례에 맞게 구체적인 법률 및 작성지침을 질문해보세요!</Typography>
            </div>
          </div>
    
        </div>
      );
};

export default FuncIntro;