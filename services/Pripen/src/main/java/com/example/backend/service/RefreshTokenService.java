package com.example.backend.service;

import com.example.backend.exception.TokenNotFoundException;
import com.example.backend.model.redis.RefreshToken;
import com.example.backend.repository.redis.RefreshTokenRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import jakarta.servlet.http.Cookie;
import java.time.Instant;
import java.util.Arrays;
import java.util.Optional;
import java.util.UUID;

@Service
public class RefreshTokenService {

    private final RefreshTokenRepository refreshTokenRepository;
    private final Long refreshTokenValidityInMilliseconds = 60 * 60 * 24 * 7 * 1000L;
    @Autowired
    public RefreshTokenService(RefreshTokenRepository refreshTokenRepository) {
        this.refreshTokenRepository = refreshTokenRepository;
    }

    // 리프레시 토큰 생성
    public RefreshToken createRefreshToken(String email) {
        Instant expirationTime = Instant.now().plusMillis(refreshTokenValidityInMilliseconds);
        RefreshToken refreshToken = new RefreshToken(
                email,
                generateRandomToken(), // 새로운 토큰을 생성하는 로직을 구현
                expirationTime
        );

        refreshTokenRepository.save(refreshToken);
        return refreshToken;
    }
    // Refresh 토큰의 만료 여부를 검증하는 메소드
    public boolean verifyExpiration(String token) {
        RefreshToken refreshToken = refreshTokenRepository.findByToken(token)
                .orElseThrow(() -> new TokenNotFoundException("Refresh token is not found!"));
        return !refreshToken.getExpirationDate().isBefore(Instant.now());
    }
    public long getRefreshTokenValidityInSeconds(){
        return refreshTokenValidityInMilliseconds;
    }
    // 리프레시 토큰 검증

    // 토큰으로부터 사용자 이메일을 찾는 메소드
    public String findEmailByToken(String token) {
        // 여기서는 refreshTokenRepository를 통해 리프레시 토큰을 조회
        RefreshToken refreshToken = refreshTokenRepository.findByToken(token)
                .orElseThrow(() -> new TokenNotFoundException("RefreshToken is not found"));
        return refreshToken.getEmail();
    }


    public void saveRefreshToken(RefreshToken refreshToken){
        refreshTokenRepository.save(refreshToken);
    }


    private String generateRandomToken() {
        return UUID.randomUUID().toString();
    }
    public Optional<String> extractRefreshTokenFromRequest(HttpServletRequest request) {
        if (request.getCookies() == null) {
            return Optional.empty();
        }

        return Arrays.stream(request.getCookies())
                .filter(cookie -> "refreshToken".equals(cookie.getName()))
                .findFirst()
                .map(Cookie::getValue);
    }
}
