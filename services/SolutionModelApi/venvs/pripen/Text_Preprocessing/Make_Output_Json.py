# 최종 백엔드로 전달할 JSON데이터 정제하는 모듈

def Make_Output_Json(process_Id, text, process_Law_Violate, process_Law_Danger, process_Guide_Violate, process_Omission_Paragraph, process_Paragraph, omission_Issues, process_Issues):
    # <JSON 데이터>
    # 백엔드로 넘길 json데이터 구조
    backend_json = {"process_Id": process_Id, "process_Original": text, "process_Score": 0, "process_Law_Violate": 0,
                    "process_Law_Danger": 0,
                    "process_Guide_Violate": 0, "process_Omission_Paragraph": 0, "process_Paragraph": [],
                    "process_Issues": []}
    backend_json["process_Law_Violate"] = process_Law_Violate
    backend_json["process_Law_Danger"] = process_Law_Danger
    backend_json["process_Guide_Violate"] = process_Guide_Violate
    backend_json["process_Omission_Paragraph"] = process_Omission_Paragraph
    backend_json["process_Paragraph"] = process_Paragraph
    backend_json["process_Issues"] = omission_Issues
    backend_json["process_Issues"] += process_Issues

    # paragraph_id 순으로 정렬
    sorted_Issues = sorted(backend_json["process_Issues"], key=lambda x: x['issue_paragraph_id'])
    backend_json["process_Issues"] = sorted_Issues

    print("<최종 추출된 JSON 데이터>", backend_json)

    return backend_json