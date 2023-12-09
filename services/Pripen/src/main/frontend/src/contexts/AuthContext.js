import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie'; 
import axios from 'axios';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // 로그인 함수
    const login = () => {
        setIsLoggedIn(true);
    };

    const logout = async () => {
        try {
            // 백엔드 로그아웃 API 호출, withCredentials을 true로 설정하여 쿠키를 함께 보냅니다.
            await axios.delete('https://backapi.pri-pen.com/userAuthentication/logout', {
                withCredentials: true
            });

            setIsLoggedIn(false); // 로그아웃 성공 후 상태 변경

        } catch (error) {
            console.error('Logout failed', error);
            // 에러 처리 로직
        }
    };



    // AuthContext에 전달할 값
    const authContextValue = {
        isLoggedIn,
        setIsLoggedIn,
        login,
        logout

    };

    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
};

