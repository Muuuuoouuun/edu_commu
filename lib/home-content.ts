// Shared mock content for the home redesign drafts (app/drafts).
// Both drafts render the same data so the comparison stays about design.

export type Subject = "수학" | "영어" | "과학";
export type Region = "강남" | "목동" | "분당";
export type ThreadType = "질문" | "후기" | "토론";

export interface NavLink {
    label: string;
    href: string;
}

export interface MagazineArticle {
    id: string;
    category: string;
    title: string;
    excerpt: string;
    author: string;
    readTime: string;
    image: string;
}

export interface CommunityThread {
    id: string;
    type: ThreadType;
    title: string;
    excerpt: string;
    author: string;
    role: string;
    region: Region;
    tags: string[];
    likes: number;
    comments: number;
    time: string;
    answered: boolean;
    bestAnswer?: {
        author: string;
        role: string;
        text: string;
    };
}

export interface Topic {
    name: string;
    description: string;
    count: number;
    headlines: string[];
}

export interface CuratedPick {
    id: string;
    title: string;
    category: string;
    type: string;
    author: string;
    readTime: string;
    image: string;
    summary: string;
}

export interface Academy {
    name: string;
    region: Region;
    district: string;
    subject: Subject;
    description: string;
    rating: number;
    reviews: number;
    mapUrl: string;
}

export interface Book {
    title: string;
    subject: Subject;
    level: string;
    description: string;
    cover: string;
    kyoboUrl: string;
}

export interface LearningApp {
    name: string;
    subject: Subject;
    description: string;
    icon: string;
    link: string;
}

export interface Poll {
    question: string;
    votes: number;
    options: { label: string; percent: number }[];
}

export const NAV_LINKS: NavLink[] = [
    { label: "매거진", href: "/blog" },
    { label: "커뮤니티", href: "/community" },
    { label: "큐레이션", href: "/curated" },
    { label: "학원/교재 추천", href: "/recommend" },
];

export const MAGAZINE_ARTICLES: MagazineArticle[] = [
    {
        id: "m1",
        category: "커버 스토리",
        title: "고교학점제 첫 세대가 말하는, 시험 너머의 진로 설계",
        excerpt: "과목을 직접 고르는 고등학교에서 아이들은 무엇을 기준으로 선택하고 있을까. 세 명의 고1 학생과 한 학기를 함께 기록했습니다.",
        author: "김서연 에디터",
        readTime: "12분",
        image: "/images/generated/drafts/cover-lead.svg",
    },
    {
        id: "m2",
        category: "학습법",
        title: "하루 20분, 메타인지를 키우는 오답 노트 쓰는 법",
        excerpt: "틀린 문제를 옮겨 적는 것으로는 부족합니다. ‘왜 틀렸는지’를 세 줄로 쓰는 습관이 성적을 바꿉니다.",
        author: "이도윤 수학교사",
        readTime: "7분",
        image: "/images/generated/drafts/cover-study.svg",
    },
    {
        id: "m3",
        category: "입시 전략",
        title: "대입 개편 이후, 지금 중학생 부모가 점검할 다섯 가지",
        excerpt: "내신 5등급제와 통합형 수능. 바뀐 규칙 속에서 흔들리지 않는 준비 순서를 정리했습니다.",
        author: "박지훈 입시 컨설턴트",
        readTime: "10분",
        image: "/images/generated/drafts/cover-strategy.svg",
    },
    {
        id: "m4",
        category: "자녀 교육",
        title: "사춘기 아이와 공부 이야기를 나누는 대화법",
        excerpt: "“공부했니?” 대신 건넬 수 있는 질문들. 아동심리 전문가가 제안하는 저녁 식탁의 10분.",
        author: "정하은 상담심리사",
        readTime: "8분",
        image: "/images/generated/drafts/cover-talk.svg",
    },
    {
        id: "m5",
        category: "에듀테크",
        title: "AI 튜터 1년 사용기: 달라진 것과 그대로인 것",
        excerpt: "질문하는 아이는 더 빨라졌고, 질문하지 않는 아이는 그대로였습니다. 한 가족의 1년 기록.",
        author: "최민재 칼럼니스트",
        readTime: "9분",
        image: "/images/generated/drafts/cover-ai.svg",
    },
];

export const MOST_READ: string[] = [
    "겨울방학 8주, 학년별 공부 계획표 예시",
    "학원 상담 갈 때 꼭 물어봐야 할 질문 7가지",
    "중등 수학, 선행보다 먼저 확인할 것",
    "영어 독해가 느린 아이를 위한 문장 끊어 읽기",
    "자기주도학습, 부모가 개입해야 할 때와 아닐 때",
];

export const TOPICS: Topic[] = [
    {
        name: "입시 전략",
        description: "제도 변화와 준비 순서",
        count: 42,
        headlines: ["내신 5등급제, 무엇이 달라지나", "학생부 세특 준비 체크리스트"],
    },
    {
        name: "학습법",
        description: "과목별 루틴과 습관",
        count: 67,
        headlines: ["오답 노트 3줄 법칙", "집중력 25분, 뽀모도로 실험기"],
    },
    {
        name: "자녀 교육",
        description: "관계와 동기, 마음 돌봄",
        count: 38,
        headlines: ["칭찬의 방향을 바꾸는 법", "번아웃 신호를 읽는 법"],
    },
    {
        name: "에듀테크",
        description: "앱·AI·도구 리뷰",
        count: 25,
        headlines: ["AI 튜터, 어디까지 맡길까", "필기 앱 4종 비교"],
    },
];

export const COMMUNITY_THREADS: CommunityThread[] = [
    {
        id: "t1",
        type: "질문",
        title: "중2 겨울방학, 수학 선행과 심화 중 어느 쪽이 맞을까요?",
        excerpt: "현행 성적은 상위권인데 심화 문제에서 자주 막힙니다. 고1 선행을 시작할지, 중2 심화를 더 다질지 고민이에요.",
        author: "새벽달",
        role: "중2 학부모",
        region: "목동",
        tags: ["수학", "선행", "겨울방학"],
        likes: 128,
        comments: 46,
        time: "2시간 전",
        answered: true,
        bestAnswer: {
            author: "이도윤",
            role: "고등 수학 강사 · 멘토 인증",
            text: "심화에서 막히는 지점이 개념 연결인지 계산인지 먼저 구분해 보세요. 연결이 약하다면 선행보다 심화 6주가 고1을 더 편하게 만듭니다.",
        },
    },
    {
        id: "t2",
        type: "후기",
        title: "대치동 소수정예 영어학원 3개월, 솔직한 후기",
        excerpt: "주 2회 첨삭과 단어 테스트가 핵심이었어요. 장점과 아쉬운 점을 표로 정리해 봤습니다.",
        author: "도토리",
        role: "고1 학생",
        region: "강남",
        tags: ["영어", "학원 후기"],
        likes: 94,
        comments: 31,
        time: "5시간 전",
        answered: true,
    },
    {
        id: "t3",
        type: "토론",
        title: "초등 고학년 스마트폰, 몇 학년에 허락하셨나요?",
        excerpt: "반 아이들 대부분이 가지고 있다고 해서 고민 중입니다. 사용 규칙을 어떻게 정하셨는지 궁금해요.",
        author: "봄비",
        role: "초5 학부모",
        region: "분당",
        tags: ["자녀 교육", "생활 습관"],
        likes: 211,
        comments: 87,
        time: "어제",
        answered: true,
    },
    {
        id: "t4",
        type: "질문",
        title: "고1 첫 내신, 국어 문학은 어떻게 준비해야 하나요?",
        excerpt: "중학교 때와 범위가 너무 달라서 막막합니다. 작품 정리를 어디서부터 시작할지 조언 부탁드려요.",
        author: "연필깎이",
        role: "고1 학생",
        region: "목동",
        tags: ["국어", "내신"],
        likes: 37,
        comments: 0,
        time: "40분 전",
        answered: false,
    },
    {
        id: "t5",
        type: "후기",
        title: "말해보카 6개월 꾸준히 써본 결과를 공유합니다",
        excerpt: "매일 15분, 반복 알림을 켜두니 습관이 되더라고요. 모의고사 어휘 파트 변화도 함께 적었어요.",
        author: "꾸준함",
        role: "고2 학생",
        region: "분당",
        tags: ["영어", "앱 후기"],
        likes: 73,
        comments: 19,
        time: "어제",
        answered: true,
    },
    {
        id: "t6",
        type: "질문",
        title: "분당에서 실험 위주로 수업하는 과학학원 아시는 분?",
        excerpt: "중1 아이가 이론보다 직접 해보는 걸 좋아해요. 소규모 실험 수업이 있는 곳을 찾고 있습니다.",
        author: "초록잎",
        role: "중1 학부모",
        region: "분당",
        tags: ["과학", "학원 추천"],
        likes: 22,
        comments: 0,
        time: "1시간 전",
        answered: false,
    },
    {
        id: "t7",
        type: "질문",
        title: "자사고와 일반고, 내신 경쟁 체감은 어떤가요?",
        excerpt: "두 곳 모두 다녀본 선배나 학부모님의 경험담을 듣고 싶어요.",
        author: "한걸음",
        role: "중3 학부모",
        region: "강남",
        tags: ["고교 선택", "내신"],
        likes: 58,
        comments: 0,
        time: "3시간 전",
        answered: false,
    },
];

export const CURATED_PICKS: CuratedPick[] = [
    {
        id: "c1",
        title: "AI 시대 학습 설계: 상위 1%의 공부 루틴",
        category: "Learning Design",
        type: "Article",
        author: "LUMIERE Editorial",
        readTime: "8분",
        image: "/images/generated/curated/ai-learning.svg",
        summary: "성과를 만드는 학습 루틴을 구조화하는 방법을 실제 사례 중심으로 정리했습니다.",
    },
    {
        id: "c2",
        title: "입시 전략의 본질: 데이터로 보는 선택과 집중",
        category: "Strategy",
        type: "Insight",
        author: "Dr. Sarah Kim",
        readTime: "10분",
        image: "/images/generated/curated/strategy-data.svg",
        summary: "목표 대학과 학과별 전략을 데이터 기반으로 설계하는 프레임워크를 제안합니다.",
    },
    {
        id: "c3",
        title: "몰입을 만드는 공간: 집에서 구현하는 스터디존",
        category: "Lifestyle",
        type: "Guide",
        author: "Lumiere Design Lab",
        readTime: "7분",
        image: "/images/generated/curated/study-zone.svg",
        summary: "작은 공간에서도 집중력을 끌어올리는 조명, 컬러, 동선 설계 팁을 담았습니다.",
    },
];

export const REGIONS: Region[] = ["강남", "목동", "분당"];
export const SUBJECTS: Subject[] = ["수학", "영어", "과학"];

const mapSearch = (keyword: string) => `https://map.naver.com/v5/search/${encodeURIComponent(keyword)}`;

export const ACADEMIES: Academy[] = [
    { name: "대치 미래수학", region: "강남", district: "강남구 대치동", subject: "수학", description: "내신·수능 상위권 대비 소수정예 수업", rating: 4.8, reviews: 126, mapUrl: mapSearch("대치동 수학학원") },
    { name: "대치 리드잉글리시", region: "강남", district: "강남구 대치동", subject: "영어", description: "원서 독해와 주 2회 에세이 첨삭", rating: 4.6, reviews: 88, mapUrl: mapSearch("대치동 영어학원") },
    { name: "도곡 사이언스랩", region: "강남", district: "강남구 도곡동", subject: "과학", description: "물리·화학 개념 클리닉과 실전 문제풀이", rating: 4.5, reviews: 54, mapUrl: mapSearch("도곡동 과학학원") },
    { name: "목동 수학의정석", region: "목동", district: "양천구 목동", subject: "수학", description: "학교별 내신 기출 분석 기반 관리", rating: 4.7, reviews: 102, mapUrl: mapSearch("목동 수학학원") },
    { name: "목동 리딩마스터", region: "목동", district: "양천구 목동", subject: "영어", description: "중고등 독해 루틴과 주간 첨삭 관리", rating: 4.8, reviews: 143, mapUrl: mapSearch("목동 영어학원") },
    { name: "목동 탐구공방", region: "목동", district: "양천구 신정동", subject: "과학", description: "중등 과학 실험과 서술형 대비 병행", rating: 4.4, reviews: 37, mapUrl: mapSearch("목동 과학학원") },
    { name: "분당 정자수학", region: "분당", district: "성남시 분당구 정자동", subject: "수학", description: "개념 이해 중심, 오답 클리닉 운영", rating: 4.6, reviews: 71, mapUrl: mapSearch("정자동 수학학원") },
    { name: "분당 스피크업", region: "분당", district: "성남시 분당구 서현동", subject: "영어", description: "말하기·듣기 중심 소그룹 수업", rating: 4.5, reviews: 49, mapUrl: mapSearch("서현동 영어학원") },
    { name: "분당 과탐랩", region: "분당", district: "성남시 분당구", subject: "과학", description: "실험 수업과 과탐 실전 문제풀이 병행", rating: 4.7, reviews: 66, mapUrl: mapSearch("분당 과학학원") },
];

export const BOOKS: Book[] = [
    {
        title: "숨마쿰라우데 수학 기본서",
        subject: "수학",
        level: "중3~고1",
        description: "개념 정리와 유형 학습을 함께 하는 기본 개념서",
        cover: "/images/covers/math-book.svg",
        kyoboUrl: "https://search.kyobobook.co.kr/search?keyword=숨마쿰라우데%20수학",
    },
    {
        title: "자이스토리 영어 독해",
        subject: "영어",
        level: "고1~고3",
        description: "기출 기반 독해 훈련으로 실전 감각을 키우는 교재",
        cover: "/images/covers/english-book.svg",
        kyoboUrl: "https://search.kyobobook.co.kr/search?keyword=자이스토리%20영어%20독해",
    },
    {
        title: "완자 과학탐구",
        subject: "과학",
        level: "고1~고2",
        description: "개념과 문제를 통합해 학교 시험 대비에 적합",
        cover: "/images/covers/science-book.svg",
        kyoboUrl: "https://search.kyobobook.co.kr/search?keyword=완자%20과학탐구",
    },
];

export const LEARNING_APPS: LearningApp[] = [
    { name: "콴다", subject: "수학", description: "문제 풀이 검색과 개념 학습", icon: "/images/generated/apps/qanda.svg", link: "https://qanda.ai/ko" },
    { name: "말해보카", subject: "영어", description: "반복 기반 단어 암기 루틴", icon: "/images/generated/apps/voca.svg", link: "https://malhaeboca.com/" },
    { name: "클래스101", subject: "과학", description: "실험·탐구형 온라인 클래스", icon: "/images/generated/apps/class101.svg", link: "https://class101.net/" },
];

export const WEEKLY_POLL: Poll = {
    question: "겨울방학 특강, 어떻게 준비하고 계세요?",
    votes: 2184,
    options: [
        { label: "학원 특강 등록", percent: 46 },
        { label: "인강 + 자기주도", percent: 31 },
        { label: "아직 고민 중", percent: 23 },
    ],
};

export const POPULAR_KEYWORDS = ["겨울방학 특강", "중등 수학 선행", "고1 첫 내신", "영어 독해", "학원 상담 질문"];
