package com.example.backend.model.Analysis;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table(name = "AnalysisParagraphs")
@AllArgsConstructor
@NoArgsConstructor
public class AnalysisParagraphs {
    @EmbeddedId
    private AnalysisParagraphsId id; // 복합 키

    @Column(name = "paragraph_content")
    private String paragraph_content;

    @Column(name = "paragraph_startIndex")
    private int paragraph_startIndex;

    @Column(name = "paragraph_endIndex")
    private int paragraph_endIndex;
}