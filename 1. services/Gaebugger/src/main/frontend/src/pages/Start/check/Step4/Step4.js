import React, { useEffect, useState,useRef } from 'react';
import {  Typography, Paper, Box, Divider, List, ListItem, Container, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useSpring, animated } from 'react-spring';
import { ResponsiveBar } from '@nivo/bar';
import { ResponsivePie } from '@nivo/pie';
import '../compactContainer.css';
import './Step4.css';
import '../../../../assets/fonts/fonts.css';    
import IconButton from '@mui/material/IconButton';
import WarningIcon from '@mui/icons-material/Warning';
import CustomizedSteppers from '../../../../components/StepIndicator/StepIndicator';
import axios from "axios";

const StyledPaper = styled(Paper)({
    padding: '30px',
    borderRadius: '10px',
    marginTop: '20px',
    marginBottom: '20px',
});




function getDialogTitle(type) {
    switch(type) {
        case 'lawViolate':
            return '법률 위반 세부사항';
        case 'lawDanger':
            return '법률 위반 위험 세부사항';
        case 'guideViolate':
            return '작성지침 미준수 세부사항';
        case 'score':
            return '점수 산정 세부사항'
        default:
            return type;
    }
}
const getCommentByScore = (score) => {
    if (score >= 80) return "좋은 점수입니다. 몇 가지만 개선하면 안전한 작성지침을 작성하실수 있겠습니다.";
    if (score >= 60) return "개선이 필요해보이는 상황입니다. 가이드라인을 통해 바로 수정해보세요!";
    return "Needs Improvement";
}
function Step4({ processId, nextStep }) {
    const [open, setOpen] = useState(false);
    const [detailType, setDetailType] = useState("");
    const [visible, setVisible] = useState(false);
    const containerRef = useRef(null);

    // 임의의 테스트 데이터
    const mockServerData = {
        lawViolate: "3",
        lawDanger: "2",
        guideViolate: "1",
        score: 80,
        lawViolate_detail: ["Detail 1", "Detail 2", "Detail 3"],
        lawDanger_detail: ["Detail A", "Detail B", "Detail C"],
        guideViolate_detail: ["Detail X", "Detail Y", "Detail Z"],
        score_detail: ["Detail α", "Detail β", "Detail γ"],
    };

    const [serverData] = useState(mockServerData);

    const handleOpen = (type) => {
        console.log('Opening dialog for:', type);  // 이 부분을 추가
        setDetailType(type);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const [displayedScore, setDisplayedScore] = useState(0);
    const [showComment, setShowComment] = useState(false); // 추가 커멘트 표시 여부 상태
    
    

    
    useEffect(() => {
    
        const maxScore = serverData.score;
        const intervalTime = 10;
        const incrementValue = maxScore / (500 / intervalTime);
    
        const interval = setInterval(() => {
            setDisplayedScore(prevScore => {
                const newScore = prevScore + incrementValue;
                if (newScore >= maxScore) {
                    clearInterval(interval);
                    setShowComment(true);
                    return maxScore;
                }
                return Math.floor(newScore);
            });
            
        }, intervalTime);
    
        return () => clearInterval(interval);
    }, [serverData.score]);  // 의존성 배열에 visible을 추가
    
/*     const [serverData, setServerData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/check-response/${processId}`);
                if (response.status === 200) {
                    setServerData(response.data);
                }
            } catch (error) {
                console.error("Error fetching processed data", error);
            }
        };

        fetchData();
    }, [processId]);

    if (!serverData) return <Container className="compact-container">Loading...</Container>;

    const itemsArray = serverData.checkedItems; */


    const graphData = [
        {
            name: '법률 위반',
            사용자: serverData['lawViolate'],
            평균: 2,
        },
        {
            name: '법률 위반 위험',
            사용자: serverData['lawDanger'],
            평균: 1,
        },
        {
            name: '작성지침 미준수',
            사용자: serverData['guideViolate'],
            평균: 1,
        },
    ];
    
    const pieData = [
        {
            "id": "법률 위반",
            "label": "법률 위반",
            "value": 3
        },
        {
            "id": "법률 위반 위험",
            "label": "법률 위반 위험",
            "value": 2
        },
        {
            "id": "작성지침 미준수",
            "label": "작성지침 미준수",
            "value": 1
        }
    ];
    const AnimatedContainer = animated(Container);
    return (
        <Container className="compact-container">
            <CustomizedSteppers activeStep={3} />
            <Divider style={{margin: "50px", opacity:0}} />
            {/* 다양한 항목들 */}
            <Box display="flex" justifyContent="space-between" my={4}>
                {[
                    { key: 'lawViolate', label: '법률 위반', color: '#007BFF' },   // 바다 색상
                    { key: 'lawDanger', label: '법률 위반 위험', color: '#4CAF50' }, // 에메랄드 색상
                    { key: 'guideViolate', label: '작성지침 미준수', color: '#2E8B57' }, // 에메랄드 조금 더 진한 색상
                ].map(({ key, label, color }) => (
                    <Box key={key} p={2} border={`2px solid ${color}`} borderRadius={16} textAlign="center" flexGrow={1} mx={2} width="200px"  height="200px" >
                        <Typography variant="h6" style={{ fontFamily: "NotoSansKR-SemiBold", color: color }}>
                            {label}
                        </Typography>
                        <br/>
                        <Typography variant="h4" style={{ color: color, fontWeight: 'bold',fontFamily: "NotoSansKR-Bold", margin: '12px 0' }}>
                            {serverData[key]}건
                        </Typography>
                        <br/>
                        <Button onClick={() => handleOpen(key)} variant="outlined" size="small" style={{ borderColor: color, color: color,fontFamily: "NotoSansKR-Regular" }}>
                            자세히보기
                        </Button>
                    </Box>
                ))}
            </Box>
        
        <br/>
        <br/>
        <Typography variant='h3' style={{ fontFamily: "NotoSansKR-Bold", textAlign: "center"}}>
            평균 처리방침 진단 결과 비교
        </Typography>
        <Divider style={{margin: "50px", opacity:0}} />
        
        <div style={{ height: '400px' }}>
                <ResponsiveBar
                    data={graphData}
                    keys={['사용자', '평균']}
                    indexBy="name"
                    margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                    layout="vertical"
                    borderRadius={4}
                    padding={0.6}
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
                        legend: '항목',
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
            </div>
            <Divider style={{margin: "50px", opacity:0}} />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '450px', width: '450px', margin: '0 auto' }}>
                <ResponsivePie
                    data={pieData}
                    margin={{ top: 40, right: 120, bottom: 80, left: 120 }}
                    innerRadius={0.5}
                    padAngle={0.7}
                    cornerRadius={3}
                    colors={['#007BFF', '#4CAF50', '#2E8B57']}
                    borderColor={{ from: 'color', modifiers: [['darker', 0.6]] }}
                    animate={true}
                    motionStiffness={90}
                    motionDamping={15}
                />
                <Typography variant='h5' style={{ 
                    fontFamily: "NotoSansKR-SemiBold",
                    textAlign: 'center',
                    marginTop: '0px',
                    color: '#333'
                }}>
                    사용자님의 위험도 그래프
                </Typography>
            </div>




            <Divider style={{margin: "100px", opacity:0}} />

            {/* 점수 표시 */}
            <Box display="flex" flexDirection="column" alignItems="center" my={4} position="relative">
                <Typography variant="h3" style={{ fontFamily: "NotoSansKR-Medium" }}>
                    개인정보 처리방침 진단 점수
                </Typography>
                <Typography variant="h2" style={{ margin:"20px", fontFamily: "NotoSansKR-Bold", fontWeight: 'bold' }}>
                    {displayedScore}
                </Typography>
                <br/>
                {showComment && (
                    <React.Fragment>
                        <Typography variant="h6" style={{ marginTop: '10px', fontFamily: "NotoSansKR-Medium" }}>
                            {getCommentByScore(displayedScore)}
                        </Typography>

                        <Button 
                            variant="outlined" 
                            size="small"
                            style={{ marginTop: '30px', fontFamily: "NotoSansKR-Regular" }} 
                            onClick={() => handleOpen('score')}
                        >
                            자세히보기
                        </Button>
                    </React.Fragment>
                )}
            </Box>

            <Box display="flex" justifyContent="flex-end" mt={4}>
                <Button onClick={nextStep} variant="outlined" color="primary" style={{fontFamily: "NotoSansKR-Bold"}}>상세 가이드라인</Button>
            </Box>

            {/* 자세히 보기 팝업 */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{getDialogTitle(detailType)}</DialogTitle>
                <DialogContent>
                    <List>
                        {detailType && serverData[`${detailType}_detail`] && serverData[`${detailType}_detail`].map((detail, index) => (
                            <ListItem key={index}>
                                <Typography>{detail}</Typography>
                            </ListItem>
                        ))}
                    </List>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        닫기
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
    
}

export default Step4;
