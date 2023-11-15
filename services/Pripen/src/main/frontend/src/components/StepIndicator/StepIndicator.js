import * as React from 'react';
import PropTypes from 'prop-types';
import { createTheme,styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Check from '@mui/icons-material/Check';
import SummarizeIcon from '@mui/icons-material/Summarize';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import '../../assets/fonts/fonts.css';
import './StepIndicator.css';
import { ThemeProvider } from '@emotion/react';
import { Divider } from '@mui/material';


const theme = createTheme({
  typography: {
    fontFamily: '"NotoSansKR-Bold", NotoSansKR-Bold',
  },
});
const StyledStepLabel = styled(StepLabel)(({ theme, ownerState }) => ({
  ...(ownerState.active && {
    animation: 'blink 2s infinite',
  }),
}));
const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg, rgb(204, 229, 255) 0%, rgb(183, 216, 250) 50%, rgb(163, 204, 245) 100%)',
    },
},

  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
      'linear-gradient( 136deg, rgb(204, 229, 255) 0%, rgb(183, 216, 250) 50%, rgb(163, 204, 245) 100%)',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    animation: 'blink 2s infinite',
    backgroundImage:
      'linear-gradient( 136deg, rgb(204, 229, 255) 0%, rgb(183, 216, 250) 50%, rgb(163, 204, 245) 100%)',
    boxShadow: '0 4px 10px 0 rgba(163, 204, 245, .25)',
  }),


  ...(ownerState.completed && {
    backgroundImage:
    'linear-gradient( 136deg, rgb(204, 229, 255) 0%, rgb(183, 216, 250) 50%, rgb(163, 204, 245) 100%)',
  }),
}));

//아이콘 함수
function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <SummarizeIcon/> ,
    2: <UploadFileIcon />,
    3: <FindInPageIcon />,
    4: <AssignmentTurnedInIcon />
    // 4단계 아이콘 넣기
  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};

const steps = ['프로파일 작성', '기재사항 체크', '진단 중', '진단 결과 확인'];

export default function CustomizedSteppers({ activeStep }) {
  return (
    <div className="StepIndicator" style={{marginTop:"50px"}}>
      <h1 style={{textAlign:"center", fontFamily:"NotoSansKR-Bold",marginBottom:"50px"}}>현재 진단 단계</h1>
      <ThemeProvider theme={theme}>
        <Stack sx={{ width: '100%' }} spacing={4}>
          <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
            {steps.map((label) => (
              <Step key={label}>
                <StyledStepLabel ownerState={{ active: activeStep === steps.indexOf(label) }} StepIconComponent={ColorlibStepIcon}>
                  {label}
                </StyledStepLabel>
              </Step>
            ))}
          </Stepper>
        </Stack>
      </ThemeProvider>
      <Divider style={{marginTop:"50px", border: '5px solid #009bff'}} />
    </div>
  );
}
