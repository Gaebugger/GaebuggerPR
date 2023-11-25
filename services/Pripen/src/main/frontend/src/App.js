import React, { useContext,useState } from 'react';
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Service from './pages/Services/Service';
import Guidelines from './pages/Guideline/Guidelines';
import StartIndex from './pages/Start/StartIndex';
import Contact from './pages/Contact/Contact';
import LoginLayout from './pages/account/LoginLayout';
import LoadingProvider, { LoadingContext } from './contexts/LoadingProvider';
import { AuthProvider } from './contexts/AuthContext';
import LoadingPage from './components/LoadingPage/LoadingPage';
import Signup from './pages/account/Signup/Signup';
import ChatBotBubbleButton from './components/chatbot/ChatBotBubbleButton';
import SignupMain from './pages/account/Signup/SignupMain';

function App() {

  return (
    <AuthProvider> {/* AuthProvider로 감싸주기 */}
      <LoadingProvider>
        <Router>
          <div> 
              <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/services/*" element={<Service />} />
                  <Route path="/start/*" element={<StartIndex />} />
                  <Route path="/guidelines" element={<Guidelines />} />
                  <Route path="/login" element={<LoginLayout />} />
                  <Route path="/signup" element={<SignupMain />} />
              </Routes>
              <ChatBotBubbleButton /> {/* ChatBotBubbleButton 렌더링 */}
          </div>
        </Router>
      </LoadingProvider>
    </AuthProvider>
  );
}
export default App;
