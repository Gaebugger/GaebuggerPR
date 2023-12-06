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
public class AnalysisParagraphsId implements Serializable {
    private int paragraph_id;
    private String process_id;
}