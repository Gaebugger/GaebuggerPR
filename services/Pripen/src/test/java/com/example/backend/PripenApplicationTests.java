package com.example.backend;


import com.example.backend.service.Authentication.Login.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;


import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@SpringBootTest
public class PripenApplicationTests {

	@MockBean
	private UserService userService;

	@Test
	public void testCheckEmailExists() {
		// 가정: 이메일이 존재하는 경우
		String existingEmail = "2@2";
		when(userService.existsByEmail(existingEmail)).thenReturn(true);

		boolean isAvailable = userService.existsByEmail(existingEmail);
		assertFalse(isAvailable); // 이메일이 존재하므로 사용할 수 없음
	}

	@Test
	public void testCheckEmailDoesNotExists() {
		// 가정: 이메일이 존재하지 않는 경우
		String nonExistingEmail = "nonexist@example.com";
		when(userService.existsByEmail(nonExistingEmail)).thenReturn(false);

		boolean isAvailable = userService.existsByEmail(nonExistingEmail);
		assertTrue(isAvailable); // 이메일이 존재하지 않으므로 사용할 수 있음
	}

}
