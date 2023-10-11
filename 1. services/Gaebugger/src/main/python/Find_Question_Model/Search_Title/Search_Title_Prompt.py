# 1> 목차 추출 프롬프트
def get_table(docs):
    target = f"""
    너는<개인정보처리방침>에서 '목차' 를 찾아서 '목차'의 내용을 추출하는 추출기야!
    <개인정보처리방침>
    {docs} 
    <개인정보처리방침>은 한 회사의 처리방침의 앞부분이야
    
    [목차]
    1. 개인정보처리방침
    2. 개인정보처리목적
    ...
    '목차'파트는 반드시 [목차]와 같이 '연속적'으로 대제목이 순서대로 나열되어 있는 형식으로 되어있을거야!
    우선, [목차] 예시를 참고하여 <개인정보처리방침에서> '목차'에 해당하는 파트를 찾아!
    
    1) 만약 [목차]의 예시같이 대제목이 연속적으로 나열되어 있는 파트를 찾을 수 없을때는, <목차없음>이라고 출력해줘!
    2) 만약 [목차]의 예시같은 파트를 찾았다면, ["1. 개인정보처리방침", "2. 개인정보처리목적"] 이렇게 파이썬 리스트 형태로 출력해줘!
    다시 강조하지만 군더더기말 붙이지말고 딱 파이썬 리스트 형태로 출력해줘!"""

    return target

# 2> 대제목 추출 프롬프트(토큰수 초과하면 잘릴 위험이 있다.)

    # 1) 목차 기반으로 추출 프롬프트(목차가 있는데 형식 안맞는 경우)

def title_create_prompt_only_with_table(docs, table_title_list):
    target= "너는 <목차>를 참고해서 <회사의 개인정보처리 방침>에서의 '대제목'을 뽑아주는 추출기야! 설명같은거 하지말고 딱 리스트만 출력해줘!\n"
    target += "<회사의 개인정보처리 방침>\n" + docs + '\n\n'
    target += "<목차>\n" + str(table_title_list) + '\n\n'
    target += "<목차>를 기반으로 '대제목'을 <회사의 개인정보처리 방침>에서 추출해!\n"
    target += "다른 설명하지말고 '대제목'을 번호가 있다면 번호나 띄어쓰기 있는 문장을 <회사의 개인정보처리 방침>에서 그 문장을 그대로 추출해서, 파이썬 리스트로 출력만 해줘!\n"
    target += "반드시 <목차>에서가 아니라 <회사의 개인정보처리 방침의 일부분>에서 '대제목'을 띄어쓰기나 붙어있는 번호까지 고려해서, [예시1]의 -출력포맷처럼 그 힌문장그대로 파이썬 리스트로 추출해줘!\n"
    target += "[예시1]\n만약 <목차>를 보고 <회사의 개인정보처리 방침의 일부분>에서 '12) 개인정보처리방침'을 찾았다면, 띄어쓰기랑 번호까지 고려해서 \n-출력포맷:['12) 개인정보처리방침']"
    return target

def title_create_prompt_part_with_table(docs, table_title_list):
    target = "너는 <목차>를 참고해서 <회사의 개인정보처리 방침의 일부분>에서의 '대제목'을 뽑아주는 추출기야! 설명같은거 하지말고 딱 리스트만 출력해줘!\n"
    target += "<회사의 개인정보처리 방침의 일부분>\n" + docs + '\n\n'
    target += "<목차>\n" + str(table_title_list) + '\n\n'
    target += "<목차>를 기반으로 '대제목'을 <회사의 개인정보처리 방침의 일부분>에서 추출해!\n"
    target += "다른 설명하지말고 '대제목'을 번호가 있다면 번호나 띄어쓰기 있는 문장을 <회사의 개인정보처리 방침의 일부분>에서 그 문장을 그대로 추출해서, 파이썬 리스트로 출력만 해줘!\n"
    target += "반드시 <목차>에서가 아니라 <회사의 개인정보처리 방침의 일부분>에서 '대제목'을 띄어쓰기나 붙어있는 번호까지 고려해서, [예시1]의 -출력포맷처럼 그 한문장 그대로 파이썬 리스트로 추출해줘!\n"
    target += "[예시1]\n만약 <목차>를 보고 <회사의 개인정보처리 방침의 일부분>에서 '12) 개인정보처리방침'을 찾았다면,띄어쓰기랑 번호까지 고려해서 \n-출력포맷:['12) 개인정보처리방침']"
    return target

    # 2) 룰셋 대제목 참고하여 LLM 기반으로 추출하는 프롬프트
        ## 1) 룰셋의 대제목 참고
        ## 2) chunk가 여러개인 경우 chunk에서 앞에서 추출한 것을 계속 추가해서 참고
def title_create_prompt_only(docs, rule):
    target= "너는 <규칙의 대제목>을 참고해서 <회사의 개인정보처리 방침>의 대제목을 파이썬의 리스트로 뽑아주는 추출기야. 설명같은거 하지말고 딱 리스트만 출력해줘!\n"
    target += "<회사의 개인정보처리 방침>\n" + docs + '\n\n'
    target += '<규칙의 대제목>\n'+ str(rule) +'\n\n'
    target += "<규칙의 대제목>을 참고해서, 이거랑 의미 비슷한 '대제목들'을 <회사의 개인정보처리 방침>에서 추출해\n"
    target += "반드시 '대제목'은 <규칙의 대제목>과 연관이 있어야해! 굳이 억지로 추출할 필요는 없어!\n"
    target += "반드시 <규칙의 대제목>에서가 아니라 <회사의 개인정보처리 방침>에서 '대제목'을 띄어쓰기나 붙어있는 번호까지 고려해서,  [예시1]의 -출력포맷처럼 그 한문장 그대로 파이썬 리스트로 추출해줘!\n"
    target += "[예시1]\n만약 <규칙의 대제목>을 보고 <회사의 개인정보처리 방침>에서 '12) 개인정보처리방침'을 찾았다면,띄어쓰기랑 번호까지 고려해서 \n-출력포맷:['12) 개인정보처리방침']"
    return target


def title_create_prompt_part_first(docs, rule):
    target = "너는 <규칙의 대제목>을 참고해서 <회사의 개인정보처리 방침의 첫부분>의 대제목을 파이썬의 리스트로 뽑아주는 추출기야! 설명같은거 하지말고 딱 리스트만 출력해줘!\n"
    target += "<회사의 개인정보처리 방침의 첫부분>\n" + docs + '\n\n'
    target += '<규칙의 대제목>\n'+ str(rule) +'\n\n'
    target += "<규칙의 대제목>을 참고해서, 이거랑 의미 비슷한 '대제목들'을 <회사의 개인정보처리 방침의 첫부분>에서 추출해\n"
    target += "반드시 '대제목'은 <규칙의 대제목>과 연관이 있어야해! 굳이 억지로 추출할 필요는 없어!\n"
    target += "반드시 <규칙의 대제목>에서가 아니라 <회사의 개인정보처리 방침의 첫부분>에서 '대제목'을 띄어쓰기나 붙어있는 번호까지 고려해서,  [예시1]의 -출력포맷처럼 그 한문장 그대로 파이썬 리스트로 추출해줘!\n"
    target += "[예시1]\n만약 <규칙의 대제목>을 보고 <회사의 개인정보처리 방침의 첫부분>에서 '12) 개인정보처리방침'을 찾았다면,띄어쓰기랑 번호까지 고려해서 \n-출력포맷:['12) 개인정보처리방침']"
    return target


def title_create_prompt_part(docs, rule, title_list):
    target = "너는 <규칙의 대제목>을 참고해서 <회사의 개인정보처리 방침 일부분>의 대제목을 파이썬의 리스트로 뽑아주는 추출기야! 설명같은거 하지말고 딱 리스트만 출력해줘!\n"
    target += "<회사의 개인정보처리 방침 일부분>\n" + docs + '\n\n'
    target += "추가로 <회사의 개인정보처리 방침 일부분>은 조각난 일부분이야!\n<앞부분에서 추출한 대제목>" + "\"" + str(title_list) + '\n\n"' + "이 형식으로 대제목의 형식은 통일 되어있어! 반드시 이 형식을 참고해서 대제목을 찾으면 돼!\n"
    target += "예를들어서 <앞부분에서 추출한 대제목>이 ['(1)개인정보처리방침', '(2)개인정보처리목적'] 이와같이 번호형식이 있다면, 그 형식을 참고해서 다음은 '(3)'으로 시작하는게 반드시 대제목이 되는거야!\n"
    target += "1> 즉, <앞부분에서 추출한 대제목>에 번호순과 같은 규칙성 형식이 있으면, 그 규칙성 형식보고 확실하면 추출해줘! 굳이 억지로 추출할 필요는 없어!\n"
    target += "2> 그런데 <앞부분에서 추출한 대제목>에 규칙성 형식이 없다면 , <규칙의 대제목>을 보고 확실하면 이거랑 의미 비슷한 대제목들을 출력해줘! 이거도 굳이 억지로 추출할 필요는 없어!\n"
    target += '<규칙의 대제목>\n' + str(rule) + '\n\n'
    target += "'대제목'은 반드시 <회사의 개인정보처리 방침>에서 추출해\n\n"
    target += "반드시 <규칙의 대제목>에서가 아니라 <회사의 개인정보처리 방침 일부분>에서 '대제목'을 띄어쓰기나 붙어있는 번호까지 고려해서, [예시1]의 -출력포맷처럼 그 한문장 그대로 파이썬 리스트로 추출해줘!\n"
    target += "[예시1]\n만약 <규칙의 대제목>을 보고 <회사의 개인정보처리 방침 일부분>에서 '12) 개인정보처리방침'을 찾았다면,띄어쓰기랑 번호까지 고려해서 \n-출력포맷:['12) 개인정보처리방침']\n"
    return target



# 제목 추출한거 바탕으로 그 다음문장까지 출력해줌(유니크한 값) -> 할지말지 고민중..., 별로 성능 안좋고 토큰수만 많아짐
def unique_title_create_prompt_part(docs, title_list):
    target = "너는 [방침]에서 '대제목'을 찾고 '대제목 바로 다음의 한 문장'까지 추가로 추출하는 추출기야! 너는 반드시 다른말 하지말고 결과(리스트의 형태)만 출력해야해!\n"
    target += f"""
        [방침]
        {docs}
        
        [추출한 대제목]
        {title_list}
        
        너는 [추출한 대제목]을 참고하여, [방침]에서의 '대제목'을 찾을거야! 반드시 군더더기말 하지말고 1>과 2>의 출력형태를 따라줘!
        1> 만약 '대제목'을 [방침]에서 찾지못했다면, 억지로 다음문장 찾지말고 [예시0]의 -출력포맷 처럼 파이썬의 빈 리스트 출력해!!
            [예시0]
            -출력포맷: []
        
        2> '대제목'을 찾았다면, 이제 '대제목' 바로 다음 한 문장까지 연속해서 추출해야해. [예시1]을 반드시 참고해!
            [예시1]
            '''
            감사합니다.\n<대제목1>\n나는 식물이 아닙니다.\n나는 인간도 아닙니다.
            '''
            -> 이런 경우 
            1) 너는 첫번쨰로 [추출한 대제목]을 참고하여 방침에서 <대제목1>을 찾을거야!
            2) <대제목1>을 찾았으면 "나는 식물이 아닙니다."가 <대제목1> 다음의 한 문장이 되고, 밑의 -출력포맷 처럼 출력하면 돼, \n은 그냥 문자일 뿐이야!!
            -출력포맷: ["<대제목1>\n나는 식물이 아닙니다."]
    
            반드시 설명같은거 하지 말고 1>과 2>으 출력포맷에 따라서 딱 리스트만 출력해줘! 그리고 \n은 그냥 문자일 뿐이야!"""
    return target


def unique_title_create_prompt_only(docs, title_list):
    target = "너는 [방침]에서 '대제목'을 찾고 '대제목 바로 다음의 한 문장'까지 추가로 추출하는 추출기야! 너는 반드시 다른말 하지말고 결과(리스트의 형태)만 출력해야해!\n"
    target += f"""
            [방침]
            {docs}
           
            [추출한 대제목] 
            {title_list}
            
            너는 [추출한 대제목]을 참고하여, [방침]에서 '대제목'을 찾을거야! 반드시 군더더기말 하지말고 1>과 2>의 출력형태를 따라줘!
            1> 만약 '대제목'을 [방침]에서 찾지못했다면, 억지로 다음문장 찾지말고 [예시0]의 -출력포맷 처럼 파이썬의 빈 리스트 출력해!!
            [예시0]
            -출력포맷: []
            
            2> '대제목'을 찾았다면, 이제 '대제목' 바로 다음 한 문장까지 연속해서 추출해야해. [예시1]을 반드시 참고해!
                [예시1]
                '''
                감사합니다.\n<대제목1>\n나는 식물이 아닙니다.\n나는 인간도 아닙니다.\n
                '''
                -> 이런 경우 
                1) 너는 첫번쨰로 [추출한 대제목]을 참고하여 방침에서 <대제목1>을 찾을거야!
                2) <대제목1>을 찾았으면 "나는 식물이 아닙니다."가 <대제목1> 다음의 한 문장이 되고, 밑의 -출력포맷 처럼 출력하면 돼, \n은 그냥 문자일 뿐이야!!
                -출력포맷: ["<대제목1>\n나는 식물이 아닙니다."]
    
                반드시 설명같은거 하지 말고 1>과 2>으 출력포맷에 따라서 딱 리스트만 출력해줘! 그리고 \n은 그냥 문자일 뿐이야!"""

    return target
