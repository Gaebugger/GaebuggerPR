package com.example.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override  // cors 정책 설정
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // 모든 경로에 대한 CORS 설정
                .allowedOrigins("http://localhost:3000", "https://www.pri-pen.com") // 허용할 오리진 지정
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // 허용할 HTTP 메서드
                .allowCredentials(true);
    }
}
