package com.example.backend.model.Analysis;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class AnalysisIssuesReasonsId implements Serializable {
    private String issue_reason_id;
    private int issue_id;
    private String process_id;

}