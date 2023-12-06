import React from 'react';
import { Link, Routes, Route, Outlet,useLocation } from 'react-router-dom';
import CheckEvaluate from "../Start/check/CheckEvaluate";
import Header from '../../components/header/header';
import Footer from "../../components/footer/Footer";
import { useInView } from 'react-intersection-observer';
import './Service.css';
import '../../assets/fonts/fonts.css';
import IntroduceUs from './IntroduceUs';

function Introduce() {
    const location = useLocation();
    console.log(location);
    const { label } = location.state || {}; // state가 없는 경우를 위한 기본값 설정
    console.log(label);
    return (
        <div className="Introduce-container">
            <Header active="introduce" />

            <main className="Introduce-content">
                <Routes>
                    {/* /services 경로에 대한 내용 */}
                    <Route path="/" element={
                        <IntroduceUs active={label} />
                    } />
    
                </Routes>
            </main>
            <Footer />
        </div>
    );
}

export default Introduce;