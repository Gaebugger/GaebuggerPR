import React from 'react';
import { useInView } from 'react-intersection-observer';
import { Row, Col, Image } from 'react-bootstrap'; // UI 프레임워크 사용
import './InfoDiagSection.css';
import image1 from '../../../assets/images/Login_Prototype.png';
import image2 from '../../../assets/images/Login_Prototype.png';
import image3 from '../../../assets/images/Login_Prototype.png';
import image4 from '../../../assets/images/Login_Prototype.png';

const InfoDiagSection = () => {
    // 각 행마다 뷰포트 감지용
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.5,
    });

    // 이미지와 설명의 내용
    const content = [
        { imgSrc: image1, title: '간편한 입력', description: '설명 1' },
        { imgSrc: image2, title: '빠른 진단', description: '설명 2' },
        { imgSrc: image3, title: '직관적이고 한눈에 볼 수 있는 결과', description: '설명 3' },
        { imgSrc: image4, title: '구체적인 질문', description: '설명 4' },
    ];
    
    return (
        <div>
            {content.map((item, index) => (
                <Row key={index} ref={ref} className={inView ? 'animate' : ''} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', margin: "100px" }}>
                    {index % 2 === 0 ? (
                        <>
                            <Col md={6} className="row-container" style={{ marginRight: '300px' }}>
                                <Image src={item.imgSrc} fluid />
                            </Col>
                            <Col md={6} className="d-flex align-items-center" style={{ display:'flex', flexDirection:'column',justifyContent: 'center' ,alignItems:'center'}}>
                                <div>
                                    <h2>{item.title}</h2>
                                    <p>{item.description}</p>
                                </div>
                            </Col>
                        </>
                    ) : (
                        <>
                            <Col md={6} className="d-flex align-items-center" style={{ display:'flex', flexDirection:'column', justifyContent: 'center' ,alignItems:'center'}}>
                                <div>
                                    <h2>{item.title}</h2>
                                    <p>{item.description}</p>
                                </div>
                            </Col>
                            <Col md={6} className="row-container" style={{ marginLeft: '300px' }}>
                                <Image src={item.imgSrc} fluid />
                            </Col>
                        </>
                    )}
                </Row>
            ))}
        </div>
    );
    
};

export default InfoDiagSection;
