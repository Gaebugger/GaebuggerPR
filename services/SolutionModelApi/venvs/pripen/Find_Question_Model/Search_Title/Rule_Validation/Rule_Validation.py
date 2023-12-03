import ast
import re

# 목차로 추출해온 값 검증, 그리고 룰기반으로 보정해주는 함수
def checking_table(text, title_list, table):
    print(table,"\n")
    text = text.replace(table, "")
    print(text)

    all=0
    new_title_list=[]
    for title in title_list:
        print(title)
        if(text.find(title)==-1): # 만약 한번에 못찾았으면
            print("한번에 못찾음!")
            #예외처리 알고리즘
            #만약 숫자나한글뒤에 .있고 공백이 있으면
            if bool(re.search(r'([0-9가-힣])\. [가-힣]', title)):
                # 공백제거
                print("공백있음")
                right_title = re.sub(r'([0-9가-힣])\. ([가-힣])', r'\1.\2', title)
                # 공백제거하고 text에서 찾는다.
                check_except = text.find(right_title)
                # 공백제거하고 찾았으면 그거로 리스트값 바꾼다.
                if(check_except!=-1):
                    new_title_list.append(right_title)
                    all+=1

            #아니면 숫자난 한글뒤에 .이 바로 붙어있는 경우에
            elif bool(re.search(r'([0-9가-힣]+)\.[가-힣]', title)):
                #공백만들기
                print("공백없음")
                right_title = re.sub(r'([0-9가-힣]+)\.([가-힣])', r'\1. \2', title)
                # 공백만들고 text에서 찾는다.
                check_except = text.find(right_title)
                # 공백만들고 찾았으면 그거로 리스트값 바꾼다.
                if (check_except != -1):
                    print("옳은 타이틀",right_title,"\n")
                    new_title_list.append(right_title)
                    all+=1

        # 한번에 찾았다면
        else:
            print("한번에 찾음")
            new_title_list.append(title)
            all+=1

    if(all == len(title_list)):
        return True, new_title_list
    else:
        print("목차가 존재하지만, 목차의 형식과 본문의 형식이 다릅니다!!")
        return False, new_title_list



def checking_list(text):
    try:
        evaluated = ast.literal_eval(text)
        return isinstance(evaluated, list)
    except:
        return False

def checking_dict(text):
    try:
        evaluated = ast.literal_eval(text)

        return isinstance(evaluated, dict)
    except:
        return False

def checking_answer_template(text):
    rule_pattern = re.compile(r"\*\*규칙\d+:.*?위반 유형: \[.*?\] 혹은 문제 없음", re.DOTALL)

    # 최종 결과 확인을 위한 정규 표현식 패턴
    final_result_pattern = re.compile(r"법률 위반: \d+건\n법률 위반 가능:\d+건\n지침 미준수: \d+건\n권장 사항: \d+건")

    # 각 규칙들의 정보가 올바르게 표시되었는지 검사
    rules = rule_pattern.findall(text)
    if not rules:
        return False, "규칙 정보가 올바르게 표시되지 않았습니다."

    # 최종 결과가 올바르게 표시되었는지 검사
    if not final_result_pattern.search(text):
        return False, "최종 결과가 올바르게 표시되지 않았습니다."

    # 위의 조건들을 모두 만족하면 출력은 올바른 것으로 간주
    return True
