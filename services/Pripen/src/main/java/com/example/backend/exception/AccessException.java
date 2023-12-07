package com.example.backend.exception;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class AccessException {
    private static final Logger logger = LoggerFactory.getLogger(AccessException.class);

    @ExceptionHandler(AuthenticationException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public void handleAuthenticationException(AuthenticationException e) {
        logger.error("Authentication error: {}", e.getMessage());
    }
    @ExceptionHandler(AccessDeniedException.class)
    @ResponseStatus(HttpStatus.FORBIDDEN)
    public void handleAccessDeniedException(AccessDeniedException e) {
        logger.error("Access denied error: {}", e.getMessage());
    }
}
