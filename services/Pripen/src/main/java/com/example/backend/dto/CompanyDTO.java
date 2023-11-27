package com.example.backend.dto;

import lombok.*;


@Setter
@Getter
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CompanyDTO {
    private String companyName;
    private String companyAddress;
    private String companyPostCode;
    private String companyExtraAddress;
    private String companyBusinessRegistration;
}
