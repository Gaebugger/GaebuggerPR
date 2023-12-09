package com.example.backend.controller;

import com.example.backend.dto.ApiResponseDTO;
import com.example.backend.dto.ReceivedDataDTO;
import com.example.backend.service.Analysis.DataProcessingService;
import com.example.backend.service.Analysis.Report.PdfService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.io.InputStream;
import java.util.*;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

@RestController
@RequestMapping("/api")
public class ReceiveDataController {

    private ConcurrentMap<String, Boolean> processStatus = new ConcurrentHashMap<>();
    private final DataProcessingService dataProcessingService;
    private final PdfService pdfService;

    public ReceiveDataController(DataProcessingService dataProcessingService, PdfService pdfService) {
        this.dataProcessingService = dataProcessingService;
        this.pdfService = pdfService;
    }

    @PostMapping("/start")
    public ResponseEntity<Map<String, UUID>> receiveData(
            @RequestPart("file") MultipartFile file,
            @RequestPart("data") String receivedDataString) throws JsonProcessingException {

        // 문자열 형태의 JSON을 ReceivedData 객체로 변환
        ObjectMapper objectMapper = new ObjectMapper();
        ReceivedDataDTO receivedData = objectMapper.readValue(receivedDataString, ReceivedDataDTO.class);

        List<Integer> checkedItems = receivedData.getCheckedItems();
        MultipartFile userFile = file;

        // processID를 응답으로 보냄
        UUID processID = dataProcessingService.initializeProcessingStatus(checkedItems, userFile);
        System.out.println("processID is :" + processID);

        Map<String, UUID> response = Map.of("processID", processID);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/download")
    public ResponseEntity<?> downloadReport(
            @RequestParam("files") List<MultipartFile> files,
            @RequestParam("userName") String userName,
            @RequestParam("companyName") String companyName) throws IOException {


        System.out.println("hihihi im on!");


        System.out.println(userName);
        System.out.println(companyName);

        String pdfFilePath = pdfService.createPdf(files, userName, companyName);
        FileSystemResource file = new FileSystemResource(pdfFilePath);

        String filename = file.getFilename();

        // 클라이언트가 파일을 다운로드 할 수 있도록 헤더를 설정
        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + filename + "\"");

        return ResponseEntity.ok()
                .headers(headers)
                .contentType(MediaType.APPLICATION_PDF)
                .body(file);
    }
    @GetMapping("/check-response/{processId}")
    public SseEmitter checkResponse(@PathVariable String processId) throws Exception {
        UUID parsedProcessId;
        try {
            parsedProcessId = UUID.fromString(processId);
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid UUID format");
        }
        SseEmitter emitter = new SseEmitter();

        // real-mode
        //CompletableFuture<Void> future = dataProcessingService.processData(parsedProcessId, emitter);

        // test-mode
        CompletableFuture<Void> future = dataProcessingService.processData_test(parsedProcessId, emitter);

        return emitter;
    }

    // test endpoint
//    @CrossOrigin(origins = "http://localhost:3000")

    @PostMapping("/test-mock")
    public ResponseEntity<Map<String, Object>> getMockData(@RequestBody String process_ID) {
        ObjectMapper mapper = new ObjectMapper();
        ApiResponseDTO apiResponse = null;

        try {

            InputStream inputStream = TypeReference.class.getResourceAsStream("/MockFile.json");
            System.out.println(inputStream);
            apiResponse = mapper.readValue(inputStream, ApiResponseDTO.class);

            // process_ID에 해당하는 데이터가 있는지 확인
            // 예를 들어, apiResponse 객체에서 process_ID를 확인하고 처리하는 로직
            if (apiResponse != null ) {
                // DTO를 Map으로 변환
                Map<String, Object> responseData = mapper.convertValue(apiResponse, new TypeReference<Map<String, Object>>(){});
                return new ResponseEntity<>(responseData, HttpStatus.OK);
            } else {
                // 일치하는 데이터가 없을 경우
                System.out.println("its nono data");
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
