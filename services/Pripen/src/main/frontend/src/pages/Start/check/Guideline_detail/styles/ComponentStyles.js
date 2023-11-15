import { styled } from '@mui/system';
import { Paper, ToggleButton, ToggleButtonGroup,TableCell } from '@mui/material';

export const StyledTableCell = styled(TableCell)(({ width }) => ({
    fontFamily: "NotoSansKR-Bold",
    width: width || 'auto',
}));

export const StyledPaper = styled(Paper)({
    padding: '30px',
    borderRadius: '10px',
    marginTop: '20px',
    marginBottom: '20px',
});

export const customStyles = {
    color: '#007BFF',  
    textShadow: '3px 3px 10px rgba(0, 0, 0, 0.2)',  
    fontWeight: 'bold',  
    letterSpacing: '1.5px',  
    marginBottom: '25px', 
    fontFamily: 'NotoSansKR-Bold',
    background: '-webkit-linear-gradient(45deg, #007BFF, #33CCFF)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
};

export const customStyles_title = {
    color: '#454545',  
    textShadow: '1px 1px 5px rgba(100, 100, 100, 0.1)',  
    letterSpacing: '0.5px',  
    marginBottom: '15px', 
    fontFamily: 'NotoSansKR-Regular',
    borderBottom: '2px solid #007BFF',
    paddingBottom: '5px',
    display: 'inline-block',
    textDecoration: "line-through"
};

export const StyledToggleButton = styled(ToggleButton)({
    height: '20px',
    fontSize: '10px',
    fontFamily: 'NotoSansKR-Regular',
    color:'black',
    width: '90px',
    border: '2px solid rgba(0,0,0,0.12)',
    borderRadius: '30px',
    marginRight: '10px',
    '&.Mui-selected': {
        backgroundColor: 'rgba(0, 150, 225, 0.15)', 
        '&:hover': {
            backgroundColor: 'rgba(0, 128, 192, 0.5)',
        }
    },
    '&:hover': {
        backgroundColor: 'rgba(0,0,0,0.04)'
    }
});

export const StyledToggleButtonGroup = styled(ToggleButtonGroup)({
    '& .MuiToggleButton-root': {
        padding: '2px 5px',
    }
});
