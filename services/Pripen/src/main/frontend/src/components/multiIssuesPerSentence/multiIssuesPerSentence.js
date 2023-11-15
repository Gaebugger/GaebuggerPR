import React, {useState} from "react";
const multiIssuesPerSentence = ({issues,original}) => {


    const [isIconHovered, setIconHovered] = useState(false);
    const handleIconHover = () => {
        setIconHovered(true);
    };

    const handleIconLeave = () => {
        setIconHovered(false);
    };

    const wrapMultipleIssuesWithIcon = (issues) => {
        if (!issues || issues.length === 0) return null;

        // 가장 낮은 issue_id를 가진 이슈로 먼저 문장을 wrap
        const primaryIssue = issues[0];
        const text = original.slice(primaryIssue.issue_startIndex, primaryIssue.issue_endIndex + 1);
        let wrappedContent = wrapWithIssueSpan(text, primaryIssue);

        const remainingIssues = issues.slice(1);

        return (
            <span>
                {wrappedContent}
                <span
                    style={{ position: 'relative', display: 'inline-block' }}
                    onMouseEnter={handleIconHover}
                    onMouseLeave={handleIconLeave}
                >
                    <span
                        style={{...issueIconStyle, cursor: 'pointer'}}
                    >
                        🚩  {/* 이 아이콘 위에 호버하면 나머지 이슈들이 팝오버로 표시됩니다. */}
                    </span>
                    {isIconHovered && (
                        <div className="popover" style={{border:"1px solid #d9d9d9", backgroundColor:'white',position: 'absolute', top: '100%', left: '0',zIndex: 2000}}>
                            <h3>다른 위반 사항</h3>
                            {remainingIssues.map(issue => (
                                <div key={issue.issue_id}>
                                    Issue ID: {issue.issue_id}
                                </div>
                            ))}
                        </div>
                    )}
                </span>
            </span>
        );
    };
};
export default multiIssuesPerSentence;