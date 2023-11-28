package com.example.backend.model.Analysis;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;





@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "AnalysisIssues")
public class AnalysisIssues {
    @EmbeddedId
    private AnalysisIssuesId id; // 복합 키

    @Column(name = "issue_paragraph_id")
    private int issue_paragraph_id;

    @Column(name = "issue_type")
    private String issue_type;

    @Column(name = "issue_score")
    private int issue_score;

    @Column(name = "issue_content")
    private String issue_content;

    @Column(name = "issue_startIndex")
    private int issue_startIndex;

    @Column(name = "issue_endIndex")
    private int issue_endIndex;

    @Column(name = "issue_case")
    private int issue_case;

    @Column(name = "issue_explanation_status")
    private String issue_explanation_status;

    @Column(name = "issue_explanation_content")
    private String issue_explanation_content;

}
