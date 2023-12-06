package com.example.backend.service.Authentication.Login;


import com.example.backend.model.Authentication.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {

    private final AuthenticationManager authenticationManager;

    @Autowired
    public AuthenticationService (AuthenticationManager authenticationManager){
        this.authenticationManager=authenticationManager;
    }

    public Authentication authenticateUser(User user) throws AuthenticationException {
        try {
            // 인증 토큰을 생성하고 인증 과정을 수행
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPasswordHash())
            );

            return authentication;
        } catch (BadCredentialsException e) {
            // 잘못된 자격 증명에 대한 예외 처리
            throw new BadCredentialsException("Invalid credentials");
        }
    }

}
