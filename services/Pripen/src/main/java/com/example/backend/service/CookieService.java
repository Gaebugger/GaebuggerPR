package com.example.backend.service;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Service;

@Service
public class CookieService {

    public void addCookie(HttpServletResponse response, String name, String value, int maxAge) {
        Cookie cookie = new Cookie(name, value);
        cookie.setHttpOnly(true); // JavaScript를 통한 접근 방지
        cookie.setSecure(true); // HTTPS를 사용하는 경우에만 true로 설정
        cookie.setPath("/"); // 쿠키를 전송할 요청 경로
        cookie.setMaxAge(maxAge); // 쿠키의 만료 시간 설정
        response.addCookie(cookie); // 응답에 쿠키 추가
    }
}
