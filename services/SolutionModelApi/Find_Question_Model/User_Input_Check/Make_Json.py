import pandas as pd

import warnings
warnings.filterwarnings("ignore", category=UserWarning)

columns_to_concatenate = [f'규칙{i}' for i in range(1, 9)]
def concatenate_texts(temp_df):
    texts=[]
    temp_df.fillna("NO_REASON", inplace=True)
    for col in columns_to_concatenate:
        if temp_df.loc[:,col].iloc[0] != 'NO_REASON':
            texts.append(str(temp_df.loc[:,col].iloc[0]))
    return '\r'.join(texts)


def Make_Issues_Omission(omission_dict, df):
    omission_Issues = []
    issue = {"issue_id": 0, "issue_paragraph_id": -500, "issue_type": "", "issue_score": -500, "issue_content": "",
             "issue_reason": "", "issue_startIndex": -500, "issue_endIndex": -500, "issue_case": -500,
             "issue_guideline": []}
    issue_id = 0
    # Apply the function to each row
    for key in omission_dict:
        print("순회중인 key", key)
        issue["issue_id"] = issue_id
        issue["issue_type"] = "기재 항목 누락"
        temp_df = df[df["part"] == (key)]
        issue["issue_score"] = int(temp_df["총점"].iloc[0])
        issue["issue_content"] = omission_dict[key]
        issue["issue_reason"] = concatenate_texts(temp_df)
        issue["issue_case"] = df.index[df['part'] == key].tolist()[0]
        temp_issue = issue.copy()
        omission_Issues.append(temp_issue)
        issue_id += 1
        print("누락JSON", issue, issue_id)
    print("최종추출된 기재항목 이슈 리스트", omission_Issues)
    return omission_Issues, issue_id




