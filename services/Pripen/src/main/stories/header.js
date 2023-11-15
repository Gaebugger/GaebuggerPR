import React from 'react';
import { Link } from 'react-router-dom';
import './fonts.css';

function Header({ active }) {
    return (
        <header className="home-header">
            <div className="logo">LOGO</div>
            <nav className="nav-links">
                <Link to="/services" className={active === "services" ? "active-link" : ""}>시작 하기</Link>
                <Link to="/guides" className={active === "guides" ? "active-link" : ""}>가이드</Link>
                <Link to="/about" className={active === "about" ? "active-link" : ""}>더 보기</Link>
            </nav>
            <div className="user-actions">
                <Link to="/login">로그인</Link>
                <Link to="/mypage">마이 페이지</Link>
            </div>
        </header>
    );
}

export default Header;