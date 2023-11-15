package com.example.backend.model;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import java.util.Collection;
import java.util.Collections;

public class CustomUserDetails implements UserDetails {

    private final User user;

    public CustomUserDetails(User user) {
        this.user = user;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // 여기서 사용자의 권한을 반환합니다.
        // 현재는 간단하게 EMPTY_LIST로 처리하겠습니다.
        return Collections.emptyList();
    }

    @Override
    public String getPassword() {
        return user.getPasswordHash();
    }

    @Override
    public String getUsername() {
        return user.getEmail();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true; // 예제로 true 반환
    }

    @Override
    public boolean isAccountNonLocked() {
        return true; // 예제로 true 반환
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true; // 예제로 true 반환
    }

    @Override
    public boolean isEnabled() {
        return true; // 예제로 true 반환
    }

    public User getUser() {
        return user;
    }
}
