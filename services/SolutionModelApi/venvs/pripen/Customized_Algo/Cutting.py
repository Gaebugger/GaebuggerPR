# 2개의 딕셔너리 기반으로 Rule셋 대제목과 그에 해당하는 방침의 Part내용 매치하는 함수
    # title_dict = {추출한 방침 대제목:[룰셋 대제목]} -> one to many 구조
    # title_dict2 = {룰셋 대제목 : 추출한 방침 대제목} -> one to one 구조
    # 반환결과: {Rule셋 대제목 : 그거에 해당하는 방침의 Part 내용}
def extract_text_parts(text, part_indices):
    keys = list(part_indices.keys())
    result_dict = {}
    before = -1

    for i in range(len(keys)):
        start_idx = part_indices[keys[i]]

        # 마지막 키인 경우, 텍스트의 끝까지 추출
        if i == len(keys) - 1:
            end_idx = len(text)
        else:
            end_idx = part_indices[keys[i + 1]]

        # 첫 번째 값과 두 번째 값이 같다면, 두 키에 동일한 값을 할당
        if start_idx == before:
            result_dict[keys[i - 1]] = text[start_idx:end_idx]

        result_dict[keys[i]] = text[start_idx:end_idx]
        before = start_idx

    return result_dict

def Cutting(text, title_list, table=""):
    text = text.replace(table,"")
    part_dict = {}
    part_dict = {key: '' for key in title_list}

    # 대제목\n 돌면서 첫번째 인덱스 값 넣는다.
    for key in part_dict:
        index = text.find(key)
        part_dict[key] = index

    sorted_parts = dict(sorted(part_dict.items(), key=lambda item: item[1]))

    result_dict = extract_text_parts(text, sorted_parts)

    return result_dict