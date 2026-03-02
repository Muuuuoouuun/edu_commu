"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { ExternalLink, BookOpenText, MapPin, Search, Sparkles, Megaphone, Smartphone } from "lucide-react";

type Interest = "수학" | "영어" | "과학";
type Region = "전체" | "강남" | "목동" | "분당";

type Academy = {
    name: string;
    district: string;
    focus: Interest;
    description: string;
    naverMapUrl: string;
    regionTag: Exclude<Region, "전체">;
};

type Book = {
    title: string;
    level: string;
    subject: Interest;
    description: string;
    fallbackCoverImageUrl: string;
    kyoboUrl: string;
    yes24Url: string;
};

type AppService = {
    name: string;
    category: "앱" | "서비스";
    focus: Interest;
    targetRegions: Region[];
    description: string;
    link: string;
    icon: string;
};

type AdItem = {
    id: string;
    title: string;
    description: string;
    cta: string;
    link: string;
    targetRegions: Region[];
    targetInterests: Interest[];
};

const ACADEMY_RECOMMENDATIONS: Academy[] = [
    {
        name: "대치 미래수학",
        district: "강남구 대치동",
        focus: "수학",
        description: "내신/수능 상위권 대비 중심의 소수정예 수업 운영",
        naverMapUrl: "https://map.naver.com/v5/search/대치동%20수학학원",
        regionTag: "강남"
    },
    {
        name: "목동 리딩마스터",
        district: "양천구 목동",
        focus: "영어",
        description: "중고등 영어 독해 루틴과 주간 첨삭 기반 관리",
        naverMapUrl: "https://map.naver.com/v5/search/목동%20영어학원",
        regionTag: "목동"
    },
    {
        name: "분당 과탐랩",
        district: "성남시 분당구",
        focus: "과학",
        description: "물리/화학 실전 문제풀이와 개념 클리닉 병행",
        naverMapUrl: "https://map.naver.com/v5/search/분당%20과탐학원",
        regionTag: "분당"
    }
];

const BOOK_RECOMMENDATIONS: Book[] = [
    {
        title: "숨마쿰라우데 수학 기본서",
        level: "중3~고1",
        subject: "수학",
        description: "개념 정리와 유형 학습을 함께 할 수 있는 기본 개념서",
        fallbackCoverImageUrl: "/images/covers/math-book.svg",
        kyoboUrl: "https://search.kyobobook.co.kr/search?keyword=숨마쿰라우데%20수학",
        yes24Url: "https://www.yes24.com/Product/Search?query=숨마쿰라우데%20수학"
    },
    {
        title: "자이스토리 영어 독해",
        level: "고1~고3",
        subject: "영어",
        description: "기출 기반 독해 훈련으로 실전 감각을 키우는 교재",
        fallbackCoverImageUrl: "/images/covers/english-book.svg",
        kyoboUrl: "https://search.kyobobook.co.kr/search?keyword=자이스토리%20영어%20독해",
        yes24Url: "https://www.yes24.com/Product/Search?query=자이스토리%20영어%20독해"
    },
    {
        title: "완자 과학탐구",
        level: "고1~고2",
        subject: "과학",
        description: "개념+문제 통합 학습으로 학교 시험 대비에 적합",
        fallbackCoverImageUrl: "/images/covers/science-book.svg",
        kyoboUrl: "https://search.kyobobook.co.kr/search?keyword=완자%20과학탐구",
        yes24Url: "https://www.yes24.com/Product/Search?query=완자%20과학탐구"
    }
];

const APP_SERVICE_RECOMMENDATIONS: AppService[] = [
    {
        name: "콴다",
        category: "앱",
        focus: "수학",
        targetRegions: ["전체", "강남", "분당"],
        description: "수학 문제 풀이 검색과 개념 학습에 강점이 있는 학습 앱",
        link: "https://qanda.ai/ko",
        icon: "/images/generated/apps/qanda.svg"
    },
    {
        name: "말해보카",
        category: "앱",
        focus: "영어",
        targetRegions: ["전체", "목동", "강남"],
        description: "반복 기반 단어 암기와 복습 루틴 설정에 최적화된 영어 앱",
        link: "https://malhaeboca.com/",
        icon: "/images/generated/apps/voca.svg"
    },
    {
        name: "클래스101 키즈/학습",
        category: "서비스",
        focus: "과학",
        targetRegions: ["전체", "분당", "강남"],
        description: "실험/탐구형 콘텐츠를 활용해 과학적 사고를 키우는 온라인 클래스 서비스",
        link: "https://class101.net/",
        icon: "/images/generated/apps/class101.svg"
    }
];

const AD_POOL: AdItem[] = [
    {
        id: "ad-1",
        title: "강남권 프리미엄 1:1 컨설팅",
        description: "수학·과학 성적 향상을 위한 맞춤 학습 로드맵 제공",
        cta: "상담 신청",
        link: "https://map.naver.com/v5/search/강남%20입시컨설팅",
        targetRegions: ["강남"],
        targetInterests: ["수학", "과학"]
    },
    {
        id: "ad-2",
        title: "영어 독해 집중 부트캠프",
        description: "목동권 학생 대상 주간 첨삭 + 실전 리딩 루틴",
        cta: "프로그램 보기",
        link: "https://map.naver.com/v5/search/목동%20영어%20부트캠프",
        targetRegions: ["목동"],
        targetInterests: ["영어"]
    },
    {
        id: "ad-3",
        title: "분당 과탐 실전 특강",
        description: "과탐 선택과목별 실전 문제풀이 특화 과정",
        cta: "특강 확인",
        link: "https://map.naver.com/v5/search/분당%20과탐%20특강",
        targetRegions: ["분당"],
        targetInterests: ["과학"]
    }
];

const REGIONS: Region[] = ["전체", "강남", "목동", "분당"];
const INTERESTS: Interest[] = ["수학", "영어", "과학"];

export default function RecommendPage() {
    const [query, setQuery] = useState("");
    const [selectedRegion, setSelectedRegion] = useState<Region>("전체");
    const [selectedInterest, setSelectedInterest] = useState<Interest>("수학");
    const [bookCoverMap, setBookCoverMap] = useState<Record<string, string>>({});

    useEffect(() => {
        let isMounted = true;

        const fetchCovers = async () => {
            const entries = await Promise.all(
                BOOK_RECOMMENDATIONS.map(async (book) => {
                    try {
                        const response = await fetch(
                            `https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(book.title)}&langRestrict=ko&maxResults=1`
                        );
                        if (!response.ok) return [book.title, book.fallbackCoverImageUrl] as const;

                        const data = await response.json();
                        const fetched = data?.items?.[0]?.volumeInfo?.imageLinks?.thumbnail as string | undefined;
                        return [book.title, fetched ? fetched.replace("http://", "https://") : book.fallbackCoverImageUrl] as const;
                    } catch {
                        return [book.title, book.fallbackCoverImageUrl] as const;
                    }
                })
            );

            if (isMounted) setBookCoverMap(Object.fromEntries(entries));
        };

        fetchCovers();
        return () => {
            isMounted = false;
        };
    }, []);

    const academyRecommendations = useMemo(() => {
        return ACADEMY_RECOMMENDATIONS
            .map((academy) => {
                let score = 0;
                if (academy.focus === selectedInterest) score += 60;
                if (selectedRegion === "전체" || academy.regionTag === selectedRegion) score += 40;
                if (query && [academy.name, academy.district, academy.description].join(" ").toLowerCase().includes(query.toLowerCase())) score += 20;
                return { academy, score };
            })
            .filter(({ score }) => score > 0)
            .sort((a, b) => b.score - a.score)
            .map(({ academy }) => academy);
    }, [selectedInterest, selectedRegion, query]);

    const bookRecommendations = useMemo(() => {
        return BOOK_RECOMMENDATIONS
            .map((book) => {
                let score = 0;
                if (book.subject === selectedInterest) score += 70;
                if (query && [book.title, book.description].join(" ").toLowerCase().includes(query.toLowerCase())) score += 30;
                return { book, score };
            })
            .filter(({ score }) => score > 0)
            .sort((a, b) => b.score - a.score)
            .map(({ book }) => book);
    }, [selectedInterest, query]);

    const appServiceRecommendations = useMemo(() => {
        return APP_SERVICE_RECOMMENDATIONS
            .map((item) => {
                let score = 0;
                if (item.focus === selectedInterest) score += 65;
                if (item.targetRegions.includes(selectedRegion) || selectedRegion === "전체") score += 35;
                if (query && [item.name, item.description].join(" ").toLowerCase().includes(query.toLowerCase())) score += 20;
                return { item, score };
            })
            .filter(({ score }) => score > 0)
            .sort((a, b) => b.score - a.score)
            .map(({ item }) => item);
    }, [selectedInterest, selectedRegion, query]);

    const selectedAd = useMemo(() => {
        const scored = AD_POOL.map((ad) => {
            let score = 0;
            if (ad.targetInterests.includes(selectedInterest)) score += 65;
            if (selectedRegion === "전체" || ad.targetRegions.includes(selectedRegion)) score += 35;
            return { ad, score };
        }).sort((a, b) => b.score - a.score);

        return scored[0]?.ad;
    }, [selectedInterest, selectedRegion]);

    return (
        <div className="min-h-screen bg-background text-foreground">
            <section className="content-container py-14 md:py-20">
                <div className="relative overflow-hidden rounded-[28px] border border-border/70 bg-gradient-to-br from-white/70 via-white/40 to-transparent p-6 md:p-10 mb-8">
                    <div className="absolute -top-10 -right-10 w-44 h-44 rounded-full bg-accent-gold/15 blur-2xl" />
                    <div className="absolute -bottom-10 -left-10 w-44 h-44 rounded-full bg-foreground/10 blur-2xl" />

                    <div className="relative">
                        <h1 className="text-3xl md:text-5xl font-bold mb-4">학원/교재 추천 & 검색</h1>
                        <p className="text-muted mb-6 md:text-lg max-w-3xl">
                            지역 + 관심사 + 검색어 기반으로 학원, 교재, 앱/서비스를 우선 추천합니다. 시각 요소를 강화해 한 화면에서 비교하기 쉽게 구성했습니다.
                        </p>

                        <div className="grid grid-cols-3 gap-3 max-w-lg text-center">
                            <div className="surface-card py-3 px-2">
                                <p className="text-xs text-muted">학원</p>
                                <p className="text-lg font-bold">{academyRecommendations.length}</p>
                            </div>
                            <div className="surface-card py-3 px-2">
                                <p className="text-xs text-muted">교재</p>
                                <p className="text-lg font-bold">{bookRecommendations.length}</p>
                            </div>
                            <div className="surface-card py-3 px-2">
                                <p className="text-xs text-muted">앱/서비스</p>
                                <p className="text-lg font-bold">{appServiceRecommendations.length}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-3 mb-4">
                    <select
                        value={selectedRegion}
                        onChange={(event) => setSelectedRegion(event.target.value as Region)}
                        className="border border-border rounded-xl px-4 py-3 bg-white/50 backdrop-blur-sm"
                    >
                        {REGIONS.map((region) => (
                            <option key={region} value={region}>{region} 지역</option>
                        ))}
                    </select>

                    <select
                        value={selectedInterest}
                        onChange={(event) => setSelectedInterest(event.target.value as Interest)}
                        className="border border-border rounded-xl px-4 py-3 bg-white/50 backdrop-blur-sm"
                    >
                        {INTERESTS.map((interest) => (
                            <option key={interest} value={interest}>{interest} 관심</option>
                        ))}
                    </select>

                    <label className="flex items-center gap-3 border border-border rounded-xl px-4 py-3 bg-white/50 backdrop-blur-sm">
                        <Search className="w-5 h-5 text-muted" />
                        <input
                            value={query}
                            onChange={(event) => setQuery(event.target.value)}
                            placeholder="키워드 검색"
                            className="w-full bg-transparent outline-none text-sm md:text-base"
                        />
                    </label>
                </div>

                {selectedAd && (
                    <article className="surface-card p-5 border-accent-gold/40">
                        <div className="flex items-center gap-2 text-accent-gold text-sm font-semibold mb-2">
                            <Megaphone className="w-4 h-4" /> 맞춤 광고 추천
                        </div>
                        <h3 className="text-lg font-bold mb-1">{selectedAd.title}</h3>
                        <p className="text-sm text-muted mb-3">{selectedAd.description}</p>
                        <a href={selectedAd.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm font-semibold hover:text-accent-gold">
                            {selectedAd.cta} <ExternalLink className="w-4 h-4" />
                        </a>
                    </article>
                )}
            </section>

            <section className="content-container pb-10 md:pb-14">
                <div className="flex items-center gap-2 mb-5">
                    <MapPin className="w-5 h-5 text-accent-gold" />
                    <h2 className="section-title">지역/관심사 기반 학원 추천</h2>
                </div>
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {academyRecommendations.map((academy) => (
                        <article key={academy.name} className="surface-card p-5">
                            <p className="text-xs uppercase tracking-widest text-accent-gold mb-2">{academy.focus} · {academy.regionTag}</p>
                            <h3 className="text-xl font-bold mb-1">{academy.name}</h3>
                            <p className="text-sm text-muted mb-2">{academy.district}</p>
                            <p className="text-sm text-muted mb-4">{academy.description}</p>
                            <a href={academy.naverMapUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm font-semibold hover:text-accent-gold transition-colors">
                                네이버 지도에서 보기 <ExternalLink className="w-4 h-4" />
                            </a>
                        </article>
                    ))}
                </div>
            </section>

            <section className="content-container pb-12 md:pb-16">
                <div className="flex items-center gap-2 mb-5">
                    <BookOpenText className="w-5 h-5 text-accent-gold" />
                    <h2 className="section-title">관심사 기반 교재 추천</h2>
                    <Sparkles className="w-4 h-4 text-accent-gold" />
                </div>
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {bookRecommendations.map((book) => {
                        const coverSrc = bookCoverMap[book.title] ?? book.fallbackCoverImageUrl;
                        const isRemote = coverSrc.startsWith("http");

                        return (
                            <article key={book.title} className="surface-card p-5">
                                <div className="flex items-start gap-4">
                                    {isRemote ? (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img
                                            src={coverSrc}
                                            alt={`${book.title} 표지`}
                                            className="h-20 w-14 rounded-md border border-border object-cover shrink-0 bg-white/70"
                                            loading="lazy"
                                        />
                                    ) : (
                                        <Image
                                            src={coverSrc}
                                            alt={`${book.title} 표지`}
                                            width={56}
                                            height={80}
                                            className="h-20 w-14 rounded-md border border-border object-cover shrink-0 bg-white/70"
                                        />
                                    )}
                                    <div className="min-w-0">
                                        <p className="text-xs uppercase tracking-widest text-accent-gold mb-2">{book.subject}</p>
                                        <h3 className="text-lg font-bold leading-snug mb-1">{book.title}</h3>
                                        <p className="text-sm text-muted mb-2">권장 학년: {book.level}</p>
                                    </div>
                                </div>

                                <p className="text-sm text-muted mt-3 mb-4">{book.description}</p>
                                <div className="flex items-center gap-4 text-sm font-semibold">
                                    <a href={book.kyoboUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-accent-gold transition-colors">
                                        교보문고 <ExternalLink className="w-4 h-4" />
                                    </a>
                                    <a href={book.yes24Url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-accent-gold transition-colors">
                                        YES24 <ExternalLink className="w-4 h-4" />
                                    </a>
                                </div>
                            </article>
                        );
                    })}
                </div>
            </section>

            <section className="content-container pb-16 md:pb-24">
                <div className="flex items-center gap-2 mb-5">
                    <Smartphone className="w-5 h-5 text-accent-gold" />
                    <h2 className="section-title">학습 앱/서비스 추천</h2>
                </div>
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {appServiceRecommendations.map((item) => (
                        <article key={item.name} className="surface-card p-5">
                            <div className="flex items-start gap-3 mb-3">
                                <Image src={item.icon} alt={`${item.name} 아이콘`} width={40} height={40} className="rounded-xl border border-border bg-white/80" />
                                <div>
                                    <p className="text-xs uppercase tracking-widest text-accent-gold mb-1">{item.category} · {item.focus}</p>
                                    <h3 className="text-lg font-bold">{item.name}</h3>
                                </div>
                            </div>
                            <p className="text-sm text-muted mb-4">{item.description}</p>
                            <a
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-sm font-semibold hover:text-accent-gold transition-colors"
                            >
                                서비스 바로가기 <ExternalLink className="w-4 h-4" />
                            </a>
                        </article>
                    ))}
                </div>
            </section>
        </div>
    );
}
