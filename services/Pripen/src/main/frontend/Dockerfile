# ---- 빌드 스테이지 ----
FROM node:18-slim as build-stage

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# ---- 최종 이미지 ----
# 경량 베이스 이미지 사용
FROM alpine:latest

# 빌드 스테이지에서 생성된 빌드 파일을 복사합니다.
COPY --from=build-stage /app/build /var/www


# 빌드 시험용. -> deprecated & nginx 바로 배포.