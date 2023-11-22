from .Cutting import Cutting
from .Matching1 import Matching1
from .Matching2 import Matching2

def Algo_Frame(text, title_list, title_dict2, df, table):
    cut_dict = Cutting(text, title_list, table)
    print("방침 대제목과 파트내용 매칭된 딕셔너리 {방침 대제목:파트}\n")
    print(cut_dict)

    matched_dict1 = Matching1(cut_dict,title_dict2)
    print("룰 대제목과 파트내용 매칭된 딕셔너리 {rule대제목:파트}\n")
    print(matched_dict1)


    df, original_df = Matching2(text, matched_dict1, df)

    return df, original_df