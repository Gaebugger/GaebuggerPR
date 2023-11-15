package com.example.backend.model;

import java.util.List;
import java.util.UUID;

public class ProcessingStatus {
    private UUID uuid; // 추가된 부분
    private boolean isProcessingComplete = false;
    private boolean processingStarted = false; // To track if the processing has been started

    private String processedFileContent;
    private String ans;
    private String error;
    private List<Integer> checkedItems;  // Store checked items

    // UUID에 대한 getter와 setter
    public UUID getUuid() {
        return uuid;
    }

    public void setUuid(UUID uuid) {
        this.uuid = uuid;
    }

    public boolean isProcessingComplete() {
        return isProcessingComplete;
    }

    public boolean hasProcessingStarted() {
        return processingStarted;
    }

    public void setProcessingStarted(boolean processingStarted) {
        this.processingStarted = processingStarted;
    }

    public void setProcessingComplete(boolean processingComplete) {
        isProcessingComplete = processingComplete;
    }

    public String getProcessedFileContent() {
        return processedFileContent;
    }

    public void setProcessedFileContent(String processedFileContent) {
        this.processedFileContent = processedFileContent;
    }

    public String getAns() {
        return ans;
    }

    public void setAns(String ans) {
        this.ans = ans;
    }

    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }

    public List<Integer> getCheckedItems() {
        return checkedItems;
    }

    public void setCheckedItems(List<Integer> checkedItems) {
        this.checkedItems = checkedItems;
    }
}
