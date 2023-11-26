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
        System.out.println("emailOpt is "  + emailOpt);
        System.out.println("email is " + email);
        System.out.println("emailopt's handle is " + emailOpt.get());
        // emailOpt가 값을 포함하고 있는지, 그리고 그 값이 입력된 email과 일치하는지 확인
        if (emailOpt.isPresent() && emailOpt.get().equals(email)) {
            emailVerificationCodeRepository.deleteVerificationCode(code); // 인증 후 코드 삭제
            return true;
        } else {
            return false; // 인증 코드가 없음 또는 일치하지 않음
        }
    }
}
