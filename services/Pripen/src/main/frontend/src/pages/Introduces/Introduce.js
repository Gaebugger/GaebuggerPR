import React from 'react';
import { Link, Routes, Route, Outlet,useLocation } from 'react-router-dom';
import CheckEvaluate from "../Start/check/CheckEvaluate";
import Header from '../../components/header/header';
import Footer from "../../components/footer/Footer";
import { useInView } from 'react-intersection-observer';
import './Service.css';
import '../../assets/fonts/fonts.css';

function Introduce() {
    const location = useLocation();
    return (
        <div className="Introduce-container">
            <Header active="Introduce" />

            <main className="Introduce-content">
                <Routes>
                    {/* /services 경로에 대한 내용 */}
                    <Route path="/" 
                    
                    />
    
                </Routes>
            </main>
            <Footer />
        </div>
    );
}

export default Introduce;