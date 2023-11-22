import pandas as pd
import warnings
warnings.filterwarnings("ignore", category=UserWarning)
# 데이터 프레임에 Cutting 함수에서 추출한 딕셔너리 자료구조 반영
    # :해당하는 룰셋 대제목의 행에 matched_part라는 열에 매치된 파트 내용 추가

    # : 처음부터 제일위의 파트전까지는 '제목 및 서문'으로 취급한다.(제목은 무조건 있는 값임)

    # :데이터 프레임 반환

def Matching2(text, result_dict, df):
    df['matched_part'] = ''
    df['matched_startIndex']=9999999
    for key, value in result_dict.items():
        df.loc[df['part'] == key, 'matched_part'] = value
        df.loc[df['part'] == key, 'matched_startIndex'] = text.find(value)

    # 파트가 있는거랑, 유저가 체크한 값(검사 대상) 만으로 데이터프레임 컷팅

    df = df[(df['user_input'] == '1')]
    df = df.sort_values(by='matched_startIndex')
    original_df = df.copy()
    df.reset_index(drop=True, inplace=True)

    df.loc[df['part'] == "제목 및 서문", 'matched_part'] = text[0:df.iloc[0]['matched_startIndex']]
    original_df.loc[original_df['part'] == "제목 및 서문", 'matched_part'] = "temp_data"

    df.loc[df['part'] == "제목 및 서문", 'matched_startIndex'] = 0
    original_df.loc[original_df['part'] == "제목 및 서문", 'matched_startIndex'] = 0


    df = df[(df['matched_part'] != '')]
    original_df = original_df[(original_df['matched_part'] != '')]
    df = df.sort_values(by='matched_startIndex')
    original_df = original_df.sort_values(by='matched_startIndex')
    df.reset_index(drop=True, inplace=True)


    print("최종 완성된 데이터프레임입니다!")
    print(df[['user_input', 'part', 'matched_part', 'matched_startIndex']])

    df.to_csv("./ansDF.csv", encoding='utf-8-sig', index=False)
    return df, original_df