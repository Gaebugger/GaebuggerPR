package com.example.backend.repository.redis;

import com.example.backend.model.redis.RefreshToken;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface RefreshTokenRepository extends CrudRepository<RefreshToken, String> {
    Optional<RefreshToken> findByToken(String token);
}