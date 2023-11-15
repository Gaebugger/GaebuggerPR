import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography,Divider } from '@mui/material';
import Icon from '@mui/material/Icon';
import WarningIcon from '@mui/icons-material/Warning';
import FmdBadIcon from '@mui/icons-material/FmdBad';
import RuleFolderIcon from '@mui/icons-material/RuleFolder';
import "../../assets/fonts/fonts.css";
import CategoryPopover from '../categoryPopover/categoryPopover';

const ResultBoxSection = ({ serverData }) => {
    const [isVisible, setIsVisible] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        setIsVisible(true);
                    }, 250);  
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
        };
    }, []);

    return (
        <div>
            <h2 style={{marginLeft:'20px',fontFamily: "NotoSansKR-Medium"}}>유형 별 진단 결과</h2>
            <Divider style={{marginBottom:'10px'}} />
            <div style={{display:"flex", justifyContent: "space-between"}}>
                <h3 style={{marginLeft:"25px", fontFamily:"NotoSansKR-Medium", color:"#999"}}>진단 유형별로 몇 건 위반했는지 확인해보세요</h3>
                <div className="whatisIssue" style={{display:"flex",justifyContent:"end", alignItems:"center", marginRight:"20px"}}>
                    <h5 style={{marginRight:"10px",fontFamily:"NotoSansKR-Light"}}>각 진단 유형은 어떤 의미를 가지고 있나요?</h5>
                    <CategoryPopover />
                </div>
            </div>
            <Box ref={containerRef} display="flex" justifyContent="space-between" my={4} style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 1s',marginTop:"40px",marginLeft:"20px",marginRight:"20px" }}>
                {[
                    { key: 'lawViolate', label: '법률 위반', color: '#D32F2F', icon:<WarningIcon fontSize="large"/> },
                    { key: 'lawDanger', label: '법률 위반 위험', color: '#FF9800', icon: <FmdBadIcon fontSize="large"/> },
                    { key: 'guideViolate', label: '작성지침 미준수', color: 'gold', icon: <RuleFolderIcon fontSize="large"/>},
                    { key: 'omissionParagraph', label: '기재 항목 누락', color: 'purple', icon: <RuleFolderIcon fontSize="large"/>},
                ].map(({ key, label, color, icon }) => (
                    <Box key={key} p={3} borderRadius={15}  boxShadow={3} backgroundColor="#FFFFFF" textAlign="center" flexGrow={1} mx={2} width="200px" height="150px">
                        <Icon style={{ color: color, display:'inline'}}>{icon}</Icon>
                        <Typography variant="subtitle1" style={{ fontFamily: "NotoSansKR-SemiBold", marginTop: '10px', color: '#555' }}>
                            {label}
                        </Typography>
                        <Typography variant="h4" style={{ color: color, fontWeight: 'bold', fontFamily: "NotoSansKR-Bold", margin: '10px 0' }}>
                            {serverData[key]}건
                        </Typography>
                    </Box>
                ))}
            </Box>
        </div>
    );
};

export default ResultBoxSection;
