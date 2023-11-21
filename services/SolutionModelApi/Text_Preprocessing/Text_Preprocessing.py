import re


def Text_Preprocessing(text):
    # 따옴표 제거
    text = text.replace("'","")
    text = text.replace('"',"")

    # 연속된 개행 하나의 개행으로 바꿈
    text = re.sub(r'(\r\n)+', '\r\n', text)
    # 문자와 개행 사이에 있는 공백 전부 제거
    corrected_text = re.sub(r'\s+\r\n', '\r\n', text)

    return corrected_text

