# Image Assets Guide

프로젝트 이미지 에셋은 `public/images` 아래에서 관리합니다.

## 폴더 규칙
- `public/images/covers/`: 교재/책 표지 이미지
- 필요 시 목적별 하위 폴더 추가 (`banners`, `avatars`, `icons` 등)

## 사용 예시
- 코드에서 `/images/covers/math-book.svg` 형태로 참조
- Next.js `public` 정적 파일 규칙을 따르므로 별도 import 없이 URL로 접근 가능

## 권장 사항
- 파일명은 소문자-kebab-case 사용
- 교체 가능성이 큰 외부 썸네일은 로컬 fallback 이미지도 함께 유지
