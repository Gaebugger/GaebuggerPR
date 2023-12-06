package com.example.backend.service.Analysis.Report;

import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.List;

public interface PdfService {
    String createPdf(List<MultipartFile> files, String userName, String companyName) throws IOException;
}