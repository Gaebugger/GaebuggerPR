import React from 'react';
import Lottie from 'lottie-react';
import animationData from '../../assets/animation_lmx2u3qe.json';  // 이 부분을 실제 JSON 파일의 경로로 변경해주세요.

const Loading = () => {
    return (
        <div style={{ width: '700px', height: '700px' }}>
            <Lottie 
                animationData={animationData}
                style={{ width: '100%', height: '100%' }} 
            />
        </div>
    );
}

export default Loading;
