from .Make_Json import Make_Issues_Omission

import pandas as pd
df = pd.read_csv("./test_instruction_1106.csv", encoding='cp949')
import warnings
warnings.filterwarnings("ignore", category=UserWarning)
# 1) 0: 의무
# 2) 1: 해당시 의무
# 3) 2: 해당시 권장

rule = { #'제목 및 서문':0,
        '개인정보의 처리 목적':0,
        '개인정보의 처리 및 보유 기간':0,
        '처리하는 개인정보의 항목':0,
        '만 14세 미만 아동의 개인정보 처리에 관한 사항':2,
        '개인정보의 제3자 제공에 관한 사항':1,
        '개인정보 처리업무의 위탁에 관한 사항':1,
        '개인정보의 국외 이전에 관한 사항':2,
        '개인정보의 파기 절차 및 방법에 관한 사항':0,
        '미이용자의 개인정보 파기 등에 관한 조치':2,
        '정보주체와 법정대리인의 권리·의무 및 행사방법에 관한 사항':0,
        '개인정보의 안전성 확보조치에 관한 사항':0,
        '개인정보를 자동으로 수집하는 장치의 설치·운영 및 그 거부에 관한 사항':1,
        '행태정보의 수집·이용·제공 및 거부 등에 관한 사항':1,
        '추가적인 이용·제공 관련 판단 기준':1,
        '가명정보 처리에 관한 사항':1,
        '개인정보 보호책임자에 관한 사항':0,
        '국내대리인 지정에 관한 사항':1,
        '개인정보의 열람청구를 접수·처리하는 부서':0,
        '정보주체의 권익침해에 대한 구제방법':0,
        '영상정보처리기기 운영·관리에 관한 사항':2,
        '개인정보 처리방침의 변경에 관한 사항':0}

# 데이터 프레임에서 해당하는 인덱스의 규칙문자열 가지고 와서 리스트에 저장(사용자가 입력한 것들)

# 가지고 온 uesr_input_text로 모델이 뽑은 title_dict검사해서 없으면
# 그 요소 제거(검사할 필요 없음) 그리고 title_dict반환, 나중을 위해서 no_need 선언
no_need=[]


def Reflect_Userinput(user_input, title_dict2):
        user_input_text = []
        df['user_input']=''
        for i in user_input:
                user_input_text.append(df['part'][i])
                df.loc[i, 'user_input'] = '1'
        for i in list(title_dict2):
                if i not in user_input_text:
                        no_need.append(i)
                        del(title_dict2[i])
        return title_dict2, user_input_text, df

# rule에서 user_input으로 들어온거만 남긴다.
# 이제 뽑은 title의 value 기준으로 반복문 돌린다. 누락여부 판별!
#       1) 의무인데 누락일시(0, 1) 있어야합니다 출력!
#       2) 해당인데 권고면(2) 있는것이 좋아보입니다 출력!

def Alert_Omission(title_dict2, user_input_text):
    # 누락사항 체킹한거 출력물
    omission_dict = {}
    omission_text = ""
    omission_text_one =""
    # title_dict2 : {지침:방침}
    # user_input_text: 사용자 체크 input 및 필수항목
    process_Omission_Paragraph = 0
    title_dict2_list = list(title_dict2.keys())
    for i in list(rule.keys()):
        if i not in user_input_text:
                del(rule[i])
    for key,value in rule.items():
        if ((value == 0 or value==1) and key not in title_dict2_list):
            omission_text_one = str(key)+"에 해당하는 항목의 기재가 누락인 상태이고 이를 의무로 기재하여야합니다."
            omission_text += str(key)+"에 해당하는 항목의 기재가 누락인 상태이고 이를 의무로 기재하여야합니다.\n"
            omission_dict[str(key)]= omission_text_one
            process_Omission_Paragraph += 1
        elif (value == 2 and key not in title_dict2_list):
            omission_text_one = str(key) + "에 해당하는 항목의 기재가 누락인 상태이고 이를 의무로 기재하여야합니다."
            omission_text = str(key) + "에 해당하는 항목의 기재가 누락인 상태이고 이는 권장사항입니다.\n"
            omission_dict[str(key)]= omission_text_one
            process_Omission_Paragraph += 1
    print("누락된 항목 딕셔너리", omission_dict)
    omission_Issues, issue_id = Make_Issues_Omission(omission_dict, df)
    return omission_text, process_Omission_Paragraph, omission_Issues, issue_id








