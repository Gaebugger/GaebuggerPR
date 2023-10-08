import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography } from '@mui/material';
import Icon from '@mui/material/Icon';
import WarningIcon from '@mui/icons-material/Warning';
import FmdBadIcon from '@mui/icons-material/FmdBad';
import RuleFolderIcon from '@mui/icons-material/RuleFolder';
const ResultBoxSection = ({ serverData, handleOpen }) => {
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
        <div >
            <h3 style={{marginLeft:'30px'}}>항목별 진단</h3>
            <Box ref={containerRef} display="flex" justifyContent="space-between" my={4} style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 1s' }}>
                {[
                    { key: 'lawViolate', label: '법률 위반', color: '#D32F2F', icon:<WarningIcon fontSize="large"/> },
                    { key: 'lawDanger', label: '법률 위반 위험', color: '#FF9800', icon: <FmdBadIcon fontSize="large"/> },
                    { key: 'guideViolate', label: '작성지침 미준수', color: '#FFEB3B', icon: <RuleFolderIcon fontSize="large"/>},
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