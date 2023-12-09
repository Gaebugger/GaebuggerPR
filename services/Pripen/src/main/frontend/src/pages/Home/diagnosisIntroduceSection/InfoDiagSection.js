import React from 'react';
import { useInView } from 'react-intersection-observer';
import { Row, Col, Image } from 'react-bootstrap'; // UI 프레임워크 사용
import './InfoDiagSection.css';
import image1 from '../../../assets/images/homeImages/Frame 29.png';
import image2 from '../../../assets/images/homeImages/homeImage3.png';
import image3 from '../../../assets/images/homeImages/homeImage4.png';
import image4 from '../../../assets/images/homeImages/homeImage5.png';


const InfoDiagItem = ({ imgSrc, title, description, index }) => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.5,
    });

    return (
        <Row ref={ref} className={inView ? 'animate' : 'row-hidden'} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', margin: "300px" }}>
            {index % 2 === 0 ? (
                <>
                    <Col md={6} className="row-container" style={{ marginRight: '100px' }}>
                        <Image src={imgSrc} fluid />
                    </Col>
                    <Col md={6} className="d-flex align-items-center" style={{ maxWidth:'500px', fontSize:'24px', fontFamily:'NotoSansKR-Regular', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <div>
                            <h2>{title}</h2>
                            <p style={{ wordWrap: 'break-word'}}>{description}</p>
                        </div>
                    </Col>
                </>
            ) : (
                <>
                    <Col md={6} className="d-flex align-items-center" style={{ maxWidth:'500px',fontSize:'24px', fontFamily:'NotoSansKR-Regular', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <div>
                            <h2>{title}</h2>
                            <p style={{ wordWrap: 'break-word' }}>{description}</p>
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
        { 
            imgSrc: image1, 
            title: '간편한 입력', 
            description: '개인정보 처리방침을 담고있는 txt파일 하나면 바로 이용하실 수 있어요'
        },
        { 
            imgSrc: image2, 
            title: '참고해야되는 모든 문서를 한번에', 
            description: '프라이펜은 \'개인정보 보호법\', \'개인정보 보호법 시행령\', \'개인정보 처리방침 작성지침\' 세 문서를 참고하여 5분안에 모두 진단합니다. ' },
        { 
            imgSrc: image3, 
            title: '문장 별 진단', 
            description: '문장 단위로 위반인지 아닌지 구체적으로 판단해드려요.' 
        },
        { 
            imgSrc: image4, 
            title: '구체적인 질문', 
            description: '결과를 봐도 아직 모르겠나요? 개인정보 처리방침 챗봇 비서를 통해 질문해보세요!' 
        },
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
