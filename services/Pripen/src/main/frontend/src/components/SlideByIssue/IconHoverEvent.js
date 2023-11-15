import React,{useState} from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Divider } from "@mui/material";

function IconHoverEvent({ otherIssues, handleIssueClick,wrapWithIssueSpan }) {
    const [isHovered, setIsHovered] = useState(false);
  
    return (
      <div className="IconHoverEvent" onMouseLeave={() => setIsHovered(false)}>
        <body style={{fontSize:"0.85rem", marginTop:'5px', fontFamily:"NotoSansKR-Bold"}}>외 {otherIssues.length}건</body>
        &nbsp;
        &nbsp;
        <ExpandMoreIcon className="issueIcon" onMouseEnter={() => setIsHovered(true)}/>
        <div className="popover" style={{ display: isHovered ? 'flex' : 'none', flexDirection:"column" }}>
          <p style={{ fontSize:"0.9rem", fontFamily:"NotoSansKR-SemiBold", marginTop:"5px",marginBottom:"5px"}}> 다른 위반 사항 </p>
          <Divider style={{marginTop:"3px", marginBottom:"10px"}}/>
          <div style={{flexDirection:"row", display: "flex"}}>
            {otherIssues.map(issue => (
              <div key={issue.issue_id} onClick={() => handleIssueClick(issue)}>
                {wrapWithIssueSpan(null,issue)}
                &nbsp;
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  export default IconHoverEvent;
  