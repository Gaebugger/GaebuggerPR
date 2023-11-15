package com.example.backend.service;


import com.example.backend.model.User;
import com.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder; // 비밀번호 암호화를 위한 PasswordEncoder

    public Optional<User> authenticate(String email, String password) {
        Optional<User> foundUser = userRepository.findByEmail(email);

        // 사용자가 존재하고 비밀번호가 일치하는 경우
        if (foundUser.isPresent() && passwordEncoder.matches(password, foundUser.get().getPasswordHash())) {
            return foundUser;
        }

        return Optional.empty(); // 인증 실패 시 빈 Optional 반환
    }

    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    public User save(User user) {
        return userRepository.save(user);
    }

    // 회원 가입, 사용자 정보 수정, 사용자 삭제 등의 기능을 이곳에 추가할 수 있습니다.

}