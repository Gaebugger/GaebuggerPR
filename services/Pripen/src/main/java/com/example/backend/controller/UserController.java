package com.example.backend.controller;


import com.example.backend.dto.CompanyDTO;
import com.example.backend.dto.ResponseMessage;
import com.example.backend.dto.UserDto;
import com.example.backend.model.Authentication.Company;
import com.example.backend.model.Authentication.User;
import com.example.backend.model.redis.RefreshToken;
import com.example.backend.repository.redis.RefreshTokenRepository;
import com.example.backend.service.Authentication.Login.*;
import com.example.backend.service.Authentication.Signup.CompanyService;
import com.example.backend.service.Authentication.Signup.EmailPostService;
import com.example.backend.service.Authentication.Signup.EmailVerificationService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/userAuthentication")
public class UserController {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final ModelMapper modelMapper;
    private final AuthenticationService authenticationService;
    private final JWTService jwtService;
    private final RefreshTokenService refreshTokenService;
    private final CookieService cookieService;
    private final AuthenticationManager authenticationManager;

    private final RefreshTokenRepository refreshTokenRepository;
    private final EmailPostService emailPostService;
    private final EmailVerificationService emailVerificationService;
    private final CompanyService companyService;
    public UserController(
            UserService userService,
            PasswordEncoder passwordEncoder,
            ModelMapper modelMapper,
            AuthenticationService authenticationService,
            JWTService jwtService,
            AuthenticationManager authenticationManager,
            CookieService cookieService,
            RefreshTokenService refreshTokenService,
            RefreshTokenRepository refreshTokenRepository,
            EmailPostService emailPostService,
            EmailVerificationService emailVerificationService,
            CompanyService companyService) {

        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
        this.modelMapper = modelMapper;
        this.authenticationService = authenticationService;
        this.jwtService = jwtService;
        this.cookieService = cookieService;
        this.authenticationManager = authenticationManager;
        this.refreshTokenService = refreshTokenService;
        this.refreshTokenRepository = refreshTokenRepository;
        this.emailPostService = emailPostService;
        this.emailVerificationService = emailVerificationService;
        this.companyService = companyService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody User loginUser, HttpServletResponse response) {
        try {
            Authentication authentication = authenticationService.authenticateUser(loginUser);
            SecurityContextHolder.getContext().setAuthentication(authentication);

            String accessToken = jwtService.generateJWT(loginUser.getEmail());
            //RefreshToken refreshTokenObject = refreshTokenService.createRefreshToken(loginUser.getEmail());
            System.out.println("accessToken is " + accessToken);
            cookieService.addCookie(response, "accessToken", accessToken, (int) jwtService.getAccessTokenValidityInSeconds());
            //cookieService.addCookie(response, "refreshToken", refreshTokenObject.getToken(), (int) refreshTokenService.getRefreshTokenValidityInSeconds());

            return ResponseEntity.ok(Collections.singletonMap("status", "success"));
        } catch (BadCredentialsException e) {
            // BadCredentialsException에 대한 구체적인 처리
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Error: Invalid credentials");
        } catch (AuthenticationException e) {
            // 기타 AuthenticationException에 대한 처리
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Error: Authentication failed");
        } catch (RuntimeException e) {
            // 타임아웃 등의 런타임 예외 처리
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }

    //@CrossOrigin(origins = "*")
    @PostMapping("/refresh")
    public ResponseEntity<?> refreshAccessToken(HttpServletRequest request, HttpServletResponse response) {
        Cookie[] cookies = request.getCookies();
        String refreshToken = Arrays.stream(cookies)
                .filter(c -> "refreshToken".equals(c.getName()))
                .findFirst()
                .map(Cookie::getValue)
                .orElse(null);
        if (refreshToken == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("No refresh token provided");
        }
        try {
            if (refreshToken != null && refreshTokenService.verifyExpiration(refreshToken)) {
                String newAccessToken = jwtService.generateJWT(refreshTokenService.findEmailByToken(refreshToken)); // 새로운 액세스 토큰 생성

                Cookie newAccessTokenCookie = new Cookie("accessToken", newAccessToken);
                newAccessTokenCookie.setHttpOnly(true);
                newAccessTokenCookie.setSecure(true);
                newAccessTokenCookie.setPath("/");
                newAccessTokenCookie.setMaxAge((int) jwtService.getAccessTokenValidityInSeconds());
                response.addCookie(newAccessTokenCookie);

                return ResponseEntity.ok("Access token refreshed successfully");
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid refresh token");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Could not refresh access token");
        }
    }

    //@CrossOrigin(origins = "*")
    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody UserDto userDto) {
        if (userService.existsByEmail(userDto.getEmail())) {
            return new ResponseEntity<>(new ResponseMessage("Error: Email is already in use!"), HttpStatus.BAD_REQUEST);
        }
        System.out.println("userDto is:");
        System.out.println(userDto);
        if (userDto == null || userDto.getPassword() == null) {
            return new ResponseEntity<>(new ResponseMessage("Error: Invalid request data"), HttpStatus.BAD_REQUEST);
        }
        // 비밀번호 암호화하여 저장
        userDto.setPassword(passwordEncoder.encode(userDto.getPassword()));

        User user = modelMapper.map(userDto, User.class);
        System.out.println("my signup password hash is:");
        System.out.println(user.getPasswordHash());
        System.out.println("user's info is:");
        System.out.println(user);

        userService.save(user);

        return new ResponseEntity<>(new ResponseMessage("User registered successfully!"), HttpStatus.OK);
    }

    @DeleteMapping("/logout")
    public ResponseEntity<?> logoutUser(HttpServletRequest request,HttpServletResponse response) {
        // 클라이언트로부터 받은 리프레시 토큰 쿠키 가져오기
        Optional<String> refreshTokenOpt = refreshTokenService.extractRefreshTokenFromRequest(request);
        System.out.println("your token is~" + refreshTokenOpt);
        refreshTokenOpt.ifPresent(refreshToken -> {
            // 리프레시 토큰 존재 여부 확인 후 삭제
            Optional<RefreshToken> refreshTokenOptional = refreshTokenRepository.findByToken(refreshToken);
            refreshTokenOptional.ifPresent(refreshTokenRepository::delete);

            // 쿠키를 만료시키기 위한 'Set-Cookie' 헤더를 추가
            Cookie cookie = new Cookie("refreshToken", null); // refreshToken 쿠키를 null로 설정
            cookie.setPath("/");
            cookie.setHttpOnly(true);
            cookie.setMaxAge(0); // 쿠키의 만료 시간을 0으로 설정하여 즉시 만료
            response.addCookie(cookie);
        });
        System.out.println("delete your token from redis");
        return ResponseEntity.ok().build(); // 성공적인 응답
    }

    @GetMapping("/check-email")
    public ResponseEntity<?> checkEmail(@RequestParam String email){
        boolean isAvailable = !userService.existsByEmail(email);

        return ResponseEntity.ok().body(Map.of("isAvailable", isAvailable));
    }


    @PostMapping("/email-post")
    public ResponseEntity<?> emailPost(@RequestBody Map<String, String> requestData){
        String email = requestData.get("email");
        try {
            String verificationCode = emailPostService.generateVerificationCode();
            System.out.println("verfication code is! " + verificationCode);
            emailPostService.doSendEmail(email,verificationCode);
            return ResponseEntity.ok().body("이메일 전송 성공");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("이메일 전송 실패");
        }
        //파라미터 입력받은 email에 템플릿 인증코드 전송.
    }

    @PostMapping("/email-validity")
    public ResponseEntity<?> emailValidity(@RequestBody Map<String, String> requestBody){
        try {
            String code = requestBody.get("code");  // 여기 고쳐야함.
            String email = requestBody.get("email");
            System.out.println("your code is " + code);
            System.out.println("your email is " + email);

            if (email == null || email.trim().isEmpty() || code == null || code.trim().isEmpty()) {
                return ResponseEntity.badRequest().body("이메일 or code 없음");
            }

            boolean isValid = emailVerificationService.verifyEmailWithCode(email, code);

            Map<String, Object> response = new HashMap<>();
            response.put("isValid", isValid);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            // 내부 서버 오류 처리
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("서버 오류 발생");
        }
    }

    @GetMapping("/company-search")
    public ResponseEntity<List<Company>> companyList(@RequestParam String query) {
        try {

            System.out.println("input is : " + query);
            List<Company> companies = companyService.searchCompanies(query);
            return ResponseEntity.ok(companies);
        } catch (Exception e) {
            // 적절한 예외 처리 로직 구현
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/company-create")
    public ResponseEntity<?> companyCreate(@RequestBody CompanyDTO companyDTO){
        Company newCompany = new Company();
        newCompany.setCompanyName(companyDTO.getCompanyName());
        newCompany.setCompanyAddress(companyDTO.getCompanyAddress());
        newCompany.setCompanyPostCode(companyDTO.getCompanyPostCode());
        newCompany.setCompanyExtraAddress(companyDTO.getCompanyExtraAddress());
        newCompany.setCompanyBusinessRegistration(companyDTO.getCompanyBusinessRegistration());

        Company createdCompany = companyService.createCompany(newCompany);
        return ResponseEntity.ok(createdCompany);
    }
}
