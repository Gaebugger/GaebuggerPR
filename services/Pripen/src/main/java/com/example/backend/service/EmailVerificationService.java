package com.example.backend.service;

import com.example.backend.repository.redis.EmailVerificationCodeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class EmailVerificationService {
    private final EmailVerificationCodeRepository emailVerificationCodeRepository;

    @Autowired
    public EmailVerificationService(EmailVerificationCodeRepository emailVerificationCodeRepository){
        this.emailVerificationCodeRepository = emailVerificationCodeRepository;
    }

    public boolean verifyEmailWithCode(String email, String code) {
        Optional<String> emailOpt = emailVerificationCodeRepository.getEmailByVerificationCode(code);
        if (!emailOpt.isPresent() || !emailOpt.get().equals(email)) {
            return false; // 인증 코드가 없음
        }

        emailVerificationCodeRepository.deleteVerificationCode(code); // 인증 후 코드 삭제
        return true;
    }
}
