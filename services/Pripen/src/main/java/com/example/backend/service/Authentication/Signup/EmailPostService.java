package com.example.backend.service.Authentication.Signup;

import com.example.backend.repository.redis.EmailVerificationCodeRepository;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.Random;


@Service
public class EmailPostService {


    private final JavaMailSender mailSender;
    private final EmailVerificationCodeRepository emailVerificationRepository;
    @Autowired
    public EmailPostService(JavaMailSender mailSender, EmailVerificationCodeRepository emailVerificationCodeRepository){
        this.mailSender = mailSender;
        this.emailVerificationRepository = emailVerificationCodeRepository;
    }


    public void sendVerificationEmail(String email, String verificationCode) throws Exception, MessagingException {
        SimpleMailMessage mail = new SimpleMailMessage();

        System.out.println("email" + email);
        mail.setTo(email);
        mail.setSubject("프라이팬 인증 코드");
        mail.setText("귀하의 인증 코드는 " + verificationCode + "입니다."); // 메일 본문 설정
        System.out.println("before send message");
        mailSender.send(mail);

        // Redis에 인증 코드와 이메일 저장
        emailVerificationRepository.saveVerificationCode(verificationCode, email);
        System.out.println("working well!");
    }
    public void doSendEmail(String email,String verificationCode){
        try {
            sendVerificationEmail(email, verificationCode);
        } catch (MessagingException e) {
            e.printStackTrace(); // 콘솔에 예외의 스택 트레이스를 출력
        } catch (Exception e) {
            e.printStackTrace(); // 다른 일반 예외에 대한 처리
        }
    }
    public String generateVerificationCode() {
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        Random random = new Random();
        StringBuilder code = new StringBuilder();
        for (int i = 0; i < 6; i++) {
            int index = random.nextInt(characters.length());
            code.append(characters.charAt(index));
        }
        return code.toString(); // 임시 코드
    }
}
