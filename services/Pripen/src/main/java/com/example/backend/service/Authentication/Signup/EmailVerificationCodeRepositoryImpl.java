package com.example.backend.service.Authentication.Signup;


import com.example.backend.repository.redis.EmailVerificationCodeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.concurrent.TimeUnit;

@Repository
public class EmailVerificationCodeRepositoryImpl implements EmailVerificationCodeRepository {
    private final StringRedisTemplate redisTemplate;

    @Autowired
    public EmailVerificationCodeRepositoryImpl(StringRedisTemplate redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    @Override
    public void saveVerificationCode(String verificationCode, String email) {
        ValueOperations<String, String> ops = redisTemplate.opsForValue();
        ops.set(verificationCode, email, 5, TimeUnit.MINUTES); // 5분 후 만료
    }
    @Override
    public Optional<String> getEmailByVerificationCode(String verificationCode) {
        ValueOperations<String, String> ops = this.redisTemplate.opsForValue();
        return Optional.ofNullable(ops.get(verificationCode));
    }

    @Override
    public void deleteVerificationCode(String verificationCode) {
        redisTemplate.delete(verificationCode);
    }
}
