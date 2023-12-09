import re
# 진단결과에서 위반사항만 추출해주는 전처리 모듈

def Extract_Violation(final_answer_text):
    violation_text = "*<기재항목 누락 관련 사항>*\n"

    ## 1. 벡터 DB 삽입할 데이터 정제
    extract_text = re.sub(r'최종 결과\n\n법률 위반: \d건\n법률 위반 위험: \d건\n작성지침 미준수: \d건', '', final_answer_text)
    extract_text = re.sub(r'\n\n\n\n\d+> instruction:.*?(\n|$)', '', extract_text)

    pattern1 = re.compile(r'\*<기재항목 누락 관련 사항>\*(.*?)1>', re.DOTALL)
    missing_items = pattern1.findall(extract_text)

    for item in missing_items:
        violation_text += str(item)

    pattern２ = re.compile(r'(규칙\d+:.*?위반 유형:.*?위반 문장:.*?)(?=규칙|\Z)', re.DOTALL)
    all_rules = pattern２.findall(extract_text)

    violation_parts = [part for part in all_rules if '위반 사항: 있음' in part]

    for part in violation_parts:
        violation_text += str(part) + "\n"

    # 파일 저장 경로 설정
    file_path = './pripen/VectorDB/data/처리방침 진단 결과.txt'

    # 텍스트를 txt 파일로 저장하는 코드
    with open(file_path, 'w', encoding='utf-8') as file:
        file.write(violation_text)
    return True