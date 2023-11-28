package com.example.backend.model.Analysis;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "AnalysisIssuesGuidelines")
public class AnalysisIssuesGuidelines {

    @EmbeddedId
    private AnalysisIssuesGuidelinesId id;

    @ManyToOne
    @JoinColumns({
            @JoinColumn(name="issue_id", referencedColumnName="issue_id", insertable = false, updatable = false),
            @JoinColumn(name="process_id", referencedColumnName="process_id", insertable = false, updatable = false)
    })
    private AnalysisIssues analysisIssues;

    @Column(name = "issue_reason_content")
    private String issue_reason_content;

}
