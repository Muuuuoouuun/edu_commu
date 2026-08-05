# 프론트엔드 디자인 전면 재구축 — 기획 & 평가

> 대상: `edu_commu` (Next.js 16 / React 19 / Tailwind v4)
> 범위: **프론트엔드 전용**. API 라우트·인증·DB 스키마의 동작은 변경하지 않음.

---

## 1. 요구사항 해석

원문 요청: *"프론트만 디자인 더 친숙하게, 펜슬 틱 하지만 실내가 있는 톤으로. 디자인 전면 재구축. 기획 및 평가"*

아래와 같이 해석하고 진행했습니다. (해석이 다르면 이 절만 고쳐서 재작업 가능하도록 토큰 중심으로 설계)

| 키워드 | 해석 | 디자인 반영 |
|---|---|---|
| **친숙하게** | 프리미엄·거리감 있는 매거진 톤 → 편하게 말 걸 수 있는 커뮤니티 톤 | 한국어 우선 카피, 둥근 형태, 낮은 대비, 존댓말 마이크로카피 |
| **펜슬 틱 (pencil-ish)** | 손으로 그린 연필 스케치 질감 | 연필심 색 텍스트, 손그림 테두리, 물결 밑줄, 괘선/모눈 배경, 손글씨 폰트(Gaegu), 스케치 SVG 일러스트 |
| **실내가 있는 톤** | 인테리어(실내) 감성의 따뜻한 색 — 공부방/서재 | 크림 종이 배경, 원목, 스탠드 조명 앰버, 화분 세이지 그린. 다크모드는 "밤에 스탠드만 켠 방" |
| **전면 재구축** | 부분 수정이 아닌 디자인 시스템부터 다시 | 토큰 → 프리미티브 → 카드 → 섹션 → 페이지 순으로 전량 재작성 |

**한 줄 컨셉: "밤늦게까지 불 켜둔 공부방" — 종이와 연필, 스탠드 조명의 온도.**

---

## 2. 기존 상태 진단 (재구축이 필요했던 이유)

실측한 문제들입니다. 단순 취향 문제가 아니라 대부분 **실제로 깨져 있던 것**입니다.

### 2.1 디자인 시스템이 두 개, 그 중 하나는 죽어 있었음 🔴

- `tailwind.config.ts`는 Tailwind **v3 문법**으로 보라/슬레이트 팔레트를 정의.
- `app/globals.css`는 Tailwind **v4 `@theme`** 로 베이지 팔레트를 정의.
- 이 프로젝트는 `@tailwindcss/postcss` (v4) 사용 → **v4는 `@config` 지시어 없이는 `tailwind.config.ts`를 읽지 않음.**
- 결과: `text-primary-DEFAULT`, `text-accent-rose`, `text-text-muted`, `bg-glass`, `bg-surface`, `hover:bg-primary-soft` 등이 **전부 무효 클래스**. 브라우저에 아무 스타일도 적용되지 않은 채 방치.
  - 영향 파일: `AdSlot.tsx`, `BlogCard.tsx`, `UserButton.tsx`, `blog/page.tsx`, `contact/page.tsx`, `CommunitySection.tsx`
- 대응: **`tailwind.config.ts` 삭제**, `globals.css` 단일 소스로 통일.

### 2.2 콘텐츠와 서비스 정체성 불일치 🔴

- 한국 교육 커뮤니티인데 메인/블로그 목데이터가 **광유전학·노화 연구 영문 기사**("Optogenetics-enabled discovery…", "Aging as an Engineering Problem"). 타 사이트 텍스트가 그대로 남아 있는 상태.
- UI 라벨도 한/영 혼재: `All / Questions / Reviews`, `Read Article`, `Write a Post`, `Top Contributors`, `Discussion`, `Sign in to LUMIERE`.
- 대응: 목데이터·UI 문구 전면 한국어화, 교육 커뮤니티 실제 맥락으로 교체.

### 2.3 접근성 결함 🟠

- 모바일 햄버거 버튼에 **핸들러가 없음** → 모바일에서 네비게이션 접근 불가.
- 아이콘 전용 버튼 다수에 `aria-label` 없음.
- 커스텀 포커스 링 없음 + `outline-none`을 여러 입력 요소에 적용 → **키보드 포커스가 보이지 않음**.
- `<html lang="en">` 인데 콘텐츠는 한국어.
- 링크(`<Link>`) 안에 `<button>` 중첩 (`CommunityCard`) → 유효하지 않은 HTML.
- 다크모드 미지원.

### 2.4 시각 언어 파편화 🟠

- 카드 컴포넌트 4종(`NewsCard`/`BlogCard`/`CommunityCard`/`AdSlot`)이 각각 다른 언어 사용: 라운드 0px·16px·24px·28px 혼재, 테두리 규칙 제각각.
- `BlogCard.tsx`는 **어디서도 import되지 않는 死코드**.
- `NewsCard`의 `variant: "dark"`는 실제로 다크 스타일을 만들지 않음(주석에도 "not used for now").
- 로딩 상태가 `"Loading community..."` 텍스트 한 줄, 빈 상태 문구도 영어.

### 2.5 빌드·설정 위생 🟠

- `next.config.ts`의 `eslint` 키는 **Next 16에서 더 이상 지원되지 않음**. 빌드 경고(`Unrecognized key(s) in object: 'eslint'`)와 타입 오류를 동시에 내고 있었고, 의도했던 "린트 무시"도 실제로는 동작하지 않던 상태.
- `app/api/posts/route.ts`가 `nanoid`를 import하지만 `package.json`에 **선언돼 있지 않음**(다른 패키지의 전이 의존성으로 우연히 해석되던 상태). 실제로 쓰이지도 않는 데드 import.
- `typescript.ignoreBuildErrors`가 켜져 있어 타입 문제가 조용히 묻히는 구조.

---

## 3. 디자인 시스템 기획

### 3.1 컬러 토큰

의미 기반(semantic) 네이밍. 라이트/다크 모두 정의하며, 다크는 색조를 유지한 채 명도만 반전(따뜻함 유지).

| 토큰 | 역할 | Light | Dark |
|---|---|---|---|
| `paper` | 페이지 배경 (크림 종이) | `#FBF7EF` | `#191512` |
| `paper-raised` | 카드·팝오버 표면 | `#FFFCF6` | `#221D17` |
| `paper-sunken` | 입력창·트랙 | `#F3EDE1` | `#13100C` |
| `graphite` | 본문 텍스트 (연필심) | `#2F2B27` | `#EFE8DB` |
| `graphite-soft` | 보조 텍스트 | `#6B6459` | `#B2A895` |
| `graphite-faint` | 3차 텍스트·플레이스홀더 | `#8C8474` | `#867D6D` |
| `rule` | 기본 경계선 (연필선) | `#E6DCCB` | `#342D24` |
| `rule-strong` | 강조 경계선 | `#CDBFA6` | `#4C4337` |
| `lamp` | 주 강조 — 스탠드 조명 | `#C9762E` | `#E9A44E` |
| `lamp-ink` | 앰버 계열 **텍스트용** (대비 확보) | `#9C560F` | `#F2B76C` |
| `wood` | 원목 악센트 | `#8A6A4B` | `#B98F63` |
| `plant` | 화분 세이지 (성공·태그) | `#4F7350` | `#8FB088` |
| `eraser` | 지우개 핑크 (좋아요·경고) | `#BF554F` | `#E58179` |
| `highlighter` | 형광펜 배경 | `#F7E7B0` | `#4B3F20` |

> **대비 원칙**: 본문/링크 텍스트에는 `lamp`가 아니라 `lamp-ink`를 쓴다. `lamp`는 아이콘·배경·테두리 등 그래픽 요소 전용.

### 3.2 타이포그래피

| 역할 | 폰트 | 비고 |
|---|---|---|
| 본문·제목 | Pretendard → 시스템 한글 폴백 | 한글 가독성 우선 |
| 손글씨 악센트 | **Gaegu** (Google Fonts, 한글 지원) | eyebrow, 뱃지, 숫자, 장식 라벨에만 |
| 코드/숫자 | 시스템 mono | 통계 숫자 |

- 손글씨는 **장식으로만** 사용. 본문에 쓰면 가독성이 떨어지고 "친숙"이 아니라 "유치"가 됨.
- 대문자 + `tracking-widest` 영문 라벨(기존 다수)은 한국어 UI에서 낯설고 딱딱해서 전부 제거.

### 3.3 형태 언어 (Shape)

| 요소 | 규칙 |
|---|---|
| 카드 | `radius: 18px`, 1px `rule` 테두리, 종이 겹침 그림자(`0 1px 0` + soft blur) |
| 버튼 | pill (`rounded-full`), 눌림 효과 `active:translate-y-[1px]` |
| 입력 | `radius: 14px`, `paper-sunken` 배경, 포커스 시 `lamp` 링 |
| 스케치 테두리 | `.sketch-frame` — 비대칭 radius로 손으로 그린 느낌 |
| 밑줄 | `.pencil-underline` — SVG 물결선, 제목 강조용 |
| 배경 | `.paper-grain`(미세 노이즈) + `.ruled-lines`(공책 괘선) |
| 장식 | `.tape` — 마스킹테이프, `<Doodle />` — 연필/책/램프/화분 SVG |

### 3.4 모션

- 기본 `duration: 200ms`, `ease-out`. 스크롤 등장은 `y: 12px → 0` + fade.
- `prefers-reduced-motion` 존중 (전역 CSS로 애니메이션 무력화).
- 기존 Navbar의 `initial={{ y: -100 }}` 같은 과한 진입 모션 제거.

---

## 4. 구현 계획 (실행 순서)

1. **토큰** — `globals.css` 전면 재작성, `tailwind.config.ts` 삭제
2. **프리미티브** — `Button` `Badge` `Card` `Avatar` `EmptyState` `Skeleton` `Sketch`(Doodle/Divider/Underline) `ThemeToggle`
3. **레이아웃** — `layout.tsx`(lang=ko, 폰트, 스킵링크, 테마 스크립트), `Navbar`(모바일 메뉴 동작, 활성 링크, 테마 토글), `Footer`
4. **카드/섹션** — `NewsCard` `CommunityCard` `AdSlot` 재작성, `BlogCard` 삭제, `HeroSection` 신규, `BlogSection`/`CommunitySection` 재구축
5. **페이지** — 10개 라우트 전량 적용 + 한국어화
6. **콘텐츠** — 목데이터를 한국 교육 커뮤니티 맥락으로 교체
7. **검증** — 빌드 + Playwright 스크린샷(라이트/다크, 데스크톱/모바일)

---

## 5. 평가

> 이 절은 구현 완료 후 작성되었습니다.

### 5.1 정량 평가

모두 저장소에서 직접 세어 확인한 수치입니다.

| 항목 | Before | After | 확인 방법 |
|---|---|---|---|
| 디자인 토큰 소스 | 2개 (충돌, 1개는 v4에서 무효) | 1개 (`globals.css`) | `tailwind.config.ts` 삭제 |
| 무효(dead) Tailwind 클래스 | **33개소** (색상 24 + `prose*` 9) | **0** | `grep` 대조 |
| 아이콘 버튼 `aria-label` | **0개** | **19개** | `grep -c aria-label` |
| 다크모드 | 미지원 | 전 페이지 (system/light/dark 3단, localStorage 유지) | Playwright로 토글 동작 확인 |
| 모바일 네비게이션 | 버튼에 핸들러 없음 → 열리지 않음 | 열림 확인 | Playwright 클릭 후 `#mobile-menu` 표시 검증 |
| 보이는 포커스 링 | 없음 (`outline-none` 다수) | 전역 `:focus-visible` 링 | `globals.css` |
| `<html lang>` | `en` | `ko` | `layout.tsx` |
| `rounded-*` 값 종류 | 7종 혼재 (`none`/`md`/`lg`/`xl`/`2xl`/`[28px]`/`full`) | 5종, 토큰 기반 | `grep` 집계 |
| `alert()` 로 띄우던 오류 | 4곳 | 0 (화면 내 `role="alert"` 안내) | `grep` |
| 사용되지 않는 컴포넌트 | `BlogCard.tsx` (import 0회) | 삭제 | `grep` |
| `prefers-reduced-motion` | 미대응 | 대응 | `globals.css` |
| 링크 안 버튼 중첩 | `CommunityCard`에 존재 | 제거 (통계는 표시 전용) | 코드 |
| 라우트 | 11개 | 13개 (`/blog/[id]`, `not-found` 추가) | `next build` 출력 |
| 빌드 / 타입체크 / 린트 | 빌드 시 설정 경고 | `next build` ✅ · `tsc --noEmit` 오류 0 · `eslint` 오류 0 | 실행 로그 |

> 린트 경고 2건(`auth.ts`, `lib/db-mock.ts`의 미사용 변수)은 백엔드 파일에 남아 있는 기존 항목이라 손대지 않았습니다.

### 5.2 정성 평가 — 요청 대비 달성도

| 요청 | 달성 | 근거 |
|---|---|---|
| 더 친숙하게 | ✅ | 한국어 우선 카피, 존댓말 마이크로카피, 둥근 형태(pill 버튼·18px 카드), 빈 상태·로딩·404에 성격 부여, 브랜드를 "LUMIERE"에서 **책상서랍**으로 |
| 펜슬 틱 | ✅ | 연필심 텍스트 색(`#2F2B27`), 손그림 비대칭 테두리, 물결 밑줄, 강조어 손그림 동그라미, 공책 괘선·모눈 배경, 종이 결 노이즈, 스케치 SVG 일러스트 6종, 손글씨 폰트(장식 한정) |
| 실내가 있는 톤 | ✅ | 크림 종이 + 원목 + 스탠드 앰버 + 화분 그린. 히어로에 스탠드 불빛 글로우. 다크모드는 "밤에 스탠드만 켠 방"으로 색온도 유지 |
| 전면 재구축 | ✅ | 토큰 → 프리미티브 → 카드 → 섹션 → 페이지 전량 재작성. 신규 컴포넌트 **12개**, 재작성 **10개**, 삭제 1개, 페이지 11개 전부 + 신규 2개(`/blog/[id]`, `not-found`). API·인증·DB 스키마 무변경 |

### 5.3 검증 방법

프로덕션 빌드를 띄우고 Playwright로 확인했습니다.

- **스크린샷**: 10개 라우트 × 라이트/다크, 주요 3개 라우트 모바일(390px)
- **상호작용**: 모바일 메뉴 열림 ✅, 다크 토글이 `<html>`에 `.dark` 반영 ✅
- **콘솔**: 고유 오류 4종 — 전부 `AUTH_SECRET` 미설정(NextAuth 서버 설정)과 샌드박스 프록시 인증서 문제. 디자인 변경에서 비롯된 오류는 없음
- **손글씨 폰트**: 샌드박스 프록시가 Google Fonts를 차단해 실제 요청이 실패하므로, 폰트 파일을 로컬로 내려받아 요청을 가로채는 방식으로 렌더링을 확인 → 한글 글리프가 Gaegu로 정상 표시됨을 확인

### 5.4 트레이드오프 및 판단 근거

- **손글씨 폰트를 본문에 쓰지 않음** — "펜슬 틱"을 최대치로 밀면 가독성과 신뢰도가 무너집니다. 학원·교재 추천처럼 정보 밀도가 높은 화면에서 특히 그렇습니다. 손글씨는 eyebrow·뱃지·통계 숫자로 한정하고, 연필 감성은 **선·질감·색**으로 표현했습니다. 폰트가 아예 로드되지 않아도 스케치 요소만으로 컨셉이 유지되는지 실제로 확인했습니다(§5.3의 다른 스크린샷들이 그 상태입니다).
- **손글씨 폰트를 `next/font/google` 대신 `<link>`로 로드** — `next/font`에 번들된 폰트 메타데이터에는 **korean 서브셋을 가진 폰트가 하나도 없습니다**(확인: 0개). Gaegu를 `next/font`로 불러오면 latin 청크만 내려받아 정작 한글에는 손글씨가 적용되지 않습니다. Google Fonts CSS는 한글 unicode-range를 포함하므로 직접 링크했습니다. 대가는 외부 요청 1건이며, 실패해도 `--font-hand` 폴백 체인으로 조용히 대체됩니다.
- **본문 폰트는 네트워크에 의존하지 않음** — 시스템에 설치된 Pretendard → Apple SD Gothic Neo / 맑은 고딕 순으로 폴백합니다. 장식은 실패해도 되지만 본문은 아니어야 하기 때문입니다.
- **외부 이미지 대신 스케치 커버** — 기존 커버는 Unsplash 원격 이미지였습니다. 컨셉에 맞지 않고 다크모드에서 톤이 튀며 외부 요청이 필요했습니다. `SketchCover`가 글 id를 seed 삼아 결정적으로 커버를 그리므로 같은 글은 항상 같은 그림을 갖고, 네트워크 요청이 없으며, 다크모드에서 자동으로 맞춰집니다.
- **`next.config.ts`의 `typescript.ignoreBuildErrors`는 유지** — 끄는 것이 옳지만 백엔드 타입 정리까지 필요해 "프론트만" 범위를 벗어납니다. 대신 `tsc --noEmit`이 **오류 0으로 통과**하도록 작성했으니 지금 꺼도 통과합니다. 판단은 남겨둡니다.
- **최소 개입한 프론트 밖 3곳** — (1) `next.config.ts`의 지원 종료된 `eslint` 키 제거(빌드 경고+타입 오류 원인), (2) `nanoid` 데드 import 제거, (3) `lib/types.ts`의 `PostContent`에 `image?: string` 추가(기존 코드가 이미 참조하던 필드인데 타입에 없었음). 모두 검증을 막던 항목입니다.

### 5.5 남은 과제 (이번 범위 밖)

1. `AUTH_SECRET` 미설정 — 세션 API가 500을 반환합니다. 배포 전 환경변수 설정 필요
2. `next.config.ts`의 `typescript.ignoreBuildErrors` 해제 (프론트는 이미 통과, 백엔드 확인만 남음)
3. 공감·댓글 수가 목데이터 고정값 — 실제 API 연동 필요
4. `CommentSection`이 목 데이터 + 로컬 상태 — 영속화 필요
5. `recommend` 페이지의 Google Books 표지 fetch가 클라이언트에서 실행 — 서버 캐싱 권장
6. 히어로의 통계 숫자(1,284 등)는 자리표시 값 — 실데이터 연결 필요
7. 실제 사용자 대상 가독성·선호도 테스트 미실시
