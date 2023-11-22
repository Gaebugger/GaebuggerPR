package com.example.backend.repository;



import com.example.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // 이메일로 사용자를 조회하는 메서드
    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email); // 이메일 중복 확인 메서드 추가

}