# [모둘소개: 방침에서 대제목을 반환하는 코어 모듈]

import openai
import ast
import re

# Module
from .Search_Title_Prompt import get_table, title_create_prompt_only, title_create_prompt_part_first, title_create_prompt_part, title_create_prompt_only_with_table, title_create_prompt_part_with_table
from .Rule_Validation.Rule_Validation import *

import sys
import os
import time
import config
api_key = os.getenv("OPENAI_API_KEY")


# 컷팅할 목차 저장하는 전역변수(한번 컷팅하면 계속 이거로 씀)
table = ""

# 목차를 찾아주는 함수(LLM 사용)
def Search_Table(docs):
    gpt_prompt = get_table(docs)
    message = [{"role": "user", "content": gpt_prompt}]
    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=message,
        temperature=0,
        max_tokens=500,
        frequency_penalty=0.0
    )
    ans = response['choices'][0]['message']['content']
    print("GPT출력값: ", ans,"\n")
    if(ans=='<목차없음>'):
        return ('LLM', ans) #목차를 찾을 수 없는경우 LLM으로 Find
    else:
        return ('RULE', ast.literal_eval(ans)) # 목차가 있으면 리스트화 해서 대제목으로 추출

# 목차를 문자열로 만들어주는 함수(나중에 파트 찾을때 제거를 위함)
def make_table_text(title_list):
    # 전체 text에 목차파트 제거
    global table
    for i in range(0, len(title_list)):
        if (i == len(title_list) - 1):
            table += title_list[i]
        else:
            table += title_list[i] + "\n"
    return table

# 목차 유무에 따라서 방향성 만들어 주는 함수
def make_strategy(docs, documents):
    table_ans = Search_Table(docs)
    print("Search_Table출력값:", table_ans, "\n")

    if ((table_ans[0] == 'RULE')):
        table = make_table_text(table_ans[1])
        print("목차는 존재합니다.")
        checking_ans = checking_table(documents, table_ans[1], table)
        print("checking_table출력값:", checking_ans, "\n")
        if (checking_ans[0]):
            print("목차도 존재하고, 목차와 본문의 대제목이 형식이 일치합니다.")
            return 1, checking_ans[1]  # 추출한 대제목 리스트 반환하고 종료
        else:
            print("목차는 존재하지만, 목차와 본문의 대제목이 형식이 일치하지 않습니다.")
            return 2, table_ans[1] # 목차의 리스트 반환하고 종료 (제거를 위한 목차 리스트)
    else:
        print("목차가 없기에 LLM으로 대제목을 잡아야 합니다.")
        return 3, table_ans[1] # 목차없음 반환하고 종료

# 1> 첫번째 chunk값으로 목차 유무 LLM으로 확인
def Search_Title(documents, docs, rule):
    title_list = []
    docs_len = len(docs)

    case = make_strategy(docs[0].page_content, documents)

    # 첫번쨰 타이밍에 목차 검사(3가지의 경우로 나뉨)
    # case 1) 만약 목차가 있고, 목차와 본문의 대제목이 일치 -> 목차 그대로 대제목으로 가지고감
    # case 2) 만약 목차가 있는데, 목차와 본문의 대제목의 형식이 일치하지 않으면 -> 목차를 참고해서 본문에서 대제목 추출(목차 파트는 제거)
    # case 3) 목차가 없는 경우는, rule 대제목을 기반으로 본문에서 대제목 추출

    if (case[0] == 1):
        return case[1]

    elif (case[0] == 2):
        # 잘려있는 텍스트들과, 찾은 목차 넘긴다.
        print("찾은 목차입니다.", case[1])
        return Search_Title_With_Table(docs, case[1])

    elif (case[0] == 3):
        # 잘려있는 텍스트들과, rule 대제목 넘긴다.
        return Search_Title_With_Rule(docs, rule)


# 2> 목차가 있는데 본문의 대제목과 다른 경우(ex: 네이버)
## : LLM이 목차를 참고하여, 본문 보면서 추출
def Search_Title_With_Table(docs, table_title_list):

    print("컷팅할 목차 입니다.", table)
    docs[0].page_content = docs[0].page_content.replace(table, "")
    docs_len = len(docs)
    title_list=[]
    No_Duplication_title_list = []
    for i in range(0, docs_len):

        # chunk가 여러개면(토큰수 많음)
        if (len(docs) > 1):
            print(i, "페이지입니다.\n")
            print(docs[i].page_content, "\n")

            gpt_prompt = title_create_prompt_part_with_table(docs[i].page_content, table_title_list)
            message = [{"role": "user", "content": gpt_prompt}]
            response = openai.ChatCompletion.create(
                model="gpt-4",
                messages=message,
                temperature=0,
                max_tokens=1000,
                frequency_penalty=0.0
            )
            time.sleep(30) # openai의 정책상 딜레이줌(계속 실험하면서 조정 예정)

            title_list += ast.literal_eval((response['choices'][0]['message']['content'])) # 리스트에 계속 추가

            # 중복제거 필요(chunk로 끊을때 오버래핑 하여서 제목 추출할때 중복이 있을 수 있음)
            [No_Duplication_title_list.append(item) for item in title_list if item not in No_Duplication_title_list]
            print(i,"번째 페이지에서 목차 기반으로 추출한 대제목 리스트: ", No_Duplication_title_list)
            print("\n")

        # chunk가 한개면
        else:
            gpt_prompt = title_create_prompt_only_with_table(docs[i].page_content, table_title_list)

            message = [{"role": "user", "content": gpt_prompt}]
            response = openai.ChatCompletion.create(
                model="gpt-4",
                messages=message,
                temperature=0,
                max_tokens=1000,
                frequency_penalty=0.0
            )
            title_list = ast.literal_eval((response['choices'][0]['message']['content']))
            print("chunk가 1개일때 목차 기반으로 추출한 대제목 리스트:", title_list)
            No_Duplication_title_list = title_list
    return No_Duplication_title_list

# 3> 목차가 없는 경우(중소기업)
## : LLM이 룰셋의 대제목을 참고하여, 본문 보면서 추출
def Search_Title_With_Rule(docs, rule):
    title_list=[]
    No_Duplication_title_list = []
    for i in range(0, len(docs)):

        # chunk가 여러개면(토큰수 많음)
        if (len(docs) > 1):
            print(i, "페이지입니다.\n")
            print(docs[i].page_content)

            if (i == 0):
                gpt_prompt = title_create_prompt_part_first(docs[i].page_content, rule)
            else:
                gpt_prompt = title_create_prompt_part(docs[i].page_content, rule, title_list)

            message = [{"role": "user", "content": gpt_prompt}]
            response = openai.ChatCompletion.create(
                model="gpt-4",
                messages=message,
                temperature=0,
                max_tokens=1000,
                frequency_penalty=0.0
            )
            time.sleep(30) # openai의 정책상 딜레이줌(계속 실험하면서 조정 예정)
            title_list += ast.literal_eval((response['choices'][0]['message']['content'])) # 리스트에 계속 추가

            # 중복제거 필요(chunk가 많아지면 오버래핑하여서 제목 추출할때 중복 될 수 있음)
            [No_Duplication_title_list.append(item) for item in title_list if item not in No_Duplication_title_list]
            print(i,"번째 페이지에서 룰셋 대제목 기반으로 추출한 대제목 리스트: ", No_Duplication_title_list)
            print("\n")

        # chunk가 한개면
        else:
            gpt_prompt = title_create_prompt_only(docs[i].page_content, rule)
            print("rule입니다.", rule)
            message = [{"role": "user", "content": gpt_prompt}]
            response = openai.ChatCompletion.create(
                model="gpt-4",
                messages=message,
                temperature=0,
                max_tokens=1000,
                frequency_penalty=0.0
            )
            title_list = ast.literal_eval((response['choices'][0]['message']['content']))
            print("chunk가 1개일때 룰셋 대제목 기반으로 추출한 대제목 리스트:", title_list)
            No_Duplication_title_list = title_list

    return No_Duplication_title_list


# \n 기반으로 고유한 대제목 찾는 함수
def Make_Unique_Title(title_list):
    unique_title_list=[]
    for i in title_list:
        unique_title_list.append(i+"\r\n")
    return unique_title_list




