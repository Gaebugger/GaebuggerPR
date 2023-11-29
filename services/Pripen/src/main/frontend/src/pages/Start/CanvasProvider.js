import React, { createContext, useState, useContext } from 'react';
import html2canvas from 'html2canvas';

// 캔버스 데이터를 위한 Context 생성
const CanvasContext = createContext();

// Context를 사용하기 위한 훅
export const useCanvas = () => useContext(CanvasContext);

// 캔버스 데이터와 관련된 기능을 제공하는 Provider 컴포넌트
export const CanvasProvider = ({ children }) => {
  const [canvases, setCanvases] = useState({});
  const [captured, setCaptured] = useState({}); // 각 step별 캡처 여부를 추적

  // 캔버스 캡처 함수
  const captureCanvas = async (elementId, step) => {
    const uniqueId = `${step}-${elementId}`; // 단계와 elementId의 조합으로 고유 ID 생성
    console.log("unique id is " , uniqueId);
    if (captured[uniqueId]) return;  // 이미 캡처된 경우 중복 캡처 방지
  
    try {
      const element = document.getElementById(elementId);
      if (element) {
        const canvas = await html2canvas(element, { scale: 4 });
        setCanvases(prevCanvases => ({ ...prevCanvases, [uniqueId]: canvas }));
        setCaptured(prevCaptured => ({ ...prevCaptured, [uniqueId]: true }));
      }
    } catch (error) {
      console.error('Error capturing canvas:', error);
    }
  };

  const downloadImage = (canvas, filename) => {
    if (!canvas) return;

    const image = canvas.toDataURL('image/png');
    const downloadLink = document.createElement('a');
    downloadLink.href = image;
    downloadLink.download = `${filename}.png`;
    downloadLink.click();
  };

  const downloadAllImages = () => {
    Object.entries(canvases).forEach(([key, canvas]) => {
      downloadImage(canvas, key); // 각 캔버스에 대한 다운로드
    });
  };

  const contextValue = {
    canvases,
    captureCanvas,
    downloadAllImages // 모든 이미지를 다운로드하는 함수
  };

  return (
    <CanvasContext.Provider value={contextValue}>
      {children}
    </CanvasContext.Provider>
  );
};
