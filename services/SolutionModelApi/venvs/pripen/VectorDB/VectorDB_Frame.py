from .Extract_Violation import Extract_Violation
from .Insert_Violation import Insert_Violation

def VectorDB_Frame(final_answer_text):
    violation_text = Extract_Violation(final_answer_text)
    isSuccessful = Insert_Violation(violation_text) # 벡터 DB 삽입 및 성공여부 전달

    return isSuccessful