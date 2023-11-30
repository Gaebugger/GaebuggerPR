package com.example.backend.service.Analysis.Report;

import com.itextpdf.io.font.FontConstants;
import com.itextpdf.io.font.FontProgram;
import com.itextpdf.io.font.FontProgramFactory;
import com.itextpdf.io.font.PdfEncodings;
import com.itextpdf.kernel.colors.Color;
import com.itextpdf.kernel.colors.ColorConstants;
import com.itextpdf.kernel.colors.DeviceRgb;
import com.itextpdf.kernel.font.PdfFont;
import com.itextpdf.kernel.font.PdfFontFactory;
import com.itextpdf.kernel.geom.PageSize;
import com.itextpdf.kernel.geom.Rectangle;
import com.itextpdf.kernel.pdf.PdfPage;
import com.itextpdf.kernel.pdf.PdfReader;
import com.itextpdf.kernel.pdf.canvas.PdfCanvas;
import com.itextpdf.layout.Canvas;
import com.itextpdf.layout.borders.Border;
import com.itextpdf.layout.borders.SolidBorder;
import com.itextpdf.layout.element.Cell;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.element.Table;
import com.itextpdf.layout.property.TextAlignment;
import com.itextpdf.layout.property.UnitValue;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.itextpdf.io.image.ImageData;
import com.itextpdf.io.image.ImageDataFactory;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Image;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PdfServiceImpl implements PdfService {

    public String createPdf(List<MultipartFile> files) throws IOException {
        String tempPdfFilePath = "./TemporaryStorage/temp_generated_pdf.pdf"; // 임시 파일 경로
        String finalPdfFilePath = "./TemporaryStorage/generated_pdf.pdf"; // 최종 파일 경로

        // 임시 PDF 파일에 이미지 추가
        PdfWriter tempWriter = new PdfWriter(tempPdfFilePath);
        PdfDocument tempPdf = new PdfDocument(tempWriter);
        Document tempDocument = new Document(tempPdf);
        // 이미지 추가 로직

        // 표지 추가
        addCoverPage(tempDocument);

        // 파일 이름에 따라 정렬
        List<MultipartFile> sortedFiles = files.stream()
                .sorted(Comparator.comparing(MultipartFile::getOriginalFilename))
                .collect(Collectors.toList());

        for (MultipartFile file : sortedFiles) {
            byte[] bytes = file.getBytes();
            ImageData imageData = ImageDataFactory.create(bytes);
            Image image = new Image(imageData);
            tempDocument.add(image);
        }
        tempDocument.close();

        // 임시 파일을 읽고 최종 파일에 워터마크 추가
        PdfReader reader = new PdfReader(tempPdfFilePath);
        PdfWriter writer = new PdfWriter(finalPdfFilePath);
        PdfDocument finalPdf = new PdfDocument(reader, writer);
        Document finalDocument = new Document(finalPdf);

        // 워터마크 추가 로직
        PdfFont waterMarkingFont = PdfFontFactory.createFont("./fonts/NotoSansKR-Thin.ttf", PdfEncodings.IDENTITY_H, true);
        addBorderAndWatermark(finalPdf, waterMarkingFont);
        finalDocument.close();

        // 임시 파일 삭제
        Files.delete(Paths.get(tempPdfFilePath));

        return finalPdfFilePath;
    }


    private void addCoverPage(Document document) throws IOException {
        // 한글 폰트 파일 경로
        String fontPath = "./fonts/NotoSansKR-Bold.ttf";

        // PDF 폰트 생성
        PdfFont koreanFont = PdfFontFactory.createFont(fontPath, PdfEncodings.IDENTITY_H, true);

        // 텍스트에 한글 폰트 적용
        Paragraph title = new Paragraph("프라이펜 개인정보 처리방침 진단 레포트").setFont(koreanFont).setFontSize(24).setBold();
        Paragraph subtitle = new Paragraph("prototype-V").setFont(koreanFont).setFontSize(18);

        document.add(title);
        document.add(subtitle);

        // 날짜 추가
        String currentDate = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
        String userName = "김프펜";
        String companyName = "프라이펜";
        Table table = new Table(1) // 1 열 테이블
                .setWidth(UnitValue.createPercentValue(30)) // 테이블 폭 설정
                .setFixedPosition(450, 50, 100); // x, y, width

        Color borderColor = new DeviceRgb(217, 217, 217); // #d9d9d9 색상

        // 날짜 행 추가
        Cell dateCell = new Cell().add(new Paragraph("날짜: " + currentDate).setFont(koreanFont).setFontSize(10));
        dateCell.setBorder(Border.NO_BORDER); // 외곽선 제거
        dateCell.setBorderBottom(new SolidBorder(borderColor, 1)); // 아래쪽 테두리 색상 설정
        table.addCell(dateCell);

        // 사용자 이름 행 추가
        Cell userCell = new Cell().add(new Paragraph("작성자: " + userName).setFont(koreanFont).setFontSize(10));
        userCell.setBorder(Border.NO_BORDER);
        userCell.setBorderBottom(new SolidBorder(borderColor, 1));
        table.addCell(userCell);

        // 회사 이름 행 추가
        Cell companyCell = new Cell().add(new Paragraph("회사: " + companyName).setFont(koreanFont).setFontSize(10));
        companyCell.setBorder(Border.NO_BORDER);
        table.addCell(companyCell);

        document.add(table);
    }
    private void addBorderAndWatermark(PdfDocument pdf, PdfFont koreanFont) {
        PageSize a4 = PageSize.A4;

        System.out.println(pdf);
        System.out.println(pdf.getPage(1));
        int numberOfPages = pdf.getNumberOfPages();
        for (int i = 1; i <= numberOfPages; i++) {
            PdfPage page = pdf.getPage(i);
            Rectangle pageSize = page.getPageSizeWithRotation();
            float width = pageSize.getWidth();
            float height = pageSize.getHeight();

            if (page != null) {
                // 페이지 테두리 추가
                PdfCanvas canvas = new PdfCanvas(page);
                // 테두리 위치 및 크기 조정
                float inset = 20; // 여백
                canvas.rectangle(inset / 2, inset / 2, width - inset, height - inset);
                canvas.setStrokeColor(new DeviceRgb(173, 216, 230)); // 연한 파란색으로 설정
                canvas.setLineWidth(20);
                canvas.stroke();

                // 워터마크 추가
                Paragraph watermark = new Paragraph("@Copyright by Pripen")
                        .setFont(koreanFont)
                        .setFontSize(7)
                        .setFontColor(ColorConstants.GRAY);
                new Canvas(canvas, pdf, a4)
                        .showTextAligned(watermark, width / 2, 30, TextAlignment.CENTER);
            } else {
                System.out.println("페이지가 null입니다: " + i);
            }
        }
    }
    private void addTableOfContents(Document document) {
        // 목차 구현...
    }
}