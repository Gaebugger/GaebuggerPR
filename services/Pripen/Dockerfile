# Java와 Gradle을 사용하여 전체 빌드 수행 (프론트엔드 빌드 포함)
FROM gradle:8.2.1-jdk17 AS build
WORKDIR /app

# src 폴더 내의 java와 resources 폴더만 복사
COPY src/main/java ./src/main/java
COPY src/main/resources ./src/main/resources

# 백엔드 소스와 설정 파일 복사
COPY build.gradle settings.gradle ./
COPY gradlew ./
COPY gradle ./gradle

# 전체 빌드 수행
RUN chmod +x ./gradlew
RUN ./gradlew clean build

# 빌드된 JAR 파일 실행
FROM openjdk:17-oracle
WORKDIR /app


COPY fonts/ /app/fonts/

# 레포트 파일 저장을 위한 디렉토리 생성
RUN mkdir -p /app/ReportStorage

# 환경 변수 설정
ENV REPORT_STORAGE_PATH=/app/ReportStorage


COPY --from=build /app/build/libs/*.jar app.jar
EXPOSE 8080
CMD ["java", "-jar", "app.jar"]
