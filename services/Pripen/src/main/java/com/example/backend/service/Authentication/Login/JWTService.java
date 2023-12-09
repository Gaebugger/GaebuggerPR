package com.example.backend.service.Authentication.Login;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

@Service
public class JWTService {
    private static final Logger logger = LoggerFactory.getLogger(JWTService.class);
    // SecretKey를 application.properties에서 주입
    @Value("${jwt.secretKey}")
    private String secretKey;
    private final SecretKey key = Keys.secretKeyFor(SignatureAlgorithm.HS512);  // 계속 오류 떠서 랜덤 생성해서 씀.
    // Token의 유효시간을 설정
    private final long accessTokenInMilliSeconds = 3600000L;

    public String generateJWT(String email) {
        //byte[] apiKeySecretBytes = secretKey.getBytes(StandardCharsets.UTF_8);
        //Key signingKey = new SecretKeySpec(apiKeySecretBytes, SignatureAlgorithm.HS512.getJcaName());

        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + accessTokenInMilliSeconds))
                .signWith(key, SignatureAlgorithm.HS512)
                //.signWith(SignatureAlgorithm.HS512, signingKey)
                .compact();
    }

    public long getAccessTokenValidityInSeconds(){
        return accessTokenInMilliSeconds;
    }
    // 토큰 유효성 검사 메소드
    public boolean validateToken(String token) {
        System.out.println("token is!");
        System.out.println(token);
        try {
            Jwts.parser().setSigningKey(key).parseClaimsJws(token);
            return true;
        } catch (Exception ex) { // 또는 구체적인 예외 타입들을 명시
            logger.error("Token validation error: {}", ex.getMessage());
            return false;
        }
    }
    // 토큰에서 사용자 이메일 추출 메소드
    public String getUserEmailFromJWT(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(key)
                .parseClaimsJws(token)
                .getBody();
        return claims.getSubject();
    }
}
