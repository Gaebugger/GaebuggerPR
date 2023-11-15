# [답변 주기전에 약속된 JSON형태로 바꿔주는 함수]

import pandas as pd
import numpy as np
import re

# 1> 잘린항목의 고유값 주고 모든 항목 리스트로 반환하는 함수
    # 반복문 다 돌고 (결과가 총 나오고) 계산하는 함수
def Make_Paragraph(df, text):
    paragraph_list = []

    for i in range(0, len(df)):
        paragraph = {"paragraph_id": 0, "paragraph_content": "", "paragraph_startIndex": 0, "paragraph_endIndex": 0}
        paragraph["paragraph_id"] = i
        paragraph["paragraph_content"] = df["matched_part"][i]
        startIndex = text.find(df["matched_part"][i])
        endIndex = len(df["matched_part"][i]) + startIndex - 1 # -1 하는 이유는 리스트 인덱스 구조가 다름 (Python -> JAVA)
        paragraph["paragraph_startIndex"] = startIndex
        paragraph["paragraph_endIndex"] = endIndex
        paragraph_list.append(paragraph)

    print("Make_Paragraph의 최종결과입니다.", paragraph_list)
    return paragraph_list



# 각 위반한 룰별 고유값(전역변수)
issue_id=0


# 2> 위반한 이슈의 내용을 약속된 JSON형태로 정제해주는 함수
    #: 한번 결과에는 규칙1, 규칙2, 규칙 3 이게 다있음
def Make_Issues(ans, issue_paragraph_id, text, df, original_index, issue_id_start):
    issue_id = issue_id_start

    process_Law_Violate = 0
    process_Law_Danger = 0
    process_Guide_Violate = 0

    issue = {"issue_id": 0, "issue_paragraph_id": -999, "issue_type": "", "issue_score":-999, "issue_content": "", "issue_reason": "", "issue_startIndex": -999, "issue_endIndex": -999, "issue_case":-999, "issue_guideline": ""}
    issue_paragraph_id = issue_paragraph_id

    print("Make_Issues에 들어온 LLM의 결과입니다.", ans)

    issue_yn_pattern = r'위반 사항: (.+?)\n'
    issue_type_pattern = r'위반 유형: (.+?)\n'
    issue_reason_pattern = r'(규칙\d+)'
    issue_content_pattern = r'규칙\d+: (.+?)\n'
    issue_text_pattern = r'위반 문장: (.+?)\n'
    issue_guideline_pattern = r"설명: (.+?)\n"



    issue_yns = re.findall(issue_yn_pattern, ans)
    issue_types = re.findall(issue_type_pattern, ans)
    issue_reasons = rule_matches = re.findall(issue_reason_pattern, ans)
    issue_contents = re.findall(issue_content_pattern, ans)
    issue_texts = re.findall(issue_text_pattern, ans)
    issue_guideline_matches = re.findall(issue_guideline_pattern, ans)

    issue_guidelines = []
    buffer = []

    for desc in issue_guideline_matches:
        # 버퍼에 설명을 추가
        buffer.append(desc)
        # 다음 설명이 없거나 다음 설명이 '설명:'으로 시작하지 않는 경우
        if not re.search(r"설명:", ans[ans.find(desc) + len(desc):ans.find(desc) + len(desc) + 10]):
            # 버퍼의 내용을 하나의 문자열로 합치고 리스트에 추가
            issue_guidelines.append('/////'.join(buffer))
            buffer = []

    issue_startIndex=[]
    issue_endIndex=[]

    for i in issue_texts:
        if i.startswith('"') and i.endswith('"'):
            i = i[1:-1]  # 앞뒤 따옴표 그냥 제거 추후 수정 -> 프롬프트에서 계속 위반문장에 따옴표를 붙임
        startIndex = text.find(i)
        endIndex = len(i) + startIndex - 1 # -1 하는 이유는 리스트 인덱스 구조가 다름 (Python -> JAVA)
        issue_startIndex.append(startIndex)
        issue_endIndex.append(endIndex)

    process_Issues = []

    print("이슈아이디:", issue_id,"의 뽑은 리스트")
    print("위반여부리스트", issue_yns)
    print("위반유형리스트", issue_types)
    print("위반규칙", issue_contents)
    print("이슈가이드라인", issue_guidelines)
    print("위반문장리스트", issue_texts)
    print("이슈근거리스트", issue_reasons)

    for issue_yn, issue_type, issue_content, start, end, issue_guideline, issue_text, issue_reason in zip(issue_yns, issue_types, issue_contents, issue_startIndex, issue_endIndex, issue_guidelines, issue_texts, issue_reasons):

        print(issue_yn)
        print(issue_type)
        print(issue_reason)
        print(issue_content)
        print(start)
        print(end)
        print(issue_guideline)
        if ((issue_yn == '없음')):
            continue
        elif(issue_type=='법률 위반'):
            process_Law_Violate+=1
        elif(issue_type=='법률 위반 위험'):
            process_Law_Danger+=1
        elif(issue_type=='작성지침 미준수'):
            process_Guide_Violate+=1

        print("법률 위반", process_Law_Violate)
        print("법률 위반 위험", process_Law_Danger)
        print("작성지침 미준수", process_Guide_Violate)


        if((issue_type=='법률 위반') or (issue_type=='법률 위반 위험') or (issue_type=='작성지침 미준수')):
            if((issue_text == '없음') or (issue_text == '')):
                issue["issue_startIndex"] = -999
                issue["issue_endIndex"] = -999
            else:
                issue["issue_startIndex"] = start
                issue["issue_endIndex"] = end


        issue["issue_id"] = issue_id
        issue["issue_paragraph_id"] = issue_paragraph_id
        issue["issue_type"] = issue_type


        df = df.fillna("NO_REASON")
        if(df[issue_reason][issue_paragraph_id]!="NO_REASON"):
            print("근거가 있습니다")
            print("근거는",df[issue_reason][issue_paragraph_id], "입니다.")
            issue["issue_reason"] = df[issue_reason][issue_paragraph_id]

        issue["issue_content"] = issue_content
        issue["issue_case"] = original_index
        issue["issue_guideline"] = issue_guideline.split('/////')

        print("issue", issue_id, "입니다.", issue)

        print("증가하는 이슈리스트", process_Issues)
        process_Issues.append(issue.copy())

        issue_id += 1  # 유니크값(고유값) 계속 증가

    return process_Issues, process_Law_Violate, process_Law_Danger, process_Guide_Violate, issue_id






