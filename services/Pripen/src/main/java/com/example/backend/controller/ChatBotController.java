package com.example.backend.controller;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@RestController
public class ChatBotController {

    private final WebClient webClient;

    public ChatBotController(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.baseUrl("https://chatbot.pri-pen.com").build();
    }

    @GetMapping("/chatbot")
    public Mono<ResponseEntity<String>> requestChatBot() {
        return this.webClient
                .get()
                .retrieve() // 응답을 검색
                .toEntity(String.class); // ResponseEntity로 변환
    }
}
