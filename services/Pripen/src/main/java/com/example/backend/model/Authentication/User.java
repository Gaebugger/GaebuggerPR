package com.example.backend.model.Authentication;

import jakarta.persistence.*;
import lombok.*;

import java.util.Set;


@Data
@Entity
@Table(name = "User")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long id;

    @Column(name = "email")
    private String email;

    @Column(name = "password_hash")
    private String passwordHash;  // DB 컬럼명에 맞춰 passwordHash로 변경

    @Column(name = "name")
    private String name;  // DB에 있는 name 컬럼에 해당

    @Column(name = "company_id")
    private Long companyId;  // DB에 있는 company_id 컬럼에 해당

//    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
//    private Set<Role> roles;
}
