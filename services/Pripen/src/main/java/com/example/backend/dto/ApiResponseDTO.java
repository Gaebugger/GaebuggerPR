package com.example.backend.dto;
import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ApiResponseDTO {
    private String process_Id;
    private String process_Original;
    private int process_Law_Violate;
    private int process_Law_Danger;
    private int process_Guide_Violate;
    private int process_Omission_Paragraph;     // 이건 기재 항목 누락 몇 건인지
    private int process_Score;
    private List<Paragraph> process_Paragraph;
    private List<Issue> process_Issues;
    private String process_Modified;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Paragraph {
        private int paragraph_id;
        private String paragraph_content;
        private int paragraph_startIndex;
        private int paragraph_endIndex;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Issue {
        private int issue_id;
        private int issue_paragraph_id;
        private String issue_type;
        private int issue_score;    // 이거 추가됨. issue 감점 점수 (양수로 표시 ex) -3,-5,-15, -51(이건 기재항목 누락))
        private String issue_content;
        private List<String> issue_reason;
        private int issue_startIndex;
        private int issue_endIndex;
        private int issue_case;         // 이거 추가됨. issue_case (이건 bp에 보여주려는건데 22개 유형중 어떤 유형의 위반 인지? 2~22사이의 int형 )
        private List<String> issue_guideline;
    }
}
