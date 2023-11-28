package com.example.backend.model.Authentication;


import jakarta.persistence.*;
import lombok.*;

@Data
@Entity
@Table(name = "Company")
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Company {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "company_id")
    private Long companyId;

    @Column(name = "company_name", nullable = false)
    private String companyName;

    @Column(name = "company_address")
    private String companyAddress;

    @Column(name = "company_postcode")
    private String companyPostCode;

    @Column(name = "company_extra_address")
    private String companyExtraAddress;

    @Column(name = "company_business_registration")
    private String companyBusinessRegistration;
}