package com.example.backend.model.Analysis;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
public class ProcessingStatus {
    private UUID uuid; // 유니크 식별자
    private boolean isProcessingComplete = false; // 처리 완료 여부
    private boolean processingStarted = false; // 처리 시작 여부

    private String processedFileContent; // 처리된 파일 내용
    private String error; // 오류 메시지
    private List<Integer> checkedItems; // 체크된 항목 목록
}
