import React,{useState,useEffect} from "react";
import './IntroduceUs.css';
import TeamIntroduce from "./TeamIntroduce";
import PripenIntroduce from "./PripenIntroduce";
import OptionIntro from "../../components/OptionIntro/OptionIntro";
const IntroduceUs = ({active}) => {
    const [selectedOption, setSelectedOption] = useState("Pripen"); 
    console.log("active is ", active);

    const handleOptionChange =(option) =>{
        setSelectedOption(option);
    };

    useEffect(() =>{
        handleOptionChange(active);
    },[active])

    return (
        <div className="Introduce-Section">
            <OptionIntro handleOptionChange={handleOptionChange} selectedOption={selectedOption} />
            {selectedOption === "Pripen" && <PripenIntroduce />}
            {selectedOption === "Gaebugger" && <TeamIntroduce />}
        </div>
    )

};

export default IntroduceUs;