import React from "react";
import './InspectionSteps.css';
function InspectionSteps({active}){
    return (
        <div className="inspection-steps">
            <ol>
                <li className={active === "first" ? "active" : ""}>우선 기재 사항</li>
                <li className={active === "second" ? "active" : ""}>파일 업로드</li>
                <li className={active === "third" ? "active" : ""}>점검</li>
                <li className={active === "fourth" ? "active" : ""}>결과 확인</li>
            </ol>
        </div>
    );
}

export default InspectionSteps;