# GPT 이미지 생성/저장 가이드

이 폴더는 GPT로 생성한 이미지 결과물을 저장하는 용도입니다.

## 여기서 가능한가?
- 텍스트/코드 기반 SVG 생성: 가능
- 외부 이미지 생성 API 연동(예: OpenAI 이미지 API): 프로젝트에서 API 라우트/스크립트로 연동하면 가능
- 현재 이 저장소 환경에서 즉시 바이너리 PNG/JPG를 모델로 직접 생성: 기본 환경만으로는 제한될 수 있음

## 권장 워크플로우
1. `app/api/image-generate` 같은 서버 라우트에서 이미지 생성 API 호출
2. 결과 URL 또는 base64를 받아 `/public/images/generated/gpt`에 저장(또는 스토리지 업로드)
3. 프론트에서 `/images/generated/gpt/...` 경로로 노출

## 파일 규칙
- 파일명: `kebab-case`
- 용도 prefix: `hero-`, `cover-`, `icon-`
- 예시: `hero-study-flow-v1.svg`
