def Matching1(result_dict,title_dict2):
    matched_dict = {}
    # 각 룰셋 대제목에 대해 매핑된 방침 대제목을 찾고 해당하는 파트를 매핑
    for ruleset_title, policy_title in title_dict2.items():
        if policy_title in result_dict:
            matched_dict[ruleset_title] = result_dict[policy_title]

    return matched_dict