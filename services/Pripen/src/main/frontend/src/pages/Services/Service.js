import React from 'react';
import { Link, Routes, Route, Outlet,useLocation } from 'react-router-dom';
import CheckEvaluate from "../Start/check/CheckEvaluate";
import CheckInfo from './check/checkInfo';
import Header from '../../components/header/header';
import Footer from "../../components/footer/Footer";
import { useInView } from 'react-intersection-observer';
import './Service.css';
import '../../assets/fonts/fonts.css';

function Section({ className, title, content, button,button2 }) {
    const [ref, inView] = useInView({
        triggerOnce: true,  // Only trigger this effect once
        threshold: 0.1,     // Percentage of the element that's visible before triggering
    });

    return (
        <section ref={ref} className={`section ${className} ${inView ? 'is-visible' : ''}`}>
            <h2>{title}</h2>
            <p>{content}</p>
            {button && <div className="section-button-container">{button}</div>}
            {button2 && <div className="section-button-container2">{button2}</div>}
        </section>
    );
}


function Service() {
    const location = useLocation();
    return (
        <div className="Service-container">
            <Header active="services" />

            <main className="Service-content">
                <Routes>
                    {/* /services 경로에 대한 내용 */}
                    <Route path="/" element={<Section
                        className="introduction_service"
                        title="개인정보 처리방침 점검을 쉽고 간편하게"
                        content="점검하고자 하는 처리방침 자료들을 한 번에 평가 결과를 확인해보세요!"
                        button={<Link to="/services/checkInfo" className="start-button">자세히 보기</Link>}
                        button2={<Link to="/start/check" className="start-button2">바로 시작하기</Link>}
                    
                    />} />
                    {/* /services/checkInfo 경로에 대한 내용 */}
                    <Route path="/checkInfo" element={<CheckInfo />} />
                    {/* 다른 경로에 대한 내용 */}
    
                </Routes>
            </main>
            <Footer />
        </div>
    );
}

export default Service;