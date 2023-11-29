package com.example.backend.controller;

import com.example.backend.dto.ReceivedDataDTO;
import com.example.backend.service.Analysis.DataProcessingService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.*;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

@RestController
@RequestMapping("/api")
public class ReceiveDataController {

    private ConcurrentMap<String, Boolean> processStatus = new ConcurrentHashMap<>();
    private final DataProcessingService dataProcessingService;

    public ReceiveDataController(DataProcessingService dataProcessingService) {
        this.dataProcessingService = dataProcessingService;
    }

    @CrossOrigin(origins = {"https://www.pri-pen.com" , "http://localhost:3000"})
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

    @CrossOrigin(origins = {"https://www.pri-pen.com" ,"http://localhost:3000"})
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
        CompletableFuture<Void> future = dataProcessingService.processData_test(parsedProcessId,emitter);

        return emitter;
    }

    // test endpoint
//    @CrossOrigin(origins = "http://localhost:3000")

    @CrossOrigin(origins = {"https://www.pri-pen.com", "http://localhost:3000"})
    @PostMapping("/test-mock")
    public ResponseEntity<Map<String, Object>> getMockData(@RequestBody String process_ID) {
        // 임의의 데이터 생성
        Map<String, Object> responseData = new HashMap<>();
        responseData.put("process_Id", process_ID);
        responseData.put("process_Original", "개인정보취급방침Best of the Best는 이용자의 개인정보보호를 최우선의 가치로 생각합니다.\r\n한국정보기술연구원의 개인정보취급방침은 다음과  같은 내용을 담고 있습니다.\r\n가. 수집하는 개인정보 항목 및 수집방법\r\n웹사이트에서 회원가입, 전자민원서비스 이용 및 게시판 등에 글쓰기를 하시고자 하는 경우에, 연구원에서는 이용자의 동의를 얻어 필요한 최소한의 개인정보를 수집하고 있습니다.\r\n수집하는 개인정보 항목은 다음과 같습니다.\r\n- 홈페이지 회원가입 : 아이디, 이름, 이메일, 주소, 전화번호, 휴대폰번호 등\r\n- 게시판 글쓰기 : 이름, E-mail\r\n※ 수집근거 : 홈페이지 이용약관\r\n나. 개인정보 수집 및 이용목적\r\n대부분의 연구원 홈페이지에서 제공하는 서비스는 별도의 회원가입 없이 언제든지 사용할 수 있습니다. 그러나, 연구원에서는 맞춤서비스(메일링 서비스, 교육안내 등)를 비롯한 보다 더 향상된 양질의 서비스를 제공하기 위하여 이용자 개인의 정보를 수집하고 있습니다.\r\n다. 개인정보의 공유 및 제공\r\n연구원 회원에 가입하신 분께서는 개인정보를 열람 또는 정정하고자 하실 때에는 아이디와  이름을 제외하고 직접 열람 또는 정정하시면 됩니다. 회원가입을 통해 개인정보의 수집, 이용, 제공에 대해 동의하신 내용을 회 원은 언제든지 철회하실 수 있습니다. 회원은 관리자에게 유선 또는 메일로 문의하여 조치를 받으시면 됩니다.\r\n라. 개인정보 의 보유 및 이용기간\r\n회원으로서 한국정보기술연구원에 제공하는 서비스를 이용하는 동안 연구원은 회원의 개인정보를 계속적으로 보유하며 서비스 제공 등을 위해 이용합니다.\r\n일시적인 목적(이벤트 등)으로 입력 받은 개인정보는 그 목적이 달성된 이후에는 동일한 방법으로 사후 재생이 불가능한 상태로 처리됩니다. 한국정보기술연구원은 개인정보의 수집목적이 달성되면 파기 하는 것을 원칙으로 합니다.\r\n전자민원창구(Q&A)와 제안마당의 게시물을 작성하신 경우, 또는 정부지원사업에 참여하신 경우  민원의 원활한 행정업무 처리를 위하여 개인정보를 보관합니다. 이 경우 한국정보기술연구원은 보관하는 정보를 그 보관 목적으 로만 이용합니다.\r\n비회원 : 회원에 가입하지 않고 서비스를 이용하는 자를 말합니다.\r\n마.개인정보 보호책임자\r\n한국정보기술연구원은 회원의 개인정보를 보호하고 개인정보와 관련한 불만을 처리하기 위하여 아래와 같이 관련 부서 및 개인정보 보호 책임자를 지정하고 있습니다.\r\n[한국정보기술연구원 BoB센터 개인정보 보호책임자]\r\n- 담당자: 윤일중 보안교육운영팀장\r\n- 담당부서: BoB센터\r\n- 전화번호: 070-7093-9877\r\n- 이메일: toquryoon@kitri.re.kr\r\n- 주소: 서울시 금천구 서부샛길 606 대성디폴리스지식산업센터 A동 2701호");
        responseData.put("process_Law_Violate",2);
        responseData.put("process_Law_Danger",2);
        responseData.put("process_Guide_Violate",4);
        responseData.put("process_Omission_Paragraph",4);


        List<Map<String, Object>> paragraphs = new ArrayList<>();

        Map<String, Object> paragraph0 = new HashMap<>();
        paragraph0.put("paragraph_id",0);
        paragraph0.put("paragraph_content","개인정보취급방침Best of the Best는 이용자의 개인정보보호를 최우선의 가치로 생각합니다.\r\n한국정보기술연구원의 개인정보취급 방침은 다음과 같은 내용을 담고 있습니다.\r\n");
        paragraph0.put("paragraph_startIndex",0);
        paragraph0.put("paragraph_endIndex",97);
        paragraphs.add(paragraph0);

        Map<String, Object> paragraph1 = new HashMap<>();
        paragraph1.put("paragraph_id", 1);
        paragraph1.put("paragraph_content", "가. 수집하는 개인정보 항목 및 수집방법\r\n웹사이트에서 회원가입, 전자민원서비스 이용 및 게시판 등에 글쓰기를 하시고자 하는 경우에, 연구원에서는 이용자의 동의를 얻어 필요한 최소한의 개인정보를 수집하고 있습니다.\r\n수 집하는 개인정보 항목은 다음과 같습니다.\r\n- 홈페이지 회원가입 : 아이디, 이름, 이메일, 주소, 전화번호, 휴대폰번호 등\r\n- 게시판 글쓰기 : 이름, E-mail\r\n※ 수집근거 : 홈페이지 이용약관\r\n");
        paragraph1.put("paragraph_startIndex",98);
        paragraph1.put("paragraph_endIndex",334);
        // ... 나머지 속성들도 동일하게 추가
        paragraphs.add(paragraph1);
        // ... 다른 paragraph들도 추가

        Map<String,Object> paragraph2= new HashMap<>();
        paragraph2.put("paragraph_id",2);
        paragraph2.put("paragraph_content","나. 개인정보 수집 및 이용목적\r\n대부분의 연구원 홈페이지에서 제공하는 서비스는 별도의 회원가입 없이 언제든지 사용할 수 있습니다. 그러나, 연구원에서는 맞춤서비스(메일링 서비스, 교육안내 등)를 비롯한 보다 더 향상된 양질의 서비스를 제공하기 위하여 이용자 개인의 정보를 수집하고 있습니다.\r\n");
        paragraph2.put("paragraph_startIndex",335);
        paragraph2.put("paragraph_endIndex",499);
        paragraphs.add(paragraph2);

        Map<String, Object> paragraph3 = new HashMap<>();

        paragraph3.put("paragraph_id",3);
        paragraph3.put("paragraph_content", "다. 개인정보의 공유 및 제공\r\n연구원 회원에 가입하신 분께서는 개인정보를 열람 또는 정정하고자 하실 때에는 아이디와 이름을 제외하고 직접 열람 또는 정정하시면 됩니다. 회원가입을 통해 개인정보의 수집, 이용, 제공에 대해 동의하신 내용을 회원은 언제든지 철회하실 수 있습니다. 회원은 관리자에게 유선 또는 메일로 문의하여 조치를 받으시면 됩니다.\r\n");
        paragraph3.put("paragraph_startIndex",500);
        paragraph3.put("paragraph_endIndex",695);
        paragraphs.add(paragraph3);


        Map<String,Object> paragraph4= new HashMap<>();
        paragraph4.put("paragraph_id",4);
        paragraph4.put("paragraph_content","라. 개인정보의 보유 및 이용기간\r\n회원으로서 한국정보기술연구원에 제공하는 서비스를 이용하는 동안 연구원은 회원의 개인정보를 계속적으로 보유하며 서비스 제공 등을 위해 이용합니다.\r\n일시적인 목적(이벤트 등)으로 입력 받은 개인정보는 그 목적이 달성된 이후에는 동일한 방법으로 사후 재생이 불가능한 상태로 처리됩니다.  한국정보기술연구원은 개인정보의 수집목적이 달성되면 파기하는 것을 원칙으로 합니다.\r\n전자민원창구(Q&A)와 제안마당의 게 시물을 작성하신 경우, 또는 정부지원사업에 참여하신 경우 민원의 원활한 행정업무 처리를 위하여 개인정보를 보관합니다. 이  경우 한국정보기술연구원은 보관하는 정보를 그 보관 목적으로만 이용합니다.\r\n비회원 : 회원에 가입하지 않고 서비스를 이용 하는 자를 말합니다.\r\n");
        paragraph4.put("paragraph_startIndex",696);
        paragraph4.put("paragraph_endIndex",1088);
        paragraphs.add(paragraph4);

        Map<String,Object> paragraph5= new HashMap<>();
        paragraph5.put("paragraph_id",5);
        paragraph5.put("paragraph_content","마.개인정보 보호책임자\r\n한국정보기술연구원은 회원의 개인정보를 보호하고 개인정보와 관련한 불만을 처리하기 위하여 아래와 같이 관련 부서 및 개인정보 보호책임자를 지정하고 있습니다.\r\n[한국정보기술연구원 BoB센터 개인정보 보호책임자]\r\n- 담당자: 윤일중 보안교육운영팀장\r\n- 담당부서: BoB센터\r\n- 전화번호: 070-7093-9877\r\n- 이메일: toquryoon@kitri.re.kr\r\n- 주소: 서울시 금천구 서부샛길 606 대성디폴리스지식산업센터 A동 2701호");
        paragraph5.put("paragraph_startIndex",1089);
        paragraph5.put("paragraph_endIndex",1353);
        paragraphs.add(paragraph5);

        responseData.put("process_Paragraph", paragraphs);
        // process_Issues에 대해서도 동일한 방식으로 추가


        responseData.put("process_Issues", createProcessIssues());

        responseData.put("process_Modified","");

        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }


    // test issue 생성
    public static List<Map<String, Object>> createProcessIssues() {
        List<Map<String, Object>> processIssues = new ArrayList<>();
        List<String> reasons = Arrays.asList(
                "작성지침 9. 개인정보의 파기 절차 및 방법에 관한 사항",
                "작성지침 9. 개인정보의 파기 절차 및 방법에 관한 사항",
                "개인정보보호법 제21조 제3항",
                "개인정보보호법 제30조 제1항",
                "개인정보보호법 시행령 제16조 제1항"
        );
        // Issue 0
        Map<String, Object> issue0 = new HashMap<>();
        issue0.put("issue_id", 0);
        issue0.put("issue_paragraph_id", -500);
        issue0.put("issue_type", "기재 항목 누락");
        issue0.put("issue_score",51);
        issue0.put("issue_content", "개인정보의 파기 절차 및 방법에 관한 사항에 해당하는 항목의 기재가 누락인 상태이고 이를 의무로 기재하여야합니다.");
        issue0.put("issue_reason", reasons);
        issue0.put("issue_startIndex", -500);
        issue0.put("issue_endIndex", -500);
        issue0.put("issue_case",8);
        issue0.put("issue_guideline", new ArrayList<>());
        processIssues.add(issue0);

        // Issue 1
        Map<String, Object> issue1 = new HashMap<>();
        issue1.put("issue_id", 1);
        issue1.put("issue_paragraph_id", -500);
        issue1.put("issue_type", "기재 항목 누락");
        issue1.put("issue_score",30);
        issue1.put("issue_content", "정보주체와 법정대리인의 권리·의무 및 행사방법에 관한 사항에 해당하는 항목의 기재가 누락인 상태이고 이를 의무로 기재하여야합니다.");
        issue1.put("issue_reason", reasons);
        issue1.put("issue_startIndex", -500);
        issue1.put("issue_endIndex", -500);
        issue1.put("issue_case",10);
        issue1.put("issue_guideline", List.of("개인정보의 보유 및 이용기간은 정보주체의 동의를 받거나 법령에 따라 결정되어야 합니다.", "이 기간은 개인정보처리방침에 명시되어야 합니다."));
        processIssues.add(issue1);

        // ... (나머지 이슈들도 위와 같은 방식으로 추가)

        // Issue 2
        Map<String, Object> issue2 = new HashMap<>();
        issue2.put("issue_id", 2);
        issue2.put("issue_paragraph_id", -500);
        issue2.put("issue_type", "기재 항목 누락");
        issue2.put("issue_score",15);
        issue2.put("issue_content", "개인정보의 안전성 확보조치에 관한 사항에 해당하는 항목의 기재가 누락인 상태이고 이를 의무로 기재하여야합니다.");
        issue2.put("issue_reason", reasons);
        issue2.put("issue_startIndex", -500);
        issue2.put("issue_endIndex", -500);
        issue2.put("issue_case",11);
        issue2.put("issue_guideline", new ArrayList<>());
        processIssues.add(issue2);

        // Issue 3
        Map<String, Object> issue3 = new HashMap<>();
        issue3.put("issue_id", 3);
        issue3.put("issue_paragraph_id", -500);
        issue3.put("issue_type", "기재 항목 누락");
        issue3.put("issue_score",25);
        issue3.put("issue_content", "개인정보 처리방침의 변경에 관한 사항에 해당하는 항목의 기재가 누락인 상태이고 이를 의무로 기재하여야합니다.");
        issue3.put("issue_reason", reasons);
        issue3.put("issue_startIndex", -500);
        issue3.put("issue_endIndex", -500);
        issue3.put("issue_case",21);
        issue3.put("issue_guideline", new ArrayList<>());
        processIssues.add(issue3);

        // Issue 4
        Map<String, Object> issue4 = new HashMap<>();
        issue4.put("issue_id", 4);
        issue4.put("issue_paragraph_id", 0);
        issue4.put("issue_type", "작성지침 미준수");
        issue4.put("issue_score",-999);
        issue4.put("issue_content", "개인정보 처리방침을 수립·공개하고자 하는 개인정보처리자의 명칭을 주어로 하여 기재하여야 함.**");
        issue4.put("issue_reason", new ArrayList<>());
        issue4.put("issue_startIndex", 0);
        issue4.put("issue_endIndex", 53);
        issue4.put("issue_case",0);
        issue4.put("issue_guideline", List.of("개인정보 처리방침을 수립하고 공개하려는 주체 의 명칭을 명확하게 기재해야 합니다.", "주어로서 개인정보처리자의 명칭을 사용해야 합니다."));
        processIssues.add(issue4);

        // Issue 5
        Map<String, Object> issue5 = new HashMap<>();
        issue5.put("issue_id", 5);
        issue5.put("issue_paragraph_id", 0);
        issue5.put("issue_type", "작성지침 미준수");
        issue5.put("issue_score",-999);
        issue5.put("issue_content", "'개인정보취급방침'이란 용어가 아닌 '개인정보처리방침'이란 용어를 사용해야함.**");
        issue5.put("issue_reason", new ArrayList<>());
        issue5.put("issue_startIndex", 860);
        issue5.put("issue_endIndex", 905);
        issue5.put("issue_case",4);
        issue5.put("issue_guideline", List.of("쪼까위험하내", "뭘바임마"));
        processIssues.add(issue5);

        // Issue 6
        Map<String, Object> issue6 = new HashMap<>();
        issue6.put("issue_id", 6);
        issue6.put("issue_paragraph_id", 1);
        issue6.put("issue_type", "작성지침 미준수");
        issue6.put("issue_score",3);
        issue6.put("issue_content", "재난, 감염병 등 긴급 상황 발생 시 정보주체의 동의가 없어도 관련 기관에 개인정보를 제공할 수 있다'는 내용을 기재해야 해. 해당 내용이 기재되어있지 않으면, 지침 미준수야.");
        issue6.put("issue_reason", List.of("작성지침 6.개인정보의 제3자 제공에 관한 사항"));
        issue6.put("issue_startIndex", -999);
        issue6.put("issue_endIndex", -999);
        issue6.put("issue_case",6);
        issue6.put("issue_guideline", List.of("긴급 상황 발생 시 정보주체의 동의 없이 개인정보를 제공할 수 있다는 내용을 기재해야 합니다.","재난, 감염병 등의 긴급 상황에 대비한 개인정보 제공 방안을 기재해야 합니다."));
        processIssues.add(issue6);
        // Issue 7
        Map<String, Object> issue7 = new HashMap<>();
        issue7.put("issue_id", 7);
        issue7.put("issue_paragraph_id", 1);
        issue7.put("issue_type", "작성지침 미준수");
        issue7.put("issue_score",3);
        issue7.put("issue_content", "누락테스트");
        issue7.put("issue_reason", List.of("누락테스트2"));
        issue7.put("issue_startIndex", -999);
        issue7.put("issue_endIndex", -999);
        issue7.put("issue_case",8);
        issue7.put("issue_guideline", List.of("영차","영치2"));
        processIssues.add(issue7);

        // Issue 6
        Map<String, Object> issue8 = new HashMap<>();
        issue8.put("issue_id", 8);
        issue8.put("issue_paragraph_id", 1);
        issue8.put("issue_type", "법률 위반");
        issue8.put("issue_score",15);
        issue8.put("issue_content", "누락테스트_법률");
        issue8.put("issue_reason", List.of("누락테스트2_법률"));
        issue8.put("issue_startIndex", -999);
        issue8.put("issue_endIndex", -999);
        issue8.put("issue_case",4);
        issue8.put("issue_guideline", List.of("영차","영치2"));
        processIssues.add(issue8);

        Map<String, Object> issue9 = new HashMap<>();
        issue9.put("issue_id",9);
        issue9.put("issue_paragraph_id",-1);
        issue9.put("issue_type","기재 항목 누락");
        issue9.put("issue_score",51);
        issue9.put("issue_content","제목 및 서문");
        issue9.put("issue_reason",List.of("개인정보 보호법"));
        issue9.put("issue_startIndex",-500);
        issue9.put("issue_endIndex",-500);
        issue9.put("issue_case",3);
        issue9.put("issue_guideline",List.of("제목은쓰셔야죠","부제목도필수임"));
        processIssues.add(issue9);

        Map<String, Object> issue10 = new HashMap<>();
        issue10.put("issue_id",10);
        issue10.put("issue_paragraph_id",-1);
        issue10.put("issue_type","기재 항목 누락");
        issue10.put("issue_score",51);
        issue10.put("issue_content","개인정보 어떤거 그 긴거 출력하는거");
        issue10.put("issue_reason",List.of("개인정보 보호법29조"));
        issue10.put("issue_startIndex",-500);
        issue10.put("issue_endIndex",-500);
        issue10.put("issue_case",21);
        issue10.put("issue_guideline",List.of("테스트입니다","부제목도필수임"));
        processIssues.add(issue10);

        return processIssues;
    }


//    @PostMapping("/checklist/submit")
//    public ResponseEntity<Map<String, Object>> submitData(@RequestParam("checkedItems") String checkedItemsString,
//                                                          @RequestParam("uploadedFile") MultipartFile uploadedFile) {
//
//        Map<String, Object> response = new HashMap<>();
//        try {
//            List<Integer> checkedItems = List.of(checkedItemsString.split(","));
//            UUID processId = dataProcessingService.initializeProcessingStatus(checkedItems, uploadedFile); // Modifying to store data for later processing
//            System.out.println(processId);  //주석
//            response.put("message", "Data received. Processing will start shortly.");
//            response.put("processId", processId.toString());
//            return ResponseEntity.ok(response);
//        } catch (Exception e) {
//            response.put("message", "Error receiving data.");
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
//        }
//    }

//    @GetMapping("/check-response/{processId}")
//    public ResponseEntity<Map<String, Object>> checkResponse(@PathVariable("processId") String processId) {
//        Map<String, Object> response = new HashMap<>();
//        UUID uuid;
//        System.out.println("controller /check-response on");
//
//        try {
//            uuid = UUID.fromString(processId);
//        } catch (IllegalArgumentException e) {
//            response.put("message", "Invalid process ID format.");
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
//        }
//
//        DataProcessingService.ProcessingStatus status = dataProcessingService.getStatus(uuid);
//
//        if (status == null) {
//            response.put("message", "No such process or process ID is invalid.");
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
//        }
//
//        if (!status.hasProcessingStarted()) {
//            dataProcessingService.processData(uuid); // Start the processing
//            response.put("message", "Data processing started.");
//            return ResponseEntity.status(HttpStatus.PROCESSING).body(response);
//        } else if (status.isProcessingComplete()) {
//            response.put("message", "Data processing complete.");
//            response.put("fileContent", status.getProcessedFileContent());
//            response.put("ans", status.getAns());
//            System.out.println(response);
//            return ResponseEntity.ok(response);
//        } else if (status.getError() != null) {
//            response.put("message", "Error during data processing.");
//            response.put("error", status.getError());
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
//        } else {
//            response.put("message", "Data processing in progress.");
//            return ResponseEntity.status(HttpStatus.PROCESSING).body(response);
//        }
//    }
}
