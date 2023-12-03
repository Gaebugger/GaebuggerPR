import sys
import os
sys.path.append("./config")
import config
api_key = os.getenv("OPENAI_API_KEY")
print("Search_Frame:", api_key)
# Module
from .Rule_Validation.Rule_Validation import checking_list
from .Search_Title import Search_Title, Make_Unique_Title



def Search_Frame(documents, docs, rule):

    title_list = Search_Title(documents, docs, rule)
    unique_title_list = Make_Unique_Title(title_list)

    return title_list, unique_title_list

