import React from 'react';
import { useInView } from 'react-intersection-observer';
import { Row, Col, Image } from 'react-bootstrap'; // UI 프레임워크 사용
import './InfoDiagSection.css';
import image1 from '../../../assets/images/homeImages/Frame 29.png';
import image2 from '../../../assets/images/Login_Prototype.png';
import image3 from '../../../assets/images/Login_Prototype.png';
import image4 from '../../../assets/images/Login_Prototype.png';


const InfoDiagItem = ({ imgSrc, title, description, index }) => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.5,
    });

    return (
        <Row ref={ref} className={inView ? 'animate' : 'row-hidden'} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', margin: "100px" }}>
            {index % 2 === 0 ? (
                <>
                    <Col md={6} className="row-container" style={{ marginRight: '100px' }}>
                        <Image src={imgSrc} fluid />
                    </Col>
                    <Col md={6} className="d-flex align-items-center" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <div>
                            <h2>{title}</h2>
                            <p>{description}</p>
                        </div>
                    </Col>
                </>
            ) : (
                <>
                    <Col md={6} className="d-flex align-items-center" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <div>
                            <h2>{title}</h2>
                            <p>{description}</p>
                        </div>
                    </Col>
                    <Col md={6} className="row-container" style={{ marginLeft: '100px' }}>
                        <Image src={imgSrc} fluid />
                    </Col>
                </>
            )}
        </Row>
    );
};

const InfoDiagSection = () => {
    const content = [
        { imgSrc: image1, title: '간편한 입력', description: '개인정보 처리방침을 담고있는 txt파일 하나면 바로 이용하실 수 있어요' },
        { imgSrc: image2, title: '빠른 진단', description: '설명 2' },
        { imgSrc: image3, title: '직관적이고 한눈에 볼 수 있는 결과', description: '설명 3' },
        { imgSrc: image4, title: '구체적인 질문', description: '설명 4' },
    ];

    return (
        <div>
            {content.map((item, index) => (
                <InfoDiagItem key={index} imgSrc={item.imgSrc} title={item.title} description={item.description} index={index} />
            ))}
        </div>
    );
};

export default InfoDiagSection;
