
# 반목문을 톹한 chunk 처리가 없기에 바로 여기서 소환
from .Match_Title import Match_Title
from .Rule_Validation.Rule_Validation import checking_dict

def Match_Frame(title_list, rule):
    return Match_Title(title_list, rule)