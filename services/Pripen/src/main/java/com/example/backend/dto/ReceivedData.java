package com.example.backend.dto;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.ToString;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ReceivedData {
    private List<Integer> checkedItems;
    private DataObject infoData;
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class DataObject {
        private String companyName;
        private String industryType;
        private String position;
        private String name;
        private String email;
    }
}
