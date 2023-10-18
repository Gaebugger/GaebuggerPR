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
import React, {useState} from "react";
import { styled } from '@mui/system';
import '../../assets/fonts/fonts.css';

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
        margin: '0 auto',
        marginLeft: 'auto',
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



const TablePage = ({ selectedIssueType,setSelectedIssueType,filteredIssues,handleButtonClick}) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleRowsPerPageChange = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);  // 페이지당 행 수를 변경하면 페이지를 처음 페이지로 초기화
    };
    return(
        <StyledPaper elevation={3} style={{ margin: '10px', padding: '20px' }}>
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
                    </Select>
                </FormControl>
            </Box>


            <Table style={{ width: "100%"}}>
                <TableHead>
                    <TableRow style={{}}>
                        <TableCell style={{fontFamily:"NotoSansKR-Bold", width:"5%"}}>번호</TableCell>
                        <TableCell style={{fontFamily:"NotoSansKR-Bold",width:"20%"}}>진단 유형</TableCell>
                        <TableCell style={{fontFamily:"NotoSansKR-Bold",width:"40%"}}>가이드라인</TableCell>
                        <TableCell style={{fontFamily:"NotoSansKR-Bold",width:"30%"}}>진단 근거</TableCell>
                        <TableCell style={{fontFamily:"NotoSansKR-Bold"}}>확인하기</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filteredIssues.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(issue => (
                        <TableRow key={issue.issue_id}>
                            <TableCell style={{width:"10%", fontFamily:"NotoSansKR-Regular"}}>{issue.issue_id}</TableCell>
                            <TableCell style={{width:"10%", fontFamily:"NotoSansKR-Regular"}}>
                                {issue.issue_type}
                                {issue.issue_type === "법률 위반" && <span style={{color: "red", fontWeight: "bold", marginLeft: "7px"}}>(-15)</span>}
                                {issue.issue_type === "법률 위반 위험" && <span style={{color: "orange", fontWeight: "bold", marginLeft: "7px"}}>(-7)</span>}
                                {issue.issue_type === "작성지침 미준수" && <span style={{color: "gold", fontWeight: "bold", marginLeft: "7px"}}>(-3)</span>}
                            </TableCell>
                            <TableCell style={{width:"40%", fontFamily:"NotoSansKR-Regular"}}>{issue.issue_guideline[0]}</TableCell>
                            <TableCell style={{width:"30%", fontFamily:"NotoSansKR-Regular"}}>{issue.issue_reason}</TableCell>
                            <TableCell>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    fontFamily="NotoSansKR-SemiBold"
                                    style={{ borderRadius: '25px', padding: '5px 15px' }}
                                    onClick={() => handleButtonClick(issue)} // 버튼 클릭 시 핸들러 호출
                                >
                                    확인
                                </Button>
                            </TableCell>
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
            {/*<Box sx={{*/}
            {/*    display: 'flex',*/}
            {/*    justifyContent: 'center',*/}
            {/*    alignItems: 'center',*/}
            {/*    '& > *': { margin: 1 }  // Box 내부의 모든 직계 자식에 적용될 스타일*/}
            {/*}}>*/}
            {/*    <TablePagination*/}
            {/*        component="div"*/}
            {/*        count={filteredIssues.length}  // 필터링된 행의 수*/}
            {/*        rowsPerPage={rowsPerPage}*/}
            {/*        page={page}*/}
            {/*        labelDisplayedRows={({ count }) => {*/}
            {/*            const totalPages = Math.ceil(count / rowsPerPage);*/}
            {/*            return (*/}
            {/*                <div>*/}
            {/*                    페이지: {page + 1} / {totalPages}*/}
            {/*                    <br />*/}
            {/*                    전체: {count} 건의 위반 문장*/}
            {/*                </div>*/}
            {/*            );*/}
            {/*        }}*/}
            {/*        onPageChange={handleChangePage}*/}
            {/*        onRowsPerPageChange={handleRowsPerPageChange}*/}
            {/*        rowsPerPageOptions={[3, 5, 10]}*/}
            {/*        labelRowsPerPage="페이지당 위반 문장 수" // 이 부분을 변경*/}

            {/*        style={{display:"flex",justifyContent:"center",alignContent:"center"}}*/}
            {/*    />*/}
            {/*</Box>*/}

        </StyledPaper>
    );
}
export default TablePage;