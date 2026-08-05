"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import {
    BookOpenText,
    ExternalLink,
    MapPin,
    Search,
    Smartphone,
} from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { AdSlot } from "@/components/ui/AdSlot";
import { Doodle } from "@/components/ui/Sketch";
import { cn } from "@/lib/utils";

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

const ACADEMIES: Academy[] = [
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

const BOOKS: Book[] = [
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

const APP_SERVICES: AppService[] = [
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

const ADS: AdItem[] = [
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

const REGIONS: Region[] = ["전체", "강남", "목동", "분당"];
const INTERESTS: Interest[] = ["수학", "영어", "과학"];

/** 선택된 조건과 얼마나 맞는지 점수를 매겨 정렬 */
function matches(text: string, query: string) {
    return query
        ? text.toLowerCase().includes(query.toLowerCase().trim())
        : false;
}

function ChipGroup<T extends string>({
    label,
    options,
    value,
    onChange,
}: {
    label: string;
    options: readonly T[];
    value: T;
    onChange: (next: T) => void;
}) {
    return (
        <div>
            <p className="hand-label mb-2.5">{label}</p>
            <div role="group" aria-label={label} className="flex flex-wrap gap-2">
                {options.map((option) => {
                    const active = option === value;
                    return (
                        <button
                            key={option}
                            type="button"
                            aria-pressed={active}
                            onClick={() => onChange(option)}
                            className={cn(
                                "rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors",
                                active
                                    ? "border-lamp bg-lamp-wash text-lamp-ink"
                                    : "border-rule bg-paper-raised text-graphite-soft hover:border-rule-strong hover:text-graphite"
                            )}
                        >
                            {option}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

function SectionTitle({
    icon: Icon,
    title,
    count,
}: {
    icon: typeof MapPin;
    title: string;
    count: number;
}) {
    return (
        <div className="mb-5 flex items-center gap-2.5">
            <Icon className="h-5 w-5 text-lamp" aria-hidden="true" />
            <h2 className="text-xl">{title}</h2>
            <Badge tone="neutral" hand>
                {count}건
            </Badge>
        </div>
    );
}

export default function RecommendPage() {
    const [query, setQuery] = useState("");
    const [region, setRegion] = useState<Region>("전체");
    const [interest, setInterest] = useState<Interest>("수학");
    const [coverMap, setCoverMap] = useState<Record<string, string>>({});

    useEffect(() => {
        let mounted = true;

        (async () => {
            const entries = await Promise.all(
                BOOKS.map(async (book) => {
                    try {
                        const response = await fetch(
                            `https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(
                                book.title
                            )}&langRestrict=ko&maxResults=1`
                        );
                        if (!response.ok) {
                            return [book.title, book.fallbackCoverImageUrl] as const;
                        }
                        const data = await response.json();
                        const fetched = data?.items?.[0]?.volumeInfo?.imageLinks
                            ?.thumbnail as string | undefined;
                        return [
                            book.title,
                            fetched
                                ? fetched.replace("http://", "https://")
                                : book.fallbackCoverImageUrl,
                        ] as const;
                    } catch {
                        return [book.title, book.fallbackCoverImageUrl] as const;
                    }
                })
            );

            if (mounted) setCoverMap(Object.fromEntries(entries));
        })();

        return () => {
            mounted = false;
        };
    }, []);

    const academies = useMemo(
        () =>
            ACADEMIES.map((academy) => {
                let score = 0;
                if (academy.focus === interest) score += 60;
                if (region === "전체" || academy.regionTag === region) score += 40;
                if (
                    matches(
                        [academy.name, academy.district, academy.description].join(" "),
                        query
                    )
                )
                    score += 20;
                return { academy, score };
            })
                .filter((entry) => entry.score > 0)
                .sort((a, b) => b.score - a.score)
                .map((entry) => entry.academy),
        [interest, region, query]
    );

    const books = useMemo(
        () =>
            BOOKS.map((book) => {
                let score = 0;
                if (book.subject === interest) score += 70;
                if (matches([book.title, book.description].join(" "), query)) score += 30;
                return { book, score };
            })
                .filter((entry) => entry.score > 0)
                .sort((a, b) => b.score - a.score)
                .map((entry) => entry.book),
        [interest, query]
    );

    const apps = useMemo(
        () =>
            APP_SERVICES.map((item) => {
                let score = 0;
                if (item.focus === interest) score += 65;
                if (region === "전체" || item.targetRegions.includes(region)) score += 35;
                if (matches([item.name, item.description].join(" "), query)) score += 20;
                return { item, score };
            })
                .filter((entry) => entry.score > 0)
                .sort((a, b) => b.score - a.score)
                .map((entry) => entry.item),
        [interest, region, query]
    );

    const ad = useMemo(
        () =>
            ADS.map((item) => {
                let score = 0;
                if (item.targetInterests.includes(interest)) score += 65;
                if (region === "전체" || item.targetRegions.includes(region)) score += 35;
                return { item, score };
            }).sort((a, b) => b.score - a.score)[0]?.item,
        [interest, region]
    );

    const totalCount = academies.length + books.length + apps.length;

    return (
        <>
            <PageHeader
                eyebrow="발품 대신 여기서 먼저"
                title="학원·교재 추천"
                description="지역과 관심 과목을 고르면 학원, 교재, 학습 앱을 함께 추려서 보여드립니다. 후기는 커뮤니티에서 확인해 보세요."
                doodle="book"
            />

            <div className="container-page py-12">
                {/* 조건 고르기 */}
                <div className="paper-card p-6 sm:p-7">
                    <div className="grid gap-6 sm:grid-cols-2">
                        <ChipGroup
                            label="어느 지역인가요?"
                            options={REGIONS}
                            value={region}
                            onChange={setRegion}
                        />
                        <ChipGroup
                            label="어떤 과목인가요?"
                            options={INTERESTS}
                            value={interest}
                            onChange={setInterest}
                        />
                    </div>

                    <div className="mt-6">
                        <label htmlFor="recommend-search" className="hand-label mb-2.5 block">
                            찾는 이름이 있다면
                        </label>
                        <div className="flex items-center gap-3 rounded-[14px] border border-rule bg-paper-sunken px-4 py-3 focus-within:border-lamp">
                            <Search
                                className="h-4 w-4 shrink-0 text-graphite-faint"
                                aria-hidden="true"
                            />
                            <input
                                id="recommend-search"
                                value={query}
                                onChange={(event) => setQuery(event.target.value)}
                                placeholder="학원 이름, 교재 이름, 지역 등"
                                className="w-full bg-transparent text-sm outline-none"
                            />
                        </div>
                    </div>

                    <p className="mt-5 border-t border-rule pt-4 text-sm text-graphite-soft">
                        <span className="font-semibold text-graphite">{region}</span> 지역의{" "}
                        <span className="font-semibold text-graphite">{interest}</span> 관련
                        추천 <span className="font-semibold text-lamp-ink">{totalCount}</span>건
                    </p>
                </div>

                {ad && (
                    <AdSlot
                        className="mt-6"
                        doodle="lamp"
                        title={ad.title}
                        description={ad.description}
                        cta={ad.cta}
                        href={ad.link}
                        sponsor="책상서랍 파트너"
                    />
                )}

                {totalCount === 0 && (
                    <EmptyState
                        className="mt-10"
                        doodle="pencil"
                        title="조건에 맞는 추천이 없어요"
                        description="검색어를 지우거나 지역을 '전체'로 바꿔보시면 결과가 나올 거예요."
                    />
                )}

                {/* 학원 */}
                {academies.length > 0 && (
                    <section className="mt-14">
                        <SectionTitle
                            icon={MapPin}
                            title="가까운 학원"
                            count={academies.length}
                        />
                        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                            {academies.map((academy) => (
                                <article
                                    key={academy.name}
                                    className="paper-card paper-card-hover flex flex-col p-5"
                                >
                                    <div className="flex items-center gap-2">
                                        <Badge tone="lamp">{academy.focus}</Badge>
                                        <Badge tone="neutral">{academy.regionTag}</Badge>
                                    </div>
                                    <h3 className="mt-3.5 text-lg">{academy.name}</h3>
                                    <p className="mt-1 text-xs text-graphite-faint">
                                        {academy.district}
                                    </p>
                                    <p className="mt-3 flex-1 text-sm leading-relaxed text-graphite-soft">
                                        {academy.description}
                                    </p>
                                    <a
                                        href={academy.naverMapUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-lamp-ink hover:underline"
                                    >
                                        네이버 지도에서 보기
                                        <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                                    </a>
                                </article>
                            ))}
                        </div>
                    </section>
                )}

                {/* 교재 */}
                {books.length > 0 && (
                    <section className="mt-14">
                        <SectionTitle
                            icon={BookOpenText}
                            title="함께 보면 좋은 교재"
                            count={books.length}
                        />
                        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                            {books.map((book) => {
                                const cover =
                                    coverMap[book.title] ?? book.fallbackCoverImageUrl;
                                const isRemote = cover.startsWith("http");

                                return (
                                    <article
                                        key={book.title}
                                        className="paper-card paper-card-hover flex flex-col p-5"
                                    >
                                        <div className="flex items-start gap-4">
                                            {isRemote ? (
                                                // 원격 표지는 도메인이 고정되지 않아 next/image 대신 img를 쓴다
                                                // eslint-disable-next-line @next/next/no-img-element
                                                <img
                                                    src={cover}
                                                    alt=""
                                                    loading="lazy"
                                                    className="h-20 w-14 shrink-0 rounded-md border border-rule bg-paper-sunken object-cover"
                                                />
                                            ) : (
                                                <Image
                                                    src={cover}
                                                    alt=""
                                                    width={56}
                                                    height={80}
                                                    className="h-20 w-14 shrink-0 rounded-md border border-rule bg-paper-sunken object-cover"
                                                />
                                            )}
                                            <div className="min-w-0">
                                                <Badge tone="plant">{book.subject}</Badge>
                                                <h3 className="mt-2.5 text-base leading-snug">
                                                    {book.title}
                                                </h3>
                                                <p className="mt-1 text-xs text-graphite-faint">
                                                    {book.level}
                                                </p>
                                            </div>
                                        </div>

                                        <p className="mt-4 flex-1 text-sm leading-relaxed text-graphite-soft">
                                            {book.description}
                                        </p>

                                        <div className="mt-5 flex items-center gap-4 border-t border-rule pt-4 text-sm font-semibold">
                                            <a
                                                href={book.kyoboUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1 text-lamp-ink hover:underline"
                                            >
                                                교보문고
                                                <ExternalLink
                                                    className="h-3.5 w-3.5"
                                                    aria-hidden="true"
                                                />
                                            </a>
                                            <a
                                                href={book.yes24Url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1 text-lamp-ink hover:underline"
                                            >
                                                YES24
                                                <ExternalLink
                                                    className="h-3.5 w-3.5"
                                                    aria-hidden="true"
                                                />
                                            </a>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    </section>
                )}

                {/* 앱/서비스 */}
                {apps.length > 0 && (
                    <section className="mt-14">
                        <SectionTitle
                            icon={Smartphone}
                            title="학습 앱·서비스"
                            count={apps.length}
                        />
                        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                            {apps.map((item) => (
                                <article
                                    key={item.name}
                                    className="paper-card paper-card-hover flex flex-col p-5"
                                >
                                    <div className="flex items-start gap-3">
                                        <Image
                                            src={item.icon}
                                            alt=""
                                            width={40}
                                            height={40}
                                            className="rounded-xl border border-rule bg-paper-sunken"
                                        />
                                        <div>
                                            <div className="flex items-center gap-1.5">
                                                <Badge tone="wood">{item.category}</Badge>
                                                <Badge tone="lamp">{item.focus}</Badge>
                                            </div>
                                            <h3 className="mt-2 text-base">{item.name}</h3>
                                        </div>
                                    </div>

                                    <p className="mt-4 flex-1 text-sm leading-relaxed text-graphite-soft">
                                        {item.description}
                                    </p>

                                    <a
                                        href={item.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-lamp-ink hover:underline"
                                    >
                                        바로가기
                                        <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                                    </a>
                                </article>
                            ))}
                        </div>
                    </section>
                )}

                <div className="mt-16 flex items-start gap-3 rounded-[18px] border border-dashed border-rule-strong p-5">
                    <Doodle name="note" className="h-8 w-8 shrink-0 text-wood" />
                    <p className="text-sm leading-relaxed text-graphite-soft">
                        여기 실린 추천은 편집팀이 정리한 참고 정보입니다. 실제 등록 전에는
                        직접 상담을 받아보시고, 다녀오신 뒤에는 커뮤니티에 후기를
                        남겨주시면 다음 사람에게 큰 도움이 됩니다.
                    </p>
                </div>
            </div>
        </>
    );
}
