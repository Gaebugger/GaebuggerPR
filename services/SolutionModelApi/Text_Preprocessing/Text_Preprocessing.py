import re

def Text_Preprocessing(text):
    # 따옴표 제거
    text = text.replace("'","")
    text = text.replace('"',"")

    # 문자와 개행 사이에 있는 공백 전부 제거
    corrected_text = re.sub(r'\s+\r', '\r', text)

    return corrected_text

