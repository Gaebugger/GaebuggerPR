import React from 'react';
import { Helmet } from 'react-helmet';
import { useInView } from 'react-intersection-observer';
import './Home.css';
import Header from '../../components/header/header';
import Footer from '../../components/footer/Footer';
import '../../assets/fonts/fonts.css';
import solutionImage from '../../assets/images/homeImages/메인이미지.png';
import { Button } from '@mui/material';
import {styled} from '@mui/material/styles';
import { Link } from 'react-router-dom';
import InfoDiagSection from './diagnosisIntroduceSection/InfoDiagSection';
import MoreFunc from './diagnosisIntroduceSection/MoreFunc';
import FaqContent from './FAQ/FaqContent';


function AnimatedSection({ className, title, content }) {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });
    const StyledButton = styled(Button)({
        background: 'linear-gradient(45deg, #03A9F4 30%, #00BCD4 90%)', // 에메랄드 바닷빛 그라데이션
        width:"250px",
        height:"60px",
        fontSize:"24px",
        marginTop:"20px",
        borderRadius:"10px",
        fontFamily:"NotoSansKR-SemiBold",
        '&:hover': {
            backgroundColor: '#0056b3' // 호버 시 색상
        },
        '&.animated': {
            animationDelay: '1.5s'
        }

    });
    return (
        <section className={`section ${className}`}>
            <div ref={ref} className={`section-content ${inView ? 'is-visible' : ''}`}>
                <h2 style={{fontFamily:'NotoSansKR-Bold'}} className={inView ? 'animated fadeInText' : ''}>{title}</h2>
                <p style={{fontFamily:'NotoSansKR-SemiBold'}} className={inView ? 'animated fadeInText' : ''}>{content}</p>
                <Link to="/start/check">
                    <StyledButton variant="contained" color="primary"className={inView ? 'animated fadeInText' : ''}>바로 시작하기</StyledButton>
                </Link>
            </div>
            <div className="image-container">
                <img src={solutionImage} alt="Illustration" className={inView ? 'animated fadeInImage' : ''}/>
            </div>
        </section>
    );
}

function Home() {
    return (
        <div className="home-container">
            <Helmet>
                <title>프라이팬 | 파일 하나로 개인정보 처리방침 점검</title>
            </Helmet>

            <Header active="contact"/>
            <main className="home-content">
                <div className="introduce-sec" style={{width:"100%",  padding:"80px 0 80px"}}>
                    <div className="introduce-content">
                        <AnimatedSection
                            className="introduction"
                            title={<><span>개인정보 처리방침을 위한</span><br /><span>진단 솔루션, 프라이펜</span></>}
                            content="프라이펜으로 손쉽게 진단해보세요."
                        />
                    </div>
                </div>
                <div className="what"style={{width:"100%",textAlign:"center"}}>
                    <div className="what-title" style={{fontFamily:"NotoSansKR-Bold",fontSize:"42px",margin:"50px 0 200px"}}>
                        <span style={{marginBottom:'30px'}}>개인정보 처리방침 진단</span>
                        <br/>
                        <span>오직 </span>
                        <span style={{fontWeight:"bold",    color:"#007bff"}}>프라이펜</span>
                        <span>에서만!</span> 
                    </div>
                    <div className="what-content" style={{fontFamily:'NotoSansKR-SemiBold'}}>
                        <InfoDiagSection />
                    </div>
                    <div className="what-moreFuncTitle" style={{fontFamily:"NotoSansKR-Bold",fontSize:"32px",margin:"200px 0 100px"}}>
                        <span>다음 기능들을 제공해요!</span>
                    </div>
                    <div className="what-moreFunc" style={{fontFamily:'NotoSansKR-Regular', display:'flex', justifyContent:'center', margin:'0 0 200px'}}>
                        <MoreFunc />
                    </div>
                </div>

                <div className="FAQ" style={{fontFamily:"NotoSansKR-Bold",fontSize:"50px", margin:'0 120px 0 120px'}}>
                    <h4 style={{marginBottom: "5px"}}>자주 묻는 질문</h4>
                    <h4 style={{marginTop: "5px"}}>FAQ</h4>
                    <FaqContent />
                </div>
                <div>

                </div>
            </main>
            <Footer />
        </div>
    );
}

export default Home;    
