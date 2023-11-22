package com.example.backend.model.redis;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

import java.io.Serializable;
import java.time.Instant;

@RedisHash("RefreshToken")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RefreshToken implements Serializable {

    @Id
    private String email; //사용자의 식별자나 이메일 등

    private String token;
    private Instant expirationDate;

    // 기본 생성자, 전체 인자를 받는 생성자, Getter와 Setter 등 필요한 메소드들...
}