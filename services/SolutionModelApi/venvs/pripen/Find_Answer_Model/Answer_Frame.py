from .Answer_Model import Answer_Model

def Answer_Frame(df, text, issue_id, original_df):
    return Answer_Model(df, text, issue_id, original_df)