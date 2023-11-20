import React, { useRef, useState, useEffect } from 'react';
import { Pie } from '@nivo/pie';
import {  Typography } from '@mui/material';
import './PieChartComponent.css';
const PieChartComponent = ({ pieData, total }) => {
    const [isVisible, setIsVisible] = useState(false);
    const containerRef = useRef(null);

    const totalValue = pieData.reduce((sum, data) => {
        let additionalValue = data.value;
        if (data.label === "법률 위반") {
          additionalValue = data.value * 15;
        } else if (data.label === "법률 위반 위험") {
          additionalValue = data.value * 7;
        } else if (data.label === "작성지침 미준수") {
          additionalValue = data.value * 3;
        } else if (data.label === "기재 항목 누락") {
            additionalValue = data.score;
        }
        return sum + additionalValue;
      }, 0);
      
      const remainingValue = 100 - totalValue;
      
      // 변환된 pieData 생성
      const transformedPieData = [
        ...pieData.map(data => {
          let newValue = data.value;
          let num = data.value;
          if (data.label === "법률 위반") {
            newValue = data.value * 15;
            num = data.value;
          } else if (data.label === "법률 위반 위험") {
            newValue = data.value * 7;
            num = data.value;
          } else if (data.label === "작성지침 미준수") {
            newValue = data.value * 3;
            num = data.value;
          } else if(data.label === "기재 항목 누락"){
            newValue = data.score;
            num= data.value;
          }
          return { ...data, value: newValue, num: num };
        }),
        { id:"점수", label: "점수", value: remainingValue, num: 0, color: "#00CC00"} // 남은 값을 추가 항목으로 추가
      ];

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        setIsVisible(true);
                    }, 500);  
                }
            },
            {
                root: null,
                rootMargin: "0px",
                threshold: 0.1
            }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            if (containerRef.current) {
                observer.unobserve(containerRef.current);
            }
        }
    }, []);

    const filteredPieData = transformedPieData.filter(item => item.value > 0);
        // 부모 컨테이너의 크기에서 마진을 빼고 최소값의 절반을 반지름으로 사용합니다.
    const parentWidth = 450; // 부모 컴포넌트의 너비
    const parentHeight = 450; // 부모 컴포넌트의 높이
    const margin = { top: -120, right: 160, bottom: 0, left: 160 };
    const outerRadius = Math.min(
    parentWidth - margin.left - margin.right,
    parentHeight - margin.top - margin.bottom
    ) / 2;

    return (
        <div className="piechartComponent" ref={containerRef} style={{ display: 'flex', position: 'relative', flexDirection: 'column', alignItems: 'center', height: '450px', width: '450px', opacity: isVisible ? 1 : 0, transition: 'opacity 1s',marginLeft:"180px" }}>
            <Typography variant='h5' style={{ 
                        fontFamily: "NotoSansKR-Bold",
                        textAlign: 'center',
                        color: '#333',
                        position: 'absolute',
                        marginBottom: "20px",
                        fontSize: '2rem',
                        marginLeft:"20px"
                    }}>
                        감점 요인 차트
            </Typography>

            <Pie
                width={600}
                height={600}
                data={filteredPieData}
                margin={margin}
                innerRadius={0.8}
                outerRadius={outerRadius} // 예를 들어 부모 컨테이너의 크기가 450px이라면 여기서 계산
                padAngle={0.7}
                cornerRadius={3}
                colors={datum => datum.data.color}
                borderColor={{ from: 'color', modifiers: [['darker', 0.6]] }}
                animate={true}
                motionStiffness={90}
                motionDamping={15}
                tooltip={({ datum }) => (
                    <div
                        style={{
                            background: 'white',
                            padding: '10px',
                            borderRadius: '2px',
                            boxShadow: '0 3px 6px rgba(0,0,0,0.1)',
                            border: `1px solid ${datum.color}`,
                            fontFamily: "NotoSansKR-Regular"
                        }}
                    >
                        <strong style={{ color: datum.color }}>●</strong> <strong>{datum.data.label}:</strong> {datum.data.num} 건 위반
                    </div>
                )}
                theme={{
                    labels: {
                        text: {
                            fontFamily: "NotoSansKR-SemiBold",
                            fontSize: 15
                        }
                    }
                }}
                labelSkipWidth={16}
                labelSkipHeight={16}
            />
            <div className="allNum" style={{
                position: 'absolute',
                top: '53%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                fontSize: '50px',
                fontFamily: 'NotoSansKR-SemiBold',
                fontWeight: 'bold',
                marginLeft:"10px",
            }}>
                {total}건
            </div>
            <div className="pieChartDesc">
                <p style={{border:"2px solid #409eff", textAlign:"end", fontFamily:"NotoSansKR-SemiBold", padding: "10px",borderRadius:"10px", }}>점수가 0점 이하면 차트에 나타나지 않아요!</p>
            </div>
        </div>
    );
};

export default PieChartComponent;
