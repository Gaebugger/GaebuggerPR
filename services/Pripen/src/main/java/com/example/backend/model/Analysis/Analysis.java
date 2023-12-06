package com.example.backend.model.Analysis;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Table(name = "Analysis")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Analysis {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "process_id")
    private String process_id; // 기본 키

    @Column(name = "process_original")
    private String process_original;

    @Column(name = "process_law_violate")
    private int process_law_violate;

    @Column(name = "process_law_danger")
    private int process_law_danger;

    @Column(name = "process_guide_violate")
    private int process_guide_violate;

    @Column(name = "process_omission_paragraph")
    private int process_omission_paragraph;

    @Column(name = "process_score")
    private int process_score;

    @Column(name = "process_actor")
    private String process_actor;

}
