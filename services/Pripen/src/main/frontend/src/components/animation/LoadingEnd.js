import React from 'react';
import Lottie from 'lottie-react';
import animationData from '../../assets/ReadyToNext.json';

const LoadingEnd = () => {
    return (
        <div style={{ width: '250px', height: '250px' }}>
            <Lottie 
                animationData={animationData}
                loop={true}
                style={{ width: '100%', height: '100%' }} 
            />
        </div>
    );

}

export default LoadingEnd;