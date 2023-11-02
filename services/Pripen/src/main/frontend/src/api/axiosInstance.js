import React from "react";
import axios from "axios";

// Axios 인스턴스 생성
const axiosInstance = axios.create({
    baseURL: 'https://www.pri-pen.com/',
    withCredentials: true
  });

    // 요청 인터셉터
    axiosInstance.interceptors.request.use(
        config => {
            // HTTP-only 쿠키를 사용하는 경우 브라우저가 자동으로 쿠키를 요청에 포함시키므로
            // 여기서 별도로 Authorization 헤더를 설정할 필요가 없습니다.
            return config;
        },
        error => {
            return Promise.reject(error);
        }
    );
  
  // 응답 인터셉터
  axiosInstance.interceptors.response.use(
    response => {
      // 성공 응답을 처리하고 반환합니다.
      return response;
    },
    async error => {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        // AccessToken 만료 시 처리 로직
        originalRequest._retry = true;
        try {
          // RefreshToken으로 새 AccessToken을 요청합니다.
          const rs = await axiosInstance.post('https://www.pri-pen.com/userAuthentication/refresh');

          // 실패했던 요청을 다시 시도합니다.
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          // RefreshToken도 만료되었을 때 로그아웃 처리
          // 로그아웃 처리 로직 실행
          return Promise.reject(refreshError);
        }
      }
      // 기타 에러 처리
      return Promise.reject(error);
    }
  );
  export default axiosInstance;
  