import React, { useContext,useState,useEffect } from 'react';
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Introduce from './pages/Introduces/Introduce';
import Guidelines from './pages/Guideline/Guidelines';
import StartIndex from './pages/Start/StartIndex';
import Contact from './pages/Contact/Contact';
import LoginLayout from './pages/account/LoginLayout';
import LoadingProvider, { LoadingContext } from './contexts/LoadingProvider';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoadingPage from './components/LoadingPage/LoadingPage';
import Signup from './pages/account/Signup/Signup';
import ChatBotBubbleButton from './components/chatbot/ChatBotBubbleButton';
import SignupMain from './pages/account/Signup/SignupMain';

function App() {
  const { setIsLoggedIn } = useAuth();

  useEffect(() => {
      // 브라우저의 쿠키에서 "accessToken" 찾기
      const isLoggedIn = document.cookie.split(';').some((item) => item.trim().startsWith('accessToken='));
      setIsLoggedIn(isLoggedIn);
  }, []);
  return (
      <LoadingProvider>
        <Router>
          <div> 
              <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/introduce/*" element={<Introduce />} />
                  <Route path="/start/*" element={<StartIndex />} />
                  <Route path="/guidelines" element={<Guidelines />} />
                  <Route path="/login" element={<LoginLayout />} />
                  <Route path="/signup" element={<SignupMain />} />
              </Routes>
              <ChatBotBubbleButton /> {/* ChatBotBubbleButton 렌더링 */}
          </div>
        </Router>
      </LoadingProvider>
  );
}
export default App;
