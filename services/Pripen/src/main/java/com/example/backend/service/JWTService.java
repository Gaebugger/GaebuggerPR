package com.example.backend.service;

import io.jsonwebtoken.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.security.SignatureException;
import java.util.Date;

@Service
public class JWTService {
    private static final Logger logger = LoggerFactory.getLogger(JWTService.class);
    // SecretKey를 application.properties에서 주입받습니다.
    @Value("${jwt.secretKey}")
    private String secretKey;

    // Token의 유효시간을 설정합니다. 여기서는 1시간으로 설정하였습니다.
    private final long accessTokenInMilliSeconds = 3600000L;

    public String generateJWT(String email) {
        byte[] apiKeySecretBytes = secretKey.getBytes(StandardCharsets.UTF_8);
        Key signingKey = new SecretKeySpec(apiKeySecretBytes, SignatureAlgorithm.HS512.getJcaName());

        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + accessTokenInMilliSeconds))
                .signWith(SignatureAlgorithm.HS512, signingKey)
                .compact();
    }

    public long getAccessTokenValidityInSeconds(){
        return accessTokenInMilliSeconds;
    }

    public Claims validateJWT(String token) {
        // 토큰을 파싱해서 Claims 객체를 반환합니다.
        return Jwts.parser()
                .setSigningKey(secretKey)
                .parseClaimsJws(token)
                .getBody();
    }
    // 토큰 유효성 검사 메소드
    public boolean validateToken(String token) {
        try {
            Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token);
            return true;
        } catch (Exception ex) { // 또는 구체적인 예외 타입들을 명시하세요.
            logger.error("Token validation error: {}", ex.getMessage());
            return false;
        }
    }

    // 토큰에서 사용자 이메일 추출 메소드
    public String getUserEmailFromJWT(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(secretKey)
                .parseClaimsJws(token)
                .getBody();
        return claims.getSubject();
    }
}
