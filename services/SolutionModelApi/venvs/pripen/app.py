from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import json
import openai
import os
from config import config
import uvicorn
import requests
import re
from typing import List
openai.api_key = os.getenv("OPENAI_API_KEY")

# Module & table 데이터
from Find_Question_Model.Search_Match_Omission_Model import Search_Match_Omission_Model, table

from Customized_Algo.Algo_Frame import *
from Find_Answer_Model.Answer_Model import *
from Find_Answer_Model.Answer_Frame import *
from Find_Question_Model.User_Input_Check import *
from Text_Preprocessing.Text_Preprocessing import *
from Text_Preprocessing.Make_Output_Json import *

# 벡터DB관련 모듈
from VectorDB.Extract_Violation import *
from VectorDB.Insert_Violation import *
from VectorDB.VectorDB_Frame import *

app = FastAPI()

# Define your Pydantic models here
class ProcessTextRequest(BaseModel):
    process_Id: str
    text: str
    user_input: List[int]  # 예를 들어, 정수 리스트로 가정

@app.post('/process-text')
def process_text(request: ProcessTextRequest):
    # Your logic remains the same, with adjustments for async
    process_Id = request.process_Id
    text = request.text
    user_input = request.user_input

    # 테스트에서만 임시로 저장
    with open("./policy.txt", "w", encoding="utf-8") as file:
        file.write(text)

    # <내부 알고리즘 동작>
    unique_title_list, title_dict, title_dict2, omission_text, unique_title_dict, unique_title_dict2, df, process_Omission_Paragraph, omission_Issues, issue_id = Search_Match_Omission_Model(
        user_input)

    print("추출한 '고유 대제목'과 그에 해당하는 룰\n")
    print(unique_title_dict, "\n")
    print(unique_title_dict2, "\n")

    df, original_df = Algo_Frame(text, unique_title_list, unique_title_dict2, df, table)
    print("Customized_Algo에서 완성한 데이터프레임입니다!")
    print(df[['user_input', 'part', 'matched_part', 'matched_startIndex']])

    ### Answer 주는 부분

    answer_text, process_Paragraph, process_Issues, process_Law_Violate, process_Law_Danger, process_Guide_Violate = Answer_Frame(
        df, text, issue_id, original_df)

    # <출력사항>
    if (omission_text == ""):
        omission_text = "없음"
    omission_text = "*<기재항목 누락 관련 사항>*\n" + omission_text + "\n\n"
    final_answer_text = omission_text + answer_text
    print(final_answer_text)

    # 벡터DB에 재진단 데이터 삽입

    DB_Insert = VectorDB_Frame(final_answer_text)
    if(DB_Insert == True):
        print("벡터 DB삽입에 성공하였습니다.")
    else:
        print("벡터 DB삽입에 실패하였습니다.")

    backend_json = Make_Output_Json(process_Id, text, process_Law_Violate, process_Law_Danger, process_Guide_Violate, process_Omission_Paragraph, process_Paragraph, omission_Issues, process_Issues)

    response_data = json.dumps(backend_json, ensure_ascii=False)
    return JSONResponse(content=json.loads(response_data), media_type="application/json; charset=utf-8")
