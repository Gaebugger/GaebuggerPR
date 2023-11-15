import React, {useState, useEffect, useReducer} from "react";
import { Helmet } from "react-helmet";
import Step1 from "./Step1/Step1";
import Step2 from "./Step2/Step2";
import Step3 from './Step3/Step3';
import Step4 from './Step4/Step4';
import Guideline_detail from "./Guideline_detail/Guideline_detail";
import apiResponseReducer, { initialState } from './apiResponseReducer';
import { CSSTransition, TransitionGroup } from "react-transition-group";


function CheckEvaluate() {
    const [step, setStep] = useState(1);
    const [slideDirection, setSlideDirection] = useState('left');
    const [file,setFile] =useState(null);

    const itemIds = [5, 6, 7, 8, 10, 13, 14, 15, 16, 18, 19, 20, 21];

    const initialItems = itemIds.reduce((acc, id) => {
    acc[id] = '기재안함';
    return acc;
    }, {});
    const [checkedItems, setCheckedItems] = useState(initialItems);
    const [processId, setProcessId] = useState(null);
    const [infoObject, setInfoObject] = useState({
        companyName: '',
        industryType: '',
        position: '',
        name: '',
        email: '',
    });
    const [apiResponse, dispatch] = useReducer(apiResponseReducer, initialState);
    useEffect(() => {
        // step이 변경될 때 맨 위로 스크롤
        window.scrollTo({ top: 0, behavior: 'auto' });
    }, [step]);
    const nextStep = () => {
        setSlideDirection('right');
        setStep(prevStep => prevStep + 1);
    }

    const prevStep = () => {   
        setSlideDirection('left');
        setStep(prevStep => prevStep - 1);
    }

    let currentStep;
    switch (step) {
        case 1:
            currentStep = (
                <Step1
                    nextStep={nextStep}
                    infoObject={infoObject}
                    setInfoObject={setInfoObject}
                    setFile={setFile}
                    file={file}
                />
            );
            break;
        case 2:
            currentStep = 
            <Step2
                nextStep={nextStep} 
                prevStep={prevStep}
                setCheckedItems={setCheckedItems} 
                setProcessId={setProcessId} // Step2에서 processId를 설정하기 위한 함수를 prop으로 전달
                checkedItems={checkedItems}
                infoObject={infoObject}
                file={file}
                />;
            break;
        case 3:
            currentStep = (
                <Step3
                    nextStep={nextStep}
                    processId={processId} // processId를 Step3로 전달
                    dispatch={dispatch} // dispatch 함수를 Step3에 전달
                    apiResponse={apiResponse} // 상태도 전달 (필요한 경우)
                />
            );
            break;
        case 4:
            currentStep = <Step4 processId={processId} nextStep={nextStep} responseData={apiResponse} infoObject={infoObject}/>;
            break;
        case 5:
            currentStep = <Guideline_detail processId={processId} prevStep={prevStep} responseData={apiResponse} />;
    
        default:
            break;
        
    }

    return (
        <div className="jiji">
            
            <Helmet>
                <title>개인정보 처리방침 진단</title>
            </Helmet>
            {currentStep}
        </div>
    );
}

export default CheckEvaluate;
