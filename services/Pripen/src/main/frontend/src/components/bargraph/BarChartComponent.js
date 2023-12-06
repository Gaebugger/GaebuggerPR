import React, { useState, useRef, useEffect } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { RadioGroup, FormControlLabel, Radio, FormControl, Typography } from '@mui/material';
import '../../assets/fonts/fonts.css';
import { useCanvas } from '../../pages/Start/CanvasProvider';
const BarChartComponent = ({ data }) => {
    const {captureCanvas} = useCanvas();
    const [isVisible, setIsVisible] = useState(false); // 기본적으로는 보이지 않게 설정
    const chartRef = useRef(null);
    const [selectedValue, setSelectedValue] = useState('allType');
    const [currentKeys, setCurrentKeys] = useState(['사용자', '전체평균']);
    const handleRadioChange = (event) => {
        const value = event.target.value;
        if (value === "allType") {
            // 평균 데이터로 변경하는 로직
            setSelectedValue(event.target.value);

        } else if(value ===data[0].사용자유형) {
            // 원래 데이터로 복귀하는 로직
            setSelectedValue(event.target.value);
        }
    };

    useEffect(() => {
        if (selectedValue === "allType") {
            setCurrentKeys(['사용자', '전체평균']);
        } else if (selectedValue === data[0].사용자유형 && data.length > 0) {
            console.log(data[0].사용자유형);
            setCurrentKeys(['사용자', '사용자업종평균']); // 예를 들어 "menuFacture평균"으로 변환
        }
    }, [selectedValue, data]);

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        setIsVisible(true);
                        setTimeout(() => {
                            captureCanvas('section3', 4); // 추가적인 1.5초 후에 captureCanvas 호출
                        }, 1500);
                    }, 500);  // 1.5초 기다린 후 에니메이션 시작
                    if (chartRef.current) {
                        observer.unobserve(chartRef.current);
                    }
                }
            });
        });
    
        if (chartRef.current) {
            observer.observe(chartRef.current);
        }
    
        return () => {
            if (chartRef.current) {
                observer.unobserve(chartRef.current);
            }
        };
    }, []);


    const userType=data.IndustryType;
    
    return (
        <div id="section3" ref={chartRef} style={{ height: '400px' ,border:'3px solid #f0f0f0', marginLeft:"20px", marginRight:"20px",borderRadius:"10px"}}>

            {/* 라디오 버튼 추가 */}
            <FormControl component="fieldset" style={{ display: 'flex' }}>
                <RadioGroup style={{ position: 'absolute', right: '0' }} row aria-label="data" name="row-radio-buttons-group" value={selectedValue} onChange={handleRadioChange}>
                    <FormControlLabel 
                        value="allType" 
                        control={<Radio />} 
                        label={<Typography style={{ fontFamily: 'NotoSansKR-Regular', fontSize: '14px', color: 'black' }}>전체평균</Typography>} 
                    />
                    <FormControlLabel 
                        value={data[0].사용자유형}
                        control={<Radio />} 
                        label={<Typography style={{ fontFamily: 'NotoSansKR-Regular', fontSize: '14px', color: 'black' }}>{data[0].사용자유형}</Typography>} 
                    />
                </RadioGroup>
            </FormControl>

            {isVisible && (

            <ResponsiveBar
                data={data}
                keys={currentKeys}
                indexBy="name"
                margin={{ top: 50, right: 170, bottom: 50, left: 60 }}
                layout="vertical"
                borderRadius={4}
                padding={0.7}
                enableGridX={false}
                enableGridY={false}
                fontFamily="NotoSansKR-SemiBold"
                groupMode="grouped"
                colors={['#0000FF', '#B0E0E6']}
                theme={{
                    fontFamily:"NotoSansKR-SemiBold",
                    fontSize: 14,
                    axis: {
                        domain: {
                            line: {
                                stroke: "#D9D9D9",
                                strokeWidth: 1
                            }
                        },
                        ticks: {
                            line: {
                                stroke: "#D9D9D9",
                                strokeWidth: 0.5
                            }
                        },
                        
                    },
                    grid: {
                        line: {
                            stroke: "#ddd",
                            strokeWidth: 0.5
                        }
                    },
                    labels: {
                        text: {
                            fill: "#FF0000"
                        }
                    }
                }}


                borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legendPosition: 'middle',
                    legendOffset: 32    
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: '건수',
                    legendPosition: 'middle',
                    legendOffset: -40,
                    tickValues:[0,2,4,6,8,10],
                }}
                labelSkipWidth={12}
                labelSkipHeight={12}
                
                labelTextColor="#FFFFFF"
                legends={[
                    {
                        dataFrom: 'keys',
                        anchor: 'bottom-right',
                        direction: 'column',
                        justify: false, 
                        translateX: 120,
                        translateY: 0,
                        itemsSpacing: 2,
                        itemWidth: 100,
                        itemHeight: 20,
                        itemDirection: 'left-to-right',
                        itemOpacity: 0.85,
                        symbolSize: 20,
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemOpacity: 1  
                                }
                            }
                        ]
                    }
                ]}
                animate={true}
                motionStiffness={90}
                motionDamping={15}
            />
            )}
        </div>
    );
};

export default BarChartComponent;
