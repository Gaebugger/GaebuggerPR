import React,{ useState } from "react";
import { Button, List, ListItem, ListItemText, Switch, Typography, Divider } from "@mui/material";
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    listItem: {
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: '#f5f5f5'
        },
        margin: '10px 0', // 간격 조정
    },
    selected: {
        backgroundColor: '#e0e0e0', // 선택된 항목의 배경색 변경
        fontWeight: 'bold', // 선택된 항목의 글꼴 굵기 변경
    },
    primaryText: {
        fontWeight: 'bold', // 이름 강조
    },
    secondaryText: {
        color: 'gray', // 주소 부각 감소
    },
});

const modalStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh', // 뷰포트 높이 전체를 사용
};

const SignupForm3Duplication = ({ nextStep, handleModalClose, options, createCompanyData, userData, setUserData }) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [isUnique, setIsUnique] = useState(false);

    const classes = useStyles();

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setIsUnique(false); // 회사를 선택하면 '겹치는 것 없다'를 비활성화
    };

    const handleToggleUnique = () => {
        setIsUnique(!isUnique);
        setSelectedOption(null); // '겹치는 것 없다'를 활성화하면 선택된 회사 초기화
    };

    const handleConfirm = () => {
        if (isUnique) {
            createCompanyData();
        } else if (selectedOption) {
            // 선택된 회사의 companyId로 userData 업데이트
            setUserData({...userData, companyId: selectedOption.companyId});
            nextStep();
        }
        handleModalClose();
    };

    return (
        <div style={modalStyle}>
            <div style={{ padding: '20px', maxWidth: '500px', margin: 'auto', background:'white' }}>
                <Typography style={{fontFamily: "NotoSansKR-Bold", marginBottom:'30px',fontSize:'1.2rem'}}>입력하신 회사 상호와 동일한 상호들이 등록되어 있어요.<br/>같은 회사일 경우 선택해주세요!</Typography>
                <Divider style={{marginBottom:'10px'}}/>
                <List>
                    {options.map((option) => (
                        <ListItem
                            key={option.companyId}
                            className={`${classes.listItem} ${selectedOption === option ? classes.selected : ''}`}
                            onClick={() => handleOptionClick(option)}
                        >
                            <ListItemText
                                primary={option.companyName}
                                secondary={option.companyAddress}
                                classes={{ primary: classes.primaryText, secondary: classes.secondaryText }}
                            />
                        </ListItem>
                    ))}
                    <ListItem
                        className={`${classes.listItem} ${isUnique ? classes.selected : ''}`}
                        onClick={handleToggleUnique}
                    >
                        <ListItemText primary="새로운 회사이신가요?" secondary="이 곳을 클릭해주세요!"/>
                    </ListItem>
                </List>
                <Divider />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleConfirm}
                    style={{ float: 'right' }}
                >
                    확인
                </Button>
            </div>
        </div>
    );
};

export default SignupForm3Duplication;
