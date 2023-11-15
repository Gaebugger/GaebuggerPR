import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import Header from '../../components/header/header';
import Footer from '../../components/footer/Footer';
import './StartIndex.css';
import CheckEvaluate from './check/CheckEvaluate';
import { Routes, Route } from 'react-router-dom';
import Button from '@mui/material/Button';

function StartIndex() {
    return (
        <div className='startIndex-container'>
            <Header active="start"/>
            <main className='startIndex-content'>
                <Routes>
                    <Route path="/" element={
                        <div>
                            <p>안녕안녕</p>
                            <Link to="/start/check">
                                <Button>시작하기</Button>
                            </Link>
                        </div>
                        }
                    />
                    <Route path="/check" element={<CheckEvaluate />} />
                </Routes>
            </main>
            <Footer />
        </div>  
    );
}


export default StartIndex;
