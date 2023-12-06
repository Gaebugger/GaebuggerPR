import React from "react";
import { Box, Card, CardContent, Typography, List, ListItem } from '@mui/material';

const TeamIntroduce = () => {
    const teamMembers = [
        {
            id: 1,
            name: "이선민",
            role: [
                "PM",
                "기획 총괄",
                "개인정보 리소스 제작"
            ],
            school: "성신여자대학교 정보보호학과",
            photo: "/assets/images/rnr/이선민.png"
        },
        {
            id: 2,
            name: "김윤서",
            role: [
                "개인정보부"
            ],
            school: "고려대학교 세종캠퍼스 인공지능보안학과",
            photo: "/assets/images/rnr/김윤서.jpg"
        },
        {
            id: 3,
            name: "김재윤",
            role: [
                "개인정보부"
            ],
            school: "중앙대학교 산업보안학과",
            photo: "/assets/images/rnr/김재윤.jpg"
        },
        {
            id: 4,
            name: "여신호",
            role: [
                "풀스택 개발",
                "인프라 구축"
            ],
            school: "세종대학교 정보보호학과",
            photo: "/assets/images/rnr/여신호.jpg"
        },
        {
            id: 5,
            name: "송창욱",
            role: [
                "LLM 개발",
                "챗봇 개발"
            ],
            school: "중앙대학교 산업보안학과",
            photo: "/assets/images/rnr/송창욱.jpg"
        },
        {
            id: 6,
            name: "정민규",
            role: [
                "챗봇 기능 개발"
            ],
            school: "선린인터넷고등학교 정보보호과",
            photo: "/assets/images/rnr/정민규.jpg"
        },
    ];
    

    return(
        <div style={{marginTop:'100px',marginLeft:'50px'}}>
            {/* <div className="Team-Name" style={{fontFamily:'NotoSansKR-SemiBold', fontSize:'32px', display:'flex', flexDirection:'column', justifyContent:'center', alignContent:'center', alignItems:'center'}}>
                <img src={TeamLogo} style={{width:'200px', height:'200px'}} />
                <h5>Team 개버거</h5>
            </div> */}

            <div className="Team-Content" style={{fontFamily:'NotoSansKR-Regular', fontSize:'18px'}}>
                <img src='/images/외부-전달용-간단-ver-002.png' style={{wdith:'100%', height:'100%'}} />
                

                <Typography style={{fontFamily:'NotoSansKR-Bold',fontSize:'2rem', margin:'50px'}}> 팀원 소개 </Typography>
                {/* 팀원 R&R 쓸 예정. 한명마다의 박스를 만들어서 역할, 학교, 이름 이런걸 쓸 예정 */}
                <Box className="Team-Content" sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', fontFamily: 'NotoSansKR-Regular', fontSize: '18px', m: 1 }}>
                    {/* 팀원 정보를 나타내는 카드 */}
                    {teamMembers.map(member => (
                        <Card key={member.id} sx={{ maxWidth: 345, m: 1, flexGrow: 1, flexBasis: '30%' }}>
                            <CardContent>
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <img src={member.photo} alt={member.name} style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
                                    <Typography gutterBottom variant="h5" component="div" style={{fontFamily:'NotoSansKR-SemiBold'}}>
                                        {member.name}
                                    </Typography>
                                    <List>
                                        {member.role.map((role, index) => (
                                            <ListItem key={index}>{role}</ListItem>
                                        ))}
                                    </List>
                                    <Typography variant="body2" color="text.secondary">
                                        {member.school}
                                    </Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            </div>
        </div>
    )

};

export default TeamIntroduce;