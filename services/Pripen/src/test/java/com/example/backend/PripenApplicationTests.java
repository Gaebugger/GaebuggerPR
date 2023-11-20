package com.example.backend;


import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;


import java.util.List;
import java.util.stream.Collectors;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
public class PripenApplicationTests {
	@Test
	public void testDistinctIssueReason() {
		List<String> issue_reason = List.of("it's me", "its you", "its me", "it's me");
		List<String> distinctReasons = issue_reason.stream()
				.distinct()
				.collect(Collectors.toList());
		System.out.println(distinctReasons);
		assertEquals(3, distinctReasons.size()); // 수정된 부분
		assertTrue(distinctReasons.contains("it's me"));

	}
}
