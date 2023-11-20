import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import '../../assets/fonts/fonts.css';
import './header.css';
import logoImage from '../../assets/images/pripen_logo.svg';
import {useAuth} from '../../contexts/AuthContext';
import { Button } from '@mui/material';
import { useEffect } from 'react';
const Header = ({ active }) => {
    const [showContactDropdown, setShowContactDropdown] = useState(false);
    const [showServicesDropdown, setShowServicesDropdown] = useState(false);
    const { isLoggedIn, logout } = useAuth();
    const navigate = useNavigate();
    const CustomDropdown = ({ isOpen, items, onClose }) => {
        if (!isOpen) return null;

        return (
            <div className="dropdown-menu" onMouseLeave={onClose}>
                {items.map((item, idx) => (
                    <Link key={idx} to={item.link} className="dropdown-item">
                        {item.label}
                    </Link>
                ))}
            </div>
        );
    };
    const handleLogout = () => {

        logout();
        navigate('/');

    };


    return (
        <header className="header-container">
            <div className="logo_menu">
                <div className="logo">
                    <Link to="/">
                        <img src={logoImage} alt="LOGO" style={{width:"130%", marginTop:"-10px"}} />
                    </Link>
                </div>
            </div>
            <nav className="menu-structure">
                <ul className='menu-Container'>
                    <li 
                        className='platform'
                        onMouseEnter={() => setShowContactDropdown(true)}
                        onMouseLeave={() => setShowContactDropdown(false)}
                    >
                        <Link to="/contact" className={active === "contact" ? "active-link" : ""}>주요 기능</Link>
                        <CustomDropdown 
                            isOpen={showContactDropdown}
                            items={[
                                { label: '파도는', link: '/contact/subpage1' },
                                { label: 'contact us', link: '/contact/subpage2' }
                            ]}
                        />
                    </li>
                    <li 
                        onMouseEnter={() => setShowServicesDropdown(true)}
                        onMouseLeave={() => setShowServicesDropdown(false)}
                    >
                        <Link to="/services" className={active === "services" ? "active-link" : ""}>사용 사례</Link>
                        <CustomDropdown 
                            isOpen={showServicesDropdown}
                            items={[
                                { label: '개인정보 처리방침 진단', link: '/services/check' },
                                { label: '하위 페이지 2', link: '/contact/subpage2' }
                            ]}
                        />
                    </li>
                    <li>
                        <Link to="/guidelines" className={active === "guidelines" ? "active-link" : ""}>리소스</Link>
                    </li>
                    <li>
                        <Link to="/guidelines" className={active === "guidelines" ? "active-link" : ""}>사용 문의</Link>
                    </li>
                    <li>
                        <Button 
                            variant="outlined" 
                            component={Link} 
                            to="/start" 
                            className={active === "start" ? "active-link-button" : ""}
                            style={{
                                marginLeft: '5px',
                                marginTop:'0px',
                                fontFamily: 'NotoSansKR-SemiBold',
                                textDecoration: 'none',

                                borderColor: '#4287f5',
                                color: '#4287f5',
                                background: 'transparent',
                                transition: 'background-color 0.3s ease',
                                '&:hover': {
                                    background: 'rgba(66, 135, 245, 0.1)',
                                }
                            }}
                        >
                            시작하기
                        </Button>
                    </li>
                </ul>
            </nav>
            {/* 로그인 상태에 따른 UI 변경 */}
            {isLoggedIn? (
                <div className="authentication">
                    <Link to="/mypage">마이 페이지</Link>
                    <button onClick={handleLogout}>로그아웃</button>
                </div>
            ) : (
                <div className="authentication">
                    <Link to="/login">로그인</Link>
                </div>
            )}
        </header>
    );
}

export default Header;
