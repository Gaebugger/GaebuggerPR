package com.example.backend.service;

// ... (import statements remain the same)


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;
import reactor.core.publisher.Mono;

import com.example.backend.dto.ApiResponseDTO;
import com.example.backend.model.ProcessingStatus;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class DataProcessingService {
    private final ObjectMapper objectMapper = new ObjectMapper();

    private final ConcurrentHashMap<UUID, ProcessingStatus> statusMap = new ConcurrentHashMap<>();

    public UUID initializeProcessingStatus(List<Integer> checkedItems, MultipartFile file) {
        UUID uuid = UUID.randomUUID();
        ProcessingStatus status = new ProcessingStatus();
        try {
            status.setUuid(uuid); // uuid를 ProcessingStatus에 설정
            status.setProcessedFileContent(new String(file.getBytes(), StandardCharsets.UTF_8)); // 명시적으로 문자셋을 설정
            status.setCheckedItems(checkedItems);
            statusMap.put(uuid, status);
        } catch (IOException e) {
            e.printStackTrace();
            status.setError("Error initializing processing status.");
        }
        return uuid;
    }
    private final Object lock = new Object();
    private final WebClient webClient = WebClient.create("http://localhost:5000");
    private final WebClient webClient_test = WebClient.create("http://localhost:8080/api");
    @Async
    @Transactional
    public CompletableFuture<Void> processData(UUID processId, SseEmitter emitter) throws Exception {
        synchronized (lock) {
            ProcessingStatus status = statusMap.get(processId);

            status.setProcessingStarted(true);
            System.out.println("processData is on!!!");

            try {
                Map<String, Object> requestBody = Map.of(
                        "process_Id", processId,
                        "user_input", status.getCheckedItems(),
                        "text", status.getProcessedFileContent()
                );


                // ApiResponseDTO 형태로 응답을 받습니다.
                ApiResponseDTO responseDTO = webClient.post()
                        .uri("/process-text")
                        .contentType(MediaType.APPLICATION_JSON)
                        .bodyValue(requestBody)
                        .retrieve()
                        .bodyToMono(ApiResponseDTO.class)
                        .block();

                if (responseDTO == null) {
                    throw new Exception("Response data is empty.");
                }
                handleApiResponse(responseDTO, status, emitter);

                emitter.send(SseEmitter.event().name("message").data("{\"completed\":true}"));
                emitter.complete();

            } catch (Exception e) {
                e.printStackTrace();
                status.setError(e.getMessage());
            }

            System.out.println("process done!!");
            status.setProcessingComplete(true);
            return CompletableFuture.completedFuture(null);
        }
    }

    @Async
    @Transactional
    public CompletableFuture<Void> processData_test(UUID processId, SseEmitter emitter) throws Exception {
        synchronized (lock){
            ProcessingStatus status = statusMap.get(processId);

            status.setProcessingStarted(true);
            System.out.println("processData is on!!!");

             // POST 요청을 사용하여 /mockData 엔드포인트를 호출
            ApiResponseDTO responseDTO = webClient_test.post()
                    .uri("/test-mock")
                    .contentType(MediaType.APPLICATION_JSON)
                    .bodyValue(processId.toString())
                    .retrieve()
                    .bodyToMono(ApiResponseDTO.class)
                    .block();

            try {
                // 5초 (5000밀리초) 동안 대기
                Thread.sleep(5000);

            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            handleApiResponse(responseDTO, status, emitter);
            emitter.send(SseEmitter.event().name("message").data("{\"completed\":true}"));
            emitter.complete();

            System.out.println("process done!!");
            status.setProcessingComplete(true);
            return CompletableFuture.completedFuture(null);
        }
    }

    private void handleApiResponse(ApiResponseDTO responseDTO, ProcessingStatus status, SseEmitter emitter) throws Exception {
        System.out.println("handleApiResponse is on!!");

        int omissionParagraphScore = responseDTO.getProcess_Issues().stream()
                .filter(issue -> "기재 항목 누락".equals(issue.getIssue_type()))
                .mapToInt(issue -> issue.getIssue_score()) // 람다 표현식 사용
                .sum();

        // process_Score를 계산하여 업데이트합니다.
        int score = 100 - ((responseDTO.getProcess_Law_Violate() * 15)
                + (responseDTO.getProcess_Law_Danger() * 7)
                + (responseDTO.getProcess_Guide_Violate() * 3)
                + (omissionParagraphScore));

        responseDTO.setProcess_Score(score);

        if(responseDTO.getProcess_Paragraph() != null) {
            for(ApiResponseDTO.Paragraph paragraph : responseDTO.getProcess_Paragraph()) {
                paragraph.setParagraph_id(paragraph.getParagraph_id() + 1);
            }
        }

        if(responseDTO.getProcess_Issues() != null) {
            for(ApiResponseDTO.Issue issue : responseDTO.getProcess_Issues()) {
                issue.setIssue_id(issue.getIssue_id() + 1);
                issue.setIssue_paragraph_id(issue.getIssue_paragraph_id() + 1);
            }
        }
        System.out.println("response dto is!");
        System.out.println(responseDTO);

        // responseDTO를 JSON 형태로 변환하여 SSE로 보냅니다.
        String responseJson = objectMapper.writeValueAsString(responseDTO);
        emitter.send(SseEmitter.event().name("data").data(responseJson));
    }

    public ProcessingStatus getStatus(UUID processId) {
        return statusMap.get(processId);
    }

}
