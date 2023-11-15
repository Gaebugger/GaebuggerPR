from .Answer_Model import Answer_Model
# 나중에 상속, CoT_SC으로 바꾸기
def Answer_Frame(df, text, issue_id, original_df):
    return Answer_Model(df, text, issue_id, original_df)