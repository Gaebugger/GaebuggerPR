import React, { useEffect, useState } from "react";
import ScoreDisplay from "../scoredisplay/ScoreDisplay";
import PieChartComponent from "../piechart/PieChartComponent";
import './ResultScore.css';

const ResultScore = ({captureCanvas, data, pieData, total}) => {
    const [isDisplayed,setIsDisplayed] = useState({'score': false, 'pie': false });
    useEffect(() => {
        // score와 pie가 둘 다 true일 때 captureCanvas 호출
        if (isDisplayed.score && isDisplayed.pie) {
            captureCanvas('section2', 4);
        }
    }, [isDisplayed, captureCanvas]); 

    return (
        <div id="section2" className="resultScore" style={{margin:'0', padding:'0', display:'flex', flexDirection:'row', justifyContent:'center', alignContent:'center', alignItems:'center'}}>
            <ScoreDisplay 
                data={data} 
                setIsDisplayed={(value) => setIsDisplayed(prevState => ({ ...prevState, score: value }))}
            />
            <PieChartComponent 
                pieData={pieData} 
                total={total} 
                setIsDisplayed={(value) => setIsDisplayed(prevState => ({ ...prevState, pie: value }))}
            /> 
        </div>
    );
};

export default ResultScore;