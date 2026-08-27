/**
 * 학원·교재 추천 데이터.
 * 서버(표지 미리 가져오기)와 클라이언트(필터 UI)가 함께 쓰므로 별도 모듈로 둔다.
 */

export type Interest = "수학" | "영어" | "과학";
export type Region = "전체" | "강남" | "목동" | "분당";

export type Academy = {
    name: string;
    district: string;
    focus: Interest;
    description: string;
    naverMapUrl: string;
    regionTag: Exclude<Region, "전체">;
};

export type Book = {
    title: string;
    level: string;
    subject: Interest;
    description: string;
    fallbackCoverImageUrl: string;
    kyoboUrl: string;
    yes24Url: string;
};

export type AppService = {
    name: string;
    category: "앱" | "서비스";
    focus: Interest;
    targetRegions: Region[];
    description: string;
    link: string;
    icon: string;
};

export type AdItem = {
    id: string;
    title: string;
    description: string;
    cta: string;
    link: string;
    targetRegions: Region[];
    targetInterests: Interest[];
};

export const ACADEMIES: Academy[] = [
    {
        name: "대치 미래수학",
        district: "강남구 대치동",
        focus: "수학",
        description: "내신·수능 상위권 대비 중심의 소수정예 수업",
        naverMapUrl: "https://map.naver.com/v5/search/대치동%20수학학원",
        regionTag: "강남",
    },
    {
        name: "목동 리딩마스터",
        district: "양천구 목동",
        focus: "영어",
        description: "중고등 영어 독해 루틴과 주간 첨삭 기반 관리",
        naverMapUrl: "https://map.naver.com/v5/search/목동%20영어학원",
        regionTag: "목동",
    },
    {
        name: "분당 과탐랩",
        district: "성남시 분당구",
        focus: "과학",
        description: "물리·화학 실전 문제풀이와 개념 클리닉 병행",
        naverMapUrl: "https://map.naver.com/v5/search/분당%20과탐학원",
        regionTag: "분당",
    },
];

export const BOOKS: Book[] = [
    {
        title: "숨마쿰라우데 수학 기본서",
        level: "중3~고1",
        subject: "수학",
        description: "개념 정리와 유형 학습을 함께 할 수 있는 기본 개념서",
        fallbackCoverImageUrl: "/images/covers/math-book.svg",
        kyoboUrl: "https://search.kyobobook.co.kr/search?keyword=숨마쿰라우데%20수학",
        yes24Url: "https://www.yes24.com/Product/Search?query=숨마쿰라우데%20수학",
    },
    {
        title: "자이스토리 영어 독해",
        level: "고1~고3",
        subject: "영어",
        description: "기출 기반 독해 훈련으로 실전 감각을 키우는 교재",
        fallbackCoverImageUrl: "/images/covers/english-book.svg",
        kyoboUrl:
            "https://search.kyobobook.co.kr/search?keyword=자이스토리%20영어%20독해",
        yes24Url: "https://www.yes24.com/Product/Search?query=자이스토리%20영어%20독해",
    },
    {
        title: "완자 과학탐구",
        level: "고1~고2",
        subject: "과학",
        description: "개념과 문제를 통합해 학교 시험 대비에 적합한 교재",
        fallbackCoverImageUrl: "/images/covers/science-book.svg",
        kyoboUrl: "https://search.kyobobook.co.kr/search?keyword=완자%20과학탐구",
        yes24Url: "https://www.yes24.com/Product/Search?query=완자%20과학탐구",
    },
];

export const APP_SERVICES: AppService[] = [
    {
        name: "콴다",
        category: "앱",
        focus: "수학",
        targetRegions: ["전체", "강남", "분당"],
        description: "수학 문제 풀이 검색과 개념 학습에 강점이 있는 학습 앱",
        link: "https://qanda.ai/ko",
        icon: "/images/generated/apps/qanda.svg",
    },
    {
        name: "말해보카",
        category: "앱",
        focus: "영어",
        targetRegions: ["전체", "목동", "강남"],
        description: "반복 암기와 복습 루틴 설정에 최적화된 영어 단어 앱",
        link: "https://malhaeboca.com/",
        icon: "/images/generated/apps/voca.svg",
    },
    {
        name: "클래스101 학습",
        category: "서비스",
        focus: "과학",
        targetRegions: ["전체", "분당", "강남"],
        description: "실험·탐구형 콘텐츠로 과학적 사고를 키우는 온라인 클래스",
        link: "https://class101.net/",
        icon: "/images/generated/apps/class101.svg",
    },
];

export const ADS: AdItem[] = [
    {
        id: "ad-1",
        title: "강남권 1:1 학습 컨설팅",
        description: "수학·과학 성적 향상을 위한 맞춤 학습 로드맵을 제공합니다.",
        cta: "상담 신청하기",
        link: "https://map.naver.com/v5/search/강남%20입시컨설팅",
        targetRegions: ["강남"],
        targetInterests: ["수학", "과학"],
    },
    {
        id: "ad-2",
        title: "영어 독해 집중 부트캠프",
        description: "목동권 학생 대상 주간 첨삭과 실전 리딩 루틴 과정입니다.",
        cta: "프로그램 보기",
        link: "https://map.naver.com/v5/search/목동%20영어%20부트캠프",
        targetRegions: ["목동"],
        targetInterests: ["영어"],
    },
    {
        id: "ad-3",
        title: "분당 과탐 실전 특강",
        description: "과탐 선택과목별 실전 문제풀이에 특화된 과정입니다.",
        cta: "특강 확인하기",
        link: "https://map.naver.com/v5/search/분당%20과탐%20특강",
        targetRegions: ["분당"],
        targetInterests: ["과학"],
    },
];

export const REGIONS: Region[] = ["전체", "강남", "목동", "분당"];
export const INTERESTS: Interest[] = ["수학", "영어", "과학"];

/**
 * 교재 표지를 Google Books에서 가져온다.
 * 서버에서만 호출하고 하루 단위로 캐싱하므로, 방문자마다 브라우저에서
 * 외부 API를 때리던 기존 방식과 달리 요청이 한 번으로 줄어든다.
 * 실패하면 저장소에 있는 대체 표지를 쓴다.
 */
export async function getBookCovers(): Promise<Record<string, string>> {
    const entries = await Promise.all(
        BOOKS.map(async (book) => {
            try {
                const res = await fetch(
                    `https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(
                        book.title
                    )}&langRestrict=ko&maxResults=1`,
                    { next: { revalidate: 86400 } }
                );
                if (!res.ok) return [book.title, book.fallbackCoverImageUrl] as const;

                const data = await res.json();
                const found = data?.items?.[0]?.volumeInfo?.imageLinks?.thumbnail as
                    | string
                    | undefined;
                return [
                    book.title,
                    found ? found.replace("http://", "https://") : book.fallbackCoverImageUrl,
                ] as const;
            } catch {
                return [book.title, book.fallbackCoverImageUrl] as const;
            }
        })
    );

    return Object.fromEntries(entries);
}
