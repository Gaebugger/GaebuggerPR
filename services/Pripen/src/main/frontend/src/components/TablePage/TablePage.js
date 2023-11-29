import {StyledPaper} from "../../pages/Start/check/Guideline_detail/styles/ComponentStyles";
import {
    Typography,
    Box, Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Table,
    TableBody,
    TableCell,
    TableHead, TablePagination,
    TableRow
} from "@mui/material";
import React, {useEffect, useState} from "react";
import { styled } from '@mui/system';
import '../../assets/fonts/fonts.css';
import BestPractice from "../bestpractice/BestPractice";

const StyledTablePagination = styled(TablePagination)(({ theme ,page,count,rowsPerPage}) => ({
    display: 'flex',
    width: '100%',
    justifyContent: 'space-around',
    overflow: 'unset',
    alignItems: 'center',
    '& .MuiTablePagination-toolbar': {
        flex: 1,
        display: 'flex',
        justifyContent: 'space-between',
    },
    '& .MuiTablePagination-spacer': {
        flex: 0,

    },
    '& .MuiTablePagination-selectLabel': {
        marginLeft:"10px",
    },
    '& .MuiToolbar-root' : {
        padding: 0,
        width: '100%',
    },

    '& .MuiTablePagination-actions': {
        order: 0,
        position: 'relative',
        right: '70px',
        marginLeft: 'auto !important',
        margin: '0 auto',
        '&::before': {
            content: `"페이지: ${page + 1} / ${Math.ceil(count / rowsPerPage) === 0 ? 1 : Math.ceil(count / rowsPerPage)}"`,

            position: 'absolute',
            width: '80px',
            top: '80%', // 이 부분을 수정하여 arrow 버튼 바로 아래에 위치시킵니다.
            right: '50%',
            transform: 'translateY(5px) translateX(50%)', // 위치 조정
            padding: '0 5px',
        }
    },
    '& .MuiTablePagination-selectRoot': {
        order: 2,
    },
    '& .MuiTablePagination-displayedRows':{
        order: 1,
    },
}));


    

const TablePage = ({ captureCanvas, selectedIssueType,setSelectedIssueType,filteredIssues, handleButtonClick}) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    // 현재 페이징 상태 저장
    const [showCheckColumn, setShowCheckColumn] = useState(true);
    const [originalPage, setOriginalPage] = useState(page);
    const [originalRowsPerPage, setOriginalRowsPerPage] = useState(rowsPerPage);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    
    const handleRowsPerPageChange = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);  // 페이지당 행 수를 변경하면 페이지를 처음 페이지로 초기화
    };
    
    useEffect(() => {
        // 전체 데이터 표시
        setPage(0);
        setRowsPerPage(filteredIssues.length);
        setShowCheckColumn(false);
        setTimeout(()=>{
            captureCanvas('section5', 5);
            setTimeout(()=>{
                // 원래 페이징 상태로 복원
                setPage(originalPage);
                setRowsPerPage(originalRowsPerPage);
                setShowCheckColumn(true);
            },500);
        },200);
    }, []);

    const reasons = filteredIssues.map(issue => issue.issue_reason);
    console.log("reasons is");
    console.log(reasons);
    return(
        <StyledPaper  elevation={3} style={{ margin: '10px', padding: '20px' }}>
            <Box sx={{ minWidth: 180 }}>
                <FormControl variant="outlined" sx={{width: "auto"}} >
                    <InputLabel id="issue-type-label" sx={{fontSize: "13px"}}>유형 선택</InputLabel>
                    <Select
                        labelId="issue-type-label"
                        value={selectedIssueType}
                        onChange={(e) => {
                            setPage(0); // 페이지를 1로 설정. (0-indexed로 가정)
                            setSelectedIssueType(e.target.value);
                        }}
                        label="유형 선택"
                        sx={{ height: "30px",fontSize:"12px", fontFamily:"NotoSansKR-Regular",'& .MuiOutlinedInput-input': { paddingTop: "10px", paddingBottom: "10px" } }}
                    >
                        <MenuItem value="모든 유형"sx={{ fontSize:"14px", fontFamily:"NotoSansKR-Regular",height: "30px" }}>모든 유형</MenuItem>
                        <MenuItem value="법률 위반" sx={{ fontSize:"14px", fontFamily:"NotoSansKR-Regular",height: "30px" }}>법률 위반</MenuItem>
                        <MenuItem value="법률 위반 위험" sx={{ fontSize:"14px", fontFamily:"NotoSansKR-Regular",height: "30px" }}>법률 위반 위험</MenuItem>
                        <MenuItem value="작성지침 미준수" sx={{ fontSize:"14px", fontFamily:"NotoSansKR-Regular",height: "30px" }}>작성지침 미준수</MenuItem>
                        <MenuItem value="기재 항목 누락" sx={{ fontSize:"14px", fontFamily:"NotoSansKR-Regular",height: "30px" }}>기재 항목 누락</MenuItem>
                    </Select>
                </FormControl>
            </Box>


            <Table id="section5" style={{ width: "100%"}}>
                <TableHead>
                    <TableRow style={{}}>
                        <TableCell style={{fontFamily:"NotoSansKR-Bold", width:"8%"}}>번호</TableCell>
                        <TableCell style={{fontFamily:"NotoSansKR-Bold",width:"17%"}}>진단 유형</TableCell>
                        <TableCell style={{fontFamily:"NotoSansKR-Bold",width:"40%"}}>위반 내용</TableCell>
                        <TableCell style={{fontFamily:"NotoSansKR-Bold",width:"25%"}}>진단 근거</TableCell>
                        {showCheckColumn && <TableCell style={{fontFamily:"NotoSansKR-Bold",width:"10%",textAlign:"center"}}>확인하기</TableCell>}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filteredIssues.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(issue => (
                        <TableRow key={issue.issue_id} >
                            <TableCell style={{width:"8%", fontFamily:"NotoSansKR-Regular",padding:'16px'}}>{issue.issue_id}</TableCell>
                            <TableCell style={{width:"17%", fontFamily:"NotoSansKR-Regular",padding:'16px'}}>
                                {issue.issue_type}
                                {issue.issue_type === "법률 위반" && <span style={{color: "red", fontWeight: "bold", marginLeft: "7px"}}>(-15)</span>}
                                {issue.issue_type === "법률 위반 위험" && <span style={{color: "orange", fontWeight: "bold", marginLeft: "7px"}}>(-7)</span>}
                                {issue.issue_type === "작성지침 미준수" && <span style={{color: "gold", fontWeight: "bold", marginLeft: "7px"}}>(-3)</span>}
                                {issue.issue_type === "기재 항목 누락" && <span style={{color: "purple", fontWeight: "bold", marginLeft: "7px"}}>(-{issue.issue_score})</span>}
                            </TableCell>
                            <TableCell style={{width:"40%", fontFamily:"NotoSansKR-Regular",paddingLeft:'16px',paddingRight:'30px'}}>{issue.issue_content}</TableCell>
                            <TableCell style={{ width: "25%", fontFamily: "NotoSansKR-Regular",padding:'16px'}}>
                                {Array.isArray(issue.issue_reason) ? (
                                    <ul style={{padding:'0px'}}>
                                    {issue.issue_reason.map((reason, index) => (
                                        <li key={index}>{reason}</li>
                                    ))}
                                    </ul>
                                ) : (
                                    issue.issue_reason
                                )}
                            </TableCell>
                            {showCheckColumn && (
                            <TableCell style={{width:"10%", fontFamily:"NotoSansKR-Regular",textAlign:"center"}}>
                                {issue.issue_type === "기재 항목 누락" ? (
                                    // '기재 항목 누락' 이슈 타입에 대한 '모범 사례' 버튼
                                    <BestPractice issue_case={issue.issue_case}/>
                                ) : (
                                    // 다른 이슈 타입에 대한 '확인' 버튼
                                    <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    fontFamily="NotoSansKR-SemiBold"
                                    style={{ borderRadius: '25px', padding: '5px 15px' }}
                                    onClick={() => handleButtonClick(issue)}
                                    >
                                    확인
                                    </Button>
                                )}
                            </TableCell>
                            )}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Box display="flex" justifyContent="center" alignItems="center" width="100%">
                <StyledTablePagination
                    style={{width: "100%"}}
                    component="div"
                    count={filteredIssues.length}  // 필터링된 행의 수
                    rowsPerPage={rowsPerPage}
                    page={page}
                    labelRowsPerPage="페이지당 위반 문장 수" // 이 부분을 변경
                    rowsPerPageOptions={[3, 5, 10]}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleRowsPerPageChange}
                    labelDisplayedRows={({ from, to, count }) => {
                        return `${from}-${to} / ${count}`;
                    }}
                />
            </Box>

        </StyledPaper>
    );
}
export default TablePage;