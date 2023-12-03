import ast
import re
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
