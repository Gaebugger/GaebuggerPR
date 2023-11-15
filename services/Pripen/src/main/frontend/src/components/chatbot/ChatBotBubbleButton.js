import React, {useState,useEffect} from 'react';
import './ChatBotBubbleButton.css';
import '../../assets/fonts/fonts.css';
import PriPenSvg from '../../assets/images/chatbotIcon.png'; // SVG 파일을 React 컴포넌트로 불러옵니다.
import Spinner from './Spinner'; // 실제 경로로 교체해야 합니다.

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}

const ChatBotBubbleButton = () => {
    // iframe 로딩 상태를 추적하기 위한 state
    const [iframeLoading, setIframeLoading] = useState(true);

    // 버튼의 상태를 추적하기 위한 state
    const [isHovered, setIsHovered] = React.useState(false);
    const [isActive, setIsActive] = React.useState(false);
  
    const [showIframe, setShowIframe] = useState(false); // iframe 표시 상태 추가

    const [width, height] = useWindowSize();
  // 버튼 스타일을 정의합니다.
  const fixedButtonStyle = {
    position: 'fixed',
    bottom: '20px',
    right: '40px',
    backgroundColor: 'white', // 배경 색을 하얀색으로 변경합니다.
    border: '3px solid #409eff', // 테두리 색을 파란색으로 변경합니다.
    color: 'black', // 텍스트 색을 검정색으로 변경합니다.
    padding: '10px 20px', // 패딩을 조정합니다.
    textAlign: 'center',
    textDecoration: 'none',
    fontSize: '16px',
    margin: '4px 2px',
    borderRadius: '10px',
    cursor: 'pointer',
    height: "100px",
    // borderRadius: '50%', // 동그라미 모양을 제거합니다.
    boxShadow: '0 5px 10px rgba(0, 0, 0, 0.2)',
    transition: 'all 0.3s ease', // 모든 트랜지션을 부드럽게 처리합니다.
    zIndex: 1000,
    overflow: 'hidden', // 오버플로우를 숨깁니다.
    whiteSpace: 'nowrap', // 텍스트가 줄바꿈되지 않도록 처리합니다.
    maxWidth: 'none', // maxWidth 제거 또는 적절한 값으로 조정
    
    display: 'flex',
    flexDirection: 'row', // 아이템을 가로로 배치
    justifyContent: 'center',
    alignItems: 'center',
    gap: '30px', // 아이콘과 텍스트 사이의 간격을 지정
  };

    // 아이콘 스타일
  const iconStyle = {
    flexShrink: 0, // 아이콘이 축소되지 않도록 설정
    width: '70px', // 아이콘의 너비 고정
    height: 'auto', // 아이콘의 높이 자동 조절
    transition: 'none', // 호버할 때 크기가 변하지 않도록
  };
  // 버튼 호버 시 스팬 요소에 적용될 스타일
  const spanStyle = {
    display: 'inline-block', // 인라인 블록 요소로 변경
    maxWidth: isHovered ? '500px' : '0', // 충분한 너비를 제공하되, 호버되지 않을 때는 0으로 설정
    visibility: isHovered ? 'visible' : 'hidden', // 호버 상태에 따라 가시성 변경
    opacity: isHovered ? 1 : 0, // 호버 상태에 따라 투명도 변경
    transition: 'max-width 0.3s ease, opacity 0.3s ease, visibility 0.3s ease', // 부드러운 전환 효과
    verticalAlign: 'middle', // 세로축 중앙 정렬
    textAlign:"start"

  };
  const contentContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };
  const bubbleButtonHover = {
    // 기존 스타일 유지
    // ...
    maxWidth: '100%', // 호버 시 최대 너비 (필요에 따라 조절)
    transition: 'max-width 0.3s ease', // 너비 변경에 대한 부드러운 전환 효과
  };

  // iframe의 로딩이 완료됐을 때 호출되는 함수
  const handleIframeLoad = () => {
    console.log("loading end!");
    setIframeLoading(false); // 로딩 상태를 false로 설정
  };

  // 버튼 클릭 이벤트 핸들러
  const handleClick = () => {
    if(!showIframe){
      console.log("button active!");
      setShowIframe(true);
    }
    else{
      console.log("button inactive!");
      setShowIframe(false);
    }
    // 기타 onClick 이벤트 관련 로직이 있다면 여기에 추가
  };
  const iframeStyle = {
    position: 'fixed',
    bottom: showIframe ? '120px' : '-600px', // showIframe이 true일 때는 보이는 위치에, false일 때는 화면 밖에 위치하게 합니다.
    right: '20px',
    zIndex: 999,
    transition: 'bottom 0.5s', // 부드러운 전환 효과
  };


  return (
    <>
      <button
        style={{
          ...fixedButtonStyle,
          ...(isHovered && bubbleButtonHover),
        }}
        onClick={handleClick} // 클릭 이벤트 핸들러 변경
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseDown={() => setIsActive(true)}
        onMouseUp={() => setIsActive(false)}
        onTouchStart={() => setIsActive(true)}
        onTouchEnd={() => setIsActive(false)}
      >
        <div style={contentContainerStyle}>
          <img src={PriPenSvg} alt="ChatBot 버튼" style={iconStyle} />
          <span style={spanStyle}>
            <span style={{ fontSize:"20px",fontFamily:"NotoSansKR-Bold" }}>&nbsp;&nbsp;&nbsp;&nbsp;프라이펜 비서</span>
            <br />
            <span style={{fontFamily:"NotoSansKR-SemiBold", color:"darkgrey"}}>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;개인정보와 관련된 모든 걸 물어보세요. 
            </span>
          </span>
        </div>
      </button>


      {/* iframe을 조건부 렌더링 대신 항상 렌더링하되 위치를 변경합니다. */}
      <div style={iframeStyle}>
      {iframeLoading && showIframe && <Spinner />}
        <iframe
          src={process.env.REACT_APP_CHATBOT_URL}
          style={{
            backgroundColor:"white",
            width: width > 768 ? '400px' : '100%', // 768px 이상인 경우 400px, 미만인 경우 전체 너비
            height: width > 768 ? '550px' : '300px', // 768px 이상인 경우 550px, 미만인 경우 300px
            border: '2px solid #d9d9d9',
            marginRight: '30px',
            borderRadius: '20px',
            frameBorder: '0',
            allowTransparency: 'true',
            allow: 'encrypted-media',
            boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)' // 여기에 그림자 스타일을 추가합니다.
          }}
          onLoad={handleIframeLoad}
        ></iframe>
      </div>
    </>
  );
};

export default ChatBotBubbleButton;
