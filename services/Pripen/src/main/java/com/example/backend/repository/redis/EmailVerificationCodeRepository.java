package com.example.backend.repository.redis;

import java.util.Optional;

public interface EmailVerificationCodeRepository {
    void saveVerificationCode(String verificationCode, String email);
    Optional<String> getEmailByVerificationCode(String verificationCode);
    void deleteVerificationCode(String verificationCode);
}
