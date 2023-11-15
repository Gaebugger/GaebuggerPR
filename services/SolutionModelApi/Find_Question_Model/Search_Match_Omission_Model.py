import openai
import ast

# Langchain
from langchain.document_loaders import TextLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter

# Module
from .User_Input_Check.User_Input_Check import *
from .Search_Title.Search_Frame import Search_Frame
from .Match_Title.Match_Frame import Match_Frame

# Get Variable
from .Search_Title.Search_Title import table

import sys
import os

# sys.path.append(os.path.abspath('../config'))
import config
openai.api_key = os.getenv("OPENAI_API_KEY")
print("Search Match", openai.api_key)

import pandas as pd

# 테이블값 재저장
table = table

def Search_Match_Omission_Model(user_input):

    # Title로 잡아야 할 rule 후보군
    original_rule = ["개인정보의 처리 목적", "개인정보의 처리 및 보유 기간", "처리하는 개인정보의 항목", "만 14세 미만 아동의 개인정보 처리에 관한 사항",
            "개인정보의 제3자 제공에 관한 사항", "개인정보 처리업무의 위탁에 관한 사항", "개인정보의 국외 이전에 관한 사항", "개인정보의 파기 절차 및 방법에 관한 사항",
            "이용자의 개인정보 파기 등에 관한 조치", "주체와 법정대리인의 권리·의무 및 행사방법에 관한 사항", "개인정보의 안전성 확보조치에 관한 사항",
            "개인정보를 자동으로 수집하는 장치의 설치·운영 및 그 거부에 관한 사항", "행태정보의 수집·이용·제공 및 거부 등에 관한 사항", "추가적인 이용·제공 관련 판단 기준",
            "가명정보 처리에 관한 사항", "개인정보 보호책임자에 관한 사항", "국내대리인 지정에 관한 사항", "개인정보의 열람청구를 접수·처리하는 부서", "정보주체의 권익침해에 대한 구제방법",
            "영상정보처리기기 운영·관리에 관한 사항", "개인정보 처리방침의 변경에 관한 사항"]



    # 저장한 txt파일(사용자 인풋) 불러옴(경로 및 이름 수정필요!!!)
    loader = TextLoader("./policy.txt", encoding='utf-8')
    documents = loader.load()
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=6000, chunk_overlap=800)
    docs = text_splitter.split_documents(documents)

    # 1> Search
    #  고유한 대제목까지 만든다.(나중에 Cutting위함): unique_title_list

    title_list, unique_title_list = Search_Frame(documents[0].page_content, docs, original_rule)

    print("Search Match Omission의 Search 파트입니다.\n")
    print("title_list:", title_list,"\n")
    print("unique_title_list", unique_title_list, "\n")

    # 2> Match
    # title_dict뽑은거로 unique_title도 따로 딕셔너리 생성 -> cutting을 위한 딕셔너리
    # title_dict의 출력형태 {'방침대제목1': ['규칙대제목1', '규칙대제목2'], '방침대제목2': []}
        ### title_dict = {방침의 대제목: 지침의 대제목}
        ### title_dict2 = {지침의 대제목: 방침의 대제목}

    # Match를 위한 rule 후보군
    # 사용자가 체크한 Rule들을 후보군으로 매칭하기 위한 rule 리스트 생성
    user_rule = []
    df = pd.read_csv("./test_instruction_1106.csv", encoding='cp949')
    for i in range(1, len(user_input)):
        user_rule.append(df["part"][user_input[i]])

    title_dict = Match_Frame(title_list, user_rule)
    title_dict2 = {value: key for key, values in title_dict.items() for value in values}

    unique_title_dict = {}
    for title in unique_title_list:
        for key, value in title_dict.items():
            if key in title:
                unique_title_dict[title] = value
                break

    unique_title_dict2 = {value: key for key, values in unique_title_dict.items() for value in values}

    print("Search Match Omission의 Match 파트입니다.\n")
    print("title_dict:", title_dict, "\n")
    print("title_dict2:", title_dict2, "\n")
    print("unique_title_dict :", unique_title_dict , "\n")
    print("unique_title_dict2", unique_title_dict2, "\n")

    # 3> UserInput(체크박스) 반영 -> 누락찾기

        # 1) 사용자 입력으로 검사할 필요 없는 항목들을 데이터 프레임에 표기
    for_omission_title_dict2, user_input_text, df = Reflect_Userinput(user_input, title_dict2)

    inverted_dict = {}
    for key, value in for_omission_title_dict2.items():
        if value not in inverted_dict:
            inverted_dict[value] = []
        inverted_dict[value].append(key)
    for_omission_title_dict = inverted_dict

        # 2) 누락항목체크(Omission Check) 해서 그 결과 반환
    omission_text, process_Omission_Paragraph, omission_Issues, issue_id = Alert_Omission(for_omission_title_dict2, user_input_text)
    print("Search Match Omission의 Omission 파트입니다.\n")
    print("누락된 파트는 이렇습니다", omission_text)

    return unique_title_list, title_dict, title_dict2, omission_text, unique_title_dict, unique_title_dict2, df, process_Omission_Paragraph, omission_Issues, issue_id


