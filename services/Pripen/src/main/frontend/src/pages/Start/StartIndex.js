import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import Header from '../../components/header/header';
import Footer from '../../components/footer/Footer';
import './StartIndex.css';
import CheckEvaluate from './check/CheckEvaluate';
import { Routes, Route } from 'react-router-dom';
import Button from '@mui/material/Button';
import { CanvasProvider } from './CanvasProvider';
import FuncIntro from './FuncIntro';

function StartIndex() {
    return (
        <div className='startIndex-container'>
            <Header active="start"/>
            <main className='startIndex-content'>
                <Routes>
                    <Route path="/" element={
                        <FuncIntro />
                        }
                    />
                    <Route path="/check" element={
                        <CanvasProvider>
                            <CheckEvaluate />
                        </CanvasProvider>
                    } />
                </Routes>
            </main>
            <Footer />
        </div>  
    );
}


export default StartIndex;
