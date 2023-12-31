# 1> 목차 추출 프롬프트
def get_table(docs):
    target = f"""
    <개인정보처리방침>에서 '목차' 를 찾아서 '목차'의 내용을 추출해줘!(파이썬 코드 작성해 달라는 거 아니야!, 군더더기말도 붙이지마!)
    
    <개인정보처리방침>
    {docs} 
    <개인정보처리방침>은 한 회사의 처리방침의 앞부분이야
    
    [목차]
    1. 개인정보 처리의 목적과 활용
    2. 개인정보 수집및 이용 방법
    ...
    '목차'파트는 반드시 [목차]와 같이 '연속적'으로 대제목이 순서대로 나열되어 있는 형식으로 되어있을거야!
    반드시 저렇게 [목차]라고 명시적으로 언급이 되어 있어야지 목차야! 너가 임의로 판단하지마!
    우선, [목차] 예시를 참고하여 <개인정보처리방침에서> '목차'에 해당하는 파트를 찾아!
    
    1) 만약 [목차]의 예시같이 대제목이 연속적으로 나열되어 있는 파트를 찾을 수 없을때는, <목차없음>이라고 출력해줘!
    2) 만약 [목차]의 예시같은 파트를 찾았다면, ["1. 개인정보처리방침", "2. 개인정보처리목적"] 이렇게 파이썬 리스트 형태로 출력해줘!
    다시 강조하지만 설명같은거 절대 붙이지말고 딱 파이썬 리스트 형태로 출력하거나 <목차없음>이렇게 둘 중 하나를 출력해줘!"""

    return target

# 2> 대제목 추출 프롬프트(토큰수 초과하면 잘릴 위험이 있다.)

    # 1) 목차 기반으로 추출 프롬프트(목차가 있는데 형식 안맞는 경우)

def title_create_prompt_only_with_table(docs, table_title_list):
    target= "너는 <목차>를 참고해서 <회사의 개인정보처리 방침>에서의 '대제목'을 뽑아주는 추출기야! 설명같은거 절대 하지말고 딱 리스트만 출력해줘!\n"
    target += "반드시 [출력포맷]의 형태로 출력해줘!(파이썬 코드 작성해 달라는 거 아니야!, 군더더기말도 붙이지마!)\n"
    target += "[출력포맷]\n['개인정보 처리목적', '개인정보 처리항목', ... ]\n"
    target += "<목차>\n" + str(table_title_list) + '\n\n'
    target += "<목차>를 기반으로 '대제목'을 <회사의 개인정보처리 방침>에서 추출해!\n"
    target += "<회사의 개인정보처리 방침>\n" + docs + '\n\n'
    target += "다른 설명하지말고 '대제목'을 번호가 있다면 번호나 띄어쓰기 있는 문장을 <회사의 개인정보처리 방침>에서 그 문장을 그대로 추출해서, 파이썬 리스트로 출력만 해줘!\n"
    target += "반드시 <목차>에서가 아니라 <회사의 개인정보처리 방침의 일부분>에서 '대제목'을 띄어쓰기나 붙어있는 번호까지 고려해서, [예시1]의 -출력포맷처럼 그 힌문장그대로 파이썬 리스트로 추출해줘!\n"
    target += "[예시1]\n만약 <목차>를 보고 <회사의 개인정보처리 방침의 일부분>에서 '12) 개인정보처리방침'을 찾았다면, 띄어쓰기랑 번호까지 고려해서 \n-출력포맷:['12) 개인정보처리방침']"
    return target

def title_create_prompt_part_with_table(docs, table_title_list):
    target = "너는 <목차>를 참고해서 <회사의 개인정보처리 방침의 일부분>에서의 '대제목'을 뽑아주는 추출기야! 설명같은거 절대 하지말고 딱 리스트만 출력해줘!\n"
    target += "반드시 [출력포맷]의 형태로 출력해줘!(파이썬 코드 작성해 달라는 거 아니야!, 군더더기말도 붙이지마!)\n"
    target += "[출력포맷]\n['개인정보 처리목적', '개인정보 처리항목', ... ]\n"
    target += "<목차>\n" + str(table_title_list) + '\n\n'
    target += "<목차>를 기반으로 '대제목'을 <회사의 개인정보처리 방침의 일부분>에서 추출해!\n"
    target += "<회사의 개인정보처리 방침의 일부분>\n" + docs + '\n\n'
    target += "다른 설명하지말고 '대제목'을 번호가 있다면 번호나 띄어쓰기 있는 문장을 <회사의 개인정보처리 방침의 일부분>에서 그 문장을 그대로 추출해서, 파이썬 리스트로 출력만 해줘!\n"
    target += "반드시 <목차>에서가 아니라 <회사의 개인정보처리 방침의 일부분>에서 '대제목'을 띄어쓰기나 붙어있는 번호까지 고려해서, [예시1]의 -출력포맷처럼 그 한문장 그대로 파이썬 리스트로 추출해줘!\n"
    target += "[예시1]\n만약 <목차>를 보고 <회사의 개인정보처리 방침의 일부분>에서 '12) 개인정보처리방침'을 찾았다면,띄어쓰기랑 번호까지 고려해서 \n-출력포맷:['12) 개인정보처리방침']"
    return target

    # 2) 룰셋 대제목 참고하여 LLM 기반으로 추출하는 프롬프트
        ## 1) 룰셋의 대제목 참고
        ## 2) chunk가 여러개인 경우 chunk에서 앞에서 추출한 것을 계속 추가해서 참고
def title_create_prompt_only(docs, rule):
    target= "너는 <규칙의 대제목>을 참고해서 <회사의 개인정보처리 방침>의 대제목을 파이썬의 리스트로 뽑아주는 추출기야. 설명같은거 절대 하지말고 딱 리스트만 출력해줘!\n"
    target += "반드시 [출력포맷]의 형태로 출력해줘!(파이썬 코드 작성해 달라는 거 아니야!, 군더더기말도 붙이지마!)\n"
    target += "[출력포맷]\n['개인정보 처리목적', '개인정보 처리항목', ... ]\n"
    target += "<회사의 개인정보처리 방침>\n" + docs + '\n\n'
    target += '<규칙의 대제목>\n'+ str(rule) +'\n\n'
    target += "<규칙의 대제목>을 참고해서, 이거랑 의미 비슷한 '대제목들'을 <회사의 개인정보처리 방침>에서 추출해\n"
    target += "반드시 '대제목'은 <규칙의 대제목>과 연관이 있어야해! 굳이 억지로 추출할 필요는 없어!\n"
    target += "반드시 <규칙의 대제목>에서가 아니라 <회사의 개인정보처리 방침>에서 '대제목'을 띄어쓰기나 붙어있는 번호까지 고려해서,  [예시1]의 -출력포맷처럼 그 한문장 그대로 파이썬 리스트로 추출해줘!\n"
    target += "[예시1]\n만약 <규칙의 대제목>을 보고 <회사의 개인정보처리 방침>에서 '12) 개인정보처리방침'을 찾았다면,띄어쓰기랑 번호까지 고려해서 \n-출력포맷:['12) 개인정보처리방침']"
    return target


def title_create_prompt_part_first(docs, rule):
    target = "너는 <규칙의 대제목>을 참고해서 <회사의 개인정보처리 방침의 첫부분>의 대제목을 파이썬의 리스트로 뽑아주는 추출기야! 설명같은거 절대 하지말고 딱 리스트만 출력해줘!\n"
    target += "반드시 [출력포맷]의 형태로 출력해줘!(파이썬 코드 작성해 달라는 거 아니야!, 군더더기말도 붙이지마!)\n"
    target += "[출력포맷]\n['개인정보 처리목적', '개인정보 처리항목', ... ]\n"
    target += "<회사의 개인정보처리 방침의 첫부분>\n" + docs + '\n\n'
    target += '<규칙의 대제목>\n'+ str(rule) +'\n\n'
    target += "<규칙의 대제목>을 참고해서, 이거랑 의미 비슷한 '대제목들'을 <회사의 개인정보처리 방침의 첫부분>에서 추출해\n"
    target += "반드시 '대제목'은 <규칙의 대제목>과 연관이 있어야해! 굳이 억지로 추출할 필요는 없어!\n"
    target += "반드시 <규칙의 대제목>에서가 아니라 <회사의 개인정보처리 방침의 첫부분>에서 '대제목'을 띄어쓰기나 붙어있는 번호까지 고려해서,  [예시1]의 -출력포맷처럼 그 한문장 그대로 파이썬 리스트로 추출해줘!\n"
    target += "[예시1]\n만약 <규칙의 대제목>을 보고 <회사의 개인정보처리 방침의 첫부분>에서 '12) 개인정보처리방침'을 찾았다면,띄어쓰기랑 번호까지 고려해서 \n-출력포맷:['12) 개인정보처리방침']"
    return target


def title_create_prompt_part(docs, rule, title_list):
    target = "너는 <규칙의 대제목>을 참고해서 <회사의 개인정보처리 방침 일부분>의 대제목을 파이썬의 리스트로 뽑아주는 추출기야! 설명같은거 절대 하지말고 딱 리스트만 출력해줘!\n"
    target += "반드시 [출력포맷]의 형태로 출력해줘!(파이썬 코드 작성해 달라는 거 아니야!, 군더더기말도 붙이지마!)\n"
    target += "[출력포맷]\n['개인정보 처리목적', '개인정보 처리항목', ... ]\n"
    target += "추가로 <회사의 개인정보처리 방침 일부분>은 조각난 일부분이야!\n<앞부분에서 추출한 대제목>" + "\"" + str(title_list) + '\n\n"' + "이 형식으로 대제목의 형식은 통일 되어있어! 즉 [에시0]을 참고해서 대제목을 찾으면 돼!\n"
    target += "[예시0]\n<앞부분에서 추출한 대제목>이 ['가. 개인정보처리목적', '나. 개인정보보유기간', '다. 개인정보보호책임자'] 이와같은 규칙성이 있다면, 그 형식을 참고해서 '라.'로 시작하는게 반드시 대제목이 되는 규칙이 있는거야!\n"
    target += "1> 즉 <앞부분에서 추출한 대제목>에 규칙이 있으면, 그 규칙을 보고 확실하면 추출해줘! 굳이 억지로 추출할 필요는 없어!\n"
    target += "<회사의 개인정보처리 방침 일부분>\n" + docs + '\n\n'
    target += "2> 그런데 <앞부분에서 추출한 대제목>에 규칙이 없다면 , <규칙의 대제목>을 보고 확실하면 이거랑 의미 비슷한 대제목들을 출력해줘! 이거도 굳이 억지로 추출할 필요는 없어!\n"
    target += '<규칙의 대제목>\n' + str(rule) + '\n\n'
    target += "'대제목'은 반드시 <회사의 개인정보처리 방침>에서 추출해\n\n"
    target += "반드시 <규칙의 대제목>에서가 아니라 <회사의 개인정보처리 방침 일부분>에서 '대제목'을 띄어쓰기나 붙어있는 번호까지 고려해서, [예시1]의 -출력포맷처럼 그 한문장 그대로 파이썬 리스트로 추출해줘!\n"
    target += "[예시1]\n만약 <규칙의 대제목>을 보고 <회사의 개인정보처리 방침 일부분>에서 '12) 개인정보처리방침'을 찾았다면,띄어쓰기랑 번호까지 고려해서 \n-출력포맷:['12) 개인정보처리방침']\n"

    return target