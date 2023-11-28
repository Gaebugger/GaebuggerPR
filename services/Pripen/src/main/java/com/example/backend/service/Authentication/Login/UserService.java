package com.example.backend.service.Authentication.Login;


import com.example.backend.model.Authentication.User;
import com.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder){
        this.userRepository = userRepository;
        this.passwordEncoder= passwordEncoder;
    }

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


}