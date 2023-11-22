package com.example.backend.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class UserDto {

    private String email;
    private String password;  // 이후에 DB에 저장될 때 password_hash로 매핑
    private String name;      // 만약 사용자 이름도 받는다면
    private Long companyId;   // 회사 ID도 받는다면
}
